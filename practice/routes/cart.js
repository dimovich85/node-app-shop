const {Router} = require('express');
const router = Router();
const Course = require('../models/course_m');
const Cart = require('../models/cart_m');

router.get('/', async (req, res, next) => {
    const cart = await Cart.fetch();
    res.render('cart', {
        courses: cart.courses,
        price: cart.price,
        isCart: true
    });
});

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);
    await Cart.add(course);
    res.redirect('/cart');
});

router.delete('/remove/:id', async (req, res) => {
    const id = req.params.id;
    const cart = await Cart.remove(id);
    return res.status(200).json(cart);
});

module.exports = router;