const conn = require('../../database/connection');
const util = require('util');
const {getPriceRange, getProductPriceRange, getPriceDropDownOptions} = require('../../ServerUtil');


const query = util.promisify(conn.query).bind(conn);


const getProductDetails = async (req, res) => {
    const params = req.params;
    const param1 = params.param1;

    // param1 comes in "slugified" e.g. "this is a product" would be "this-is-a-product"
    // de-slugify
    const name = param1.replaceAll("-", " ");

    const sqlStatement = `SELECT * FROM products WHERE Name LIKE LOWER('${name}') ORDER BY LENGTH(Id), Id`;

    try {
        const productArr = await query(sqlStatement);
        const product = productArr[0];

        if (!product) {
            return res.send([]);
        }

        if (product.Category.toLowerCase() === 'coffee') {
            // get product price range
           const priceObj = await getPriceRange(product.Id);
           product.priceRange = priceObj.priceRange;
           product.hasSale = priceObj.hasSale;

           // get size options for drop down
           const priceOptions = await getPriceDropDownOptions(product.Id)
           product.priceOptions = priceOptions;

            // add coffee details for table
            const coffeeDetails = await getCoffeeDetails(product.Id);
            product.coffeeDetails = coffeeDetails;

            //add customer comments
            const customerCommnets = await getCustomerComments(product.Id);
            product.customerCommnets = customerCommnets;
        }


        return res.send(product);
    } catch(err) {
        throw err;
    }

}

const getCoffeeDetails = async (Id) => {
    const sqlStatement = `SELECT * FROM coffee_details WHERE ProductId='${Id}'`;
    const detailsArr = await query(sqlStatement);

    if (!detailsArr || detailsArr.length === 0) {
        return [];
    }
    
    const details = detailsArr[0];

    return details;
}


const getCustomerComments = async (Id) => {
    const sqlStatement = `SELECT * FROM customer_comments WHERE ProductId='${Id}'`;
    const commentsObj = await query(sqlStatement);
    const comments = [];
    commentsObj.forEach(comment => {
        comments.push({
            "id": comment.Id,
            "comment": comment.Comment,
            "commentPoster": comment.CommentPoster
        });
    })

    return comments;
}

module.exports = {
    getProductDetails
 }