jQuery.fn.extend({
    timeago: function () {
        var self = this;
        return this.each(function () {
            var dt = $(this).attr("datetime");
            if (dt == undefined) dt = $(this).attr("title");
            var format = $(this).attr("data-format");
            $(this).text(self.timeExec(dt, format)).css("display", "inline-block");
        });
    },
    timeExec: function (dateStr, format) {

        return HvHelpers.getAgoDate(dateStr, format);
    }
});