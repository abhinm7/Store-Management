require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello")
});

app.use('/auth', authRoutes);
app.use('/admin',adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server started on port ", PORT);
})