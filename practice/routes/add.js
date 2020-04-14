const {Router} = require('express');
const router = Router();
const Course = require('../models/course_m');

router.get('/', (req, res, next) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const course = new Course(req.body.title, req.body.price, req.body.img);
    await course.save();
    res.redirect('/courses');
});

module.exports = router;