---
templateKey: blog-post
title: Using CSS custom properties to apply themes in JavaScript or React
date: 2019-04-01T07:40:12.197Z
description: >-
  Following on from my recent article on how to build a Node JS API server that
  uses JSON files, I wanted to share another recent experience I had: using CSS
  custom properties to apply a custom theme to a React website.
tags:
  - CSS
  - JavaScript
  - Tutorials
---
Following on from my recent article on [how to build a Node JS API server that uses JSON files](https://robkendal.co.uk/build-a-restful-node-api-server-using-json-files/), I wanted to share another recent experience I had: **using CSS custom properties to apply a custom theme** to a React website.

Let's get to it!

**PS -** as always, [feel free to skip to the meat and potatoes of the article](#building-a-custom-theme-machine).

Disclaimer: there is no React...
--------------------------------

Straight out the gates I'm going to preface this entire post with an admission: I've built this demo using vanilla JS. I know, I know, it mentions React in the title and I started out the code with React-intentions, but as I got into the details, I realised that actually, you don't need React at all for this sort of thing. By switching up the angle to a broader target, we can achieve two things:

1.  Include people who prefer to not use React but would still like to apply custom CSS properties in their theme work.
2.  Recognise that React is **awesome**, but it is not some holy silver bullet that everything needs to be built in...

Understanding custom CSS properties
-----------------------------------

I was inspired recently by the [Smashing Mag Book 6](https://www.smashingmagazine.com/2018/09/smashing-book-6-release/) which had a huge section devoted to CSS custom properties, written by [Mike Riethmuller](https://www.madebymike.com.au/) – in my opinion, one of the pioneers of using custom properties in the real world and you should go read his work.

Custom properties (also referred to as CSS variables, although they are really more like properties in how they're declared and used) offer a huge advantage in that they are dynamically scoped and resolved at runtime where they will update their uses.

For example, this means that we could have a custom property, say `--special-background-color: blue;` and use this as a value against another property within a selector like this, `background-color: var(--background-color);`. However, we could _update_ the value of 'special-background-color' to 'red' _after_ the styles have been loaded and applied, and our 'background-color' would be updated too – neat!

You might see them in use like this:

    :root {\n    --hero-bg-color: yellow;\n    --heading-font-size: 1.5rem;\n }\n \n /* ...other styles */\n \n .hero {\n     background-color: var(--hero-bg-color); \n     /* this is evaluated to: background-color: yellow */\n }

\\n

In the Smashing book (and his website), Mike explains in great detail about the in's and out's of CSS custom properties, why, when and how to use them, as well as some common pitfalls and approaches.

I'm not going to revisit well documented information here; instead, I will present you with a useable strategy to enable you to apply custom, dynamic styling to your sites _today_ using power of CSS custom properties.

Loading themes dynamically
--------------------------

At IAM Cloud, we have a suite of [products in the enterprise authentication space](https://www.iamcloud.com/). One such product allows a level of customisation per client, ultimately applying a set of high-level style changes, heading colours, button colours, background images, etc.

As we're redeveloping our products into separate UI platforms, it became apparent that we needed to handle such custom themes in a more dynamic fashion without having to download additional (potentially large) stylesheets or maintain a growing list of customer-specific stylesheets – any changes to which will require _a lot_ of work to edit them all...

SASS or pre-processors won't help us here due to their static nature – whilst they're dynamically processed and compiled using variables and functions, this is done prior to being output and what is output is vanilla CSS – i.e. we cannot affect or change already defined values without completely overriding the original selector.

The thinking (and the process) of how a custom property theming mechanism could work flowed like this:

1.  Grab a collection of bespoke, client-specific, CSS custom properties via a theming API.
2.  Process the properties to make sure they're valid.
3.  Apply the styles – either via injecting a style element, or using the built in JavaScript function `element.style.setProperty('--my-epic-var', someValue);`

Let's work through the steps and build up a dynamically loaded theme for ourselves.

Building a custom theme machine
-------------------------------

For those eager beavers among you, [head over to the finished project](https://codesandbox.io/embed/5z6yjrpr84) to see what we're building. I'm using [CodeSandbox.io](https://codesandbox.io/) to host the files which in turn uses the impressive [Parcel](https://parceljs.org/getting_started.html) for bundling (PS - I'm switching my projects to Parcel from Webpack in the future and will be creating a Parcel Start Kit to match my Webpack Starter Kit).

For starters, our file structure is quite simple:

    /src\n    /data\n        --theme.json\n    /helpers\n        --themeBuilder.js\n    --index.js\n    --theme.css\nindex.html

Nothing too complex here, but each file plays a part:

*   `theme.json` – this is where we'll keep out client's custom style choices.
*   `themeBuilder.js` – unsurprisingly, the themeBuilder file helps to build out our styles using the custom properties set in `theme.json`.
*   `index.js` – our main JavaScript starting point for the project. It handles the fetching of the styles and calling the themeBuilder.
*   `theme.css` – we'll keep our default set of CSS variables here, ready to be overridden later on.
*   `index.html` – the main starter point for the project and the file that Parcel loads to begin with.

### Looking at the default styles

If you open up the `index.html` file, you'll notice a couple of things. Firstly we're pulling in the fantastic [Bulma CSS framework](https://bulma.io/documentation/) in the head using this line:

     <!-- grab the Bulma library (for some good base styles) -->\n    <link\n      rel="stylesheet"\n      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.4/css/bulma.min.css"\n    />\n

\\n

Next, we have a really simple content structure that shows off a couple of styles that we can customise:

    <main class="custom-theme">\n      <section class="hero is-fullheight">\n        <div class="hero-body">\n          <div class="container">\n            <div class="content notification">\n              <h1 class="title">What an interesting title</h1>\n              <p>\n                Integer sollicitudin, tortor a mattis commodo, velit urna\n                rhoncus erat, vitae congue lectus dolor consequat libero. Donec\n                leo ligula, maximus et pellentesque sed, gravida a metus. Cras\n                ullamcorper a nunc ac porta.\n              </p>\n              <button class="button">Make exciting things happen</button>\n            </div>\n          </div>\n        </div>\n      </section>\n    </main>\n

\\n

Notice the `custom-theme` class that everything is wrapped in. This will allow us to contain the scope of our theme (and associated CSS custom properties) to a particular slice of our content.

Our base set of styles look like this:

    .custom-theme {\n  --hero-bg-color: #00d1b2;\n  --notification-bg-color: #363636;\n  --content-color: #fff;\n  --button-bg-color: #3273dc;\n}\n\n.custom-theme .hero {\n  background-color: var(--hero-bg-color);\n}\n\n/* ...rest of file */\n

\\n

Which gives us a lovely looking background with a content box like this:

![](/content/images/2019/04/starting-point.png)

Our starting page with base styles applied

### 1- Grab our styles from an API

Now that we've got a solid base to customise, it's time we crafted a `.json` file full of overrides to our base styles. Looking at `/data/theme.json` you'll see the following:

    {\n  "hero-bg-color": "#ffdd57",\n  "notification-bg-color": "#8187de",\n  "content-color": "#333",\n  "button-bg-color": "#cc1a9c"\n}\n

\\n

_(I've chosen to name the variables the same as they appear in the ultimate CSS because this will make them easier to automate if our list grows later on. You can see how this might work a little bit later in the article.)_

Inside our `index.js` file, we have a fairly straightforward couple of things going on. First up, we have a function to build a new style element and inject it into our document head:

    // With help from David Walsh:\n// https://davidwalsh.name/add-rules-stylesheets\nconst buildStyleElement = () => {\n  const styleEl = document.createElement("style");\n\n  styleEl.appendChild(document.createTextNode(""));\n  document.head.appendChild(styleEl);\n\n  return styleEl.sheet;\n};\n

\\n

[David Walsh's helpful article](https://davidwalsh.name/add-rules-stylesheets) gives us some help to deal with a Webkit quirk here, but this function is quite simple: create a style element; add it to the document.head; finally, return the actual stylesheet so that we can add styles to this later on.

Next, we have an `init()` function that kicks everything off:

    const init = () => {\n  // load up our custom theme via some sort of async method (in real life)\n  // here, we'll simulate an ajax call\n  setTimeout(() => {\n    if (typeof CustomStyles !== "undefined") {\n      // successful 'ajax' call\n      const stylesheet = buildStyleElement();\n      const customStyleRules = CustomThemeBuilder(CustomStyles);\n\n      stylesheet.insertRule(customStyleRules);\n    }\n  }, 1500);\n};\n

\\n

Because this is an entirely self-contained project, we're not actually calling anything from an API. Instead, we're mocking the call, wait, response flow of an actual API call using the classic `setTimeout()` function built in to JS.

We check to see if our `CustomStyles` JSON (imported at the top of this file) is present, then we build the stylesheet, grabbing the return sheet value. Finally, we process our styles before adding them to the DOM.

### 2- Process our custom properties; check they're valid

Now for the fun part, building the theme. Inside the `/helpers/themeBuilder.js` file, you'll find the main theme/style processor:

    // our customTheme object (from the JSON) should be an object like this:\n// { "theme-property-name": "#abcdef" }\nconst ThemeBuilder = customTheme => {\n  // return if there's no custom theme available\n  if (typeof customTheme === 'undefined') {\n    return;\n  }\n\n  // gather our custom properties to insert into the stylesheet overrides\n  // we're using the ES6 backtick string notation here to keep things readable\n  const stylesToInsert = `\n .custom-theme {\n    ${insertPropertyIfValid("--hero-bg-color", customTheme["hero-bg-color"])};\n    ${insertPropertyIfValid(\n      "--notification-bg-color",\n      customTheme["notification-bg-color"]\n    )};\n    ${insertPropertyIfValid("--content-color", customTheme["content-color"])};\n    ${insertPropertyIfValid(\n      "--button-bg-color",\n      customTheme["button-bg-color"]\n    )};\n  }\n`;\n\n  // finally, send our styles back to the caller\n  return stylesToInsert;\n};\n

\\n

Nothing too fancy here, although you might not be familiar with the ES6 [template literal syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) (also called the backtick string notation or template strings). Whilst ultimately producing a string type, the backtick just allows us to write strings over many lines more easily than traditional JS string syntax. Additionally, we can include variables within those strings much neater than before using the `${myVariableHere}` phrase.

In the function, we build up a string from our custom properties by calling the helper method, `insertPropertyIfValid(cssProperty, customPropertyValue)`. This is a tiny function towards the top of the file that just checks if our custom property string is not null, undefined, or empty.

If it's all good, then it returns the CSS custom property in a stylesheet-friendly format:

    return `${cssProperty}: ${customPropertyValue};`;\n// if passed values of '--hero-bg-color' and '#FDBB3D' as arguments\n// it will return the string '--hero-bg-color: #FDBB3D'\n

\\n

### 3- Apply the styles

The last part is to apply our styles to the page. As `themeBuilder.js` returns us a nice CSS rule/selector with our overrides in place, this line in `index.js` adds them to the page:

    stylesheet.insertRule(customStyleRules);\n

We could have used the JS mechanism for this of course, which looks like this:

    element.style.setProperty('--my-epic-var', someValue);\n

I feel this boils down to personal preference. Using the `setProperty()` method means styles will be applied one by one; using our style injection method means you get everything fired off at once. It also looks a little more readable (arguably) from a code point of view.

So, here's our before...

![](/content/images/2019/04/starting-point-1.png)

Base elements with no customisation

And here's what you get (after about 1.5 seconds delay) when our customised styles are applied:

![](/content/images/2019/04/styles-applied.png)

Our same content with our custom client theme applied

Taking it further with an automated style builder
-------------------------------------------------

What we've got is a solid bit of theming work as it stands. However, given that we have a somewhat hard-coded collection of custom properties in the `themeBuilder.js` file, this isn't going to scale very well. For our situation at IAM Cloud, it's fine because it's clear what's happening in the file and we don't have a lot of properties of deal with.

If, however, this list started to grow, we would have to find a way to deal with a list of style overrides in the JSON file whose size we might not know.

But fear not, we can easily update our `themeBuilder.js` file to cope with a variable sized JSON list using a bit of code that could work like this:

    let stylesToInsert = ".custom-theme {";\n  Object.keys(customTheme).forEach(key => {\n    const cssProperty = `--${key}`;\n    console.log(cssProperty);\n    stylesToAdd += insertPropertyIfValid(cssProperty, customTheme[key]);\n  });\n  stylesToAdd += "}";\n

\\n

**Note:** for this to work smoothly, we're assuming that the CSS custom properties in the JSON file(s) are named the same as they are in the final CSS files (or at least in a way that allows for easy manipulation in the JavaScript).

Looking through the finished project
------------------------------------

Alternatives to theming with CSS custom properties
--------------------------------------------------

Before we all get giddy, there are some drawbacks to using custom properties to apply themes right now, specifically around browser support. More specifically around Internet Explorer support :(

Surprisingly, support amongst modern bowsers is quite good, but IE is a very limited beast.

So what are our alternatives? Fortunately, there are a couple of routes you can take if you want to or need to support older browsers.

### Compile on the fly using the server

This is the harder of our options, the hammer if you will. You can use a server-side solution that could build CSS files from SASS on the fly and push out the result via an API server or even a service worker if you'd like to get really fancy.

However you swing it, you'll essentially be compiling a CSS sheet and updating the page; this brings us to the second option...

### Using CSS overrides (AKA the good old days)

To really ensure complete coverage you'll have to revert to the old days of simply building a set of style overrides that take advantage of the cascade to apply your theme. It doesn't have to be specifically CSS of course, you could still use your favourite CSS pre-processor to generate the styles, but you would lose the dynamic nature of the whole articles approach: loading style themes dynamically and apply them via CSS custom properties.

What ideas and approaches do you know for theming?
--------------------------------------------------

Topics like theming and customisation are a minefield for debate; there are a ton of ways to approach them and achieve results. What ideas have you got, how did you find this article on custom properties being used for theming?
