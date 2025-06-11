const express = require('express')

const app = express()

const hostname = 'localhost'
const port = 3000

app.get('/', (req, res) => {
    res.send('<h1>Hello long</h1>')
})

app.listen(port, hostname, () => {
    console.log(`Hello LongNguyen. Server running at http://${hostname}:${port}/`)
})