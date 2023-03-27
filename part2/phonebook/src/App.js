import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const notificationStyle = {
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setNewPersonFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  const updateNotification = (text) => {
    setNotification(text)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personsObject = {
      name: newName,
      number: newNumber,
      // id: persons.length+1,
      id: persons.length !== 0 ? (persons[persons.length - 1].id + 1) : 1 // set id to the last id from persons[] + 1 or 1 if it's empty to prevent duplicate id's after delete requests
    }

    if (persons.map(person => person.name).includes(newName)) {
      //alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personIndex = persons.findIndex(person => person.name === newName)
        const newPersonsObject = { ...persons[personIndex], number: newNumber }

        personService
          .update(newPersonsObject.id, newPersonsObject)
          .then(returnedPerson => {
            const newPersons = [...persons]
            newPersons[personIndex] = returnedPerson;
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
            setNotificationColor('green')
            updateNotification(`Updated ${returnedPerson.name}`)
          })
          .catch(error=>{
            setNotificationColor('red')
            updateNotification(error.response.data.error)
          })
      }
    }
    else {
      personService
        .create(personsObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationColor('green')
          updateNotification(`Added ${returnedPerson.name}`)
        })
        .catch(error=>{
          setNotificationColor('red')
          updateNotification(error.response.data.error)
        })
    }
  }

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAddFilter = (event) => {
    setNewPersonFilter(event.target.value)
  }

  const handleDelete = (person) => {
    personService
      .remove(person.id)
      .then(removedObj => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
      .catch(error => {
        if (error.response.status === 404) {
          setNotificationColor('red')
          setNotification(`Information of ${person.name} has already been removed from server`)
        }
        console.log(error)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} notificationStyle={{...notificationStyle, color: notificationColor}}/>
      <Filter handler={handleAddFilter} personFilter={personFilter} />

      <h2>Add a new</h2>
      <PersonForm personHandler={addPerson} nameHandler={handleAddName} numberHandler={handleAddNumber} name={newName} number={newNumber} />

      <h2>Numbers</h2>
      <Persons personFilter={personFilter} personsObject={persons} deleteHandler={handleDelete} />
    </div>
  )
}

export default App
