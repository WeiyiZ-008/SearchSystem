# Search System 

#### Author: Weiyi Zhou



## Front end

Use EJS template to define the multiple views for rendering pages. All the view definition can be found at *views* folder.

Use `Bootswatch` and `Bootstrap` for styling. 



## Back end

#### Node.js

Build authentication layer with `passport` npm package, also apply `bcryptjs` to encrypt the user password information for extra security. 

#### Express

Set up REST APIs `/` , `/search`, `/users` for the main routes.

`/users` endpoint to handle login and register process

`/search` endpoint to handle search query and displaying the searching results

#### Elasticsearch 

Use Elasticsearch cloud service instead of local configuration. 

Sample data are loaded manually. The raw data and indexing mapping process are handled in the *Products* folder (*loadProducts.js*, *sampleProducts.json*)

#### MongoDB Atlas

Use the MongoDB cloud service to store the User record. 

Entities schema can be found at *models* folder (*User.js*, *Product.js*)



## Testing

### dataset

Created 16 different products.

ID from 1 to 8: Keywords relate to "豆腐"

ID from 9 to 12: Keywords relate to "火锅底料"

ID from 13 to15: Keywords relate to "火锅蘸料"

ID 16: Keywords relate to "牛奶"



### Test Results

The searching results should filter out the product which not contain the user entered phrase.

The category filed matching has higher contribution to the searching score, this query setting shift less relevant products to lower priority in display page.





## Reference

1. [How to Integrate Elasticsearch into a Web App Using NodeJS and Express – Part 1 | ObjectRocket](https://kb.objectrocket.com/elasticsearch/how-to-integrate-elasticsearch-into-a-web-app-using-nodejs-and-express-part-1-216)

2. [Getting started with Elasticsearch and Node.js - Part 1 - Compose Articles](https://www.compose.com/articles/getting-started-with-elasticsearch-and-node/) 
3. [(6) Node.js With Passport Authentication | Full Project - YouTube](https://www.youtube.com/watch?v=6FOq4cUdH8k&t=10s) 
4. [elastic/elasticsearch-js: Official Elasticsearch client library for Node.js (github.com)](https://github.com/elastic/elasticsearch-js) 

