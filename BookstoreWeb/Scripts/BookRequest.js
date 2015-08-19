// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
"use strict";

var hostweburl;
var appweburl;
var listid; 

// Load the required SharePoint libraries
$(document).ready(function () {
    //Get the URI decoded URLs.
    appweburl =
        decodeURIComponent(
            getQueryStringParameter("SPAppWebUrl")
    );
    hostweburl =
        decodeURIComponent(
            getQueryStringParameter("SPHostUrl")
    );
    listid =
        decodeURIComponent(
            getQueryStringParameter("list")
            );
    // Trim '{' and '}' from the guid
    listid = listid.substring(1, listid.length - 1);

    // resources are in URLs in the form:
    // web_url/_layouts/15/resource
    var scriptbase = hostweburl + "/_layouts/15/";

    // Load the js file and continue to the 
    //   success event handler
    $.getScript(scriptbase + "SP.RequestExecutor.js");
});

$("#lnkRequest").click(function () {
    var executor;
    var formDigestValue;
    var formDigestEndpoint;
    var fileContent;
    var fileEndpoint;
    var bookTitle;

    bookTitle = document.getElementById("txtTitle").value;

    // The contextinfo endpoint contains the formDigest value
    formDigestEndpoint = appweburl + "/_api/contextinfo";
    // The endpoint to the host web is constructed by using
    // the SP.AppContextSite operator
    fileEndpoint = appweburl + "/_api/SP.AppContextSite(@target)/web/lists('" + listid + "')/rootfolder/files/add(url='" + bookTitle + ".txt')?@target='" + hostweburl + "'";
    fileContent = document.getElementById("content").value;
    executor = new SP.RequestExecutor(appweburl);

    // Issue a request to the contextinfo object to get the FormDigestValue
    executor.executeAsync(
        {
            url: formDigestEndpoint,
            method: "POST",
            headers: { "Accept": "application/json; odata=verbose" },
            success: function (data) {
                var jsonObject = JSON.parse(data.body);
                formDigestValue = jsonObject.d.GetContextWebInformation.FormDigestValue;
                uploadFile(formDigestValue, fileEndpoint, fileContent);
            },
            error: function (data, errorCode, errorMessage) {
                var errMsg = "Error retrieving the form digest value: "
                    + errorMessage;
                document.getElementById("divMsg").innerText = errMsg;
            }
        }
    );
});

function uploadFile(formDigestValue, fileEndpoint, content) {
    var executor;

    executor = new SP.RequestExecutor(appweburl);
    // Issue a request to the contextinfo object to get the FormDigestValue
    executor.executeAsync(
        {
            url:
                fileEndpoint,
            method: "POST",
            headers: {
                "Accept": "application/json; odata=verbose",
                "Content-type": "text/html;charset=UTF-8",
                "X-RequestDigest": formDigestValue
            },
            body : content,
            success: function (data) {
                document.getElementById("divMsg").innerText = "Book requested, closing dialog...";
                //Close the window and refresh the page
                window.parent.postMessage("CloseCustomActionDialogRefresh", "*");
            },
            error: function (data, errorCode, errorMessage) {
                var errMsg = "Error uploading the file: "
                    + errorMessage;
                document.getElementById("divMsg").innerText = errMsg;
            }
        }
    );
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