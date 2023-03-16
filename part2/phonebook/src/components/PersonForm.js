const PersonForm = ({personHandler,nameHandler,numberHandler,name,number}) => {
    return (
        <form onSubmit={personHandler}>
            <div>
                name: <input value={name} onChange={nameHandler} />
            </div>
            <div>
                number: <input value={number} onChange={numberHandler}></input>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm