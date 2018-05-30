# assetManagement
This node project allows for an uninterrupted intranet service to manage assets and asset notes across sites.  An asset in this case is a URI & name while a note is a URI & a note.

## Instructions

To install and run:
* clone application to directory via git.
* run: npm i
* run: npm start

To test:
* Open an additional terminal window
* while application is still running run: npm test


## Application design
The application was written using in memory data store as opposed to databases; however, given more time a proper database would be far more ideal.  

Please see asset_management_diagram.pdf for a design.  Multiple asset management APIs can be deployed both internally and externally of the intranet.  Two types of databases are used in this design.  One for handling assets and notes.  The second data store type manages transactions.  Each application should have a database for its individual transactions.  APIs within the same intranet will not need to configure the transaction handling as they will all use the same asset data store. 

Each update(add or delete) is tracked via a transaction database.  This is synced across sites via a cron job which happens once a minute.  Once the transactions have been synced the cron will remove the unneeded transactions from the data store.  

## Database Designed
Please see database_design.pdf for the database design.  The application manages the assets and notes in separate tables within the assets database.  The assets table contains the uri & name of the asset.  The notes table contains the uri & note.  The transaction database is slightly more complex and takes key, type(assets or notes), method(add or delete), data(json data), siteStatus(array of truthy values).


## API endpoint documentation

The API has two endpoints: /assets & /notes.  Both endpoints are accessible through both post and get.
Users can interact with the /assets api with:

* /add

    Add takes two parameters: uri and name.

    ex. http://localhost:3000/assets/add?uri=myorg://users/gwashington&name=george washington
* /get

    Get will respond with all assets if no parameters is sent.  If the uri field is sent it will search the assets for the one requested.

    ex. http://localhost:3000/assets/get?uri=myorg://users/gwashington
* /delete

    Delete takes one parameter:  uri.  Deleting an asset will not remove the notes associated with it.

    ex. http://localhost:3000/assets/delete?uri=myorg://users/gwashington

users can interact with the notes api with:
* /add

    Add takes two parameters: uri and name.

    ex. http://localhost:3000/notes/add?uri=myorg://users/gwashington&note=george washington was the first president
* /get

    Get will respond with all assets if no parameters is sent.  If the uri field is sent it will search the assets for the one requested.

    ex. http://localhost:3000/notes/get?uri=myorg://users/gwashington

## Site Configuration
Each site will need to be configured in the configurations.json file for each individual site.  A name, IP and port will need to be specified.



