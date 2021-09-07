const client = require('../elasticsearch');





 /* Query using slop to allow for unexact matches */
//  client.search({
//         index: 'search_products',
//         body: {
//         "query": {  
//             "match":
//         }
//         }   
//     }).then(function(resp) {
//         console.log("Successful query! Here is the response:", resp);
//         console.log("------------------");
//         // console.log("check the res.body", resp.body.hits.total.value);
//         console.log(`found ${resp.body.hits.total.value} items in ${resp.body.took}ms`);
//         // res.send(resp);
//         });



const search = function search(index, body) {
    return client.search({index: index, body: body});
};

// query body for search term
let body = {
    query: {
        match: {
            name: {
                query: '牛奶'
            }
        }
    }
};

search('search_products', body)
    .then(results => {
        console.log(`found ${results.body.hits.total.value} items in ${results.body.took}ms`);
        console.log(`returned products:`);
        results.body.hits.hits.forEach(
            (hit, index) => console.log(
                hit._source
            )
        )
    })
    .catch(console.error);

// module.exports =  function searchData() {
//     let body = {
//         size: 4,
//         from: 0,
//         query: {
//         match_all: {}
//         }
//     };
 
//     search('twitter2', body)
//         .then(results => {
//             console.log(`found ${results.hits.total} items in ${results.took}ms`);
//             console.log(`returned twitters:`);
//             results.hits.hits.forEach(
//                 (hit, index) => console.log(
//                     hit._source
//                 )
//             )
//         })
//         .catch(console.error);
// };