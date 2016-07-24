var drawer,
    drawerElem,
    iconElem;
window.addEventListener("load", function (e) {
    drawerElem = document.getElementById("drawer");
    iconElem = document.getElementById("rx_icon");
    drawer = new Drawer(drawerElem);
    drawer.setDrawerIcon(new DrawerIcon(iconElem));
});
