import React from 'react'

export default function Header() {
  return (
    <div>
      <div style={style}>
        1. Select cell      
      </div>
      <div style={style}>
        2. Drag and Drop your Exel files 
      </div>
    </div>
    
  )
}

const style = {
  fontSize: '48px',
  color: 'grey',
  textAlign: 'center',
  marginTop: '64px'
}
