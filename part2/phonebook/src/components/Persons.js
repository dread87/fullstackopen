const Persons = ({ personsObject, personFilter, deleteHandler }) => {
    const filteredPersons = () => personsObject.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase()))
    return (
        <div>
            {filteredPersons().map(person => {
                return(
                    <p key={person.name}>{person.name} {person.number} <button onClick={()=>deleteHandler(person)}>delete</button></p>
                )
            })}
        </div>
    )

}
export default Persons