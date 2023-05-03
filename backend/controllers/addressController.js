const conn = require('../database/connection');
const util = require('util');
const crypto = require('crypto');

const query = util.promisify(conn.query).bind(conn);

const getAddressById = async (req, res) => {

    try {

        // verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const addressType = req.params.addressType;
        const table = addressType === 'shipping' ? 'shipping_addresses' : 'billing_addresses';

        const userId = req.params.userId;
        const sqlSelect = `SELECT * FROM ${table} WHERE UserId='${userId}'`;
        const queryResult = await query(sqlSelect);

        const addressObj = {
            firstName: "",
            lastName: "",
            streetAddress: "",
            city: "",
            state: "",
            zip: "",
            companyName: "",
            apartmentSuit: ""
        };

        // billing address have two addtional columns
        if (addressType === 'billing') {
            addressObj.phone = "";
            addressObj.email = "";
        }

        // if address hasn't been set, just return an empty address object
        if (queryResult.length === 0) {
            return res.send(addressObj);
        }

        // there was an address in db, fill out object
        addressObj.firstName = queryResult[0].FirstName;
        addressObj.lastName = queryResult[0].LastName;
        addressObj.streetAddress = queryResult[0].StreetAddress;
        addressObj.city = queryResult[0].City;
        addressObj.state = queryResult[0].State;
        addressObj.zip = queryResult[0].ZipCode;
        addressObj.companyName = queryResult[0].CompanyName;
        addressObj.apartmentSuit = queryResult[0].ApartmentSuit;

        // billing address have two addtional columns
        if (addressType === 'billing') {
            addressObj.phone = queryResult[0].Phone;
            addressObj.email = queryResult[0].Email;
        }

        return res.send(addressObj);

    } catch (err) {
        console.log("getAddressById error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }

}


const saveAddress = async (req, res) => {

    try {

        // verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const addressType = req.params.addressType;
        const user = req.body.user;
        req.body.table = addressType === 'shipping' ? 'shipping_addresses' : 'billing_addresses';

        const sqlSelect = `SELECT * FROM ${req.body.table} WHERE UserId='${user.id}'`;
        const queryResult = await query(sqlSelect);

        // if no array (a recored in db) is returned, then need to do an insert
        if (!queryResult || queryResult.length === 0) {
            const insertQuery = getInsertAddressQuery(req.body);
            await query(insertQuery);
        } else {
            // something was in db, so no insert; just do an update
            const updateQuery = getUpdateAddressQuery(req.body);
            await query(updateQuery);
        }

        // allows users to make billing the same as shipping
        if (req.body.useAsBilling) {
            const sqlSelect = `SELECT * FROM billing_addresses WHERE UserId='${user.id}'`;
            const queryResult = await query(sqlSelect);
            req.body.table = "billing_addresses";

            if (!queryResult || queryResult.length === 0) {
                const insertQuery = getInsertAddressQuery(req.body);
                await query(insertQuery);
            } else {
                const updateQuery = getUpdateAddressQuery(req.body);
                await query(updateQuery);
            }  
        }

        return res.status(200).json({message: "Address has been saved"});

    } catch (err) {
        console.log("saveBillingAddress error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }

}


// helper function for inserts
const getInsertAddressQuery = (addressData) => {
    const address = addressData.addressToUpdate;
    const userId = addressData.user.id;
    const table = addressData.table;

    const id = (table === 'billing_addresses') ? 'BillingId' : 'ShippingId';
    let insertParams = `( ${id}, FirstName, LastName, CompanyName, StreetAddress, ApartmentSuit, City, State, ZipCode`;
    let insertValues = `( '${crypto.randomUUID()}', '${address.firstName}', '${address.lastName}', '${address.companyName}', '${address.streetAddress}',
                        '${address.apartmentSuit}', '${address.city}', '${address.state}', '${address.zip}'`;

    if (table === 'billing_addresses') {
        insertParams += ", Phone, Email";
        insertValues += `, '${address.phone}', '${address.email}'`;
    }

    // always append UserId to insert
    insertParams += ", UserId )";
    insertValues += `, '${userId}' )`;

    return `INSERT INTO ${table} ${insertParams} VALUES ${insertValues}`;
}


// helper function for updates
const getUpdateAddressQuery = (addressData) => {
    const address = addressData.addressToUpdate;
    const userId = addressData.user.id;
    const table = addressData.table;

    let updateParams = `FirstName='${address.firstName}', LastName='${address.lastName}', CompanyName='${address.companyName}',
                        StreetAddress='${address.streetAddress}', ApartmentSuit='${address.apartmentSuit}', City='${address.city}',
                        State='${address.state}', ZipCode='${address.zip}' `;

    if (table === 'billing_addresses' && !addressData.useAsBilling) {
        updateParams += `, Phone='${address.phone}', Email='${address.email}'`;
    }

    return `UPDATE ${table} SET ${updateParams} WHERE UserId='${userId}'`;
}


const deleteAddress = async (req, res) => {

    try {
        // verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const userId = req.params.userId;
        const addressType = req.params.addressType;
        const table = addressType === 'shipping' ? 'shipping_addresses' : 'billing_addresses';

        const sqlDelete = `DELETE FROM ${table} WHERE UserId='${userId}' LIMIT 1`;

        await query(sqlDelete);

        return res.status(200).json({message: "Billing Address has been deleted"});

    } catch (err) {
        console.log("deleteBillingAddress server error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }

}


const getBillingAndShippingInfo = async (req, res)=> {

    try {

        // verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const userId = req.params.userId;
        const sqlBillingSelect = `SELECT FirstName, LastName, StreetAddress, City, ZipCode, State
                                    FROM billing_addresses
                                    WHERE UserID='${userId}'`;

        const queryBillingResult = await query(sqlBillingSelect);

        const sqlShippingSelect = `SELECT FirstName, LastName, StreetAddress, City, ZipCode, State
                                    FROM shipping_addresses
                                    WHERE UserID='${userId}'`;

        const queryShippingResult = await query(sqlShippingSelect);

        const addressObj = {};

        if (!queryBillingResult || queryBillingResult.length != 1) {
            addressObj.billing = [];
        } else {
            addressObj.billing = queryBillingResult[0];
        }

        if (!queryShippingResult || queryShippingResult.length != 1) {
            addressObj.shipping = [];
        } else {
            addressObj.shipping = queryShippingResult[0];
        }
        
        return res.send(addressObj);
        
    } catch (err) {
        console.log("getBillingAndShippingInfo server error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }
}


module.exports = {
    getBillingAndShippingInfo,
    getAddressById,
    saveAddress,
    deleteAddress,
    getInsertAddressQuery
}