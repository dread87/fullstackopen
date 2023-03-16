const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}
const Header = ({ course }) => {
    return (
        <h1>{course}</h1>
    )
}
const Part = ({ name, exercise }) => {
    return (
        <p>{name} {exercise}</p>
    )
}
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part name={part.name} exercise={part.exercises} key={part.id} />)}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, currentPart) => accumulator + currentPart.exercises, 0)

    return (
        <p>total of {total} exercises</p>
    )
}

export default Course