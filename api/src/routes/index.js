const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const orderRouter = require("./order.js");
const userRouter = require("./user.js");
const cartRouter = require("./cart.js");
const sugestionRouter = require("./sugestion.js");
const authRouter = require("./auth.js");
const emailForgotRouter = require('./emailforgot.js');
const mercadoPagoRouter = require("./mercadoPago")


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/orders", orderRouter);
router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);
router.use("/users", cartRouter);
router.use("/sugestions", sugestionRouter);
router.use("/auth", authRouter);
router.use("/emailforgot", emailForgotRouter);
router.use("/mercadopago", mercadoPagoRouter);
module.exports = router;
