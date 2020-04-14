const {Router} = require('express');
const router = Router();
const Course = require('../models/course_m');

router.get('/', async (req, res, next) => {
    let courses = await Course.getAll();
    res.render('courses', {
        title: 'Все курсы',
        isCourses: true,
        courses
    });
});

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id);
    res.render('course', {
        layout: 'empty',
        course
    });
});

router.get('/:id/edit', async (req, res) => {
    if( !req.query.allow ){
        return res.redirect('/');
    } else{
        const course = await Course.getById(req.params.id);
        return res.render('course-edit', {course});
    }
});

router.post('/edit', async (req, res) => {
    await Course.update( req.body.id, req.body);
    return res.redirect('/courses');
});

module.exports = router;