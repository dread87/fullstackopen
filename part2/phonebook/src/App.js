import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personFilter, setNewPersonFilter] = useState('')

  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons=>{
      setPersons(initialPersons)
    })
  },[])

  const addPerson = (event) => {
    event.preventDefault()

    const personsObject = {
      name: newName,
      number: newNumber,
      // id: persons.length+1,
      id: persons.length !== 0 ? (persons[persons.length-1].id + 1) : 1 // set id to the last id from persons[] + 1 or 1 if it's empty to prevent duplicate id's after delete requests
    }

    if (persons.map(person => person.name).includes(newName)) {
      //alert(`${newName} is already added to phonebook`)
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personIndex = persons.findIndex(person=>person.name===newName)
        const newPersonsObject = {...persons[personIndex], number: newNumber}

        personService
        .update(newPersonsObject.id, newPersonsObject)
        .then(returnedPerson=>{
          const newPersons = [...persons]
          newPersons[personIndex] = returnedPerson;
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
        })
      }
    }
    else {
      personService
      .create(personsObject)
      .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
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

  const handleDelete = (id)=>{
    personService
    .remove(id)
    .then(removedObj=>{
      setPersons(persons.filter(person=> person.id!==id))
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleAddFilter} personFilter={personFilter} />

      <h2>Add a new</h2>
      <PersonForm personHandler={addPerson} nameHandler={handleAddName} numberHandler={handleAddNumber} name={newName} number={newNumber} />

      <h2>Numbers</h2>
      <Persons personFilter={personFilter} personsObject={persons} deleteHandler={handleDelete}/>
    </div>
  )
}

export default App
