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

    onDrop = (e) => {
        //console.log('dropped')
        e.stopPropagation();
        e.preventDefault();
        // console.log(this.state) 
        // console.log('dropped')
        var files = e.dataTransfer.files;
        //console.log('files => ' + files)
        var i, f;

        //var emails = []

        for (i = 0, f = files[i]; i !== files.length; ++i) {
            var reader = new FileReader();
            var name = f.name;
            console.log(name)
            reader.onload = (e) => {
                console.log(e)
                var data = e.target.result;


                /* if binary string, read with type 'binary' */
                var workbook = XLSX.read(data, { type: 'binary' });
                // var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                // var data1 = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
                // console.log(data1)

                /* DO SOMETHING WITH workbook HERE */

                 var first_sheet_name = workbook.SheetNames[0];
                 //var second = workbook.SheetNames[1];

                //console.log(first_sheet_name + 'first sheet name')
                //console.log(second + 'second sheet name')
                var address_of_cell = `${this.state.column}${this.state.row}`;

                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];
                //console.log(worksheet + 'work sheet')

                /* Find desired cell */
                var desired_cell = worksheet[address_of_cell];
                //console.log(desired_cell + ' desired cell')

                /* Get the value */
                var desired_value = (desired_cell ? desired_cell.v : undefined);

                //emails = [desired_value, ...emails]
                //console.log(this.state)
                this.setState({results: [desired_value, ...this.state.results]})
                

            };
            console.log(i)
            reader.readAsBinaryString(f);
        }

        //console.log(emails)
        
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