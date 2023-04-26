const { getPriceRange } = require('../ServerUtil');
const conn = require('../database/connection');
const util = require('util');

const query = util.promisify(conn.query).bind(conn);


const getSearchResults = async (req, res) => {

    try {
        const searchResults = [];
        const words = req.params.words.split(" ");

        // Have a map of product ids so no duplicate products are added
        const ids = new Map();

        for (const word of words) {
            const sqlSelect = `SELECT * FROM products WHERE
                                Name LIKE '%${word}%' OR
                                Roast LIKE '%${word}%' OR
                                Region LIKE '%${word}%' OR
                                Category LIKE '%${word}%'
                                `;
            const sqlResult = await query(sqlSelect);

            // get product range and build up return array
            for await (const product of sqlResult) {
                if (ids.has(product.Id) === false) {
                    const priceObj = await getPriceRange(product.Id);
                    const productObj = JSON.parse(JSON.stringify(product));
                    const name = productObj.Name;
                    searchResults.push({"id": product.Id ,"name": name, "priceRange": priceObj.priceRange, "hasSale": priceObj.hasSale});
                } 
                
                ids.set(product.Id, true);
            }
        }

        return res.send(searchResults)

    } catch(err) {
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }  

}

module.exports = {
    getSearchResults
 }