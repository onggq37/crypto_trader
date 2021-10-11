const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

//Connect DB
connectDB();

app.get('/', (req, res) => {
    res.send(`API running`);
})

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(PORT, () => console.log(`Server on port ${PORT}`))