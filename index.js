const express = require('express');
const methodOverride = require('method-override');
const app = express();
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }))
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/farmStand")
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((err) => {
        console.log(err);
    });
const Product = require('./models/products');
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category: category })
        res.render('index', { products, category })
    }
    else {
        const products = await Product.find({});
        res.render('index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('new')
})

app.post('/products', async (req, res) => {
    const { name, price, category } = req.body;
    await Product.insertOne({ name: name, price: price, category: category })
    res.redirect('/products');
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const details = await Product.findById(id);
    res.render('details', { details })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('edit', { product })
})

app.put('/products/:id', async (req, res) => {
    const { name, price, category } = req.body;
    const { id } = req.params;
    await Product.findByIdAndUpdate(id, { name: name, price: price, category: category });
    res.redirect('/products');
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})