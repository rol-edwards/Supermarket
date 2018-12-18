import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MUIDataTable from "mui-datatables";

const columns = [
 {
  name: "Metric",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "Product",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "Exposed",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "Control",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "Uplift",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "Pct Uplift",
  options: {
   filter: true,
   sort: true,
  }
 },
];

const options = {
  filterType: 'checkbox',
  rowsPerPage: 5,
};

class Table extends Component {
  render(){
    return(
      <MUIDataTable
        data={this.props.data}
        columns={columns}
        options={options}
      />
    )
  }
}

export default Table;