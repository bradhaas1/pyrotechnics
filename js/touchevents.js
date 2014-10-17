/**
 * Created by bradhaas on 10/17/2014.
 */

var copyTouch = new Array();
var ongoingTouches = new Array();
var log;

function startup() {
    var el = document.getElementsByTagName("canvas")[0];
    el.addEventListener("touchstart", handleStart, false);
//    el.addEventListener("touchend", handleEnd, false);
//    el.addEventListener("touchcancel", handleCancel, false);
//    el.addEventListener("touchleave", handleEnd, false);
//    el.addEventListener("touchmove", handleMove, false);
    log("initialized.");
}

function handleStart(evt) {
    evt.preventDefault();
    log("touchstart.");
    var el = document.getElementsByTagName("canvas")[0];
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;

    for (var i=0; i < touches.length; i++) {
        log("touchstart:"+i+"...");
        ongoingTouches.push(copyTouch(touches[i]));
        var color = colorForTouch(touches[i]);
        ctx.beginPath();
        ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0,2*Math.PI, false);  // a circle at the start
        ctx.fillStyle = color;
        ctx.fill();
        log("touchstart:"+i+".");
    }
}

function copyTouch(touch) {
    return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
}

function onTouch(evt) {
    evt.preventDefault();
    if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
        return;

    var newEvt = document.createEvent("MouseEvents");
    var type = null;
    var touch = null;
    switch (evt.type) {
        case "touchstart":    type = "mousedown";    touch = evt.changedTouches[0];break;
        case "touchmove":        type = "mousemove";    touch = evt.changedTouches[0];break;
        case "touchend":        type = "mouseup";    touch = evt.changedTouches[0];break;
    }
    newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
        touch.screenX, touch.screenY, touch.clientX, touch.clientY,
        evt.ctrlKey, evt.altKey, evt.shirtKey, evt.metaKey, 0, null);
    evt.originalTarget.dispatchEvent(newEvt);
}

function colorForTouch(touch) {
    var r = touch.identifier % 16;
    var g = Math.floor(touch.identifier / 3) % 16;
    var b = Math.floor(touch.identifier / 7) % 16;
    r = r.toString(16); // make it a hex digit
    g = g.toString(16); // make it a hex digit
    b = b.toString(16); // make it a hex digit
    var color = "#" + r + g + b;
    log("color for touch with identifier " + touch.identifier + " = " + color);
    return color;
}

function ongoingTouchIndexById(idToFind) {
    for (var i=0; i < ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;

        if (id == idToFind) {
            return i;
        }
    }
    return -1;    // not found
}

function log(msg) {
    var p = document.getElementById('log');
    p.innerHTML = msg + "\n" + p.innerHTML;
}
