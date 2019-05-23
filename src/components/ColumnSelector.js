import React from 'react'

export default function ColumnSelector(props) {
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return (
        <div>
            <select style={style} onChange={props.handleColumnChange}>
                {columns.map(column => (<option value={column}>{column}</option>))}
            </select>
        </div>

    )
}


const style= {
    fontSize: '18px',
    margin: '12px'
}