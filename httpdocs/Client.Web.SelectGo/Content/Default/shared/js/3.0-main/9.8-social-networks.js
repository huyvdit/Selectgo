(function($) {
    "use strict";

    $(document).ready(function () {

       

        try {
            var asiteplusParams = window.asiteplus_params || {
                facebook_appId: "1013548852055113"
            };
           

                FB.init({
                    appId: asiteplusParams.facebook_appId,
                    status: true,
                    cookie: true,
                    xfbml: true
                });

                function postToFeed(url, picture, fbTitle, fbDescription) {
                    "use strict";
                    var obj = {
                        method: "feed",
                        link: url,
                        picture: picture,
                        name: fbTitle,
                        caption: fbTitle,
                        description: fbDescription
                    };

                    function callback(response) {}

                    FB.ui(obj, callback);
                }
           
            function fbCallout(fbUrl, picture, name, description) {
                "use strict";
                postToFeed(fbUrl, picture, name, description);
            }

        

            $(".facebook-share").bind("click", function() {
                var data = $(this).data();
                fbCallout(data["url"], data["pic"], data["name"], data["description"]);
            });
         
        } catch (ex) {
            $(".facebook-share").bind("click", function () {
                alert("Wait to updated!");
            });
        }

        function shareOnTwitter(shareUrl, shareText) {
            "use strict";
            var sharethisUrl = "https://twitter.com/intent/tweet?url=" + shareUrl + "&text=" + shareText;
            window.open(sharethisUrl, "Twitter_share", "width=650,height=530");
            return false;
        }


        function googlePlus(gUrl) {
            "use strict";
            var googleUrl = "https://plus.google.com/share?url=" + gUrl;
            window.open(googleUrl, "Pin_Login", "width=650,height=530");
            return false;
        }

        $(".twitter-share").bind("click", function () {
            var data = $(this).data();
            shareOnTwitter(data["url"], data["name"]);
        });

        $(".googleplus-share").bind("click", function () {
            var data = $(this).data();
            googlePlus(data["url"]);
        });
    });

})($);