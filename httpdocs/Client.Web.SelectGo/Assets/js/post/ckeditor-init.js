
const maxCharacters = 2000;
const container = document.querySelector('.ckediter-wrapper');
const progressCircle = document.querySelector('.ckediter-wrapper__chart__circle');
const charactersBox = document.querySelector('.ckediter-wrapper__chart__characters');
const wordsBox = document.querySelector('.ckediter-wrapper__words');
const circleCircumference = Math.floor(2 * Math.PI * progressCircle.getAttribute('r'));
const sendButton = document.querySelector('.ckediter-wrapper__send');
let aseditor;
ClassicEditor
    .create(document.querySelector('.editor'), {
        wordCount: {
            onUpdate: stats => {
                const charactersProgress = stats.characters / maxCharacters * circleCircumference;
                const isLimitExceeded = stats.words > maxCharacters;
                const isCloseToLimit = !isLimitExceeded && stats.characters > maxCharacters * .8;
                const circleDashArray = Math.min(charactersProgress, circleCircumference);

                // Set the stroke of the circle to show how many characters were typed.
                progressCircle.setAttribute('stroke-dasharray', `${circleDashArray},${circleCircumference}`);

                // Display the number of characters in the progress chart. When the limit is exceeded,
                // display how many characters should be removed.
                if (isLimitExceeded) {
                    charactersBox.textContent = `-${stats.words - maxCharacters}`;
                } else {
                    charactersBox.textContent = stats.words;
                }

                wordsBox.textContent = `In the post has: ${stats.words} Words & ${stats.characters} Characters` ;

                // If the content length is close to the character limit, add a CSS class to warn the user.
                container.classList.toggle('ckediter-wrapper__limit-close', isCloseToLimit);

                // If the character limit is exceeded, add a CSS class that makes the content's background red.
                container.classList.toggle('ckediter-wrapper__limit-exceeded', isLimitExceeded);

                // If the character limit is exceeded, disable the send button.
                sendButton.toggleAttribute('disabled', isLimitExceeded);
            }
        },
        mention: {
            feeds: [
                {
                    marker: '@',
                    feed: ['@huyvd', '@Lily', '@Marshall', '@Robin', '@Ted'],
                    minimumCharacters: 1
                }
            ]
        },
        //title: {
        //    placeholder: 'Title'
        //},
        //placeholder: 'My custom placeholder for the body',

        toolbar: {
            items: [
                'heading',
                'undo',
                'removeFormat',
                'redo',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                'highlight',
                'fontBackgroundColor',
                '|',
                'alignment',
                'indent',
                'outdent',
                'todoList',
                'fontColor',
                'underline',
                '|',
                'codeBlock',
                'imageUpload',
                'blockQuote',
                'mediaEmbed',
                '|',
                'insertTable',
                'specialCharacters',
                'strikethrough',
                'subscript',
                'superscript',
                '|',
                'ChemType',
                'MathType',
                'exportPdf'
            ]
        },
        language: 'en',
        image: {
            // You need to configure the image toolbar, too, so it uses the new style buttons.
            toolbar: ['imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight'],

            styles: [
                // This option is equal to a situation where no style is applied.
                'full',

                // This represents an image aligned to the left.
                'alignLeft',

                // This represents an image aligned to the right.
                'alignRight'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableCellProperties',
                'tableProperties'
            ]
        },
        licenseKey: '',

    })
    .then(editor => {
        window.editor = editor;
        window.aseditor = editor;
        window.editor.on('dialogDefinition', function (event)
        {
            console.log(event);
            var editor = event.editor;
            var dialogDefinition = event.data.definition;
            var dialogName = event.data.name;

            var cleanUpFuncRef = CKEDITOR.tools.addFunction(function ()
            {
                // Do the clean-up of filemanager here (called when an image was selected or cancel was clicked)
                $('#fm-iframe').remove();
                $("body").css("overflow-y", "scroll");
            });

            var tabCount = dialogDefinition.contents.length;
            for (var i = 0; i < tabCount; i++) {
                var dialogTab = dialogDefinition.contents[i];
                if (!(dialogTab && typeof dialogTab.get === 'function')) {
                    continue;
                }

                var browseButton = dialogTab.get('browse');
                if (browseButton !== null) {
                    browseButton.hidden = false;
                    browseButton.onClick = function (dialog, i) {
                        editor._.filebrowserSe = this;
                        var iframe = $("<iframe id='fm-iframe' class='fm-modal'/>").attr({
                            src: './../index.html' + // Change it to wherever  Filemanager is stored.
                            '?CKEditorFuncNum=' + CKEDITOR.instances[event.editor.name]._.filebrowserFn +
                            '&CKEditorCleanUpFuncNum=' + cleanUpFuncRef +
                            '&langCode=en' +
                            '&CKEditor=' + event.editor.name
                        });

                        $("body").append(iframe);
                        $("body").css("overflow-y", "hidden");  // Get rid of possible scrollbars in containing document
                    }
                }
            }
        });

    })
    .catch(error => {
        console.error('Oops, something gone wrong!');
        console.error('Please, report the following error in the https://github.com/ckeditor/ckeditor5 with the build id and the error stack trace:');
        console.warn('Build id: axwt5zolgwpj-emwzfcuf6q2e');
        console.error(error);
    });




