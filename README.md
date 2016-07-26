# Material-Drawer
##What is it
This library contains [Material Design Navigation Drawer](https://material.google.com/patterns/navigation-drawer.html) component that could be easily put in your site.
## How to add
You must download **rx_drawer.css** and **rx_drawer.js** or **min** versions. Add this files to head
```html
<link rel="stylesheet" href="rx_drawer.css" type="text/css">
<script src="rx_drawer.js" type="text/javascript"></script>
```
Add element .rx_drawer#rx_drawer in your place in html
```html
<div class="rx_drawer" id="rx_drawer"></div>
```
Init drawer in onload function
```javascript
var drawer,
    drawerElem;
window.addEventListener("load", function (e) {
    drawerElem = document.getElementById("drawer");
    drawer = new Drawer(drawerElem);
});
```
##How to use methods
###.setDrawerIcon(drawerIcon)
Set drawer icon [Material-Hamburger-Arrow](https://github.com/RadiationX/Material-Hamburger-Arrow)
```javascript
var iconElem = document.getElementById("rx_icon");
var icon = new DrawerIcon(iconElem);
drawer.setDrawerIcon(icon);
```
###.getDrawerIcon()
Return setted drawer icon
```javascript
drawer.getDrawerIcon();
```
###.resetIconOnClick()
Reset icon onclick listener to default (toggle drawer)
```javascript
drawer.resetIconOnClick();
```
###.onOpenListener(listener)
Listener call after drawer open
```javascript
drawer.onOpenListener(function () {
    console.log("open");
});
```
###.onCloseListener(listener)
Listener called after drawer close
```javascript
drawer.onCloseListener(function () {
    console.log("close");
});
```
###.onMoveListener(listener)
Listener called when drawer moved

**x** - moved pixels, from 0 to width drawer

**percent** - from 0 to 1

**animation** - false if drawer manually move, true if drawer thrown

**duration** - 0 if drawer manually move, duration in seconds if drawer thrown
```javascript
drawer.onMoveListener(function (x, percent, animation, duration) {
    console.log(x + " " + percent + " " + animation + " " + duration);
    //169 0.528125 false 0 - manually move
    //220 0.6875 false 0 - manually move
    //320 1 true 0.196 - drawer thrown
    //etc...
});
```
###.openDrawer()
```javascript
drawer.openDrawer();
```
###.closeDrawer()
```javascript
drawer.closeDrawer();
```
###.toggleDrawer()
```javascript
drawer.toggleDrawer();
```
###.isOpen()
Return true if drawer open
```javascript
drawer.isOpen();
```
##Details
1. If desktop client, when drawer move, to body add class .rx_noselect. This made for text in page not select on move drawer
2. When drawer init
  - Created element .drawer_bg#drawer_bg before drawer element, to darken the background page
  - Created element .antiSelect in drawer element, for not select on move drawer
