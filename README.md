cb-demo-qa
==========

A demo application which shows how to use the Couchbase Node.js module. The app allows the following:

* Upload RFP questions as CSV
* Add questions via the UI
* List all questions
* Search for questions and answers
* Add comments to questions
* ...

The service tier of the application is developed by using Node.js and Express. 

* Express gives us an easy way to implement the service tier by providing a REST interface.
* The static resources of the application are served by Express,too.

For the development of the client tier of the application Angular.js was used.

* The REST services are wrapped on site of the client
* The controllers are using those client side service wrappers
* The views are decorated by using Twitter's Bootstrap

To run the application the following requirements are existent:

* A bucket 'q_and_a' needs to be existent on side of Couchbase
* The app's configuration needs to be adapted in order to use the right Couchbase cluster
* The View /q_and_a/_design/questions/_view/all needs to be defined as the following one:
 
```
 function (doc, meta) {
  emit(meta.id, null);
 }
```

* An XDCR link between the Couchbase Cluster and the target Elastic Search cluster needs to be established
* The following command starts the application

```
node app.js
```
