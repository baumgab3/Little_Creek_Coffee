const conn = require('../database/connection');
const util = require('util');
const crypto = require('crypto');

const query = util.promisify(conn.query).bind(conn);

const getShippingAddressById = async (req, res) => {

    try {
        const userId = req.params.userId;
        const sqlSelect = `SELECT * FROM shipping_addresses WHERE UserId='${userId}'`;
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
                companyName: "",
                apartmentSuit: ""
            });
        }

        const addressObj = queryResult[0];

        const shippingAddress = {
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
        if (shippingAddress.CompanyName) {
            shippingAddress.companyName = addressObj.CompanyName;
        }

        if (shippingAddress.ApartmentSuit) {
            shippingAddress.apartmentSuit = addressObj.ApartmentSuit;
        }

        return res.send(shippingAddress);

    } catch (err) {
        console.log("getShippingAddressById error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }
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
                companyName: "",
                apartmentSuit: ""
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

const saveShippingAddress = async (req, res) => {
    
    try {
        const user = req.body.user;
        const addressObj = req.body.addressToUpdate;

        const sqlSelect = `SELECT * FROM shipping_addresses WHERE UserId='${user.id}'`;
        const queryResult = await query(sqlSelect);

        // if no array (a recored in db) is returned, then need to do an insert
        if (!queryResult || queryResult.length === 0) {
            // create id for new addreess
            const shippingId = crypto.randomUUID();
            const sqlInsert = `INSERT INTO shipping_addresses (ShippingId, FirstName, LastName, CompanyName, StreetAddress, ApartmentSuit, City, State, ZipCode, UserId) 
                                VALUES ('${shippingId}', '${addressObj.firstName}', '${addressObj.lastName}', '${addressObj.companyName}',
                                '${addressObj.streetAddress}', '${addressObj.apartmentSuit}', '${addressObj.city}', '${addressObj.state}',
                                '${addressObj.zip}', '${user.id}')`;
            
            await query(sqlInsert);
            return res.status(200).json({message: "New shipping address created"});
        }

        // something was in array, so user is updating their address. No insert now, just an update
        const sqlUpdate = `UPDATE shipping_addresses SET
                            FirstName='${addressObj.firstName}', LastName='${addressObj.lastName}', CompanyName='${addressObj.companyName}',
                            StreetAddress='${addressObj.streetAddress}', ApartmentSuit='${addressObj.apartmentSuit}', City='${addressObj.city}',
                            State='${addressObj.state}', ZipCode='${addressObj.zip}' WHERE UserId='${user.id}'`;

        await query(sqlUpdate);
        return res.status(200).json({message: "Shipping address has been updated"});

    } catch (err) {
        console.log("saveShippingAddress error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }
}

const saveBillingAddress = async (req, res) => {
    
    try {
        const user = req.body.user;
        const addressObj = req.body.addressToUpdate;

        const sqlSelect = `SELECT * FROM billing_addresses WHERE UserId='${user.id}'`;
        const queryResult = await query(sqlSelect);

        // if no array (a recored in db) is returned, then need to do an insert
        if (!queryResult || queryResult.length === 0) {
            // create id for new addreess
            const billingId = crypto.randomUUID();
            const sqlInsert = `INSERT INTO billing_addresses (BillingId, FirstName, LastName, CompanyName, StreetAddress, ApartmentSuit, City, State, ZipCode, Phone, Email, UserId) 
                                VALUES ('${billingId}', '${addressObj.firstName}', '${addressObj.lastName}', '${addressObj.companyName}',
                                '${addressObj.streetAddress}', '${addressObj.apartmentSuit}', '${addressObj.city}', '${addressObj.state}',
                                '${addressObj.zip}', '${addressObj.phone}', '${addressObj.email}', '${user.id}')`;
            
            await query(sqlInsert);
            return res.status(200).json({message: "New billing address created"});
        }

        // something was in array, so user is updating their address. No insert now, just an update
        const sqlUpdate = `UPDATE billing_addresses SET
                            FirstName='${addressObj.firstName}', LastName='${addressObj.lastName}', CompanyName='${addressObj.companyName}',
                            StreetAddress='${addressObj.streetAddress}', ApartmentSuit='${addressObj.apartmentSuit}', City='${addressObj.city}',
                            State='${addressObj.state}', ZipCode='${addressObj.zip}', Phone='${addressObj.phone}',
                            Email='${addressObj.email}' WHERE UserId='${user.id}'`;

        await query(sqlUpdate);
        return res.status(200).json({message: "Billing address has been updated"});

    } catch (err) {
        console.log("saveBillingAddress error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }
}

const getBillingAndShippingInfo = async (req, res)=> {

    try {
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

const deleteBillingAddress = async (req, res) => {

    try {
        const userId = req.params.userId;
        const sqlDelete = `DELETE FROM billing_addresses WHERE UserId='${userId}' LIMIT 1`;
        await query(sqlDelete);

        return res.status(200).json({message: "Billing Address has been deleted"});

    } catch (err) {
        console.log("deleteBillingAddress server error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }
}

const deleteShippingAddress = async (req, res) => {

    try {
        const userId = req.params.userId;
        const sqlDelete = `DELETE FROM shipping_addresses WHERE UserId='${userId}' LIMIT 1`;
        await query(sqlDelete);

        return res.status(200).json({message: "Shipping Address has been deleted"});

    } catch (err) {
        console.log("deleteShippingAddress server error", err);
        return res.status(500).json({message: "Server Error", error: err});
    }
}

module.exports = {
    getShippingAddressById,
    getBillingAddressById,
    saveShippingAddress,
    saveBillingAddress,
    getBillingAndShippingInfo,
    deleteBillingAddress,
    deleteShippingAddress
}