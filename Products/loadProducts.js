var client = require('../elasticsearch');
const fs = require('fs');

// load the sample products data in to ElasticSearch cloud server
// Create the search_product index

// add the JSON object to the buldIndex body
const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];
    
    data.forEach(item => {
        bulkBody.push({
            index: {
                _index: index,
                _type: type,
                _id: item.id
            }
        });

        bulkBody.push(item);
    });

    client.bulk({body: bulkBody})
        .then(res => {
            let errCount = 0;
            
            res.items.forEach(item => {
                if (item.index && item.index.error) {
                    console.log(++errCount, item.index.error);
                }
            });

            console.log(`Successfully indexed ${data.length - errCount} out of ${data.length} items`);
        })
        .catch(console.err);
};

async function indexData() {
    const productsRaw = await fs.readFileSync('./sampleProducts.json');
    const products = JSON.parse(productsRaw);
    console.log(`${products.length} items parsed from sampel data file`);
    bulkIndex('search_products', '_doc', products);
};

indexData();
