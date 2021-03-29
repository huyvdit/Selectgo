

tinymce.init({
    selector: 'textarea#FullDescription',
    setup: function (editor) {
        //editor.on('init', function (e) {
            
        //});
    },
    plugins: 'legacyoutput  preview paste importcss searchreplace autolink  directionality code visualblocks visualchars fullscreen image link media   codesample template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap toc  quickbars emoticons',
    //imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo formatselect toc  removeformat | bold italic underline strikethrough |  anchor   codesample insertdatetime  insertfile image  link media    | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor  | pagebreak | charmap emoticons | fullscreen  preview | template  | ltr rtl',
    toolbar_sticky: true,
    draggable_modal: true,
    placeholder: 'Type or paste your content here...',
    skin: "oxide",

    mobile: {
        menubar: true,
        theme: 'mobile',
        plugins: 'lists autolink',
        toolbar: 'undo bold italic styleselect'
    },
    image_advtab: true,
    relative_urls: false,
    remove_script_host: false,
    content_css: '/bundles/content/default/catalog/product/resource/css',
    link_list: [
        { title: 'Home page', value: 'http://selectgo.vn' },
        { title: 'Plugins page', value: 'http://plugins.selectgo.vn/' },
        { title: 'Templates page', value: 'http://templates.selectgo.vn/' }
    ],
    image_list: [
        { title: 'Logo', value: 'http://plugins.selectgo.vn/images/shared/1/logo.svg' },
        { title: 'Logo vertically', value: 'http://plugins.selectgo.vn/images/shared/1/logo-vertically.svg' }
       
    ],
    image_class_list: [
        { title: 'none', value: '' },
        { title: 'highlight class', value: 'highlight-item' },
        { title: 'focused class', value: 'focused-item' }
    ],
    importcss_append: true,
    file_picker_callback: function (callback, value, meta) {
        // from http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        var cmsURL = '/assets/richfilemanager/index.html?&field_name=' + "" + '&langCode=en'; // &expandedFolder=/public/&exclusiveFolder=Files/2020

        if (meta.filetype == 'image') {
            cmsURL = cmsURL + "&filter=image";
        }
        if (meta.filetype == 'media') {
            cmsURL = cmsURL + "&filter=media";
        }
        if (meta.filetype == 'file') {
            cmsURL = cmsURL + "&filter=office";
        }

       var current = tinymce.activeEditor.windowManager.openUrl({
            url: cmsURL,
            title: 'Filemanager',
            width: x * 0.8,
            height: y * 0.8,
            resizable: "yes",
            close_previous: "no"
        });
        //window.callbackDone = callback;
        window.addEventListener('message', function (event) {
            var data = event.data;
            console.log(data);
            if (meta.filetype === 'file') {
                callback(data.preview_url, { text: 'My text' });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
                callback(data.preview_url, { alt: 'My alt text' });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
                callback(data.preview_url, { source2: '#', poster: "#" });
            }
            current.close();
        });
    },
    templates: [
        { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
        { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
        { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 1200,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: 'sliding',
    contextmenu: "link image imagetools table",
});


