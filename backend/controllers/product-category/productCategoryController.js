const conn = require('../../database/connection');
const util = require('util');
const {getPriceRange} = require('../../ServerUtil');

const query = util.promisify(conn.query).bind(conn);

const getProductPreviews = async (req, res) => {
    const params = req.params;
    const param1 = params.param1;
    const param2 = params.param2;

    let sqlStatement;

    if (param1 === 'roast') {
        sqlStatement = `SELECT Id, Name FROM products WHERE Roast='${param2}'`;
    } else if (param1 === 'region') {
        sqlStatement = `SELECT Id, Name FROM products WHERE Region='${param2}'`;
    } else if (param1 === 'cold-brew') {
        sqlStatement = `SELECT Id, Name FROM products WHERE category='cold-brew'`;
    } else {
        return res.send([]);
    }

    try {
        const products = await query(sqlStatement);
        const toReturn = [];

        // get product range and build up return array
        for await (const product of products) {
            const priceObj = await getPriceRange(product);
            const productObj = JSON.parse(JSON.stringify(product));
            const name = productObj.Name;
            toReturn.push({"name": name, "priceRange": priceObj.priceRange, "hasSale": priceObj.hasSale});
        }

        return res.send(toReturn);
    } catch(err) {
        throw err;
    }
}


// const getPriceRange = async (product) => {
//     try {
//         let holder = [];
//         let hasSale = false;
//         let priceRange = "";
//         let priceSqlStatement = `SELECT Price, SalePrice FROM product_pricing WHERE ProductId='${product.Id}'`;
//         const priceReturn = await query(priceSqlStatement);
//         const prices = JSON.parse(JSON.stringify(priceReturn));
        
//         prices.forEach(price => {
//             if (price.SalePrice !== 0) {
//                 hasSale = true;
//                 holder.push(price.SalePrice);
//             } else {
//                 holder.push(price.Price);
//             }
//         })

//         holder.sort((a,b) => {return a-b});

//         if (holder.length == 1) {
//             const num = Number(holder[0]).toFixed(2);
//             priceRange = `$${num}`;
//         } else {
//             const min = Number(holder[0]).toFixed(2);
//             const max = Number(holder[holder.length - 1]).toFixed(2);
//             priceRange = `$${min} - $${max}`;
//         }

//         return { "priceRange": priceRange, "hasSale": hasSale };

//     } catch(err) {
//         throw err;
//     }
// }


module.exports = {
    getProductPreviews,
 }