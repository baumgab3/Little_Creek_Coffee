const conn = require('../database/connection');
const util = require('util');
const crypto = require('crypto');
const { log } = require('console');

const query = util.promisify(conn.query).bind(conn);

const placeOrder = async (req, res) => {

    // if somehow a user managed to send a post with no cart items, just throw a 401
    if (!req.body || req.body.length === 0) {
        return res.status(401).json({message: "Bad Request"});
    }

    const user = req.body.user;

    try {
        // create id for order
        const orderId = crypto.randomUUID();
        // orders table just needs a new id; status and timestamp are set in database
        const sqlInsert = `INSERT INTO orders (OrderId, UserId) VALUES ('${orderId}', '${user.id}')`;
        await query(sqlInsert); 

        // each item in cart needs to be placed in table order_items and associated with table orders
        const cart = req.body.cart;

        for (const cartItem of cart) {
            //get new id for order_items
            const orderItemId = crypto.randomUUID();

            const sqlItemInsert = `INSERT INTO order_items (OrderItemId, ProductName, Category, Quantity, IndividualPrice, Description, Grind, ProductId, OrderId) 
                                      VALUES ('${orderItemId}', '${cartItem.name}', '${cartItem.category}', '${cartItem.quantity}', '${cartItem.price}', 
                                    '${cartItem.description}', '${cartItem.grind}', '${cartItem.id}', '${orderId}')`;

            await query(sqlItemInsert);
        }

        return res.status(200).json({message: "Order placed"});

    } catch (err) {
        return res.status(500).json({message: "Server Error", error: err});
    }
}


const getOrders = async (req, res) => {
    
    try {
        const userId = req.params.userId;
        // const sqlStatement = `SELECT * FROM orders JOIN order_items ON orders.OrderId = order_items.OrderId WHERE orders.UserId = '${userId}'`;
        // const orders = await query(sqlStatement);
        // return res.send(orders);

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

            console.log(orderItems);

            // build up object
            const orderObj = {
                "placeDate" : currentOrder.PlacedDate,
                "status" : currentOrder.Status,
                "orders" : orderItems
            };

            result.push(orderObj);
        }

        res.send(result);

    } catch (err) {
        return res.status(500).json({message: "Server Error", error: err});
    }


}


module.exports = {
    placeOrder,
    getOrders,
}