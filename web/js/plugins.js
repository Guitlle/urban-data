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