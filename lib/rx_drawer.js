function Drawer(drawerElem, drawerBg) {
    var drawerIcon = new emptyIcon();

    function emptyIcon() {
        this.set = function (a) {}
        this.setState = function (a, b) {}
    }
    this.getDrawerIcon = function () {
        return drawerIcon;
    }
    this.setDrawerIcon = function (icon) {
        drawerIcon = icon;
        drawerIcon.setOnClick(function (e) {
            toggleDrawer();
        });
    }
    var drawerStarted = false;
    var width = drawerElem.offsetWidth;
    var correct;
    var percent = 0;
    var trx = 0;
    var opened = false;
    var startMove = 0
        , startX = 0
        , speedSwipe = 0;
    var isMobile, typeStart, typeMove, typeEnd;
    var trZ = "translateZ(0)";
    var wrapper;
    isMobile = checkMobile();
    if (isMobile) {
        typeStart = "touchstart";
        typeMove = "touchmove";
        typeEnd = "touchend";
    }
    else {
        typeStart = "mousedown";
        typeMove = "mousemove";
        typeEnd = "mouseup";
    }
    this.setWrapper = function (elem) {
        wrapper = elem;
    }
    window.addEventListener("resize", function (e) {
        width = drawerElem.offsetWidth;
        if (!opened) transfrom("translateX(-" + width + "px)");
    });
    drawerElem.addEventListener(typeStart, function (e) {
        drawerElem.style.opacity = 1;
        startX = isMobile ? e.touches[0].clientX : e.clientX;
        startMove = new Date();
        correct = width + startX;
        if (wrapper != undefined) {
            wrapper.style.pointerEvents = "none";
            wrapper.classList.add("noselect");
        }
        drawerStarted = true;
    });
    document.addEventListener(typeStart, function (e) {
        if (!drawerStarted) return;
        if (opened) {
            document.addEventListener(typeMove, isMobile ? movedOpen : desktopMovedOpen);
        }
        else {
            document.addEventListener(typeMove, isMobile ? movedNoOpen : desktopMovedNoOpen);
        }
    });

    function movedNoOpen(e) {
        trx = correct - e.touches[0].clientX;
        translate(trx);
    }

    function movedOpen(e) {
        trx = startX - e.touches[0].clientX;
        translate(trx);
    }

    function desktopMovedNoOpen(e) {
        trx = correct - e.clientX;
        translate(trx);
    }

    function desktopMovedOpen(e) {
        trx = startX - e.clientX;
        translate(trx);
    }

    function translate(trx) {
        transfrom("translateX(-" + trx + "px)");
        percent = (1 - (trx / width));
        if (percent >= 1) percent = 1;
        else if (percent <= 0) percent = 0;
        drawerIcon.set(percent * 100);
        drawerBg.style.opacity = percent;
    }

    function setProperty(elem, property, value) {
        elem.style[property] = value;
    }

    function transfrom(x) {
        setProperty(drawerElem, transformProp, x + " " + trZ);
    }

    function setTransition(s) {
        setProperty(drawerElem, transitionProp, propPrefixCss + "transform " + s + "s ease-out");
        setProperty(drawerBg, transitionProp, "opacity " + s + "s ease-out");
    }

    function clearTransition() {
        setProperty(drawerElem, transitionProp, "none");
        setProperty(drawerBg, transitionProp, "none");
    }

    function openDrawer(s) {
        opened = true;
        setTransition(s);
        drawerElem.style.opacity = 1;
        drawerBg.style.opacity = 1;
        drawerBg.style.pointerEvents = "auto";
        transfrom("translateX(0)");
        drawerIcon.setState(1, s);
        setTimeout(function () {
            clearTransition();
        }, s * 1000);
    }

    function closeDrawer(s) {
        opened = false;
        setTransition(s);
        drawerBg.style.opacity = 0.001;
        drawerBg.style.pointerEvents = "none";
        transfrom("translateX(-" + width + "px)");
        drawerIcon.setState(0, s);
        setTimeout(function () {
            clearTransition();
            drawerElem.style.opacity = 0.001;
            drawerBg.style.opacity = 0.001;
        }, s * 1000);
    }

    function toggleDrawer() {
        if (opened) closeDrawer(0.25);
        else openDrawer(0.25);
    }
    document.addEventListener(typeEnd, function (e) {
        if (wrapper != undefined) {
            wrapper.style.pointerEvents = "auto";
            wrapper.classList.remove("noselect");
        }
        document.removeEventListener(typeMove, isMobile ? movedOpen : desktopMovedOpen);
        document.removeEventListener(typeMove, isMobile ? movedNoOpen : desktopMovedNoOpen);
        if (trx == 0) return;
        speedSwipe = (((width / 2) / ((Math.abs((isMobile ? e.changedTouches[0].clientX : e.clientX) - startX)) / (new Date() - startMove))) / 1000).toFixed(3);
        if (speedSwipe <= 0.150) {
            speedSwipe = 0.150;
        }
        else if (speedSwipe >= 0.5) {
            speedSwipe = 0.5;
        }
        var intent = (startX - (isMobile ? e.changedTouches[0].clientX : e.clientX)) > 0;
        if ((width / 2.25) > trx)
            if (intent && speedSwipe < 0.4) closeDrawer(speedSwipe);
            else openDrawer(speedSwipe);
        else
        if (!intent && speedSwipe < 0.4) openDrawer(speedSwipe);
        else closeDrawer(speedSwipe);
        trx = 0;
        drawerStarted = false;
    });
    drawerBg.onclick = function () {
        if (opened) closeDrawer(0.225);
    }

    function checkMobile() {
        var check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
    var transformProp = "transform"
        , transitionProp = "transition"
        , propPrefixCss = "";
    (function () {
        //Find prop name
        var testEl = document.createElement('div');
        if (testEl.style.transform == null) {
            var vendors = ['Webkit', 'Moz', 'ms', 'O'];
            for (var vendor in vendors) {
                if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
                    transformProp = vendors[vendor] + 'Transform';
                    propPrefixCss = "-" + vendors[vendor].toLowerCase() + "-";
                }
                if (testEl.style[vendors[vendor] + 'Transition'] !== undefined) {
                    transitionProp = vendors[vendor] + 'Transition';
                }
            }
        }
        if (/.*opera.*presto/i.test(navigator.userAgent)) trZ = "";
    })();
}