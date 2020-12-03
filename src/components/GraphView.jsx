import React, {useState, useEffect } from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, ChartLabel, DiscreteColorLegend} from 'react-vis';
import { connect } from 'react-redux'
import { addTimeEstimate } from '../data/actions'
import { getAllChildTimeEstimates } from "../data/selectors";

class GraphView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {milestones: []};
	}
    render() {
	console.log(this.props.timeEstimateGraphData)
	return (
        <div>
            <XYPlot
 		 		width={800}
				   height={500}
				   xType = 'ordinal'
				margin={{bottom: 80, left: 50, right: 10, top: 20}} >
  		 	<HorizontalGridLines />
  		 	<LineMarkSeries
			   color="red"
    			data={this.props.timeEstimateGraphData.estimate}
			/>
			<LineMarkSeries
			   color="green"
    			data={this.props.timeEstimateGraphData.actual}
			/>
			  <XAxis 
			  style={{
				  fontSize:'14px'
			  }}
			  />
			<YAxis 
			style={{
				  fontSize:'14px',
			  }}/>
		   	<ChartLabel
				text="Time Estimate(Days)"
				xPercent={.45}
    			yPercent={.85}
    			className="alt-x-label"
				style={{
					text: {fontSize: '45px'},
				}}
			/>
			<ChartLabel
				text="Days Work"
				xPercent={.01}
    			yPercent={.3}
    			className="alt-y-label"
				style={{
					title: {size: '45px'},
					transform: 'rotate(-90)',
					textAnchor: 'end'
				}}
			/>
			</XYPlot>	
        </div>
        )
    }
}

// export default GraphView
export default connect(
    state => ({ timeEstimateGraphData: getAllChildTimeEstimates(state) }),
    { addTimeEstimate }
  )(GraphView)