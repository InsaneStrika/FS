const Header = ({course}) => {
    return (
      <div>
      <h2>{course.name}</h2>
      </div>
    )
}

const Part = ({part}) => {
  return (
    <div>
    <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
    {parts.map(part =>
    <Part key={part.id} part={part}/>
    )}
    </div>
  )
}

const Total = ({parts}) => {
  const sum = parts.reduce((s,p)=>s+p.exercises,0)
  console.log(sum)
  return (
    <h3>Number of exercises {sum}</h3>
  )
}

const Course = ({ course }) => {
  return (
    <div>
    <Header course={course}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts} />
    </div>
  )
}

export default Course;