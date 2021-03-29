//$(function () {
//    if (localStorage.getItem("token") == null) {
//        $.ajax({
//            url: "/api/authenticate/token",
//            type: 'POST',
//            data: { ClientId: 'pGU6RJ8ELcVRZmN', ClientSecret: 'tiIfdZ3vh5IwGVm' },
//            // Fetch the stored token from localStorage and set in the header
//            error: function (err) {
//                console.log('Error!', err)
//            },
//            success: function (data, textStatus, request) {
//                console.log(data, 'Success=> Token:: ' + request.getResponseHeader('token'));
//                localStorage.setItem("token", request.getResponseHeader('token'));
//                //var tokenValue = $("meta[name='csrf-token']").attr('content');
//                $.ajaxSetup({
//                    headers: { 'token': request.getResponseHeader('token') }
//                });

//            }
//        });
//    }
//    else {
//        $.ajaxSetup({
//            headers: { 'token': localStorage.getItem("token") }
//        });
//    }
     
//})

$.ajaxPrefilter(function (opts, originalOpts, jqXHR) {
    // you could pass this option in on a "retry" so that it doesn't
    // get all recursive on you.
    if (opts.refreshRequest) {
        return;
    }
     $.ajaxSetup({
        headers: { 'token': localStorage.getItem("token") }
    });
    // our own deferred object to handle done/fail callbacks
    var dfd = $.Deferred();

    // if the request works, return normally
    jqXHR.done(dfd.resolve);

    // if the request fails, do something else
    // yet still resolve
    jqXHR.fail(function () {
        var args = Array.prototype.slice.call(arguments);
        console.log(jqXHR.status);
        if (jqXHR.status === 401) {
            $.ajax({
                url: '/api/authenticate/Token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                data: { ClientId: 'pGU6RJ8ELcVRZmN', ClientSecret: 'tiIfdZ3vh5IwGVm' },
                method: 'POST',
                refreshRequest: true,
                error: function () {
                    // reject with the original 401 data and then redirect to login page.
                    //setTimeout(function () {
                    //    window.location = "/Login";
                    //}, 4000);
                    dfd.rejectWith(jqXHR, args);
                },
                success: function (data, textStatus, request) {

                    console.log(data, 'Success=> Token:: ' + request.getResponseHeader('token'));
                    localStorage.setItem("token", request.getResponseHeader('token'));

                    $.ajaxSetup({
                        headers: { 'token': request.getResponseHeader('token') }
                    });
                    // retry with a copied originalOpts with new access token.
                    var newOpts = $.extend({}, originalOpts, { url: opts.url });

                    // pass this one on to our deferred pass or fail.
                    $.ajax(newOpts);
                }
            });

        } else {
            dfd.rejectWith(jqXHR, args);
        }
    })

    return dfd.promise(jqXHR);
});