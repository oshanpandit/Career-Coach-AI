import React from 'react'

const LetterId = async({params}) => {
  const id=await params.id;
  return (
    <div>LetterId : {id} </div>
  )
}

export default LetterId;