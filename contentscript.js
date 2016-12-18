/**chrome doesn't let you run javascript automatically on load every time unless you
use content scripts, this is a script that calls other scripts during run in 
the context of web pages**/
var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
        s.parentNode.removeChild(s);
};

