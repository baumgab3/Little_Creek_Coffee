const conn = require('../database/connection');
const util = require('util');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const {getFormattedDate, getCount, getUserInsert, getBillingInsert, getShippingInsert, getBillingUpdate, getShippingUpdate} = require("../ServerUtil");
const jwt = require('jsonwebtoken');

const query = util.promisify(conn.query).bind(conn);

const placeOrder = async (req, res) => {

    try {
        const order = req.body;
        const billing = order.billingObj;
        const shipping = order.shippingObj;
        let user = order.user ? order.user : "";

        let userID;
        let ShippingAddressId;
        let BillingAddressId;

        // handle orders that are being place with a new account or by users who do not want to create an account
        if (order.createNewAccount || !user) {

            if (order.createNewAccount) {
                // see if given email exists in database
                const givenLoginCount = await getCount("Email", order.billingObj.email, "users");
                if (givenLoginCount !== 0) {
                    return res.status(409).json({message: "Given username or email already exists"});
                }

                // insert new user
                userID = crypto.randomUUID();
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash("temp", salt);

                user = {
                    "id": userID,
                    "firstName": billing.firstName,
                    "lastName": billing.lastName,
                    "email": billing.email,
                    "displayName": billing.firstName
                }

                const sqlNewUserInsert = getUserInsert(user, hashedPassword)
                await query(sqlNewUserInsert);

            } else {
                userID = "GUEST";
            }

            // assoicate shipping and billing address with new user
            BillingAddressId = crypto.randomUUID();
            billing.id = BillingAddressId;
            const billingInsert = getBillingInsert(billing, userID)
            await query(billingInsert);

            ShippingAddressId = crypto.randomUUID();
            shipping.id = ShippingAddressId;
            const shippingInsert = getShippingInsert(shipping, userID);
            await query(shippingInsert);

        } else {
            // order is being placed by an existing user
            userID = user.id;

            const billingCount = await getCount("UserId", userID, "billing_addresses");

            if (billingCount > 0) {
                const billingUpdate = getBillingUpdate(billing, userID);
                await query(billingUpdate);
            } else {
                BillingAddressId = crypto.randomUUID();
                billing.id = BillingAddressId;
                const billingInsert = getBillingInsert(billing, userID);
                await query(billingInsert);
            }

            const shippingCount = await getCount("UserId", userID, "shipping_addresses");

            if (shippingCount > 0) {
                const shippingUpdate = getShippingUpdate(shipping, userID);
                await query(shippingUpdate);
            } else {
                ShippingAddressId = crypto.randomUUID();
                shipping.id = ShippingAddressId;
                const shippingInsert = getShippingInsert(shipping, userID);
                await query(shippingInsert);
            }


            // We will need existing users shipping/billing ids for the new order below
            const billingIdSelect = `SELECT BillingId FROM billing_addresses WHERE UserId='${userID}' LIMIT 1`;
            const billingResultQuery = await query(billingIdSelect);
            BillingAddressId = billingResultQuery[0];

            const shippingIdSelect = `SELECT ShippingId FROM shipping_addresses WHERE UserId='${userID}' LIMIT 1`;
            const shipingResultQuery = await query(shippingIdSelect);
            ShippingAddressId = shipingResultQuery[0];
        }

        // Addresses have been inserted/updated, can now insert new order

        // create id for order
        const orderId = crypto.randomUUID();
        const sqlInsert = `INSERT INTO orders (OrderId, Quantity, SubTotal, ShippingAddressId, BillingAddressId, UserId)
                            VALUES ('${orderId}', '${order.quantity}', '${order.subtotal}', '${ShippingAddressId}', '${BillingAddressId}', '${userID}')`;

        await query(sqlInsert); 

        // each item in cart needs to be placed in table order_items and associated with table orders
        const cart = order.cart;

        for (const cartItem of cart) {
            //get new id for order_items
            const orderItemId = crypto.randomUUID();

            // some items don't have certain columns, prevent null from being put in db
            if (!cartItem.description) {
                cartItem.description = "";
            }

            if (!cartItem.salePrice) {
                cartItem.salePrice = 0;
            }

            if (!cartItem.grind) {
                cartItem.grind = "";
            }
            
            const sqlItemInsert = `INSERT INTO order_items (OrderItemId, ProductName, Category, Quantity, IndividualPrice, SalePrice, Description, Grind, ProductId, OrderId) 
                                    VALUES ('${orderItemId}', '${cartItem.name}', '${cartItem.category}', '${cartItem.quantity}', '${cartItem.price}', 
                                    '${cartItem.salePrice}', '${cartItem.description}', '${cartItem.grind}', '${cartItem.id}', '${orderId}')`;

            await query(sqlItemInsert);
        }

        // everything went well here, send email to new users
        if (order.createNewAccount) {
            // send new user an email to change password
            sendEmail(billing.email);

            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            user.accessToken = accessToken;

            // if here password and username was valid, return ok
            return res.status(200).json({message: "order placed, new account created", user});

        }

        return res.status(200).json({message: "Order placed"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Server error"});
    }
}

const sendEmail = (to) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: 'Little Creek New Account',
        text: 'Your Little Creek account has been created! Upon next login you will be asked to set a password.'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    }); 

}

