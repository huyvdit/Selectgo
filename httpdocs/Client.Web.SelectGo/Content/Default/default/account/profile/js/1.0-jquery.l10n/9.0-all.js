window.itemsNotFormatted = [];
$.fn.l10n = function (options) {
    const that = this;
    const debug = false;
    let dict = {};
    //let dictSafe = [];
    let params = $.extend({
        lang: document.querySelector('html').getAttribute('lang'),
        dictList: []
    }, options);

    // Defining Language
    let language = params.lang;
   
    if (params.dictList.hasOwnProperty(language)) {
        dict = params.dictList[language];

      
    } else {
        if (debug) console.log("error");
    }


    this.getText = function (text) {
        return dict[text] || text ;
    };

    this.setLanguage = function (lang) {
        document.querySelector('html').setAttribute('lang', lang);
    };

    this.getLanguage = function () {
        return language;
    }

    this.translate = function () {
        if (typeof Array.prototype.each != 'function') {
            Array.prototype.each = function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.apply(this, [this[i], i, this]);
                }
            };
        }
        var i = 1;
        that.each(function (index) {
            var element = this;
            // Check Html element
            var up = false;
            var textToTranslate;
            var arr = element.className.split(" ");
            if (arr.indexOf("l10n-done") == -1 && arr.indexOf("l10n-ignore") == -1) {

                var oldText = element.innerHTML.trim();
                if (debug) console.log(oldText);
                if (oldText.length <= 1) {
                    up = true;
                }
                else if (dict[oldText]) {
                    var newText = that.getText(oldText);
                    if (debug) console.log("done 1:" + oldText + "->" + newText);
                    element.innerHTML = newText;
                    up = true;

                }
                else {
                    if (debug) console.error(oldText, dict["" + oldText + ""]);
                    textToTranslate = oldText;
                }

                if (up == false)
                    try {
                        var text = $(element)[0].childNodes[0].data.trim();
                        if (dict[text]) {
                            var newText = that.getText(text);
                            if (debug) console.log("done 2:" + text + "->" + newText);
                            $(element)[0].childNodes[0].data = newText;
                            up = true;

                        }
                        else textToTranslate = text;
                    }
                    catch (ex) {

                    }
                //
                if (up == false)
                    try {
                        var text = $(element)[0].childNodes[1].data.trim();
                        if (dict[text]) {
                            $(element)[0].childNodes[1].data = that.getText(text);
                            up = true;
                            if (debug) console.log("done 3:" + text + "->" + that.getText(text));
                        }
                        else textToTranslate = text;
                    }
                    catch (ex) {

                    }


                // Check Placeholder attribute
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', that.getText(element.getAttribute('placeholder').trim()));
                    up == true;
                }

                if (element.getAttribute('title')) {

                    var name = element.getAttribute('name');
                    if (name != undefined && name.indexOf('[') != -1) {
                        name = " [" + name.split('[')[1];
                    }
                    else name = "";
                    element.setAttribute('title', that.getText(element.getAttribute('title').trim()) + name);
                    up == true;
                }

                if (up == false && textToTranslate != undefined && textToTranslate.indexOf("</") == -1 && debug == true) {
                    if (
                        textToTranslate != "__UNDEFINED__" &&
                        textToTranslate.indexOf("<") == -1 &&
                        textToTranslate.indexOf("@") == -1 &&
                        textToTranslate.indexOf("</i>") == -1 &&
                        textToTranslate.indexOf("</svg>") == -1 &&


                        textToTranslate.length > 3) {
                        var m = { model: (index + 1) + "->" + (textToTranslate + "_TextFile") + "->" + textToTranslate + "_{{" + language + "}}" + "-> T" };

                        if (window.itemsNotFormatted != undefined) {
                            if (!itemsNotFormatted.includes(m)) {
                                console.log(AppConfigs.UniqueSeoCode, textToTranslate);
                                if (AppConfigs.UniqueSeoCode == "en") {
                                    $.get("/api/Gateway/UpdateTextTranslate", { input: textToTranslate, output: textToTranslate, lang: "en" });
                                }
                                else if (AppConfigs.UniqueSeoCode == "vi") {
                                    $.get("/api/Gateway/UpdateTextTranslate", { input: textToTranslate, lang: "vi" });
                                }
                                itemsNotFormatted.push(m);
                            }
                        }
                    }




                }
                else if (up == true) {

                    //if ($(element).prev().prop('nodeName') != "INPUT") element.classList.add("l10n-done");
                    i++;
                }


            }
        });
        if (debug) console.log("Total l10n:" + i);
        
    };

    that.translate();
    return that;

}

// label,h2,button,div,p,input,a,td,button
const l10n = $('.l10n label, .l10n h2, .l10n h3, .l10n button span, .l10n a span, .l10n button, .l10n .breadcrumb-item a, .l10n strong, .l10n b, .l10n .key, .l10n-inline').l10n({
    lang: document.querySelector('html').getAttribute('lang'),
    dictList: words
});
window.l10n = l10n;

// '.l10n label, .l10n input, .l10n-inline, .l10n option'
window.l10nUpdate = function (el) {
   $(el).l10n({
        lang: document.querySelector('html').getAttribute('lang'),
        dictList: words
    });
}

$.fn.extend({
    textTranslate: function (txt) {

        this.text(l10n.getText(txt));
    },

});

var fileTitle = 'export-localestringresource-' + l10n.getLanguage(); // or 'my-unique-title'

console.log(itemsNotFormatted, fileTitle);


//exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
