let alert = new AlertClass();
$(document).ready(function () {

    $('#updateModal').MultiStep({
        title: 'Update Figure',
        data: [{
            label: 'Visibility',
            content: `<div class="input-field-radio" style="margin-bottom: 0px!important;">
                            <div class="visibility" style="width:100%">
                               
                                <label class="slot" style="    margin-bottom: 5px;">
                                    <span><b>Public</b></span>
                                    <input type="radio" value="1" name="figurevisibility-update" />
                                </label>

                                <label class="slot" style="    margin-bottom: 5px;">
                                    <span><b>Protected</b> Not available</span>
                                    <input type="radio" value="2" name="figurevisibility-update" disabled />
                                </label>

                                <label class="slot" style="    margin-bottom: 5px;">
                                    <span><b>Private</b></span>
                                    <input type="radio" value="3" name="figurevisibility-update" />
                                </label>

                            </div>
                        </div>`,
        }, {
            label: 'Meta data',
            content: `<div class="form-group">
                                    <div style="display: none;">
                                        <label for="figureid">Id:</label>
                                        <input type="text" id="figureid" name="figureid-update" readonly=true class="form-control" placeholder="">
                                        <label for="figurename">Name:</label>
                                        <input type="text" id="figurename" name="figurename-update" readonly=true class="form-control" placeholder="">
                                    </div>
                                        <label for="Alt">Alternative information:</label>
                                        <input type="text" id="Alt" name="figureAlt-update" class="form-control" placeholder="Enter alt">
                                        <label for="Caption">Caption:</label>
                                        <input type="text" id="Caption" name="figureCaption-update" class="form-control" placeholder="Enter caption">
                                    <div style="display: none;">
                                        <label for="figureUploadedTime">UploadedTime:</label>
                                        <input type="text" id="figureUploadedTime" name="figureUploadedTime-update" readonly=true class="form-control" placeholder="">
                                        <label for="figureModifiedTime">ModifiedTime:</label>
                                        <input type="text" id="figureModifiedTime" name="figureModifiedTime-update" readonly=true class="form-control" placeholder="">
                                    </div>
                                    <small id="emailHelp" class="form-text text-muted">We'll never share your file private with anyone else.</small>
                                  </div>
                                `,
            skip: true
        }],
        prevText: 'Previous',
        skipText: 'Skip',
        nextText: 'Next',
        finalLabel: 'Save to changes',
        finishText: 'Update',
        final: '<div style="text-align:center">Hi, <br> Are you sure you want to confirm?</div>',
        modalSize: 'md',
        onClose: function () {
            console.log("onClose");
        },
        onFinish: function () {
            updateFigure();
        }
    });
});
var updateFigure = function () {

    var fileData = new FormData();
    let path = $('input[id^="name"]').val();
    let id = $('input[name="figureid-update"]').val();
    let name = $('input[name="figurename-update"]').val();
    // Adding one more key to FormData object  
    fileData.append('path', path);
    fileData.append('id', id);
    fileData.append('name', name);
    fileData.append('alt', $('input[name="figureAlt-update"]').val());
    fileData.append('caption', $('input[name="figureCaption-update"]').val());
    fileData.append('visibility', $('input[name="figurevisibility-update"]:checked').val());

    // Display the values

    let toast = new ToastClass();

    toast.show({
        loading: true,

    })
    $.ajax({
        url: '/System/Assets',
        type: "PUT",
        contentType: false, // Not to set any content header  
        processData: false, // Not to process data  
        data: fileData,
        success: function (result) {

            toast.show({
                text: result,
                duration: 2000

            })
        },
        error: function (err) {
            alert.show({
                title: 'Error',
                content: err.statusText,
                btnText: 'OK'

            });

        },
        complete: function () {

        }
    });


};
//triggered when modal is about to be shown
$('#updateModal').on('show.bs.modal', function (e) {

    var relatedTarget = $(e.relatedTarget);
    //get data-id attribute of the clicked element
    var visibility = relatedTarget.data('figurevisibility');
    if (visibility == "") visibility = 0;
    //populate the textbox
    var currentTarget = $(e.currentTarget);
    currentTarget.find('input[name="figureid-update"]').val(relatedTarget.data('figureid'));
    currentTarget.find('input[name="figurename-update"]').val(relatedTarget.data('figurename'));
    currentTarget.find('input[name="figureAlt-update"]').val(relatedTarget.data('figurealt'));
    currentTarget.find('input[name="figureCaption-update"]').val(relatedTarget.data('figurecaption'));

    currentTarget.find('input:radio[name="figurevisibility-update"]').each(function () {
        $(this).checked = false;
    });
    if (visibility != 0)
        currentTarget.find('input:radio[name="figurevisibility-update"]').filter('[value=' + visibility + ']').attr('checked', true);

    currentTarget.find('input[name="figureUploadedTime-update"]').val(relatedTarget.data('figureuploadedtime'));
    currentTarget.find('input[name="figureModifiedTime-update"]').val(relatedTarget.data('figuremodifiedtime'));
});

