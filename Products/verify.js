
const client = require('../elasticsearch');
 
function indices() {
    return client.cat.indices({v: true})
    .then(console.log)
    .catch(err => console.error(`Error connecting to the es client: ${err}`));
}

console.log(`elasticsearch indices information:`);
indices();

// module.exports = function verify() {
//     console.log(`elasticsearch indices information:`);
//     indices();
// }