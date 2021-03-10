const { Order, Product, User } = require('../db.js');
const server = require('express').Router();
var nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const { EMAIL_PASS, EMAIL_USER } = process.env;

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

const { ACCESS_TOKEN } = process.env;

// Agrega credenciales
mercadopago.configure({
    access_token: ACCESS_TOKEN
});

//Ruta que genera la URL de MercadoPago
server.get("http://localhost:3001/", (req, res) => {

    const { id } = req.query;

    Order.findAll({
        where: { id },
        include: [{ model: Product }]
    }).then(data => {
        const carrito = data[0].products;
        const items_ml = carrito.map(elem => ({
            title: elem.name,
            unit_price: Math.round(elem.price * 1.19), // Agrega el 19% IVA al producto
            quantity: elem.order_line.count
        }))
        let preference = {
            items: items_ml,
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                installments: 3  //Cuotas
            },
            back_urls: {
                success: `http://localhost:4000/mercadopago/purchaseSuccess/${id}`,
                failure: `http://localhost:4000/mercadopago/purchaseFailure/${id}`,
            }
        };
        mercadopago.preferences.create(preference)
            .then(function (response) {
                payUrl = response.body.init_point;
                res.redirect(payUrl);
            })
            .catch(function (error) {
                console.log(error);
            })
    });
});


server.get("http://localhost:3001/purchaseSuccess/:id", (req, res) => {

    const { id } = req.params;


    Order.findOne({
        where: { id },
        include: [
            { model: Product },
            { model: User }
        ]
    }).then(data => {

        data.state = "cart";
        data.iva = Math.round(data.price * 0.19);
        data.subTotal = data.price;
        data.price = data.iva + data.subTotal;
        data.save();


        const items = data.products;
        const to = data.user.email;

        const itemsData = items.map(elem => ({
            name: elem.name,
            processor: elem.processor,
            screen: elem.screen,
            ram: elem.ram,
            storage: elem.storage,
            camara: elem.camara,
            frontcamara: elem.frontcamara,
            battery: elem.battery,
            others: elem.others,
            dimensions: elem.dimensions,
            price: elem.price,
            img: elem.img
        }));


        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: true,
            },
        });
        transporter.use("compile",
            hbs({
                viewEngine: "express-handlebars",
                viewPath: "",
            })
        );
        var mailOptions = {
            from: "sellphone654@gmail.com",
            to: to,
            subject: "Successful purchase",
            template: "main",
            context: {
                one: 'Congratulations!',
                two: 'The purchase payment was paid successfully.',
                three: 'Go to SellPhone Store',
                four: ''
            }
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                console.log(`email enviado a ${to}`);
                res.redirect("http://localhost:3001/me/shopping");
            }
        });
    })

});
server.get("http://localhost:3001/purchaseFailure/:id", (req, res) => {

    const { id } = req.params;

    Order.findOne({
        where: { id },
        include: [
            { model: Product },
            { model: User }
        ]
    }).then(data => {
        data.state = "inProcess";
        data.save();

        const items = data.products;
        const to = data.user.email;

        const itemsData = items.map(elem => ({
            name: elem.name,
            processor: elem.processor,
            screen: elem.screen,
            ram: elem.ram,
            storage: elem.storage,
            camara: elem.camara,
            frontcamara: elem.frontcamara,
            battery: elem.battery,
            others: elem.others,
            dimensions: elem.dimensions,
            price: elem.price,
            img: elem.img
        }));


        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: true,
            },
        });
        transporter.use("compile",
            hbs({
                viewEngine: "express-handlebars",
                viewPath: "",
            })
        );
        var mailOptions = {
            from: "sellphone654@gmail.com",
            to: to,
            subject: "Pending purchase",
            template: "main",
            context: {
                one: "Oops ... something didn't go right.",
                two: 'Payment failed, please go back to your cart and try again.',
                three: 'Go to cart',
                four: 'http://localhost:3001/cart'
            }
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                console.log(`email enviado a ${to}`);
                res.redirect("http://localhost:3001/");
            }
        });
    })

})
module.exports = server;