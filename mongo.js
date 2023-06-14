const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://dani:${password}@cluster0.9v62asc.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if(name === undefined && number === undefined){
    Contact.find({}).then(result => result.forEach(r => console.log(r)))
}
else{
    const contact = new Contact({name: name, number: number})
    contact.save().then(result => {
        console.log('new contact added')
        mongoose.connection.close()
    })
}
