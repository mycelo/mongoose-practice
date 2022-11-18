const mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost:27017/shopApp');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp', {useNewUrlParser: true, useUnifiedTopology: true});
  console.log('Its connectted')
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function (){
    return `${this.first} ${this.last}`
})

personSchema.pre('save', async function () {
    this.first = 'yo'
    this.last = 'mama'
    console.log('about to save')
})
personSchema.post('save', async function () {
    console.log('just saved')
})

const Person = mongoose.model('Person', personSchema)