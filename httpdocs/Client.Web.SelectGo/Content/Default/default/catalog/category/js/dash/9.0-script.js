$('#wrapper-search').tubular({
    ratio: 16 / 9, // usually either 4/3 or 16/9 -- tweak as needed
    videoId: 'i_sc6w65pOs', 
    mute: true,
    repeat: true,
    width: $(window).width(), // no need to override
    wrapperZIndex: 99,
    playButtonClass: 'tubular-play',
    pauseButtonClass: 'tubular-pause',
    muteButtonClass: 'tubular-mute',
    volumeUpClass: 'tubular-volume-up',
    volumeDownClass: 'tubular-volume-down',
    increaseVolumeBy: 10, // increment value; volume range is 1-100
    start: 0, // starting position in seconds
});
setTimeout(function () {
    $("#tubular-container").css("opacity", "1");
    $(".tubular-pause").bind("click", function () {
        $(this).hide();
        $(".tubular-play").show();
    });
    $(".tubular-play").bind("click", function () {
        $(this).hide();
        $(".tubular-pause").show();
    });
}, 3000);

$(".tabrow li").on("click", function () {
    $(".tabrow li").removeClass("selected");
    $(this).toggleClass("selected", true);
})

$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {          var tabName = $(e.target).text(); //Get the name of the tab.           var tabID = $(this).attr("href").substr(1);           //$($(e.target).parent).find(".tab-pane").each(function () {          //    $(this).empty();          //});          if (tabID != 'all') {               $.ajax({                  url: '/' + AppConfigs.UniqueSeoCode + '/catalog/producttab?sortBy=topViewed&itemTake=4',                  type: 'GET',                  cache: false,                  data: { groupOf: tabID + "," }              }).done(function (result) {                  $("#" + tabID).html(result);                  e.target // activated tab                  e.relatedTarget // previous tab              });          }          else $("#" + tabID).html("U" + tabID);       });