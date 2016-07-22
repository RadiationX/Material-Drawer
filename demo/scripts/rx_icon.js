function DrawerIcon(icon) {
    var ic;
    var line1;
    var line2;
    var line3;
    var const1 = 1 / 300;
    var const2 = 1 / 500;
    var const3 = 2 / 3;
    var direction = true;
    var locked = false;
    var rotateLine, scaleX, transY, transX, scaleX2, transX2, rotateIc;
    this.state = function () {
        return direction;
    }
    this.setOnClick = function (listener) {
        icon.onclick = listener;
    }
    this.set = function (percent) {
        if (locked) return;
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        if (percent >= 100) direction = false;
        if (percent <= 0) direction = true;
        rotateLine = 0.45 * percent;
        scaleX = 1 - const1 * percent;
        transY = 0.054 * percent;
        transX = 0.033 * percent;
        scaleX2 = 1 - const2 * percent;
        transX2 = -0.01 * percent;
        if (direction) rotateIc = 1.80 * percent;
        else rotateIc = 360 - (1.80 * percent);
        setProperty(line1, transformProp, "rotate(" + rotateLine + "deg) scaleX(" + scaleX + ") translateY(" + transY + "px) translateX(" + transX + "px)");
        setProperty(line2, transformProp, "scaleX(" + scaleX2 + ") translateX(" + transX2 + "px)");
        setProperty(line3, transformProp, "rotate(" + (-rotateLine) + "deg) scaleX(" + scaleX + ") translateY(" + (-transY) + "px) translateX(" + transX + "px)");
        setProperty(ic, transformProp, "rotate(" + rotateIc + "deg)");
    }
    this.setState = function (state, duration) {
        duration = duration || 0.225;
        enableAnimation(duration);
        var temp = this;
        switch (state) {
        case 0:
            this.set(1);
            break;
        case 1:
            this.set(100);
            break;
        }
        setTimeout(function () {
            disableAnimation();
            if (state == 0) temp.set(0);
        }, Number(duration) * 1000);
    }

    function enableAnimation(duration) {
        var transition = "all " + duration + "s ease";
        setProperty(line1, transitionProp, transition);
        setProperty(line2, transitionProp, transition);
        setProperty(line3, transitionProp, transition);
        setProperty(ic, transitionProp, transition);
    }

    function disableAnimation() {
        setProperty(line1, transitionProp, "none");
        setProperty(line2, transitionProp, "none");
        setProperty(line3, transitionProp, "none");
        setProperty(ic, transitionProp, "none");
    }
    this.lock = function () {
        locked = true;
    }
    this.unLock = function () {
        locked = false;
    }

    function setProperty(elem, property, value) {
        elem.style[property] = value;
    }
    var transformProp = "transform"
        , transitionProp = "transition";
    (function () {
        icon.innerHTML += '<span class="ic"><i class="line one"></i><i class="line two"></i><i class="line thr"></i></span>';
        ic = icon.querySelector(".ic");
        line1 = ic.querySelector(".one");
        line2 = ic.querySelector(".two");
        line3 = ic.querySelector(".thr");
        //Find prop name
        var testEl = document.createElement('div');
        if (testEl.style.transform == null) {
            var vendors = ['Webkit', 'Moz', 'ms'];
            for (var vendor in vendors) {
                if (testEl.style[vendors[vendor] + 'Transform'] !== undefined) {
                    transformProp = vendors[vendor] + 'Transform';
                }
                if (testEl.style[vendors[vendor] + 'Transition'] !== undefined) {
                    transitionProp = vendors[vendor] + 'Transition';
                }
            }
        }
    })();
}