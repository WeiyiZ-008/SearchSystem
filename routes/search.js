const express = require('express');
const client = require('../elasticsearch');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


// search page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render("searchproduct");
});

// process the search keyword
router.post('/product', ensureAuthenticated, (req, res) => {
    const { keyword } = req.body;
    
    let body = {
        query: {
            bool: {
                should: [
                    {
                        match_phrase: {
                            category: {
                                query: keyword,
                                boost: 2
                            }
                        }
                    },
                    {
                        match_phrase: {
                            name: {
                                query: keyword
                            }
                        }
                    },
                    {
                        match_phrase: {
                            description: keyword
                        }
                    }
                ]
            }
        }
    };

    search('search_products', body)
        .then(results => {
            results = results.body;
            foundRes = [];

            console.log(`found ${results.hits.total} items in ${results.took}ms`);
            if (results.hits.total > 0) console.log(`returned twitters:`);
            results.hits.hits.forEach(hit => foundRes.push(hit));

            res.render("searchResults.ejs", {data: validationResults(foundRes)});
        })
        .catch(console.error);

});

// search the doc in the elasticsearch
const search = function search(index, body) {
    return client.search({index: index, body: body});
}

// validate and format the searching results
const validationResults = function validateResult(foundResults) {
    formatedResults = [];

    foundResults.forEach(res => {        
        formatedResults.push(res._source);
    });

    return formatedResults;
}

module.exports = router;