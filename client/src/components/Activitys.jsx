import React from 'react'

const Activitys = (props) => {
  return (
    <div>
        <h1>{props.name}</h1>
        <h1>{props.difficulty}</h1>
        <h1>{props.duration}</h1>
        <h1>{props.season}</h1>
    </div>
  )
}

export default Activitys