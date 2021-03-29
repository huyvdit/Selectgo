$(document).ready(function () {


    localforage.setDriver('asyncStorage'); // Force indexedDb

    function onError(err) {
        var msg = err.name + '\n' + err.message;
        alert(msg);
    }
    window.deleteAllData = function () {
        localforage.removeItem("PrimaryPicture");
        localforage.removeItem("ListPictures");
        localforage.removeItem("ListFiles");
        localforage.removeItem("FullDescription");
    }

    var input = document.querySelector('input[name=ListTags]'),

        tagify = new Tagify(input, {
            //pattern: /^.{0,20}$/,  // Validate typed tag(s) by Regex. Here maximum chars length is defined as "20"
            //delimiters: ",| ",        // add new tags when a comma or a space character is entered
            keepInvalidTags: true,         // do not remove invalid tags (but keep them marked as invalid)
            editTags: 1,            // single click to edit a tag
            maxTags: 6,
            blacklist: ["fuck", "shit", "pussy"],
            whitelist: [],
            transformTag: transformTag,
            //backspace: "edit",
            placeholder: "Type something...",
            dropdown: {
                enabled: 0,
            }
        }),
        controller; // for aborting the call
    // generate a random color (in HSL format, which I like to use)
    function getRandomColor() {
        function rand(min, max) {
            return min + Math.random() * (max - min);
        }

        var h = rand(1, 360) | 0,
            s = rand(40, 70) | 0,
            l = rand(65, 72) | 0;

        return 'hsl(' + h + ',' + s + '%,' + l + '%)';
    }

    function transformTag(tagData) {
        tagData.style = "--tag-bg:" + getRandomColor();

        if (tagData.value.toLowerCase() == 'shit')
            tagData.value = 's✲✲t'
    }
    // listen to any keystrokes which modify tagify's input
    tagify.on('input', onInput)

    function onInput(e) {
        var value = e.detail.value;
        tagify.settings.whitelist.length = 0; // reset the whitelist

        // https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
        controller && controller.abort();
        controller = new AbortController();

        // show loading animation and hide the suggestions dropdown
        tagify.loading(true).dropdown.hide.call(tagify)

        fetch('/api/helper/tags?value=' + value, { signal: controller.signal })
            .then(RES => RES.json())
            .then(function (whitelist) {
                // update inwhitelist Array in-place
                tagify.settings.whitelist.splice(0, whitelist.length, ...whitelist)
                tagify.loading(false).dropdown.show.call(tagify, value); // render the suggestions dropdown
            })
    }
    input.addEventListener('change', onChange)

    function onChange(e) {
        // outputs a String
        var dt = $("#ListTags").val() == "" ? [] : JSON.parse($("#ListTags").val());
        localStorage.setItem("ListTags", JSON.stringify($.map(dt, function (n) {
            return n["value"];
        })));
    }
    tagify.addTags(localStorage.getItem("ListTags") == null ? [] : JSON.parse(localStorage.getItem("ListTags")));

    //tagify.on('add', function (e) {
    //    console.log(e.detail)
    //})

    //tagify.on('invalid', function (e) {
    //    console.log(e, e.detail);
    //})



    window.picturesUp = function (data) {
        window.picturesUpDATA = data == null ? [] : (data);
        var statusDropZone = function () {
            setTimeout(function () {
                if ($("#upload-5-queue").html() == "") {
                    $("#upload-5-dropzone").show();
                }
                else {
                    $("#upload-5-dropzone").hide();

                }
            }, 120);
        }
        $.fileup({

            inputID: 'upload-5',
            queueID: 'upload-5-queue',
            dropzoneID: 'upload-5-dropzone',
            onSelect: function (file) {
                var reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        var fileString = e.target.result;
                        window.picturesUpDATA.push({ name: file.name, size: file.size, previewUrl: fileString });
                        localforage.setItem("ListPictures", window.picturesUpDATA);
                    };
                })(file);
                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
                statusDropZone();
            },
            onRemove: function (fil_number, total, file) {

                for (var i = 0; i < window.picturesUpDATA.length; i++) {
                    if (i == file) {
                        window.picturesUpDATA.splice(i);
                        localforage.setItem("ListPictures", window.picturesUpDATA);
                    }

                }
                statusDropZone();
            },
            files: window.picturesUpDATA,
            templateFile: '<div id="fileup-[INPUT_ID]-[FILE_NUM]" class="fileup-file [TYPE]">' +
                '<div class="fileup-preview"> ' +
                '<img src="[PREVIEW_SRC]" alt="[NAME]"/> ' +
                '</div> ' +
                '<div class="fileup-container"> ' +
                '<div class="fileup-description"> ' +
                '<span class="fileup-name">[NAME]</span> (<span class="fileup-size">[SIZE_HUMAN]</span>) ' +
                '</div> ' +
                '<div class="fileup-controls">' +
                '<span class="fileup-remove" onclick="$.fileup(\'[INPUT_ID]\', \'remove\', \'[FILE_NUM]\');" title="[REMOVE]"></span>' +
                '</div> ' +
                '</div> ' +
                '<div class="fileup-clear"></div> ' +
                '</div>'
        }).dragEnter(function (event) {
            $(event.target).addClass('over');
        })
            .dragLeave(function (event) {
                $(event.target).removeClass('over');
            })
            .dragEnd(function (event) {
                $(event.target).removeClass('over');
            });

        setTimeout(function () {
            statusDropZone();
        }, 1200);
    }

    window.filesUp = function (data) {
        window.filesUpDATA = data == null ? [] : (data);

        $.fileup({

            inputID: 'upload-4',
            queueID: 'upload-4-queue',
            onSelect: function (file) {
                var reader = new FileReader();
                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        var fileString = e.target.result;
                        window.filesUpDATA.push({ name: file.name, size: file.size, data: fileString });

                        localforage.setItem("ListFiles", window.filesUpDATA);
                    };
                })(file);
                // Read in the image file as a data URL.
                reader.readAsDataURL(file);
            },
            onRemove: function (fil_number, total, file) {

                for (var i = 0; i < window.filesUpDATA.length; i++) {
                    if (i == file) {
                        window.filesUpDATA.splice(i);
                        localforage.setItem("ListFiles", window.filesUpDATA);
                    }
                }
            },
            files: window.filesUpDATA,
            templateFile: '<div id="fileup-[INPUT_ID]-[FILE_NUM]" class="fileup-file [TYPE]">' +
                '<div class="fileup-preview"> ' +
                '<img src="[PREVIEW_SRC]" alt="[NAME]"/> ' +
                '</div> ' +
                '<div class="fileup-container"> ' +
                '<div class="fileup-description"> ' +
                '<span class="fileup-name">[NAME]</span> (<span class="fileup-size">[SIZE_HUMAN]</span>) ' +
                '</div> ' +
                '<div class="fileup-controls">' +
                '<span class="fileup-remove" onclick="$.fileup(\'[INPUT_ID]\', \'remove\', \'[FILE_NUM]\');" title="[REMOVE]"></span>' +
                '</div> ' +
                '</div> ' +
                '<div class="fileup-clear"></div> ' +
                '</div>'
        }).dragEnter(function (event) {
            $(event.target).addClass('over');
        })
            .dragLeave(function (event) {
                $(event.target).removeClass('over');
            })
            .dragEnd(function (event) {
                $(event.target).removeClass('over');
            });
    }

    // Register the plugin with FilePond
    FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginImageValidateSize, FilePondPluginFileEncode, FilePondPluginFileValidateType); // FilePondPluginImageCrop,

    // Get a reference to the file input element
    const inputElement = document.querySelector('input[name="Avatar"]');

    // Create the FilePond instance
    const pond = FilePond.create(inputElement, {
        imageValidateSizeMaxWidth: 2560,
        imageValidateSizeMaxHeight: 1326,

        //imageCropAspectRatio: '1:1'
    });

    // Request encoded data
    pond.onaddfile = (err, item) => {

        if (err) {
            console.warn(err);
            return;
        }
        $("#Avatar").val(item.getFileEncodeDataURL());
        localforage.setItem("PrimaryPicture", { src: $("#Avatar").val(), name: item.filename });
        $("#Avatar_Display").hide();
    }

    // Load data:
    localforage.getItem("ListFiles", function (data) {
        filesUp(data == undefined ? [] : data);
    });
    localforage.getItem("PrimaryPicture", function (data) {
        $("#Avatar").val(data == undefined ? "#" : data.src);
        if ($("#Avatar").val() != "#")
            $("#Avatar_Display").attr("src", $("#Avatar").val()).show();
    });
    localforage.getItem("ListPictures", function (data) {
        picturesUp(data == undefined ? [] : data);
    });

    $("#treegrid").fancytree({
        extensions: ["table", "persist"],
        checkbox: true,
        persist: {
            expandLazy: true,
            // fireActivate: false,    // false: suppress `activate` event after active node was restored
            // overrideSource: false,  // true: cookie takes precedence over `source` data attributes.
            store: "auto" // 'cookie', 'local': use localStore, 'session': sessionStore
            // Sample for a custom store:
            // store: {
            //   get: function(key){ this.info("get(" + key + ")"); return window.sessionStorage.getItem(key); },
            //   set: function(key, value){ this.info("set(" + key + ", " + value + ")"); window.sessionStorage.setItem(key, value); },
            //   remove: function(key){ this.info("remove(" + key + ")"); window.sessionStorage.removeItem(key); }
            // }
        },
        table: {
            indentation: 20,      // indent 20px per node level
            nodeColumnIdx: 1,     // render the node title into the 2nd column
            checkboxColumnIdx: 0  // render the checkboxes into the 1st column
        },
        source: {
            url: "../../assets/js/post/ajax-tree-category.json"
        },
        tooltip: function (event, data) {
            return data.node.data.author;
        },
        lazyLoad: function (event, data) {
            data.result = { url: "../../assets/js/post/ajax-tree-category-more.json" }
        },
        renderColumns: function (event, data) {
            var node = data.node,
                $tdList = $(node.tr).find(">td");

            // (index #0 is rendered by fancytree by adding the checkbox)
            //$tdList.eq(1).text(node.getIndexHier());
            // (index #2 is rendered by fancytree)
            // $tdList.eq(2).text(node.data.qty);
            // Rendered by row template:
            //        $tdList.eq(4).html("<input type='checkbox' name='like' value='" + node.key + "'>");
        }
    });


    function OpenServerBrowser(url, width, height) {
        var iLeft = (screen.width - width) / 2;
        var iTop = (screen.height - height) / 2;
        var sOptions = "toolbar=no,status=no,resizable=yes,dependent=yes";
        sOptions += ",width=" + width;
        sOptions += ",height=" + height;
        sOptions += ",left=" + iLeft;
        sOptions += ",top=" + iTop;
        window.oWindow = window.open(url, "BrowseWindow", sOptions);
    }


    $('#fm-bs-modal').on('click', function () {
        OpenServerBrowser(
            '/assets/richfilemanager/index.html?filter=image',
            screen.width * 0.7,
            screen.height * 0.7);

        function handlePostMessage(e) {
            var data = e.originalEvent.data;
            console.log('js-data', data);
            if (data.source === 'richfilemanager') {
                $('#Avatar').val(data.preview_url);
                $('#Avatar_Display').attr("src", data.preview_url).show();
                localforage.setItem("PrimaryPicture", { src: $("#Avatar").val(), name: "#" });
                if (window.oWindow != null) window.oWindow.close();
            }

            // remove an event handler
            $(window).off('message', handlePostMessage);
        }

        $(window).on('message', handlePostMessage);
    });


    tinymce.activeEditor.on('change', () => {
        if (window.delayUpdate != undefined) clearTimeout(window.delayUpdate);
        window.delayUpdate = setTimeout(function () {
            localforage.setItem("FullDescription", tinymce.activeEditor.getContent());
            delete window.delayUpdate;
        }, 3200);
    });
    tinymce.activeEditor.on('init', () => {
        // summernote.change
        localforage.getItem("FullDescription", function (data) {
            if (data != null) {
                tinymce.activeEditor.setContent(data);
                console.log('The Editor has initialized.');
            }

        });
    });


    $(function () {

        var $defaultData = { Name: "", AllowCustomerReviews: ["on"], ListAuthors: [], ShortDescription: "", AdminComment: "", FullDescription: "" };
        $form = $("#Item").my({
            params: {
                delay: 10,
                remember: 10, historyDelay: 1000,
                change: function ($form) {
                    console.log("change:", $form);
                },
                errorTip: ".my-error-tip",		//jQuery selector for error msg
                errorCss: "my-error"			//class to mark invalid controls
            },
            id: "en.AllControls",

            // Init function
            init: function ($form, form) {

                //localforage.getItem("ListDatas", function(data) {
                //     // Saved?
                //       var ls = localforage,
                //           old = data;
                //       if (old) Object.merge(form.data, JSON.parse(old));
                //       // localStorage saver
                //       $form.then(function () {
                //           $form.on("change", function () {
                //               ls.setItem("ListDatas", JSON.stringify($form.my("data")));
                //           }.debounce(20));
                //       });
                //});


                var ls = localStorage,
                    old = localStorage.getItem("ListDatas");
                if (old) Object.merge(form.data, JSON.parse(old));
                // localStorage saver
                $form.then(function () {
                    $form.on("change", function () {
                        ls.setItem("ListDatas", JSON.stringify($form.my("data")));
                    }.debounce(200));
                });

                var that = this, ui = form.ui, $ctrl, $mod;

                // Gen HTML
                that.html($form);     // Draw HTML

                $form.css({ opacity: 0.1 });

                $form.then(function () {              // Fade when start succeds
                    $form.animate({ opacity: 1 }, 1500);
                });
                // Write init functions code
                // into rightmost column

                for (var i in ui) {
                    $ctrl = $form.find(i).parents(".my-row:eq(0)").find(".my-label");
                    if (i != "#all" && ui[i].init) {
                        $ctrl.data("init", ui[i].init.toString()
                            .split("\n").from(1).to(-1)
                            .join("\n"))
                    } else {
                        $ctrl.removeClass("pseudolink");
                    }
                }

            },

            // UI bindings
            NumCheck: /^\d+$/,
            ForbiddenPasswords: ["123", "qwerty"],
            ui: {

                "#Name": {
                    bind: "Name",
                    recalc: "#AllowCustomerReviews",
                    css: {
                        "orange": /^.{10}$/
                    },
                    check: function (data, value, $control) {
                        if (value.length < 3) return "3+ chars";
                        if (value.length > 100) return "Too long name";
                        //if (!/^[a-z]+$/.test(value)) return "Only letters allowed";
                        //if (!/^[a-z\s]+$/i.test(value)) return "Latins, please";
                    },
                    error: "3+ chars please"
                },

                "#ShortDescription": {
                    bind: "ShortDescription",
                    init: function ($ctrl) {
                        $ctrl.redactor({
                            minHeight: 100,
                            buttons: [
                                'html', '|',
                                'bold', 'italic', 'fontcolor', '|',
                                'link'
                            ],
                            focus: false
                        });
                    }
                },

                "#AllowCustomerReviews": {
                    bind: "AllowCustomerReviews",
                    css: {
                        ":disabled": function (data, value) {
                            return data.Name.length == 0;
                        }
                    }
                },
                "#MetaTitle": {
                    bind: "MetaTitle",
                    css: {
                        "orange": /^.{10}$/
                    },
                    check: function (data, value, $control) {
                        //if (value.length < 3) return "3+ chars";
                        if (value.length > 70) return "Too long Title";
                    },
                    error: "3+ chars please"
                },
                "#MetaKeyword": {
                    bind: "MetaKeyword",
                    css: {
                        "orange": /^.{10}$/
                    },
                    check: function (data, value, $control) {
                        //if (value.length < 3) return "3+ chars";
                        if (value.length > 200) return "Too long Keyword";
                    },
                    error: "3+ chars please"
                },
                "#MetaDescription": {
                    bind: "MetaDescription",
                    css: {
                        "orange": /^.{10}$/
                    },
                    check: function (data, value, $control) {
                        //if (value.length < 3) return "3+ chars";
                        if (value.length > 300) return "Too long Description";
                    },
                    error: "3+ chars please"
                },
                "#ListAuthors": {                            // Color selector section
                    init: function ($control) {

                        var promise = $.ajax({          // Load data, $.ajax is promise
                            url: "/assets/html/colors.html?_=1593608994780",
                            cache: false,
                            dataType: "html",
                            async: true
                        })
                            .then(function (html) {          // Loaded, then
                                $control.html(html);            // – insert HTML
                                $control.select2({              // – apply plugin
                                    placeholder: "Select from list []"
                                });
                            });
                        return promise;                    // Return promise
                    },
                    bind: "ListAuthors"
                },

                "#ListAuthorsDisplay": {                              // Preview colors
                    bind: function (data) {
                        return data.ListAuthors.reduce(function (a, b) {
                            return a + '<span style="background:' + b + '">' + b + '</span> ';
                        }, "");
                    },
                    watch: "#ListAuthors"
                },

                "#ListSpecificationAttributes": {
                    bind: "ListSpecificationAttributes",
                    manifest: "propertyForm",
                    list: '>div.row',
                    init: function ($control) {
                        $control.sortable({ handle: ".fi-list" });
                    }
                },
                "#AdminComment": {
                    bind: "AdminComment",
                    init: function ($ctrl) {
                        $ctrl.redactor({
                            minHeight: 100,
                            buttons: [
                                'html', '|',
                                'bold', 'italic', 'fontcolor', '|',
                                'link'
                            ],
                            focus: false
                        });
                    }
                },
                "#btn-add": function (data, val) {
                    if (null != val) this.my.insert("#ListSpecificationAttributes", {});
                },
                "#btn-submit": function (d, v) {
                    if (null != v) {

                        if ($form.my("valid") == false) {
                            var ERROR = $form.my("errors");

                            alertify.set('notifier', 'position', 'top-center');
                            alertify.warning('Error: ' + JSON.stringify(ERROR));
                        }
                        else {
                            alertify.confirm()
                                .setting({
                                    'defaultFocus': 'cancel',
                                    transition: 'zoom',
                                    'reverseButtons': true,
                                    'message': 'Are you sure post new item?',
                                    'onok': function () {
                                        $('body').loadingModal({ text: 'Posting...' });

                                        var delay = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }) };
                                        var time = 2000;

                                        delay(time)
                                            .then(function () { $('body').loadingModal('animation', 'rotatingPlane').loadingModal('backgroundColor', 'red'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'wave'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'wanderingCubes').loadingModal('backgroundColor', 'green'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'spinner'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'chasingDots').loadingModal('backgroundColor', 'blue'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'threeBounce'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'circle').loadingModal('backgroundColor', 'black'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'cubeGrid'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'fadingCircle').loadingModal('backgroundColor', 'gray'); return delay(time); })
                                            .then(function () { $('body').loadingModal('animation', 'foldingCube'); return delay(time); })
                                            .then(function () { $('body').loadingModal('color', 'black').loadingModal('text', 'Wait done :-)').loadingModal('backgroundColor', 'yellow'); return delay(time); })
                                        var DATAPOST = $form.my("data");
                                        // Cates:
                                        var selNodes = $.ui.fancytree.getTree("#treegrid").getSelectedNodes();
                                        DATAPOST["ListCategories"] = $.map(selNodes, function (n) {
                                            return n.toDict()["data"]["id"];
                                        });

                                        // Tags:
                                        DATAPOST["ListTags"] = $("#ListTags").val() == "" ? [] : $.map(JSON.parse($("#ListTags").val()), function (n) {
                                            return n["value"];
                                        });

                                        // Pics:
                                        DATAPOST["PrimaryPicture"] = { Url: $("#Avatar").val(), Title: $("#Avatar").attr("title") };
                                        DATAPOST["ListPictures"] = [];
                                        for (var i = 0; i < window.picturesUpDATA.length; i++) {
                                            if (window.picturesUpDATA[i]["previewUrl"] != "") {
                                                DATAPOST["ListPictures"].push({ Title: window.picturesUpDATA[i]["name"], Url: window.picturesUpDATA[i]["previewUrl"] });
                                            }

                                        }
                                        // Files:
                                        DATAPOST["ListFiles"] = [];
                                        for (var i = 0; i < window.filesUpDATA.length; i++) {
                                            if (window.filesUpDATA[i]["name"] != "") {
                                                DATAPOST["ListFiles"].push({ FileName: window.filesUpDATA[i]["name"], ContentLength: window.filesUpDATA[i]["size"], FileData: window.filesUpDATA[i]["data"] });
                                            }

                                        }

                                        DATAPOST["FullDescription"] = tinymce.activeEditor.getContent();
                                        var authorSubmit = $(".author-subtitle").text();
                                        if (DATAPOST["ListAuthors"].indexOf(authorSubmit) == -1) {
                                            DATAPOST["ListAuthors"].push(authorSubmit);
                                        }
                                        console.log(DATAPOST["AllowCustomerReviews"]);
                                        if (DATAPOST["AllowCustomerReviews"] != true && DATAPOST["AllowCustomerReviews"].indexOf('on') == 0) {
                                            DATAPOST["AllowCustomerReviews"] = true;
                                        }

                                        //var DATADEF = { StoreAppliedId: 6, ProductTypeId: 3, ProductTemplateId: 3, DbConnectString: "NBContext_SelectGo" };
                                        var DATADEF = { StoreAppliedId: 6, ProductTypeId: 3, ProductTemplateId: 3 };
                                        $.each(DATADEF, function (k, v) {
                                            DATAPOST[k] = v;
                                        });

                                        DATAPOST["__RequestVerificationToken"] = $("input[name=__RequestVerificationToken").val();

                                        $.ajax({
                                            //url: "http://admin.selectgo.vn/external/api/item/post",
                                            url: "/api/item/post",
                                            type: 'POST',

                                            data: DATAPOST,
                                            // Disable caching of AJAX responses
                                            cache: false,
                                            // Fetch the stored token from localStorage and set in the header
                                            error: function (err) {
                                                console.log('Error!', err)
                                                alertify.set('notifier', 'position', 'top-center');
                                                alertify.error('Post not successfully, please check and try again!');
                                                $('body').loadingModal('destroy');
                                            },
                                            success: function (data) {
                                                $('body').loadingModal('destroy');
                                                console.log(data, '=> Success!')
                                                if (data < 0) {
                                                    alertify.set('notifier', 'position', 'top-center');
                                                    alertify.warning('Item with name is ready existed, please check and try again!');
                                                }
                                                else if (data == 0) {
                                                    alertify.set('notifier', 'position', 'top-center');
                                                    alertify.error('Post not successfully, please check and try again!');
                                                }
                                                else {
                                                    alertify.set('notifier', 'position', 'top-center');
                                                    var duration = 7;
                                                    var msg = alertify.success('Post successfully with new ID tracking:[' + data + '] (Auto-reload in ' + duration + ' seconds)', duration, function () { clearInterval(interval); });
                                                    var interval = setInterval(function () {
                                                        msg.setContent('Post successfully with new ID tracking:[' + data + '] (Auto-reload in ' + (--duration) + ' seconds)');
                                                    }, 1000);

                                                    setTimeout(function () {
                                                        window.localStorage.removeItem("ListDatas");
                                                        window.localStorage.removeItem("ListTags");
                                                        window.deleteAllData();
                                                        window.location.reload();
                                                    }, duration * 1000)
                                                }

                                            }
                                        });
                                    }
                                }).set('labels', { ok: 'Agree', cancel: 'No, later' }).setHeader('<b> Post confirm </b> ').show();

                        }
                    }

                },
                "#btn-undo": function (d, v) {
                    if (null != v) this.my.undo();
                }

            },
            propertyForm: {
                ui: {
                    ".SpecificationAttributeId": "SpecificationAttributeId",
                    ".CustomValue": "CustomValue",
                    ".fi-x": {
                        bind: function (data, val) {
                            if (null != val) this.my.remove();
                        },
                        events: "click.my"
                    }
                }
            },
            html: function ($form) {

                $form.removeClass("fs80").addClass("fs90");
            },

            // Style section

            style: {
                "": "padding-bottom:30px",
                " #ListSpecificationAttributes>div": "width:100%; border-bottom:1px dotted #aaa;padding:5px 0 10px 0;margin:5px 0;",
                " label": "font-size:85%;margin: 0 20px 0 0;",
                " input[type=radio],input[type=checkbox]": "width:14px; margin-right:5px!important",
                " .redactor_editor": "font-size:12pt; padding:0.3em; color:#444",
            }
        }, {});

        //$.my.locale(null or string);
        //$.ajax({
        //    url: "http://www.selectgo.vn/api/token/get?username=1&password=1",
        //    type: 'GET',
        //    // Fetch the stored token from localStorage and set in the header
        //    error: function (err) {
        //        console.log('Error!', err)
        //    },
        //    success: function (data) {
        //        console.log(data, 'Success!')

        //    }
        //});


        //$.ajax({
        //    url: "http://www.selectgo.vn/api/authenticate/token",
        //    type: 'POST',
        //    data: { ClientId: 'pGU6RJ8ELcVRZmN', ClientSecret:'tiIfdZ3vh5IwGVm'},
        //    // Fetch the stored token from localStorage and set in the header
        //    error: function (err) {
        //        console.log('Error!', err)
        //    },
        //    success: function (data, textStatus, request) {
        //        console.log(data, 'Success=> Token:: ' + request.getResponseHeader('token'))

        //    }
        //});
        $.ajax({
            url: "/api/item/get/2199",
            type: 'GET',
            // Disable caching of AJAX responses
            cache: false,
            // Fetch the stored token from localStorage and set in the header
            error: function (err) {
                console.log('Error!', err)
                window.localStorage.removeItem("token");
            },
            success: function (data) {
                console.log(data, '=> Success!')

            }
        });

        //$.ajax({
        //    url: "http://www.selectgo.vn/api/item/post",
        //    type: 'POST',
        //    data: { name: 'Item name', description:'Item des'},
        //     Disable caching of AJAX responses
        //    cache: false,
        //     Fetch the stored token from localStorage and set in the header
        //    headers: {
        //        "token": 'qeMqwE+St7a0v5fKQHAYhCLZ+Bmxg1UoHO85Mwvpxx72blqeST5sbgR77KO9RtxRjkPpI9/CDif2rNxf1SNJZA=='
        //    },
        //    error: function (err) {
        //        console.log('Error!', err)
        //    },
        //    success: function (data) {
        //        console.log(data, '=> Success!')

        //    }
        //});

        //$.ajax({
        //    url: "http://www.selectgo.vn/api/item/put/2199",
        //    type: 'PUT',
        //    data: { name: 'Item name', description: 'Item des' },
        //    // Disable caching of AJAX responses
        //    cache: false,
        //    // Fetch the stored token from localStorage and set in the header
        //    headers: {
        //        "token": 'qeMqwE+St7a0v5fKQHAYhCLZ+Bmxg1UoHO85Mwvpxx72blqeST5sbgR77KO9RtxRjkPpI9/CDif2rNxf1SNJZA=='
        //    },
        //    error: function (err) {
        //        console.log('Error!', err)
        //    },
        //    success: function (data) {
        //        console.log(data, '=> Success!')

        //    }
        //});

        //$.ajax({
        //    url: "http://www.selectgo.vn/api/item/delete/2199",
        //    type: 'DELETE',

        //    // Disable caching of AJAX responses
        //    cache: false,
        //    // Fetch the stored token from localStorage and set in the header
        //    headers: {
        //        "token": 'qeMqwE+St7a0v5fKQHAYhCLZ+Bmxg1UoHO85Mwvpxx72blqeST5sbgR77KO9RtxRjkPpI9/CDif2rNxf1SNJZA=='
        //    },
        //    error: function (err) {
        //        console.log('Error!', err)
        //    },
        //    success: function (data) {
        //        console.log(data, '=> Success!')

        //    }
        //});
    });

});

