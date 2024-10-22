const Person = ({ name, number }) => (
  <p>
    {name} {number}
  </p>
);


const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          <Person name={person.name} number={person.number} />
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
