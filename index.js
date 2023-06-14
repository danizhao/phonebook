require('dotenv').config()

const { response } = require('express')
const express = require('express')
const app = express()
const Contact = require('./models/Contact')
const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.static('build'))

/*let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]*/

app.get('/api/persons', (request, response) => {
    console.log('get all contacts')
    Contact.find({}).then(contacts => {response.json(contacts)})

})

app.post('/api/persons', (request, response) =>{
    const contact = request.body
    if(contact.name === undefined){
        response.status(404).send('please provide a name')
    }
    else if(contact.number === undefined){
        response.status(404).send('please provide a number')
    }
    else if(contacts.find(c => c.name === contact.name)){
        response.status(404).send('name already exists, name must be unique')
    }
    else{
        const c = new Contact({name: contact.name, number: contact.number})
        console.log(`new contact to be added: ${c}`)
        c.save().then(savedContact => {
            response.json(savedContact)
        })
    }

})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>this request has info for ${contacts.length} people </p><br/><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    console.log(`getting a singple contact for id: ${request.params.id}`)
    Contact.findByID(request.params.id).then(contact => {response.json(contact)})
})

app.delete('/api/persons/:id', (request, response) =>{
    console.log(`deleting a contact for id: ${request.params.id}`)
    const id = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === id)
    if(contact){
        response.json(contacts.filter(contact => contact.id !== id))
    }
    else{
        response.status(404).end()
    }
})
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })