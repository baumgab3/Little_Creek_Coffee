const util = require('util');
const conn = require('./database/connection');
const query = util.promisify(conn.query).bind(conn);


const getRowCount = async (column, toFind) => {
    const stm  = `SELECT COUNT(${column}) as count FROM users WHERE ${column}='${toFind}'`;
    const result = await query(stm);
    return !result ? 0 : result[0].count;
}

const getCount = async (column, toFind, table) => {
    const stm  = `SELECT COUNT(${column}) as count FROM ${table} WHERE ${column}='${toFind}'`;
    const result = await query(stm);
    return !result ? 0 : result[0].count; 
}

const getUserInsert = (user, hashedPassword) => {
    console.log(user);
    return `INSERT INTO users (UserID, FirstName, LastName, Email, DisplayName, Password) 
    VALUES ('${user.id}', '${user.firstName}', '${user.lastName}', '${user.email}', '${user.displayName}', '${hashedPassword}')`;
}

const getBillingInsert = (billing, userId) => {
    return `INSERT INTO billing_addresses
            (BillingId, FirstName, LastName, CompanyName, StreetAddress, ApartmentSuit, City, State, ZipCode, Phone, Email, UserId)
            VALUES 
            ( '${billing.id}', '${billing.firstName}', '${billing.lastName}', '${billing.companyName}', 
            '${billing.streetAddress}', '${billing.apartmentSuit}', '${billing.city}', '${billing.state}', '${billing.zip}',
            '${billing.phone}', '${billing.email}', '${userId}' )`;
}

const getShippingInsert = (shipping, userId) => {
    return `INSERT INTO shipping_addresses
            (ShippingId, FirstName, LastName, CompanyName, StreetAddress, ApartmentSuit, City, State, ZipCode, UserId)
            VALUES 
            ( '${shipping.id}', '${shipping.firstName}', '${shipping.lastName}', '${shipping.companyName}', 
            '${shipping.streetAddress}', '${shipping.apartmentSuit}', '${shipping.city}', '${shipping.state}',
            '${shipping.zip}', '${userId}' )`;
}

const getBillingUpdate = (billing, userId) => {
    return `UPDATE billing_addresses SET
            FirstName='${billing.firstName}', LastName='${billing.lastName}', CompanyName='${billing.companyName}',
            StreetAddress='${billing.streetAddress}', ApartmentSuit='${billing.apartmentSuit}', City='${billing.city}',
            State='${billing.state}', ZipCode='${billing.zip}', Phone='${billing.phone}', Email='${billing.email}'
            WHERE UserId='${userId}'`;
}

const getShippingUpdate = (shipping, userId) => {
    return `UPDATE shipping_addresses SET
            FirstName='${shipping.firstName}', LastName='${shipping.lastName}', CompanyName='${shipping.companyName}',
            StreetAddress='${shipping.streetAddress}', ApartmentSuit='${shipping.apartmentSuit}', City='${shipping.city}',
            State='${shipping.state}', ZipCode='${shipping.zip}'
            WHERE UserId='${userId}'`;
}

const getPriceDropDownOptions = async (productId) => {

    const sqlPriceStatement = `SELECT * FROM product_pricing WHERE ProductId='${productId}' ORDER BY LENGTH(Id), Id`;
    const priceOptionsObj = await query(sqlPriceStatement);
    const priceOptions = [];
    priceOptionsObj.forEach(option => {
        priceOptions.push({
            "description": option.Description,
            "price": option.Price,
            "salePrice": option.SalePrice
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


// takes date as "2023-04-29 12:35:33" and returns 'April 29, 2023'
const getFormattedDate = (sqlDate) => {
    const dateParts = JSON.stringify(sqlDate).replaceAll("\"", "").split("T");
    const date = dateParts[0].split("-");
    const year = date[0];
    const month = getDayAsMonth(date[1]);
    const day = date[2];

    return `${month} ${day}, ${year}`;
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
    getFormattedDate,
    getCount,
    getUserInsert,
    getBillingInsert,
    getShippingInsert,
    getBillingUpdate,
    getShippingUpdate
}