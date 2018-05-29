# assetManagement
This node project allows for an uninterupted intranet service to manage assets across sites.  An asset in this case is a URI & name.

Each update(add or delete) is tracked via a transaction database.  This is synced across sites via a cron job which happens once a minute.

## API endpoint documentation

The API has two endpoints: /assets & /notes.  Both endpoints are accessible through both post and get.
Users can interect with the /assets api with:

* /add
    Add takes two parameters.  uri and name.
    ex. http://localhost:3000/assets/add?uri=myorg://users/gwashington&name=george washinton
* /get
    Get will respond with all assets if no paramaters is sent.  If the uri field is sent it will search the assets for the one requested.
    ex. http://localhost:3000/assets/get?uri=myorg://users/gwashington
* /delete
    Delete takes one parameter.  uri
    ex. http://localhost:3000/assets/delete?uri=myorg://users/gwashington

users can interact with the notes api with:
* /add
    Add takes two parameters.  uri and name.
    ex. http://localhost:3000/notes/add?uri=myorg://users/gwashington&note=george washinton was the first president
* /get
    Get will respond with all assets if no paramaters is sent.  If the uri field is sent it will search the assets for the one requested.
    ex. http://localhost:3000/notes/get?uri=myorg://users/gwashington


