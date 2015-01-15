Couchbase Q&A Demo App
======================

A demo application which shows how to use the Couchbase Node.js module. The app allows the following:

* Upload RFP questions as CSV
* Add questions via the UI
* List all questions
* Search for questions and answers
* Add comments to questions
* ...

The service tier of the application is developed by using Node.js and Express. 

* Express gives us an easy way to implement the service tier by providing a REST interface
* Also the static resources of the application are served by Express

Angular.js was used for the development of the client tier of the application.

* The REST services are wrapped on side of the client by providing an Angular Service
* The Controllers are using those client side service wrappers
* The UI Views are decorated by using Twitter's Bootstrap

In order to run the application the following requirements are existent:

* A bucket 'q_and_a' needs to be existent on side of Couchbase
* The app's configuration needs to be adapted in order to use the right Couchbase and Elasticsearch clusters
* The Elasticsearch cluster needs to have installed the Coucbase Transport Plug-in
* An XDCR link between the Couchbase Cluster and the target Elasticsearch cluster needs to be established
* The View /q_and_a/_design/questions/_view/all needs to be defined as the following one:
 
```
 function (doc, meta) {
  emit(meta.id, null);
 }
```

The following command starts the application

```
node app.js
```

Screenshots
===========
![alt tag](https://raw.github.com/dmaier-couchbase/cb-demo-qa/master/screenshots/home.png)
![alt tag](https://raw.github.com/dmaier-couchbase/cb-demo-qa/master/screenshots/add.png)
![alt tag](https://raw.github.com/dmaier-couchbase/cb-demo-qa/master/screenshots/list.png)
![alt tag](https://raw.github.com/dmaier-couchbase/cb-demo-qa/master/screenshots/comments.png)
![alt tag](https://raw.github.com/dmaier-couchbase/cb-demo-qa/master/screenshots/search.png)
![alt tag](https://raw.github.com/dmaier-couchbase/cb-demo-qa/master/screenshots/file-import.png)
