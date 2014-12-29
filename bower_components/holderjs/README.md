Holder
======

![](http://imsky.github.io/holder/images/header.png)

Holder renders image placeholders on the client side using SVG.

Used by [Bootstrap](http://getbootstrap.com), thousands of [open source projects](https://github.com/search?q=holder.js+in%3Apath&type=Code&ref=searchresults), and [many other sites](https://search.nerdydata.com/search/#!/searchTerm=holder.js/searchPage=1/sort=pop).

Installing
----------

* [Bower](http://bower.io/): `bower install holderjs`
* [cdnjs](http://cdnjs.com/): <http://cdnjs.com/libraries/holder>
* [jsDelivr](http://www.jsdelivr.com): <http://www.jsdelivr.com/#!holder>
* [Rails Assets](https://rails-assets.org): `gem 'rails-assets-holderjs'`
* [Meteor](http://atmospherejs.com/): `mrt add holder`
* [Composer](https://packagist.org/): `php composer.phar update imsky/holder`
* [NuGet](http://www.nuget.org/): `Install-Package Holder.js`

Usage
-----

Include ``holder.js`` in your HTML:

```html
<script src="holder.js"></script>
```

Holder will then process all images with a specific ``src`` attribute, like this one:

```html
<img src="holder.js/200x300">
```

The above tag will render as a placeholder 200 pixels wide and 300 pixels tall.

To avoid console 404 errors, you can use ``data-src`` instead of ``src``.

Themes
------

![](http://imsky.github.io/holder/images/holder_sky.png)![](http://imsky.github.io/holder/images/holder_vine.png)![](http://imsky.github.io/holder/images/holder_lava.png)

Holder includes support for themes, to help placeholders blend in with your layout.

There are 6 default themes: ``sky``, ``vine``, ``lava``, ``gray``, ``industrial``, and ``social``. Use them like so:

```html
<img src="holder.js/200x300/sky">
```

Custom colors
-------------

Custom colors on a specific image can be specified in the ``background:foreground`` format using hex notation, like this:

```html
<img data-src="holder.js/100x200/#000:#fff">
```

The above will render a placeholder with a black background and white text.

Custom text
-----------

You can specify custom text using the ``text:`` operator:

```html
<img data-src="holder.js/200x200/text:hello world">
```

If you have a group of placeholders where you'd like to use particular text, you can do so by adding a ``text`` property to the theme:

```js
Holder.addTheme("thumbnail", { background: "#fff", text: "Thumbnail" });
```

Holder automatically adds line breaks to text that goes outside of the image boundaries. If the text is so long it goes out of both horizontal and vertical boundaries, the text is moved to the top. If you prefer to control the line breaks, you can add `\n` to the `text` property:

```html
<img data-src="holder.js/300x200/text:Add \n line breaks \n anywhere.">
```

Custom fonts, web fonts and icon fonts
--------------------------------------

You can set a placeholder's font either through a theme or through the `font` flag:

```html
<img data-src="holder.js/300x200/font:Helvetica">
```

Placeholders using a custom font are rendered using canvas by default, due to SVG's constraints on cross-domain resource linking. If you're using only locally available fonts, you can disable this behavior by setting `noFontFallback` to `true` in `Holder.run` options. However, if you need to render a SVG placeholder using an externally loaded font, you have to use the `object` tag instead of the `img` tag and add a `holderjs` class to the appropriate `link` tags. Here's an example:

```html
<head>
<link href="http://.../font-awesome.css" rel="stylesheet" class="holderjs">
</head>
<body>
<object data="holder.js/300x200/font:FontAwesome"></object>
```

**Important:** When testing locally, font URLs must have a `http` or `https` protocol defined.

`<object>` placeholders work like `<img>` placeholders, with the added benefit of their DOM being able to be inspected and modified.


Customizing themes
------------------

Themes have 5 properties: ``foreground``, ``background``, ``size``, ``font`` and ``fontweight``. The ``size`` property specifies the minimum font size for the theme. The ``fontweight`` default value is ``bold``. You can create a sample theme like this:

```js
Holder.addTheme("dark", {
  background: "#000",
  foreground: "#aaa",
  size: 11,
  font: "Monaco",
  fontweight: "normal"
});
```

Using custom themes
-------------------

There are two ways to use custom themes with Holder:

* Include theme at runtime to render placeholders already using the theme name
* Include theme at any point and re-render placeholders that are using the theme name

The first approach is the easiest. After you include ``holder.js``, add a ``script`` tag that adds the theme you want:

```html
<script src="holder.js"></script>
<script>
Holder.addTheme("bright", {
  background: "white", foreground: "gray", size: 12
});
</script>
```

The second approach requires that you call ``run`` after you add the theme, like this:

```js
Holder.addTheme("bright", {background: "white", foreground: "gray", size: 12}).run();
```

Using custom themes and domain on specific images
-------------------------------------------------

You can use Holder in different areas on different images with custom themes:

```html
<img data-src="example.com/100x100/simple" id="new">
```

```js
Holder.run({
  domain: "example.com",
  themes: {
    "simple": {
      background: "#fff",
      foreground: "#000",
      size: 12
    }
  },
  images: "#new"
});
```

Random themes
-------------

You can render a placeholder with a random theme using the `random` flag:
```html
<img data-src="holder.js/300x200/random">
```

Fluid placeholders
------------------

Specifying a dimension in percentages creates a fluid placeholder that responds to media queries.

```html
<img data-src="holder.js/100%x75/social">
```

By default, the fluid placeholder will show its current size in pixels. To display the original dimensions, i.e. 100%x75, set the ``textmode`` flag to ``literal`` like so: `holder.js/100%x75/textmode:literal`.

Fluid placeholders need to be visible in order to work. In cases when a placeholder is not visible, the `Holder.invisibleErrorFn` function is called, which takes the callee function as an argument and returns a function that takes the placeholder element as an argument. This function by default throws an exception, however its behavior can and should be overridden by the user.

Automatically sized placeholders
--------------------------------

If you'd like to avoid Holder enforcing an image size, use the ``auto`` flag like so:

```html
<img data-src="holder.js/200x200/auto">
```

The above will render a placeholder without any embedded CSS for height or width.

To show the current size of an automatically sized placeholder, set the ``textmode`` flag to ``exact`` like so: `holder.js/200x200/auto/textmode:exact`.

Background placeholders
-----------------------

Holder can render placeholders as background images for elements with the `holderjs` class, like this:

```css
#sample {background:url(?holder.js/200x200/social) no-repeat}
```

```html
<div id="sample" class="holderjs"></div>
```

The Holder URL in CSS should have a `?` in front. Like in image placeholders, you can specify the Holder URL in a `data-background-src` attribute:

```html
<div data-background-src="?holder.js/300x200"></div>
```

**Important:** Make sure to define a height and/or width for elements with background placeholders. Fluid background placeholders are not yet supported.

**Important:** Some browsers can't parse URLs like `?holder.js/300x200/#fff:#000` due to the `#` characters. You can use `^` in place of `#` like this: `?holder.js/300x200/^fff:^000`.

Custom settings
---------------

Holder extends its default settings with the settings you provide, so you only have to include those settings you want changed. For example, you can run Holder on a specific domain like this:

```js
Holder.run({domain:"example.com"});
```

Using custom settings on load
-----------------------------

You can prevent Holder from running its default configuration by executing ``Holder.run`` with your custom settings right after including ``holder.js``. However, you'll have to execute ``Holder.run`` again to render any placeholders that use the default configuration.

Inserting an image with optional custom theme
---------------------------------------------

You can add a placeholder programmatically by chaining Holder calls:

```js
Holder.addTheme("new", {
  foreground: "#ccc",
  background: "#000",
  size: 10
}).addImage("holder.js/200x100/new", "body").run();
```

The first argument in ``addImage`` is the ``src`` attribute, and the second is a CSS selector of the parent element.

Using different renderers
-------------------------

Holder has three renderers: canvas, SVG, and HTML. The SVG renderer is used by default, however you can set the renderer using the `renderer` option, with either `svg`, `canvas`, or `html` values.

```js
Holder.run({renderer: 'canvas'});
```

Using with [lazyload.js](https://github.com/tuupola/jquery_lazyload)
------------------------

Holder is compatible with ``lazyload.js`` and works with both fluid and fixed-width images. For best results, run `.lazyload({skip_invisible:false})`.

Using with Angular.js
---------------------

You can use Holder in Angular projects with the following JS and HTML code (by [Nick Clark](https://github.com/NickClark)):

```js
angular.module('MyModule').directive('myHolder', function() {
  return {
    link: function(scope, element, attrs) {
      attrs.$set('data-src', attrs.myHolder);
      Holder.run({images:element[0]});
    }
  };
});
```

```html
<img my-holder="holder.js/200x300">
```

Browser support
---------------

* Chrome
* Firefox 3+
* Safari 4+
* Internet Explorer 9+ (with partial support for 6-8)
* Opera 15+ (with partial support for 12)
* Android (with fallback)

License
-------

Holder is provided under the [MIT License](http://opensource.org/licenses/MIT).

Credits
-------

Holder is a project by [Ivan Malopinsky](http://imsky.co).
