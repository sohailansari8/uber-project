const express = require(`express`);
const app = express();
const dotenv = require(`dotenv`);
const cors = require(`cors`);
dotenv.config();
const connectToDb = require(`./db/db`);
const userRoutes = require('./routes/user.routes')
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

app.get(`/`, (req, res) => {
    res.send(`Hello world`);
});

app.use('/users',userRoutes);

module.exports = app