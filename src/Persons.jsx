/* eslint-disable react/prop-types */

const Persons = ({ personsToShow, deleteHandler }) => {
    return (
      <ul>
        {personsToShow.map(person => (
          <li className="person" key={person.id}>
            {person.name} {person.number} 
            <button onClick={()=>deleteHandler(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Persons;