var drawer;
window.addEventListener("load", function (e) {
    drawer = new Drawer(document.getElementById("drawer"), document.getElementById("drawer_bg"));
    drawer.setDrawerIcon(new DrawerIcon(document.getElementById("rx_icon")));
});