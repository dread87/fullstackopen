const mongoose = require('mongoose')

if (process.argv.length !== 5 && process.argv.length !== 3) {
	console.log(process.argv.length)
	console.log('Invalid options', 'Try \'node mongo.js [password] [name] [number]')
	process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://dread97:${password}@dev.lhtnvio.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
	const person = new Person({
		name, number
	})

	person.save().then(result => {
		console.log('person saved!')
		mongoose.connection.close()
	})
}
else {
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}
