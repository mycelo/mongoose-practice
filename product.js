const mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017/shopApp');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true});
  console.log('Its connectted')
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be posotive smh']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    catagories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
    
});

// productSchema.methods.greet = function() {
//     console.log(`- from ${this.name}`)
// }

productSchema.methods.toggleOnSale = function() {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.catagories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0})
}

const Product = mongoose.model('Product', productSchema);


const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'mountain bike'});
    console.log(foundProduct)
    await foundProduct.toggleOnSale();
    console.log(foundProduct)
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct)

}
Product.fireSale().then(res => console.log(res))

// findProduct();

// const bike = new Product({ name: 'Cycling Jersey', price: 29.50, catagories:['Cycling'], size: 'S'})
// bike.save()
// .then(data => {
//     console.log('it worked');
//     console.log(data)
// })
// .catch(err => {
//     console.log('oh no error')
//     console.log(err)
// })

// Product.findOneAndUpdate({name: 'Cycling Jersey'}, {price: 28.99},{new: true, runValidators: true})
// .then(data => {
//     console.log('it worked');
//     console.log(data)
// })
// .catch(err => {
//     console.log('oh no error')
//     console.log(err)
// })