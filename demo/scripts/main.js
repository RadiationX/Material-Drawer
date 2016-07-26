var drawer,
    drawerElem,
    iconElem;
window.addEventListener("load", function (e) {
    drawerElem = document.getElementById("drawer");
    iconElem = document.getElementById("rx_icon");
    drawer = new Drawer(drawerElem);
    drawer.setDrawerIcon(new DrawerIcon(iconElem));
    
    //Use methods
    /*drawer.onOpenListener(function () {
        console.log("open");
    });
    drawer.onCloseListener(function () {
        console.log("close");
    });
    drawer.onMoveListener(function (x, percent, animation, duration) {
        console.log(x + " " + percent + " " + animation + " " + duration);
    });
    drawer.openDrawer();
    drawer.closeDrawer();
    drawer.toggleDrawer();
    drawer.isOpen();
    drawer.resetIconOnClick();*/
});
