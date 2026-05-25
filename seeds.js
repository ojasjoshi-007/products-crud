const mongoose = require('mongoose');
const Product = require('./models/products');
mongoose.connect("mongodb://127.0.0.1:27017/farmStand")
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch((err) => {
        console.log(err);
    });


const seedProducts = [
    { name: "Apple", price: 40, category: "fruit" },
    { name: "Milk", price: 60, category: "dairy" },
    { name: "Carrot", price: 30, category: "vegetable" }
];

async function seedDB() {
    await Product.deleteMany({});
    await Product.insertMany(seedProducts);

    console.log("SEEDED");
}

seedDB();

