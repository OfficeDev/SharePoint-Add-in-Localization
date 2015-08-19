
"use strict";
var appweburl;

(function () {
    var ctag;

    //Get the URI decoded app web URL.
    appweburl =
        decodeURIComponent(
            getQueryStringParameter("SPAppWebUrl")
    );
    //Get the ctag from the SPClientTag token.
    ctag =
        decodeURIComponent(
            getQueryStringParameter("SPClientTag")
    );

    // The resource files are in a URL in the form:
    // web_url/_layouts/15/Resource.ashx
    var scriptbase = appweburl + "/_layouts/15/";

    // Dynamically create the invisible iframe
    var blankiframe;
    var blankurl;
    var body;
    blankurl = appweburl + "/Pages/blank.html";
    blankiframe = document.createElement("iframe");
    blankiframe.setAttribute("src", blankurl);
    blankiframe.setAttribute("style", "display: none");
    body = document.getElementsByTagName("body");
    body[0].appendChild(blankiframe);

    // Dynamically create the link element
    var dclink;
    var head;
    dclink = document.createElement("link");
    dclink.setAttribute("rel", "stylesheet");
    dclink.setAttribute("href", scriptbase + "defaultcss.ashx?ctag=" + ctag);
    dclink.onload = styleLoaded;
    head = document.getElementsByTagName("head");
    head[0].appendChild(dclink);
})();

// Callback for the onLoad event of the 
//  dynamically created link element
function styleLoaded() {
    // When the page has loaded the stylesheet
    //  display the page body.
    $("body").show();
}

/*

SharePoint-Add-in-Localization, https://github.com/officedev/SharePoint-Add-in-Localization
 
Copyright (c) Microsoft Corporation
All rights reserved. 
 
MIT License:
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.    
  
*/