const placeOrder_BAK = async (req, res) => {

    if (req.body.user.id !== req.user.id) {
        return res.status(401).json({message: "You are not authorized to update"});
    }

    const user = req.body.user;
    const orderDetails = req.body.orderDetails;

    try {
        // create id for order
        const orderId = crypto.randomUUID();
        const sqlInsert = `INSERT INTO orders (OrderId, Quantity, SubTotal, UserId) 
                            VALUES ('${orderId}', '${orderDetails.quantity}', '${orderDetails.subtotal}', '${user.id}')`;

        await query(sqlInsert); 

        // each item in cart needs to be placed in table order_items and associated with table orders
        const cart = req.body.cart;

        for (const cartItem of cart) {
            //get new id for order_items
            const orderItemId = crypto.randomUUID();

            // not all items have description, prevent null from being put in db
            if (cartItem.description === null) {
                cartItem.description = "";
            }

            if (!cartItem.salePrice) {
                cartItem.salePrice = 0;
            }
            
            const sqlItemInsert = `INSERT INTO order_items (OrderItemId, ProductName, Category, Quantity, IndividualPrice, SalePrice, Description, Grind, ProductId, OrderId) 
                                    VALUES ('${orderItemId}', '${cartItem.name}', '${cartItem.category}', '${cartItem.quantity}', '${cartItem.price}', 
                                    '${cartItem.salePrice}', '${cartItem.description}', '${cartItem.grind}', '${cartItem.id}', '${orderId}')`;

            await query(sqlItemInsert);
        }

        return res.status(200).json({message: "Order placed"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Server Error", error: err});
    }
}


const getOrdersPreview = async (req, res) => {

    try {

        // verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const userId = req.params.userId;
        const sqlStatement = `SELECT * FROM orders WHERE UserId = '${userId}' ORDER BY PlacedDate desc`;
        const orders = await query(sqlStatement);

        const returnOrders = [];

        for (const order of orders) {
            const id = order.OrderId;
            const date = getFormattedDate(order.PlacedDate);
            const status = order.Status;
            const quantity = order.Quantity;
            const total = order.SubTotal;

            const pastOrder = {id, date, status, total, quantity};

            returnOrders.push(pastOrder);
        }

        return res.send(returnOrders);

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Server Error", error: err});
    }

}


const getOrders = async (req, res) => {

    try {

        //verfiy authorized user
        if (req.params.id !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const userId = req.params.userId;
        // get all orders placed from user
        const sqlOrderIdSelect = `SELECT * FROM orders WHERE UserId = '${userId}' ORDER BY PlacedDate`;
        const orders = await query(sqlOrderIdSelect);
        // console.log(orders);

        // holds all of user orders
        const result = [];

        for(const currentOrder of orders) {
            // get all items of given order
            const sqlSelect = `SELECT * FROM order_items WHERE OrderId = '${currentOrder.OrderId}'`;
            const orderItems = await query(sqlSelect);

            // build up object
            const orderObj = {
                "placeDate" : currentOrder.PlacedDate,
                "status" : currentOrder.Status,
                "orders" : orderItems,
            };

            result.push(orderObj);
        }

        res.send(result);

    } catch (err) {
        return res.status(500).json({message: "Server Error", error: err});
    }
}


const getOrderById = async (req, res) => {

    try {
        //verfiy authorized user
        if (req.params.userId !== req.user.id) {
            return res.status(401).json({message: "You are not authorized to update"});
        }

        const orderId = req.params.orderId;
        const sqlSelect = `SELECT * FROM order_items WHERE OrderId = '${orderId}'`;
        const orders = await query(sqlSelect);
        const returnOrders = [];
    
        for (const order of orders) {
            const item = {
                orderId: order.OrderItemId,
                id: order.ProductId,
                category: order.Category,
                name: order.ProductName,
                price: order.IndividualPrice,
                salePrice: order.SalePrice ? order.SalePrice : "",
                quantity: order.Quantity
            }

            if (order.Grind) {
                item.grind = order.Grind;
            }

            if (order.Description) {
                item.description = order.Description;
            }

            returnOrders.push(item);
        }

        // add Status, SubTotal and PlacedDate to returnOrers
        const sqlOrderSelect = `SELECT OrderId, Status, SubTotal, PlacedDate, Quantity FROM orders WHERE OrderId = '${orderId}'`;
        const orderReturn = await query(sqlOrderSelect);
        const orderInfo = orderReturn[0];
        const info = {
            id: orderInfo.OrderId,
            status: orderInfo.Status,
            subTotal: orderInfo.SubTotal,
            placedDate: getFormattedDate(orderInfo.PlacedDate),
            quantity: orderInfo.Quantity
        }

        const orderResult = {
            orderDetails : info,
            order: returnOrders,
        }

        res.send(orderResult);

    } catch (err) {
        console.log("getOrderById error", err);
    }
}


module.exports = {
    placeOrder,
    getOrdersPreview,
    getOrders,
    getOrderById,
}