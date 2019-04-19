import React, { Component } from 'react'
import XLSX from 'xlsx'
import Selector from './Selector';

export default class ParseInput extends Component {
    state = {
        cells: [],
        cell: 'A15',
        model: [],
        nameColumn: 'A',
        nameRow: '1',
        valueColumn: 'A',
        valueRow: '1',
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
            var worksheet = workbook.Sheets[first_sheet_name];
            const values = this.state.cells.map((cell) => `${worksheet[cell.key].v} : ${worksheet[cell.value].v} \n`)
            this.setState({results: [...values, ...this.state.results]})
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

    handleColumnChange = (e, fieldName) => {
        console.log(e.target.value)
        this.setState({
            [fieldName]: e.target.value
        })
    }

    handleRowChange = (e, fieldName) => {
        console.log(e.target.value)
        this.setState({
            [fieldName]: e.target.value
        })
    }

    addDataField = (e) => {
      this.setState({
        cells: [
          ...this.state.cells,
          {
            key: `${this.state.nameColumn}${this.state.nameRow}`,
            value: `${this.state.valueColumn}${this.state.valueRow}` 
          }
        ]
      })
    }

    renderDataModel = (rows) => rows.map(row => <p>{row.key} : {row.value}</p>)

    render() {
        console.log("re render page")
        return (
            <div style={style}>
              <div style={dataModel}>
                {'{'}
                {this.renderDataModel(this.state.cells)}
                {'}'}
              </div>
              <div style={dataItemStyle}>
                <Selector handleColumnChange={(e) => this.handleColumnChange(e, 'nameColumn')} handleRowChange={(e) => this.handleRowChange(e, 'nameRow')}/> :
                <Selector handleColumnChange={(e) => this.handleColumnChange(e, 'valueColumn')} handleRowChange={(e) => this.handleRowChange(e, 'valueRow')}/>
                <button onClick={this.addDataField}>Add</button>
              </div>
                <div  onDrop={this.onDrop} onDragEnter={(e) => e.preventDefault()} onDragOver={e => e.preventDefault()} style={{ height: 200, width: 200, backgroundColor: 'lightGrey', margin: 'auto', border:'3px dashed grey', borderRadius: '20px' }}></div>
                <button onClick={this.onClickHandler} style={{padding: '8px', marginTop: '12px', fontSize:'16px'}}>Reset</button>
                {this.state.results.map(result => (<p>{'{'} {result} {'}'} </p>))}
            </div>
        )
    }
}

const style = {
    padding: '0 6rem',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '6rem'
}

const dataItemStyle = {
  border: '1px solid grey',
  display: 'flex',
  justifyContent: 'center',
}

const dataModel = {
  padding: '1rem',
  border: '1px solid grey',
  backgroundColor: 'aquamarine'
}