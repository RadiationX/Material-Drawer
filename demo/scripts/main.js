var drawer,
    drawerElem,
    iconElem;
window.addEventListener("load", function (e) {
    drawerElem = document.getElementById("drawer");
    iconElem = document.getElementById("rx_icon");
    drawer = new Drawer(drawerElem);
    drawer.setDrawerIcon(new DrawerIcon(iconElem));
    drawer.onOpenListener(function () {
        console.log("open");
    });
    drawer.onCloseListener(function () {
        console.log("close");
    });
    drawer.onMoveListener(function (x, percent, animation, duration) {
        console.log(x + " " + percent + " " + animation, duration);
    });
    setTimeout(function () {
        drawer.openDrawer();
    }, 1000);
    setTimeout(function () {
        drawer.closeDrawer();
    }, 2000);
    setTimeout(function () {
        drawer.toggleDrawer();
    }, 3000);
});
