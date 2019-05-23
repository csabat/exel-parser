import React, { Component } from 'react'
import XLSX from 'xlsx'
import ColumnSelector from './ColumnSelector';

export default class SingleDocParse extends Component {
    state = {
        model: {
        },
        start: 1,
        end: 10,
        column: '',
        fieldName: '',
        results: [],
        rABS: true
    }

    //create an array with start til end
    //map the arrayrow-> row -> map model.keys(key => )

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
            let rows = [] 
            this.newMethod(this.state.start, this.state.end, rows)
            console.log(rows)
            const values = rows.map((row) => {
              console.log(row);
              let keys = Object.keys(this.state.model);
                let obj = {};
                keys.map((key) => {
                  const cell = `${key}${row}`
                  console.log(cell)
                  const value = worksheet[cell] ? worksheet[cell].v : ''
                  obj = {
                    ...obj,
                    [this.state.model[key]]: value 
                  }
                })
                return obj;
            })
            this.setState({results: values})
        }
        reader.readAsBinaryString(file);
    }
    
    renderModel = () => {
      const keys = Object.keys(this.state.model);
      return keys.map(key => <p>{key} : {this.state.model[key]}</p>)
    }

    onDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
       
        var files = e.dataTransfer.files;

        Array.from(files).forEach(file => {
            this.setupReader(file)
           })
        
    }

    handleSelectorChange = (e, fieldName) => {
        console.log(e.target.value)
        this.setState({
            [fieldName]: e.target.value
        })
    }

    addDataField = (e) => {
      this.setState({
        model: {
          ...this.state.model,
          [this.state.column]: this.state.fieldName
        }
      })
    }

    newMethod(start, end, array) {
      for (let x = start; x < end; x++) {
        array.push(x);
      }
    }
    

    render() {

        const returnJsonData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.results));
      
        console.log(this.state.results)
        return (
           
            <div style={style}>
            { this.state.results.length && <a href={`data: ${returnJsonData}`} download={'data.json'}>Download Data</a> }
            <div style={dataModel}>
              {this.renderModel()}
            </div>
              <div style={dataItemStyle}>
                <ColumnSelector handleColumnChange={(e) => this.handleSelectorChange(e, 'column')}/> :
                <input value={this.state.model.fieldName} onChange={(e) => this.handleSelectorChange(e, 'fieldName')}/>
                <button onClick={this.addDataField}>Add</button>
              </div>
                <div  onDrop={this.onDrop} onDragEnter={(e) => e.preventDefault()} onDragOver={e => e.preventDefault()} style={{ height: 200, width: 200, backgroundColor: 'lightGrey', margin: 'auto', border:'3px dashed grey', borderRadius: '20px' }}></div>
                <button onClick={this.onClickHandler} style={{padding: '8px', marginTop: '12px', fontSize:'16px'}}>Reset</button>
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