import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      const confirmDelete = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (!confirmDelete) return;

      const person = persons.find((person) => person.name === newName);
      const changedPerson = { ...person, number: newNumber };

      personService
        .update(person.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
          setMessage(`updated ${changedPerson.name}`);
          setSuccess(true);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(() => {
          setMessage(
            `Information of ${changedPerson.name} has already been removed from server`
          );
          setSuccess(false);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setPersons(
            persons.filter((person) => person.id !== changedPerson.id)
          );
        });
      setNewName("");
      setNewNumber("");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService.create(newPerson).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setSuccess(true);
      setMessage(`added ${newPerson.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => { 
    const person = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}`);
    if (confirmDelete) {
      personService
        .destroy(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          alert(`the person '${person.name}' was already deleted from server`);
          setPersons(persons.filter((person) => person.id !== id));
        });
    }
  };

  const handleChangeName = (event) => {
    setNewName(event.target.value);
  };

  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((person) =>
          person["name"].toUpperCase().includes(filter.toUpperCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success} />
      <Filter value={filter} handleChange={handleChangeFilter} />
      <h2>add a new</h2>
      <PersonForm
        submit={addPerson}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={deletePerson} />
    </div>
  );
};

export default App;
