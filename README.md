#Smooth Surfer

Put simply "Smooth Surfer" is a lightweight custom cursor javascript library. I wanted a "vanilla" approach to creating a custom cursor since I don't use any javascript frameworks, such as react or nextJS.
Although this library is mostly vanilla javascript you will have to include [ShoelaceJS](https://shoelace.style) in order for the cursor to display icons properly.

##Include [ShoelaceJS](https://shoelace.style)
Include ShoelaceJS in the head tag.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/themes/light.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/shoelace-autoloader.js"></script>
```

##Initialization
Getting started is easy, first we need to check whether or not the user is on a mobile device. If not then we can go ahead create the custom cursor.
```javascript
//Check if the user is on a mobile device or not
if (!smoothSurfer.isMobileView()) {
  //Create cursor
  cursor = smoothSurfer.instantiate();
}
```
*Woohoo! You should have a brand new cursor at this point!*

##Initial Customization
As of right now you can customize to of the cursors default properties; the initial size, and color.
```javascript
smoothSurfer.instantiate({
  size: 20, //Default value is "5px" (this changes the cursors padding)
  color: smoothSurfer.colors.purple //See color options below (default value is #000/black)
});
```

##Smooth Surfer (Colors)
I set some color options which I really like/use a lot, you're by no means obligated to use them, but are they're there if you need/want them.
*Note: I may add some more color options later down the line.*
```javascript
//Color options
smoothSurfer.colors.green; //#32a852
smoothSurfer.colors.purple; //#b727e3
smoothSurfer.colors.blue; //#1451ED
smoothSurfer.colors.red; //#ed1826
smoothSurfer.colors.orange; //#f07229
smoothSurfer.colors.yellow; //#f0c829
smoothSurfer.colors.pink; //#f55fe3
smoothSurfer.colors.brown; //#7d3f1b
smoothSurfer.colors.black; //#000
smoothSurfer.colors.white; //#fff
```
##Indicators
Indicators or indications are used to describe what happens when the cursor interacts/hovers over a particular element or elements. (Think of it as a tool tip that follows the cursor)
*By default there are no hover/click events ( the cursor won't change/interact with elements)*

If you wish for the cursor to change/interact with elements simply add "pointer-indicator" to any html elements in your webpage.
*This will create a new indication that will make the cursor grow in size, and display a pointer icon using [ShoelaceJS](https://shoelace.style/) as if to let you know you can click the element you're hovering.*
```html
<div class='my-element' pointer-indicator>Hover over me!</div>
```

You can also create your own custom indications ("tool tips"). In the example below any elements hovered over with a class of "my-link" will grow in size but this time the icon will change to a slanted arrow.
```javascript
if (!smoothSurfer.isMobileView()) {
  cursor = smoothSurfer.instantiate();

  //You must pass the cursor instance as the first argument
  smoothSurfer.indication(cursor, {
    interactibles: ".my-link", //Elements you want to be effected!
    icon: smoothSurfer.icons.link, //Default value is smoothSurfer.icons.default which is a pointer icon
  });
}
```

**IMPORTANT NOTE:** *You can also specify html tags, and custom attributes as the interactibles.*
```javascript
//Interacts with html links
smoothSurfer.indication(cursor, {
  interactibles: "a", //Elements you want to be effected!
  icon: smoothSurfer.icons.link, //Default value is smoothSurfer.icons.default which is a pointer icon
});

//Interacts with html links
smoothSurfer.indication(cursor, {
  interactibles: "[custom-attribute]", //Elements you want to be effected!
  icon: smoothSurfer.icons.link, //Default value is smoothSurfer.icons.default which is a pointer icon
});
```

##Indicator Icons
I also set some icon options, but only a few as the rest can be found on the [ShoelaceJS](https://shoelace.style/components/icon) icon section of their website.
```javascript
smoothSurfer.icons.default //Pointer icon
smoothSurfer.icons.link //Slanted arrow icon
smoothSurfer.icons.close //X / close icon

//Social Media Icons
smoothSurfer.icons.socials.twitter //Twitter
smoothSurfer.icons.socials.x //X (a.k.a) Twitter 
smoothSurfer.icons.socials.instagram //Instagram
smoothSurfer.icons.socials.threads //Threads by META
smoothSurfer.icons.socials.discord //Discord
smoothSurfer.icons.socials.youtube //Youtube
smoothSurfer.icons.socials.spotify //spotify
smoothSurfer.icons.socials.apple //Apple logo
smoothSurfer.icons.socials.twitch //Twitch
smoothSurfer.icons.socials.facebook //Facebook
smoothSurfer.icons.socials.messenger //Wessenger by META for Facebook
smoothSurfer.icons.socials.whatsapp //Whatsapp
smoothSurfer.icons.socials.meta //META
smoothSurfer.icons.socials.linkedin //Linked In
```


##Indicators Customization
Some other features of the indications you can customize include

1. Color (**Default value: ** #000/black)
2. Size (**Default value: ** 10px)
3. IconColor (**Default value: ** #fff/white)
4. IconSize (**Default value: ** 20px)

The example below creates a spotify icon, and is displayed when you hover over any elements with a custom attribute of "spotify"
```javascript
if (!smoothSurfer.isMobileView()) {
  cursor = smoothSurfer.instantiate();

  //You must pass the cursor instance as the first argument
  smoothSurfer.indication(cursor, {
    interactibles: "[spotify]", //Elements you want to be effected!
    icon: smoothSurfer.icons.socials.spotify, //Changes icon to spotify logo
    size: 15, //Changes cursor indication padding
    color: smoothSurfer.colors.green, //Sets background color to soft green
    iconColor: smoothSurfer.colors.white, //Sets icon color to white
    iconSize: 15 //Changes icon size
  });
}
```

##Event handlers
Indications can check whether or not they entered/hovered over an interactible/s
```javascript
smoothSurfer.indication(cursor, {
  interactibles: ".my-interactible",
  enter: () => {
    console.log("Hovered over '.my-interactible'");
  }
});
```

You may also check whether or the indication has left the interactible (not over the element.)
```javascript
smoothSurfer.indication(cursor, {
  interactibles: ".my-interactible",
  enter: () => {
    console.log("Hovered over '.my-interactible'");
  },
  leave: () => {
    console.log("You're are no longer over '.my-interactible'");
  }
});
```

Finally you can check if an indication is clicking an interactible
```javascript
smoothSurfer.indication(cursor, {
  interactibles: ".my-interactible",
  enter: () => {
    console.log("Hovered over '.my-interactible'");
  },
  leave: () => {
    console.log("You're are no longer over '.my-interactible'");
  },
  click: () => {
    console.log("You clicked on '.my-interactible'");  
  }
});
```

##Green Sock Animation platform (GSAP)
Smooth surfer can also work in conjunction with GSAP.

CSS
```css
html,body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.square {
  background: #000;
  width: 70px;
  height: 70px;
  border-radius: 10px;
}
```
HTML
```html
<div class='.square'></div>
```

Javascript
```javascript
if (!smoothSurfer.isMobileView()) {
  cursor = smoothSurfer.instantiate();

  smoothSurfer.indication(cursor, {
    interactibles: ".square",
    enter: () => {
      //GSAP
      gsap.to('.square', {
        rotation: 360
      });
    }
  });
}
```

##Lenis Smooth Scrolling Support
**IMPORTANT NOTE:** As of right now "Smooth Surfer" does not include support for [Lenis](https://lenis.darkroom.engineering) smooth scrolling, but will in the very near future!

#Contributing, Support.
Pull request are more than welcome. For major changes please open an issue first to discuss what you would like changed. I absolutely loved working on this and want to continue making this the library I know it can be.
If you would like to support me on this project and/or future projects please share this with others, you can also feed my caffiene addiction here [Buy Me a Coffee](https://square.link/u/HhOgAwj3).


