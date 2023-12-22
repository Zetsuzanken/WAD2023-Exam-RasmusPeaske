const express = require('express');
const pool = require('./database');
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port);
});

// Get all courses
app.get('/api/courses', async (req, res) => {
    try {
        console.log("A GET all request has arrived");
        const courses = await pool.query("SELECT * FROM courses");
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a specific course by ID
app.get('/api/courses/:id', async (req, res) => {
    const courseId = req.params.id;

    try {
        console.log(`A GET request for course ${courseId} has arrived`);
        const course = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);

        if (course.rows.length === 0) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.json(course.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