$('[data-fancybox="public"]').fancybox({
    buttons: [
        "zoom",
        //"share",
        "slideShow",
        "fullScreen",
        "download",
        "thumbs",
        "close"
    ],
    protect: true,
    thumbs: {
        autoStart: false, // Display thumbnails on opening
        hideOnClose: true, // Hide thumbnail grid when closing animation starts
        parentEl: ".fancybox-container", // Container is injected into this element
        axis: "y" // Vertical (y) or horizontal (x) scrolling
    },
});

var clipboardDemos = new ClipboardJS('[data-clipboard]'); clipboardDemos.on('success', function (e) {
    e.clearSelection();
    alert.show({
        title: 'Hi,',
        content: "Source image [" + e.text + "] is coppied to Clipbroad!",
        btnText: 'OK',
        onShow: function () {

        },
        onHide: function () {
            console.log('Hide!')
        }
    });
}); clipboardDemos.on('error', function (e) {
    console.error('Action:', e.action); console.error('Trigger:', e.trigger);
    alert(fallbackMessage(e.action));
});

$(".btn-delete").bind("click", function () {
    var self = $(this);
    let confirm = new ConfirmClass();
    let path = $(".form-image-uploader").find('input[id^="name"]').val();
    let name = self.attr("data-name");
    confirm.show({
        title: 'Do you want?',
        content: 'Delete file [' + name + ']  form directory: [' + path + '].',
        btns: [{
            text: 'Delete',
            callback: function (instance) {
                let toast = new ToastClass();
                let fileData = new FormData();
                // Adding one more key to FormData object
                fileData.append('path', path);
                fileData.append('name', name);
                toast.show({ loading: true })
                $.ajax({
                    url: '/System/Assets',
                    type: "Delete",
                    contentType: false, // Not to set any content header
                    processData: false, // Not to process data
                    data: fileData,
                    success: function (result) {
                        toast.show({
                            loading: false,
                            text: (result == 'True' ? "Delete sucessully!" : "Error, Try again!"),
                            duration: 2000,
                            onHide: function () {
                                if (result == 'True') $(self.parent().parent()).css("visibility", "hidden").remove();
                            }
                        })

                    },
                    error: function (err) {
                        alert.show({
                            title: 'Error',
                            content: err.statusText,
                            btnText: 'OK'

                        });

                    },
                    complete: function () {

                    }
                });
            }
        }, {
            text: 'No, Thanks',
            callback: function () {

            }
        }]

    })
});

$(function () {
    $('body').addClass('js');

    var $hamburgerQuick = $('.hamburger-quick'),
        $nav = $('#site-nav'),
        $masthead = $('#masthead');

    $hamburgerQuick.click(function () {
        $(this).toggleClass('is-active');
        $nav.toggleClass('is-active');
        $masthead.toggleClass('is-active');
        return false;
    })
});
let preloaded = [
    { id: 1, src: 'https://picsum.photos/500/500?random=1' },
    { id: 2, src: 'https://picsum.photos/500/500?random=2' },
    { id: 3, src: 'https://picsum.photos/500/500?random=3' },
    { id: 4, src: 'https://picsum.photos/500/500?random=4' },
    { id: 5, src: 'https://picsum.photos/500/500?random=5' },
    { id: 6, src: 'https://picsum.photos/500/500?random=6' },
];
$('.input-images-1').imageUploader({
    preloaded: [],
    imagesInputName: 'photos',
    preloadedInputName: 'old'
});