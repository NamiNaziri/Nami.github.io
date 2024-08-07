/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './Notification'
const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState({message:null, isError: false})

  useEffect(() => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)})
  }, [])

  const addPerson = (event) =>
  {
    event.preventDefault()
    const existingPerson = persons.find((person)=> person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
    if(existingPerson)
    {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {id : existingPerson.id, name : existingPerson.name, number : newNumber}
        personService
        .update(existingPerson.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage({message: `Updated ${existingPerson.name}`, isError: false})
          setTimeout(() => {
            setNotificationMessage({message:null, isError: false})
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(
           {message: error.response.data.error, isError:true}
          )
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage({message:null, isError: false})
          }, 5000)

        })
      }
      else{
        setNewName('')
        setNewNumber('')
      }
      return
    }
    const newPersons = {name: newName, number: newNumber}
    personService.create(newPersons).then((returnedPerson) => {
      
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationMessage({message: `Added ${returnedPerson.name}`, isError: false})
      setTimeout(() => {
        setNotificationMessage({message:null, isError: false})
      }, 5000)
    }).catch(error => {
      setNotificationMessage(
        {message: error.response.data.error, isError:true}
       )
       setNewName('')
       setNewNumber('')
       setTimeout(() => {
         setNotificationMessage({message:null, isError: false})
       }, 5000)

      console.log(error.response.data.error)
    })
  }
  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(persons => persons.id === id).name}`)) {
      personService.deletePerson(id).then((returnedPerson) => {
        setPersons(persons.filter(persons => persons.id !== id))
        })
    }
    
  }

  const handleNameChange = (event) =>
  {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>
  {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) =>{
    event.target.value === '' ? setShowAll(true) : setShowAll(false)

    setFilterVal(event.target.value)
  }

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterVal.toLowerCase()))


  return (
    <div>
      <Notification notification={notificationMessage}  />
      <h2>Phonebook</h2>
      <Filter filterVal={filterVal} handleSearchChange={handleSearchChange}/>
      
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
        {personsToShow ? <Persons personsToShow={personsToShow} deleteHandler={deletePerson} />: <></>}
    </div>
  )
}

export default App