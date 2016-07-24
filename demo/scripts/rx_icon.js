function DrawerIcon(icon) {
    "use strict";
    var ic,
        line1,
        line2,
        line3,
        const1 = 1 / 300,
        const2 = 1 / 500,
        const3 = 2 / 3,
        direction = true,
        locked = false,
        rotateLine,
        scaleX,
        transY,
        transX,
        scaleX2,
        transX2,
        rotateIc,
        transformProp = "transform",
        transitionProp = "transition",
        trZ = "translateZ(0)",
        propPrefixCss = "";

    function setProperty(elem, property, value) {
        elem.style[property] = value;
    }

    function enableAnimation(duration) {
        var transition = propPrefixCss + "transform " + duration + "s ease";
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
    
    this.state = function () {
        return direction;
    };
    
    this.setOnClick = function (listener) {
        icon.onclick = listener;
    };
    
    this.set = function (percent) {
        if (locked) {
            return;
        }
        if (percent > 100) {
            percent = 100;
        }
        if (percent < 0) {
            percent = 0;
        }
        if (percent >= 100) {
            direction = false;
        }
        if (percent <= 0) {
            direction = true;
        }

        rotateLine = 0.45 * percent;
        scaleX = 1 - const1 * percent;
        transY = 0.054 * percent;
        transX = 0.033 * percent;
        scaleX2 = 1 - const2 * percent;
        transX2 = -0.01 * percent;
        if (direction) {
            rotateIc = 1.80 * percent;
        } else {
            rotateIc = 360 - (1.80 * percent);
        }
        setProperty(line1, transformProp, "rotate(" + rotateLine + "deg) scaleX(" + scaleX + ") translateY(" + transY + "px) translateX(" + transX + "px) " + trZ);
        setProperty(line2, transformProp, "scaleX(" + scaleX2 + ") translateX(" + transX2 + "px) " + trZ);
        setProperty(line3, transformProp, "rotate(" + (-rotateLine) + "deg) scaleX(" + scaleX + ") translateY(" + (-transY) + "px) translateX(" + transX + "px) " + trZ);
        setProperty(ic, transformProp, "rotate(" + rotateIc + "deg) " + trZ);
    };
    
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
            if (state === 0) {
                temp.set(0);
            }
        }, Number(duration) * 1000);
    };

    this.lock = function () {
        locked = true;
    };
    this.unLock = function () {
        locked = false;
    };

    (function () {
        icon.innerHTML += '<span class="ic"><i class="line one"></i><i class="line two"></i><i class="line thr"></i></span>';
        ic = icon.querySelector(".ic");
        line1 = ic.querySelector(".one");
        line2 = ic.querySelector(".two");
        line3 = ic.querySelector(".thr");
        //Find prop name
        var testEl = document.createElement('div'),
            vendors;
        if (testEl.style.transform === undefined) {
            vendors = ['Webkit', 'Moz', 'ms', 'O'];
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
        if (/.*opera.*presto/i.test(navigator.userAgent)) {
            trZ = "";
        }
    })();
}