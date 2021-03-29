var rating = $('.rating-histogram');
var totalVotes = 0;
var secondaryVotes = 0;
var totalVotesInc = 0;
var averageScore = 0;
var array = [];
var highest = 0;

$('.rating-bar-container').each(function () {
    var val = $(this).attr('valuenow');
    $(this).attr('valuemax', Number($(this).children('.bar-label').html()) * Number(val));
    totalVotes += Number(val);
    array.push(Number(val));
    highest = Math.max.apply(Math, array);
    totalVotesInc += Number($(this).children('.bar-label').html()) * Number(val)
    if (val == highest) {
        $(this).children('.bar').width('100%').addClass("val-" + val);
    } else {
        secondaryVotes += Number(val);
    }
    $(this).children('.bar-number').html(Number(val).toLocaleString('vi'));
});

averageScore = totalVotes == 0 ? 0 : (totalVotesInc / totalVotes).toFixed(1).toString().replace(".", ",");
rating.attr({
    'valuemax': totalVotes,
    'secvaluemax': secondaryVotes
});
$('.rating-bar-container').each(function () {
    var val = $(this).attr('valuenow');
    if (val == highest) {
        $(this).children('.bar').width('100%').addClass("val-" + val);
    } else {
        $(this).children('.bar').width(val * 200 / rating.attr('valuemax') + '%');
    }
});

$('.reviews-num').html(' ' + Number(rating.attr('valuemax')).toLocaleString('vi'));
$('.score-container .score').html(averageScore);