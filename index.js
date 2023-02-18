const express = require('express')
const app = express()


app.use(express.json())

const students = [
    { id: 1, name: 'jorge', age: 12 },
    { id: 2, name: 'messi', age: 33 },
    { id: 3, name: 'nico', age: 22 },
    { id: 4, name: 'cr7', age: 38 },
]

app.get('/', (req, res) => {
    res.send('Node JS api')
})

app.get('/api/students', (req, res) => {
    res.send(students)
})

app.get('/api/students/:id', (req, res) => {
    const idStudent = students.find(c => c.id === parseInt(req.params.id))
    if (!idStudent) return res.status(404).send('estudiante no encontrado')
    else res.send(idStudent);
})

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: req.body.enroll === 'true'
    }

    students.push(student)
})

app.delete('/api/studens/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id))
    if (!student) return res.status(404).send('estudiante no encontrado')

    const index = students.indexOf(student)
    students.splice(index, 1)
    res.send(student)
})

const port = process.env.port || 80
app.listen(port, () => console.log(`Escuchando puerto ${port}`))