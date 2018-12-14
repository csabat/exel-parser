import React, { Component } from 'react'
import XLSX from 'xlsx'
import Selector from './Selector';

export default class ParseInput extends Component {
    

    state = {
        cell: 'A15',
        column: 'A',
        row: '1',
        results: [],
        rABS: true
    }

    onClickHandler = (e) => {
        this.setState({
            results: []
        })
    }

    setupReader = (file) => {
        var name = file.name;
        console.log(name)
        var reader = new FileReader();  
        reader.onload = (e) => {  
            // get file content  
            var data = e.target.result; 
            var workbook = XLSX.read(data, { type: 'binary' });
            var first_sheet_name = workbook.SheetNames[0];
            var address_of_cell = `${this.state.column}${this.state.row}`;
            var worksheet = workbook.Sheets[first_sheet_name];
            var desired_cell = worksheet[address_of_cell];
            var desired_value = (desired_cell ? desired_cell.v : undefined);
            this.setState({results: [desired_value, ...this.state.results]})
        }
        reader.readAsBinaryString(file);
    }
    

    onDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
       
        var files = e.dataTransfer.files;

        Array.from(files).forEach(file => {
            this.setupReader(file)
           })
        
    }

    handleColumnChange = (e) => {
        console.log(e.target.value)
        this.setState({
            column: e.target.value
        })
    }

    handleRowChange = (e) => {
        console.log(e.target.value)
        this.setState({
            row: e.target.value
        })
    }

    render() {
        console.log("re render page")
        return (
            <div style={style}>
                <Selector handleColumnChange={this.handleColumnChange} handleRowChange={this.handleRowChange}/>
                <div  onDrop={this.onDrop} onDragEnter={(e) => e.preventDefault()} onDragOver={e => e.preventDefault()} style={{ height: 200, width: 200, backgroundColor: 'lightGrey', margin: 'auto', border:'3px dashed grey', borderRadius: '20px' }}></div>
                <button onClick={this.onClickHandler} style={{padding: '8px', marginTop: '12px', fontSize:'16px'}}>Reset</button>
                {this.state.results.map(result => (<p>{result} </p>))}
            </div>
        )
    }
}

const style = {
    margin: 'auto',
    textAlign: 'center',
    marginTop: '6rem'
}