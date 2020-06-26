const Joi = require('joi');
const logger = require('./logger');
const auth = require('./authenticate');
const express = require("express");
const app = express()

app.use(express.json());

app.use(logger);

app.use();

courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
]

app.get('/', (req, res) => {
    res.send("Hello World!!!!");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        //bad request status code 400
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look for the course
    //if doesnot exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course requested for doesnot exist!!!');

    //validate
    //return 400 if invalid
    const { error } = validateCourse(req.body);

    if (error) {
        //bad request status code 400
        res.status(400).send(error.details[0].message);
        return;
    }

    //update course
    //return the update course
    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course) {
    const Schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, Schema);
}

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course requested for doesnot exist!!!');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course)
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course requested for doesnot exist!!!');
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}...`));