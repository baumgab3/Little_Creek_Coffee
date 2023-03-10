const util = require('util');
const conn = require('./database/connection');
const query = util.promisify(conn.query).bind(conn);


const getPriceDropDownOptions = async (productId) => {

    const sqlPriceStatement = `SELECT * FROM product_pricing WHERE ProductId='${productId}' ORDER BY LENGTH(Id), Id`;
    const priceOptionsObj = await query(sqlPriceStatement);
    const priceOptions = [];
    priceOptionsObj.forEach(option => {
        priceOptions.push({
            "description": option.Description,
            "price": option.Price,
            "salePrice": option.salePrice
        });
    })

    return priceOptions;
}

const getPriceRange = async (productId) => {
    try {
        let holder = [];
        let hasSale = false;
        let priceRange = "";
        let priceSqlStatement = `SELECT Price, SalePrice FROM product_pricing WHERE ProductId='${productId}'`;
        const priceReturn = await query(priceSqlStatement);
        const prices = JSON.parse(JSON.stringify(priceReturn));
        
        prices.forEach(price => {
            if (price.SalePrice !== 0) {
                hasSale = true;
                holder.push(price.SalePrice);
            } else {
                holder.push(price.Price);
            }
        })

        holder.sort((a,b) => {return a-b});

        if (holder.length == 1) {
            const num = Number(holder[0]).toFixed(2);
            priceRange = `$${num}`;
        } else {
            const min = Number(holder[0]).toFixed(2);
            const max = Number(holder[holder.length - 1]).toFixed(2);
            priceRange = `$${min} - $${max}`;
        }

        return { "priceRange": priceRange, "hasSale": hasSale };

    } catch(err) {
        throw err;
    }
}


module.exports = {
    getPriceRange,
    getPriceDropDownOptions
}