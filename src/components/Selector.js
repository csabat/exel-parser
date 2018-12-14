import React from 'react'

export default function Selector(props) {
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    return (
        <div>
            <select style={style} onChange={props.handleColumnChange}>
                {columns.map(column => (<option value={column}>{column}</option>))}
            </select>

            <select style={style} onChange={props.handleRowChange}>
                {Array(99 - 0 + 1).fill().map((_, idx) => 1 + idx).map((num) => (<option value={num}>{num}</option>))}
            </select>
        </div>

    )
}


const style= {
    fontSize: '18px',
    margin: '12px'
}