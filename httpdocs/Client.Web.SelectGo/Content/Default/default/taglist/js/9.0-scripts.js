
function xoa_dau(str) {
    str = str.replace(/� |á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|� |Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|� |Ờ|Ớ|Ợ|Ở|� /g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

//js filter tags
    var abc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","Z"];
    function appendData(data) {
        for(var i = 0; i < abc.length; i++){
            var El_div = '<div class="_item"><p class="__alphabet">'+abc[i]+'</p><ul class="__list_tags" data-alphabet="'+abc[i]+'"></ul></div>';
            $(El_div).appendTo('._tags ._content');
            
        }

        //hien thi danh sach cac nuoc ra man hinh theo ki tu "abc..."
        $('._tags ._content ._item').each(function(index){
            var EL_chil = $(this).children('.__list_tags').attr('data-alphabet');
            for(var j = 0; j < data.length; j ++){
                var dataName = data[j].name;
                var El_Li = '<li class="tag_name" tags_type="'+data[j].type+'" code="'+data[j].code+'" link="'+data[j].link+'">'+dataName+'</li>';
                if(dataName.slice(0,1) == EL_chil && data[j].type==""){
                    $(El_Li).appendTo($(this).children('.__list_tags'));
                }
            }
        });

        //Kiem tra cac nuoc trong danh sach nguy hiem
        function type(){
            var array_type = [];
            var content_type = "";
            var x = 0;
            for(var j = 0; j < data.length; j ++){
                var tags_type = data[j].type;
                if(tags_type == "favorite"){
                    array_type[x] = data[j].name;
                    x++;
                }
            }
            array_type.sort(function(a, b) {
                var nameA = a.toUpperCase();
                var nameB = b.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            for (let i = 0; i < array_type.length; i++) {
                const dataName = array_type[i];
                content_type += ', ' + dataName;
            }
            $('._tags ._seclect_tag .tags_type b').text(content_type.slice(2));
        }
        type();

        //check su kien nhap tren o input search
        function searchtags(){
            $('#tags_search').keyup(function(e){
                var value_search = $(this).val();
                var result_search = [];
                $('._search_tags ul li').remove();
                for(var j = 0; j < data.length; j ++){
                    var dataName = data[j].name;
                    var pos = dataName.toUpperCase().search(xoa_dau(value_search.toUpperCase()));
                    if(pos == 0){
                        if(value_search==''){
                            result_search = [];
                        }else{
                            var value_search_leght = value_search.length;
                            var str_default = dataName.slice(0,value_search_leght)
                            var object = {
                                "link":data[j].link,
                                "type": data[j].type,
                                "code": data[j].code,
                                "name": dataName.replace(str_default,'<span>' +str_default+'</span>'),
                            }
                            result_search.push(object);
                        }
                    }
                }

                //sap sep mang lay duoc sau khi search theo ki tu nhap
                result_search.sort(function(a, b) {
                    var nameA = a.name.toUpperCase();//khong phan biet hoa thuong
                    var nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

                for(var k = 0 ; k < result_search.length; k ++){
                    var El_Li_search = '<li class="tag_name" tags_type="'+result_search[k].type+'" code="'+result_search[k].code+'" link="'+result_search[k].link+'">'+result_search[k].name+'</li>';
                    $(El_Li_search).appendTo('._search_tags ul');
                }
                tagNameClicked();
            });
        }
        searchtags();

        var tagNameClicked = function () {
            $('.tag_name').on('click', function (e) {
                var tag_name = $(this).text();
                var tag_link = $(this).attr('link');
                if (tag_link != "#") {
                    var tag_code = $(this).attr('code');
                    $('#see-more-tags').text("Go to--" + tag_name);
                    $('#see-more-tags').attr('link', tag_link);
                    $('#see-more-tags').attr('code', tag_code);
                    $(".js_tags").removeClass('is_active');
                    if ($("#see-more-tags").attr("link") != "#") {
                        window.location = $("#see-more-tags").attr("link");
                    }
                    else {

                    }
                }

               
            });

        }
        tagNameClicked();
        $('#see-more-tags').on('click', function(e){
            if ($('.js_tags').hasClass("is_active")) {
                $('#see-more-tags').css("color", "#000");
                $('#see-more-tags svg').css("transform", "rotate(0deg)");
                $('.js_tags').removeClass('is_active');
            }
            else {
                $('.js_tags').addClass('is_active');
                $('#see-more-tags').css("color", "#c90000");
                $('#see-more-tags svg').css("transform", "rotate(45deg)");
            }
        });
        $(document).keyup(function (e) {
            if (e.key === "Escape") { // escape key maps to keycode `27`
                $('#see-more-tags').trigger("click");
            }
        });
    }

    // fetch tags.json
    fetch('/api/helper/tagssearch')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log(err);
    });

    // // js press outside the selection js_tags
    // jQuery(document).ready(function($){
        // $(document).bind('click', function(e) {
            // var $clicked = $(e.target);
            // if (!$clicked.parents().hasClass("_frm_quick_search_tags")) $(".js_tags").removeClass(
                // 'is_active');
        // });
    // });