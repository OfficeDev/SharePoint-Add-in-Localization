// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file.
"use strict";

var hostweburl;
var appweburl;

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

    // resources are in URLs in the form:
    // web_url/_layouts/15/resource
    var scriptbase = hostweburl + "/_layouts/15/";

    // Load the js file and continue to the 
    //   success event handler
    // Load the js files and continue to the successHandler
    $.getScript(scriptbase + "SP.Runtime.js",
        function () {
            $.getScript(scriptbase + "SP.js",
                function () { $.getScript(scriptbase + "SP.RequestExecutor.js", getOrders); }
                );
        }
    );
});

// The list has already been localized,
// we can retrieve the localized displayname of the fields
function getOrders() {
    var executor = new SP.RequestExecutor(appweburl);

    // We can use the getbytitle by using the localized 
    // string ordersListName in strings.js
    executor.executeAsync(
        {
            url:
                appweburl +
                "/_api/web/lists/getbytitle('" + ordersListName + "')/fields",
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" },
            success: successFieldsHandler,
            error: errorHandler
        }
    );

    //This is the custom property defined in the
    // app part.
    var orderStatus = getQueryStringParameter("OrderStatus");

    var context = new SP.ClientContext(appweburl);
    var factory =
        new SP.ProxyWebRequestExecutorFactory(
            appweburl
        );
    context.set_webRequestExecutorFactory(factory);
    //Get the web and list objects
    //  and prepare the query
    var web = context.get_web();
    var list = web.get_lists().getByTitle(ordersListName);
    var camlString =
        "<View><ViewFields>" +
            "<FieldRef Name='ID' />" +
            "<FieldRef Name='Bookname' />" +
            "<FieldRef Name='Price' />" +
            "<FieldRef Name='Created' />" +
        "</ViewFields></View>" +
        "<Query>" +
            "<Where>" +
                "<And>"
                "<Eq>" +
                    "<FieldRef Name='Author' />" +
                    "<Value Type='User'>" +
                        orderStatus
                    "</Value>" +
                "</Eq>" +
                "<Eq>" +
                    "<FieldRef Name='Orderstatus' LookupId='TRUE' />" +
                    "<Value Type='Lookup'>" +
                        
                    "</Value>" +
                "</Eq>" +
                "</And>" +
            "</Where>" +
        "</Query>";

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml(camlString);
    var myorders = list.getItems(camlQuery);

    context.load(myorders);

    //Execute the query with all the previous 
    //  options and parameters
    context.executeQueryAsync(
        function () { successItemsHandler(myorders); },
        errorHandler
    );
}

// Function to handle the success event.
// Builds the body for the table.
function successItemsHandler(myorders) {
    var bodyHTML;
    var enumerator = myorders.getEnumerator();

    bodyHTML + "";
    while (enumerator.moveNext()) {
        var order = enumerator.get_current();
        bodyHTML += "<tr>" +
        "<td>" + order.get_item("ID") + "</td>" +
        "<td>" + order.get_item("Bookname") + "</td>" +
        "<td>" + order.get_item("Price") + "</td>" +
        "<td>" + order.get_item("Created") + "</td>" +
            "</tr>";
    }

    $("tbody").append(bodyHTML);
}
// Function to handle the success event.
// Builds the header for the table.
function successFieldsHandler(data, req) {
    var headerHTML;
    var iddisplayname;
    var booknamedisplayname;
    var pricedisplayname;
    var createddisplayname;
    var jsonObject = JSON.parse(data.body);
    var fields = jsonObject.d.results;

    
    //Localized column names are already localized in the list
    // in the Title property.
    headerHTML = "";
    for (var i = 0; i < fields.length; i++) {
        headerHTML += "<tr>";
        switch(fields[i].InternalName)
        {
            case "ID":
                iddisplayname = fields[i].Title;
                break;
            case "Bookname":
                booknamedisplayname = fields[i].Title;
                break;
            case "Price":
                pricedisplayname = fields[i].Title;
                break;
            case "Created":
                createddisplayname = fields[i].Title;
                break;
        }
        headerHTML += "<tr>";
    }

    headerHTML = "<tr>" +
            "<th>" + iddisplayname + "</th>" +
            "<th>" + booknamedisplayname + "</th>" +
            "<th>" + pricedisplayname + "</th>" +
            "<th>" + createddisplayname + "</th>" +
                "</tr>";

    $("thead").append(headerHTML);
}

// Function to handle the error event.
// Prints the error message to the page.
function errorHandler() {
    document.getElementById("msg").innerText =
        "Could not complete cross-domain call: " +
        arguments[1];
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