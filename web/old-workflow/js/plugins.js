// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

// Custom checkbox that uses glyphicons.
// The html would look like this:
// <div class="icon-checkbox btn-group" data-checked="True" data-overlay_map="Temperature">
//   <button type="button" class="btn btn-default"><i class="glyphicon glyphicon-check"></i></button>
//   <button type="button" class="btn btn-default disabled slider-label">Temperature</button>
// </div>
// The check listener would like : 
// $("#mycheckbox").click(function () {
//      if ($(this).data("checked")) {
//          do something;
//      else {
//          do something;
//      }
// });

$(function () {
    $(".icon-checkbox").click(function () {
        if ($(this).data("checked")) {
            $(this).data("checked",false);
            $(this).find("i.glyphicon").removeClass("glyphicon-check").addClass("glyphicon-unchecked");
        } else {
            $(this).data("checked",true);
            $(this).find("i.glyphicon").removeClass("glyphicon-unchecked").addClass("glyphicon-check"); 
        }
    });
});

$('body').on('click', function (e) {
    $('[data-toggle="popover"]').each(function () {
        //the 'is' for buttons that trigger popups
        //the 'has' for icons within a button that triggers a popup
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});