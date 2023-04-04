const conn = require('../database/connection');
const util = require('util');
const crypto = require('crypto');
const {getFormattedDate} = require("../ServerUtil");

const query = util.promisify(conn.query).bind(conn);

const getShippingAddressById = (userId) => {
    console.log(userId);
}

const getBillingAddressById = async (req, res) => {

    try {
        const userId = req.params.userId;
        const sqlSelect = `SELECT * FROM billing_addresses WHERE UserId='${userId}'`;
        const queryResult = await query(sqlSelect);

        // if billing address hasn't been set, just return the empty obj
        if (queryResult && queryResult.length === 0) {
            return res.send( {
                firstName: "",
                lastName: "",
                streetAddress: "",
                city: "",
                state: "",
                zip: "",
                phone: "",
                email: "",
            });
        }

        const addressObj = queryResult[0];

        const billingAddress = {
            firstName: addressObj.FirstName,
            lastName: addressObj.LastName,
            streetAddress: addressObj.StreetAddress,
            city: addressObj.City,
            state: addressObj.State,
            zip: addressObj.ZipCode,
            phone: addressObj.Phone,
            email: addressObj.Email,
        }

        // add optional columns
        if (billingAddress.CompanyName) {
            billingAddress.companyName = addressObj.CompanyName;
        }

        if (billingAddress.ApartmentSuit) {
            billingAddress.apartmentSuit = addressObj.ApartmentSuit;
        }

        return res.send(billingAddress);

    } catch (err) {
        console.log("getBillingAddressById error", err);
        return res.status(500).json({message: "Server Error", error: err});

    }

   


}


module.exports = {
    getShippingAddressById,
    getBillingAddressById
}