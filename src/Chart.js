import React, { Component } from 'react';
import { Chart, ArgumentAxis, ValueAxis, LineSeries } from "@devexpress/dx-react-chart-material-ui";
import { Scale } from '@devexpress/dx-react-chart';
import { Legend } from '@devexpress/dx-react-chart-material-ui';
import moment from 'moment'

class Chartx extends Component {
  constructor(props){
    super(props);
    this.getLabel = this.getLabel.bind(this)

  }

  getLabel(props){
    const { text, x, y} = props;

    return (
      <React.Fragment>
        <p>whatever</p>
        <ArgumentAxis.Label text={text.slice(5, 10)} x={x} y={y} dominantBaseline='hanging'/>
      </React.Fragment>);
  }

  render(){
    return( 
      <div>
          <Chart
          data={this.props.data}
          height='300'
          width='1100'
          >
            <ArgumentAxis labelComponent={this.getLabel}/>
            <ValueAxis />
            <LineSeries valueField="exposed" argumentField="week_commencing" name='exposed'/>
            <LineSeries valueField="control" argumentField="week_commencing" name='control'/>
            <Scale/>
            <Legend />
          </Chart>
      </div>
    )
  }
 
};

export default Chartx;

