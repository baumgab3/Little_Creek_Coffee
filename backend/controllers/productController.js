const conn = require('../database/connection');
const util = require('util');
const {getPriceRange, getProductPriceRange, getPriceDropDownOptions} = require('../ServerUtil');


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

        // get product price range
        const priceObj = await getPriceRange(product.Id);
        product.priceRange = priceObj.priceRange;
        product.hasSale = priceObj.hasSale;

        // get size options for drop down
        const priceOptions = await getPriceDropDownOptions(product.Id);
        product.priceOptions = priceOptions;

        if (product.Category.toLowerCase() === 'coffee') {
            // add coffee details for table
            const coffeeDetails = {
                "tastingNotes": product.TastingNotes,
                "body": product.Body,
                "brightness": product.Brightness,
                "farm": product.Farm,
                "variety": product.Variety,
                "altitude": product.Altitude,
                "process": product.Process
            };

            product.coffeeDetails = coffeeDetails;

            //add customer comments
            const customerComments = await getCustomerComments(product.Id);
            if (customerComments.length > 0) {
                product.customerComments = customerComments;
            }
            
        }

        return res.send(product);
    } catch(err) {
        throw err;
    }
}

const getProductDetailsShort = async (req, res) => {
   
    try {

        const productId = req.params.productId;
        const sqlStatement = `SELECT Id, Name, ShortDescription, Category FROM products WHERE Id='${productId}'`;

        const queryResult = await query(sqlStatement);
        const product = queryResult[0];

        // // get product price range
        const priceObj = await getPriceRange(productId);
        product.priceRange = priceObj.priceRange;
        product.hasSale = priceObj.hasSale;

        // get size options for drop down
        const priceOptions = await getPriceDropDownOptions(productId);
        product.priceOptions = priceOptions;
 
        return res.send(product);

    } catch(err) {
        throw err;
    }
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

const getProductPrice = async (req, res) => {

    try {
        const productId = req.params.productId;

        const sqlSelect = `SELECT Price, SalePrice, Description FROM product_pricing WHERE ProductId = '${productId}'`;
        // if order has price description then need that in query
        const queryResult = await query(sqlSelect);

        const prices = [];

        for (const priceOption of queryResult) {
            const priceObj = {
                price: priceOption.Price,
                salePrice: priceOption.SalePrice,
                description: priceOption.Description ? priceOption.Description : ""
            }

            prices.push(priceObj);
        }

        res.send(prices);

    } catch (err) {

    }
}

module.exports = {
    getProductDetails,
    getProductDetailsShort,
    getProductPrice
 }