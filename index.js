const Joi = require('joi');
const express = require("express");
const app = express()

app.use(express.json());

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
    const Schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, Schema);

    if (result.error) {
        //bad request status code 400
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course requested for doesnot exist!!!');
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}...`));