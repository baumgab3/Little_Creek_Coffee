const util = require('util');
const conn = require('./database/connection');
const query = util.promisify(conn.query).bind(conn);


const getRowCount = async (column, toFind) => {
    const stm  = `SELECT COUNT(${column}) as count FROM users WHERE ${column}='${toFind}'`;
    const result = await query(stm);
    return !result ? 0 : result[0].count;
}

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


// takes date as "yyyy-mm-dd" and returns something like 'March 30, 2023'
const getFormattedDate = (date) => {
   const dateParts = JSON.stringify(date).split("-");
   console.log(date);
   const year = dateParts[0];
   const month = getDayAsMonth(dateParts[1]);
   const day = dateParts[2];

   return `${year} ${month}, ${day}`;
}

const getDayAsMonth = (day) => {
    // replace padded 0's with blanks
    day = day.startsWith("0") ? day.replaceAll("0", "") : day;

    switch (day) {
        case "1": return "January";
        case "2": return "February";
        case "3": return "March";
        case "4": return "April";
        case "5": return "May";
        case "6": return "June";
        case "7": return "July";
        case "8": return "August";
        case "9": return "September";
        case "10": return "October";
        case "11": return "November";
        case "12": return "December";
    }
}

module.exports = {
    getPriceRange,
    getPriceDropDownOptions,
    getRowCount,
    getFormattedDate
}