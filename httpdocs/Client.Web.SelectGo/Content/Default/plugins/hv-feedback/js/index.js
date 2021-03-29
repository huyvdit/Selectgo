var Vaild = false;
PagedFeedBackLoaded = function () {

    function replaceValidationUi(form) {
        // Suppress the default bubbles
        form.addEventListener("invalid", function (event) {
            event.preventDefault();
        }, true);

        // Support Safari, iOS Safari, and the Android browser—each of which do not prevent
        // form submissions by default
        form.addEventListener("submit", function (event) {
            if (!this.checkValidity()) {
                event.preventDefault();
            }
        });

        // Add a container to hold error messages
        //form.insertAdjacentHTML("afterbegin", "<ul class='error-messages submit-review-error'></ul>");

        var submitButton = $(form).find('button:submit');
        var submitProcessing = false;
        submitButton.bind("click", function (event) {
            if (submitProcessing === true) return false;
            submitProcessing = true;
            var invalidFields = form.querySelectorAll(":invalid"),
            errorMessages = form.querySelectorAll(".error-message"),
            parent;

            // Remove any existing messages
            var i;
            for (i = 0; i < errorMessages.length; i++) {
                errorMessages[i].parentNode.removeChild(errorMessages[i]);
            }

            for (i = 0; i < invalidFields.length; i++) {
                parent = invalidFields[i].parentNode;
                parent.insertAdjacentHTML("beforeBegin", "<div class='error-message tooltiptext'>" + Resources._(invalidFields[i].validationMessage) + "</div>");
            }

            // If there are errors, give focus to the first invalid field
            if (invalidFields.length > 0) {
                invalidFields[0].focus();
                submitProcessing = false;
                return false;
            }
            submitButton.addClass("processing");
            return true;
        });
    }

    // Replace the validation UI for all forms
    var forms = document.querySelectorAll("form.site-form");
    for (var i = 0; i < forms.length; i++) { replaceValidationUi(forms[i]); }

    if ($(".submit-feedback-successful").size() > 0) {
        $("[name=Message]").val("");
        setTimeout(function () { $(".submit-feedback-successful").hide(); }, 15200);
    }

    $("input,textarea,select").on("change keyup paste", function () {
        if ($("#Custom").size() > 0) {
            var data = {};
            $.each($("input[data-scope=Custom],select[data-scope=Custom]"), function (k, v) {
                var key = $(v).attr("name");
                if (key !== "DataCustom") {
                    data[key] = $("#" + key).val();
                }
            });
            var selected = $("input[data-scope=Custom-Chosen]:checked");
            if (selected.size() > 0) {
                data[selected.attr("name")] = selected.val();
            }
            $("#Custom").val(JSON.stringify(data));
        }

    });
    $("input[type=file]").on("change", function (e) {
        var validExts = new Array(".DOC", ".DOCX", ".XLS", ".XLSX", ".TXT", ".PDF", ".BMP", ".JPG", ".JPEG", ".PNG", ".7Z", ".RAR", ".ZIP");
        var fileExt = $(this).val();
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        if (validExts.indexOf(fileExt.toUpperCase()) < 0) {
            alert("Opps..., Invalid file selected, valid files are of " +
                validExts.toString() + " types.");
            return false;
        } else {
            var maxSize = $(this).data('max-size');
            var fileSize = $(this).get(0).files[0].size; // in bytes
            if (fileSize > maxSize) {
                alert('Opps..., File size is more then ' + maxSize / 1000000 + ' mb');
                return false;
            }
            var filename = e.target.files[0].name;
            if (filename.substring(3, 11) === 'fakepath') {
                filename = filename.substring(12);
            } // Remove c:\fake at beginning from localhost chrome
            $('.js-fileName').text(filename).css("background-color", "#006735").addClass("except-1");
            return true;
        }
    });


};

PagedFeedBackBegin = function () {

    return true;

};

$(document).ready(function () {
    PagedFeedBackLoaded();
    if ($("input[type=file]").size() === 1) {

        window.addEventListener("submit", function (e) {
            var form = e.target;
            if (form.getAttribute("enctype") == "multipart/form-data") {
                if (form.dataset.ajax) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    var xhr = new XMLHttpRequest();
                    xhr.open(form.method, form.action);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status == 200) {
                            if (form.dataset.ajaxUpdate) {
                                var updateTarget = document.querySelector(form.dataset.ajaxUpdate);
                                if (updateTarget) {
                                    updateTarget.innerHTML = xhr.responseText;
                                }
                            }
                        }
                    };
                    xhr.send(new window.FormData(form));
                }
            }
        }, true);
    }
});