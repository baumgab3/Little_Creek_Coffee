const conn = require('../database/connection');
const util = require('util');
const {getPriceRange} = require('../ServerUtil');

const query = util.promisify(conn.query).bind(conn);

const getProductPreviews = async (req, res) => {
    const params = req.params;
    const param1 = params.param1;
    const param2 = params.param2;

    let sqlStatement;
    switch (param1) {
        case 'roast':
            sqlStatement = `SELECT Id, Name FROM products WHERE Roast='${param2}'`;
            break;
        case 'region':
            sqlStatement = `SELECT Id, Name FROM products WHERE Region='${param2}'`;
            break;
        case 'cold-brew':
            sqlStatement = `SELECT Id, Name FROM products WHERE Category='cold-brew'`;
            break;
        case 'tea':
            sqlStatement = `SELECT Id, Name FROM products WHERE Category='tea'`;
            break;
        default:
            return res.send([]);
    }

    try {
        const products = await query(sqlStatement);
        const toReturn = [];

        // get product range and build up return array
        for await (const product of products) {
            const priceObj = await getPriceRange(product.Id);
            const productObj = JSON.parse(JSON.stringify(product));
            const name = productObj.Name;
            toReturn.push({"id": product.Id ,"name": name, "priceRange": priceObj.priceRange, "hasSale": priceObj.hasSale});
        }

        return res.send(toReturn);
    } catch(err) {
        throw err;
    }
}


module.exports = {
    getProductPreviews,
 }