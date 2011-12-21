Sticky
======

A super simple notification system for jQuery, similar to Growl notifications.

Project page on Github - https://github.com/counteragent/Sticky


Usage
-----

Include the files in your document's header:

    <script type="text/javascript" src="sticky.js"></script>
    <link rel="stylesheet" type="text/css" href="sticky.css" />

Basic Usage

    javascript
    $.sticky('This is a Sticky Note!');

Advanced Options

    javascript
    $.sticky('This is a very special Sticky Note!',{speed:1500,position:'top-center',autoclose:false});


Change the `close.png` Image Path

    javascript
    $.sticky('Note with a custom image path for the close button!',{imagePath:'../../images'});
    // leave off the trailing slash of your images folder


Authors
-------

**Original Author: Daniel Raftery**

+ http://twitter.com/thrivekings
+ http://github.com/thrivekings
+ http://thrivingkings.com

**Branched Author: Jonathan Brimer**

+ http://twitter.com/counteragent
+ http://github.com/counteragent
+ http://beoriginal.com

Browser compatibility
---------------------

- Chrome 8.0+
- Firefox 3.0+
- Safari 4.0+
- Internet Explorer 7.0+

License
---------------------

This work is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).