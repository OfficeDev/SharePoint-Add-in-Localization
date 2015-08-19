<%-- Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See full license at the bottom of this file. --%>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BookOrders.aspx.cs" Inherits="BookstoreWeb.BookOrders" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div id="msg"></div>
    <table>
        <thead></thead>
        <tbody></tbody>
    </table>
    <asp:ScriptManager 
        ID="ScriptManager1" 
        EnableScriptLocalization="true" 
        runat="server">
        <Scripts>
            <asp:ScriptReference Path="https://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js" />
            <asp:ScriptReference Path="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js" />
            <asp:ScriptReference Path="Scripts/Common.js" />
            <asp:ScriptReference Path="Scripts/Strings.js" ResourceUICultures="es-ES" />
            <asp:ScriptReference Path="Scripts/BookOrders.js" />
            <asp:ScriptReference Path="Scripts/StyleLoader.js"/>
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