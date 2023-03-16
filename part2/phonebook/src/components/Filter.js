const Filter = ({personFilter, handler }) => {
    return (
        <div>filter shown with<input value={personFilter} onChange={handler} /></div>
    )
}

export default Filter