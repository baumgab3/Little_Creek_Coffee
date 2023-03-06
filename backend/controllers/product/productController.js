const conn = require('../../database/connection');
const util = require('util');
const {getPriceRange} = require('../../ServerUtil');


const query = util.promisify(conn.query).bind(conn);


const getProductDetails = async (req, res) => {
    const params = req.params;
    const param1 = params.param1;

    // param1 comes in "slugified" e.g. "this is a product" would be "this-is-a-product"
    // de-slugify
    const name = param1.replaceAll("-", " ");

    const sqlStatement = `SELECT * FROM products WHERE Name LIKE LOWER('${name}')`;

    try {
        const productArr = await query(sqlStatement);
        const product = productArr[0];

        if (!product) {
            return res.send([]);
        }

        // get price range/has Sale as string
        const priceObj = await getPriceRange(product);
        // add to product range
        product.priceRange = priceObj.priceRange;
        product.hasSale = priceObj.hasSale;
        // get actual price choices e.g. "One Pound - $18 Per Pound"
        const sqlPriceStatement = `SELECT * FROM product_pricing WHERE ProductId='${product.Id}'`;
        const priceOptionsObj = await query(sqlPriceStatement);
        const priceOptions = [];
        priceOptionsObj.forEach(option => {
            priceOptions.push({
                "description": option.Description,
                "price": option.Price,
                "salePrice": option.salePrice
            });
        })
        
        product.priceOptions = priceOptions;

        return res.send(product);
    } catch(err) {
        throw err;
    }

}


module.exports = {
    getProductDetails
 }