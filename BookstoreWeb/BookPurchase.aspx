<%-- Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file. --%>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BookPurchase.aspx.cs" Inherits="BookstoreWeb.BookPurchase" culture="auto" meta:resourcekey="PageResource1" uiculture="auto" %>

<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>

<!-- the body is hidden until the stylesheet is loaded -->
<body style="display: none">
    <form ID="form1" runat="server">

    <!-- Chrome control placeholder -->
    <div id="chrome_ctrl_placeholder"></div>

    <h1 id="purchasePageHeader">Purchase book form</h1>
    <p>
        <asp:Literal 
            ID="litBookTitle" 
            Text="Book title: lit" 
            runat="server" 
            meta:resourcekey="litBookTitle"></asp:Literal>&nbsp;
        <label 
            id="lblBookTitle">
            Book title
        </label>
        <br />
        <asp:Literal 
            ID="litPrice" 
            Text="Price: lit" 
            runat="server" 
            meta:resourcekey="litPrice"></asp:Literal>&nbsp;
        <label 
            id="lblBookPrice">
            Book price
        </label>
        <br />
        <a 
            id="lnkBuy" 
            onclick="lnkBuy_Click()"
            style="display: none"
            href="#">
            <asp:Literal 
                ID="litBuyBook" 
                Text="Buy book! lit" 
                runat="server" 
                meta:resourcekey="litBuyBook"></asp:Literal>
        </a>
    </p>
    <div id="divMsg"></div>
    
    <div 
        id="bookContent" 
        style="visibility: hidden">
        <h2><asp:Literal 
                ID="litCanRead" 
                Text="You can read your book now: lit" 
                runat="server" 
                meta:resourcekey="litCanRead"></asp:Literal>
        </h2>
        <textarea
            id="txtBookContent" 
            rows="10"
            cols="70"
            readonly
            style="border-style: none">
        </textarea>
    </div>

    <asp:ScriptManager 
        ID="ScriptManager1" 
        EnableScriptLocalization="true" 
        runat="server">
        <Scripts>
            <asp:ScriptReference Path="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js" />
            <asp:ScriptReference Path="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js" />
            <asp:ScriptReference Path="Scripts/Common.js" />
            <asp:ScriptReference Path="Scripts/Strings.js" ResourceUICultures="es-ES" />
            <asp:ScriptReference Path="Scripts/BookPurchase.js" />
            <asp:ScriptReference Path="Scripts/ChromeLoader.js"/>
        </Scripts>
    </asp:ScriptManager>

    </form>
    </body>
</html>

<%--

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
  
--%>