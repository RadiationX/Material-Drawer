# Material-Drawer
## How to add
You must download **rx_drawer.css** and **rx_drawer.js** or **min** versions. Add this files to head
```html
<link rel="stylesheet" href="rx_drawer.css" type="text/css">
<script src="rx_drawer.js" type="text/javascript"></script>
```
Add elem .rx_drawer#rx_drawer in your place in html
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

###.getDrawerIcon()

###.onOpenListener(listener)

###.onCloseListener(listener)

###.onMoveListener(listener(x, percent, animation, duration))

###.openDrawer()

###.closeDrawer()

###.toggleDrawer()

###.isOpen()


