# Localize the add-in web, host web, and remote components of a SharePoint Add-in #

## Summary
Use resource (resx) files and JavaScript string files to localize custom add-in parts, web parts, popup dialogs, page chrome, lists, and list columns.

### Applies to ###
-  SharePoint Online and on-premise SharePoint 2013 and later 

----------
## Prerequisites ##
This sample requires the following:


- A SharePoint 2013 development environment that is configured for add-in isolation and the Spanish (es-ES) and French (fr-FR) language packs. (A SharePoint Online Developer Site is automatically configured for add-in isolation and all language packs. For an on premise development environment, see [Set up an on-premises development environment for SharePoint Add-ins](https://msdn.microsoft.com/library/office/fp179923.aspx) and [Language packs in SharePoint Server 2013](https://technet.microsoft.com/en-us/library/Ff463597.aspx).) 
- The SharePoint Online tenancy (or on-premise SharePoint web application) must have site collections created with the **Developer Site** template in *each* of these languages:
	- English (en-US)
	- Spanish (es-ES)
	- French (fr-FR)

	To create a Developer Site see [Test your localized SharePoint Add-in](https://msdn.microsoft.com/library/fp179919.aspx#TestingLocalizedApps). For more information about creating a developer site in SharePoint Online, see [Create a developer site on an existing Office 365 subscription](https://msdn.microsoft.com/library/office/jj692554.aspx). For more information about creating one in SharePoint on-premises, see [Set up an on-premises development environment for SharePoint Add-ins](https://msdn.microsoft.com/library/office/fp179923.aspx). 

- Visual Studio and the Office Developer Tools for Visual Studio (March, 2014, version or later) installed on your developer computer 


## Description of the code ##
This sample simulates a bookstore by using a SharePoint 2013 document library in which every document is a book. End users can request and buy new books by using the provided custom actions. The components of the add-in are localized for English and Spanish.

	Note: The add-in is designed to use the base language of the SharePoint website -- the language that was selected when the website was created -- to determine which language it should use to render the add-in's componenents. It does not use the default language of set in the user's browser, however, some of the techniques in the sample can be used, with some modification when the browser setting is the criterion.

This sample includes a remote web application that has web pages to handle the book request and book buying experiences in a simulated bookstore. (These remote web pages are never opened full screen. Some are surfaced in add-in parts. Some serve only to pass cross-domain JavaScript through an iFrame. 

Custom actions provide the link between the document library and the add-in pages. The cross-domain library provides data access from the remote web application to the document library. The chrome control and SharePoint style sheet provide the classes to consistently style the web application pages. A custom list provides storage for the orders placed by the end user. End users can use the provided add-in part to display the orders history.

The sample demonstrates how to localize the following kinds of add-in components:

- Add-in title
- Custom lists
- Custom actions (menu commands)
- Add-in part
- SharePoint pages
- Remote web application pages
- SharePoint Chrome control

### Components of the sample ###
The sample contains the following:



- **SharePoint-Add-in-Localization** project, which includes the following components:
	- Request a book custom action (menu command)
	- But this book custom action (menu command)
	- My orders add-in part
	- Orders custom list
	- Order status custom list
	- Add-in start page in the add-in web
	- Add-in web resource (resx) files
	- Host web resource (resx) files
	- JavaScript resource (strings) files


- **SharePoint-Add-in-LocalizationWeb** project, which includes the following components:
	- BookOrders remote web page and JavaScript file
	- BookPurchase remote web page and JavaScript file
	- BookRequest remote web page and JavaScript file
	- ChromeLoader JavaScript file
	- Common JavaScript file
	- StyleLoader JavaScript file
	- Resource (resx) files
	- JavaScript resource (strings) files


## To use the sample #

12. Open **Visual Studio** as an administrator.
13. Open the .sln file.

	**CARRY OUT THE REMAINING STEPS OF THE PROCEDURE THREE TIMES:** The first time for your English developer site. Then for the Spanish developer site, and then for the French developer site. Screenshots show what you should see in English and Spanish. For the French developer site, you should see the "invariant language" strings, which are English in this sample. The instructions below use English for the SharePoint and add-in UI elements. You will find the Spanish equivalents in the same relative locations in the UI.
13. In **Solution Explorer**, highlight the SharePoint add-in project and replace the **Site URL** property with the URL of your SharePoint developer site.
14. Press F5.
15. After the add-in installs, the consent page opens. Click **Trust It**.
16. The start page opens and looks similar to the follwoing. (The content is a very brief version of these instructions.)

	![The add-in start page in English and Spanish](/LocalizationAdd-inScreenshots/startpageboth.png) 

7. Open the raw HTML view of the page. (In IE, right-click the page and select **View Code**.)
8. Find the line 
 ` <h2 id="instructionsheading">INVARIANT Instructions</h2>`.
9. Notice that the term "INVARIANT" is part of the heading but it only appears on the rendered version of the page on the French website. On the English and Spanish websites, alternate strings are injected into the page by JavaScript.
10. Close the raw view, and in the browser open another tab and navigate to the host web home page. Then navigate to any document library on the host web, such as **Documents**.
11. Open the **Library** tab on the ribbon and click the **Request a Book** button.
	![The Request a Book ribbon button in English and Spanish](/LocalizationAdd-inScreenshots/ribbonbuttonboth.png) 

12. On the dialog that opens, enter a book title and press **Request book**.
	![The Request a Book dialog in English and Spanish](/LocalizationAdd-inScreenshots/requestbookpopupboth.png) 

13. The new file appears in the library.
 	![The Request a Book dialog in English and Spanish](/LocalizationAdd-inScreenshots/documentlibraryboth.png) 

14. Open the context menu for the new document and select **Buy this book**. A book purchase form page opens. 
14. Press the **Buy book!** link, and the fake Latin text of the book appears on the form.
 	![The book purchase form in English and Spanish](/LocalizationAdd-inScreenshots/buybookformboth.png) 

14. Navigate to any other page on the host web, such as its home page. 
15. On the ribbon select **Page | Edit | Insert**. 
16. On the **Insert** ribbon select **Add-in part**. (On older versions of SharePoint, it may say **App part**.)
17. Select the **Book orders** add-in part, and then put the cursor in any Web Part zone on the page and click **Add**. The add-in part will be added to the page. *It may take a full minute for the data to be populated.* When it has finished rendering, there is a list of all the books you have ordered.
 	![The book purchase form in English and Spanish](/LocalizationAdd-inScreenshots/bookordersadd-inpartboth.png) 

20. Delete the add-in part from the page. (Removing an add-in, or retracting it in Visual Studio, does not remove add-in parts from pages.)
21. Reopen the tab with the add-in's start page, and use the link to the **Orders** list in the last line of the instructions to open the **Orders** list in another tab. Notice that the price in English site is USD, but it is Euros in the Spanish site.
 	![The book purchase form in English and Spanish](/LocalizationAdd-inScreenshots/orderslistboth.png) 

22. Just to the right of the list title is a small "i" in a circle. Click this to see the list description.
 	![The book purchase form in English and Spanish](/LocalizationAdd-inScreenshots/OrdersListTitleDescriptionBOTH.png) 

23. Reopen the tab with the add-in's start page, and use the link to the **Order status** list in the last line of the instructions to open the **Order status** list in another tab. Note again that the description, as well as the title and the status values has been localized.
 	![The book purchase form in English and Spanish](/LocalizationAdd-inScreenshots/OrderStatusListBOTH.png) 

## Troubleshooting

<div class="section" id="sectionSection5">
<p>The following table lists common configuration and environment errors that prevent the sample from running or deploying properly, and how to solve them.</p>
<div class="caption"></div>
<div class="tableSection">
<table cellspacing="2" cellpadding="5" width="50%" frame="lhs">
<tbody>
<tr>
<th>
<p>Problem</p>
</th>
<th>
<p>Solution</p>
</th>
</tr>
<tr>
<td>
<p>The add-in part does not display any content. The add-in part displays the following error:
<strong>Navigation to the webpage was canceled</strong>.</p>
</td>
<td>
<p>The browser blocked the content page. The solution might be different depending on the browser you are using:</p>
<ul>
<li>
<p>Internet Explorer 9 and 10 display the following message at the bottom of the page:
<strong>Only secure content is displayed</strong>. Click <span class="ui">Show all content</span> to display the add-in part content.</p>
</li><li>
<p>Internet Explorer 8 shows a dialog box with the following message: <strong>Do you want to view only the webpage content that was delivered securely?</strong>. Click
<span class="ui">No</span> to display the add-in part content.</p>
</li></ul>
</td>
</tr>
<tr>
<td>
<p>Error &quot;This content cannot be displayed in a frame.&quot; when the user selects a custom menu command.</p>
</td>
<td>
<p>See this forum discussion: <a href="http://social.msdn.microsoft.com/Forums/sharepoint/en-US/fa6abb31-7251-4744-ab14-634cde38a42d/error-when-viewing-apps-that-utilize-webparts-this-content-cannot-be-displayed-in-a-frame?forum=appsforsharepoint">Error when viewing apps that utilize webparts this content cannot be displayed in a frame</a>.</p>
</td>
</tr>
</tbody>
</table>
</div>
</div>


## Questions and comments

We'd love to get your feedback on this sample. You can send your questions and suggestions to us in the [Issues](https://github.com/OfficeDev/SharePoint-Add-in-Localization/issues) section of this repository.
  
<a name="resources"/>
## Additional resources

[SharePoint Add-ins](https://msdn.microsoft.com/library/office/fp179930.aspx)

[Localize SharePoint Add-ins](https://msdn.microsoft.com/library/fp179919.aspx)

### Copyright ###

Copyright (c) Microsoft. All rights reserved.




