import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import moment from 'moment'

import Table from './Table.js';
import Chart from './Chart.js';
import Drawer from './Drawer.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBar from 'material-ui/AppBar'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {

      dataSet: 'offer',
      aisleData: [],
      brandData: [],
      offerData: [],

      tableData: [],

      mobileOpen: false,
    };
    this.wkRef = React.createRef()
    this.topRef = React.createRef()
    this.scrollToRef = this.scrollToRef.bind(this)
    
  }

  componentWillMount(){
    axios.get('/api/weekly')
    .then((res) => {
      var newData = res.data;
      var aisleArray = [];
      var brandArray = [];
      var offerArray = [];
      var acount = 1;
      var bcount = 1;
      var ocount = 1;
      var start = '';
      newData.forEach(function(item){

        var obj = ({week_commencing: moment(item["week_commencing"]).format("YYYY-MM-DD"), exposed: item["exposed"], control: item["control"]});

        switch(item["product"]){
          case 'Aisle':
            obj.id = acount;
            acount += 1;
            aisleArray.push(obj)
            return
          case 'Brand':
            obj.id = bcount;
            bcount += 1;
            brandArray.push(obj)
            return
          case 'Offer':
            obj.id = ocount;
            ocount += 1;
            offerArray.push(obj)
            return
        }
      })
      axios.get('/api/topline')
      .then((res) => {

        newData = res.data;
        var tableArray = [];
        var count = 1;
        newData.forEach(function(item){
          var arr = ([item["metric"], item["product"], item["exposed"], item["control"], item["uplift"], item["pct_uplift"], ]);
          tableArray.push(arr)
          count += 1;
        })
        this.setState({aisleData: aisleArray, brandData: brandArray, offerData: offerArray, tableData: tableArray, chartData: aisleArray})
      })
      
      
    })
  }

  scrollToRef(ref){
      window.scrollTo({
          top:ref.current.offsetTop, 
          behavior: "smooth"
      })
  }

  toggleData(option){
    this.setState({dataSet: option})
  };

  handleDrawerToggle = () => {
    var toggled = this.state.mobileOpen
    this.setState(state => ({ mobileOpen: !toggled }));
  };

  
  setChart(option){
    console.log('setchart called')
     switch(option){
      case 'aisle':
        return this.state.aisleData
      case 'brand':
      return this.state.brandData
      case 'offer':
        return this.state.offerData
    }
  }

  render() {
    //console.log('rendering: the data set is : ' + this.state.dataSet)
    //console.log("the chart data is: " + JSON.stringify(chartData))
    this.chartData = this.setChart(this.state.dataSet)

    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Drawer
          scroll={this.scrollToRef}
          wkRef={this.wkRef}
          topRef={this.topRef}
          handleDrawerToggle={this.handleDrawerToggle}
          mobileOpen={this.state.mobileOpen}
          />
          <div ref={this.wkRef}/>
          <div className='main'>
            <h1 >Weekly Data</h1>

            <Button variant="contained" color={(this.state.dataSet == 'aisle') ? "secondary" : "primary"} onClick={() => this.toggleData('aisle')}>Aisle</Button>
            <Button variant="contained" color={(this.state.dataSet == 'brand') ? "secondary" : "primary"} onClick={() => this.toggleData('brand')}>Brand</Button>
            <Button variant="contained" color={(this.state.dataSet == 'offer') ? "secondary" : "primary"} onClick={() => this.toggleData('offer')}>Offer</Button>
           <Card>
            <Chart data={this.chartData}
            start={this.state.start}/>
            </Card>
            <h1 ref={this.topRef}>Top-line values</h1>
            <Table data={this.state.tableData}/>
          </div>
        </MuiThemeProvider>
      </div>  
    );
  }
}

export default App;
