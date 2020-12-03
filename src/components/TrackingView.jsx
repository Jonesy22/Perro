import React, {useState, useEffect } from 'react'
import MilestoneView from './MilestoneView'
import LegendView from './LegendView'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, ChartLabel, DiscreteColorLegend} from 'react-vis';
import { connect } from 'react-redux'
import { addTimeEstimate } from '../data/actions'
import { getAllChildTimeEstimates } from "../data/selectors";


class TrackingView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {milestones: []};
    }
    
    render() {
	return (
        <div>
			<LegendView />
            <XYPlot width={800} height={500}
			    xType = 'ordinal'
				margin={{bottom: 80, left: 50, right: 10}} >
					
  		 	<HorizontalGridLines />
            
			<XAxis />
			<YAxis />
            
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
			
            <LineMarkSeries
			//This is the area that needs to be populated using Redux and not hard coded data
            //Black line
			   color="#000000"
    			data={this.props.timeEstimateGraphData.estimate}
			/>
  		 	<LineMarkSeries
               //Blue line
			   color="#41BAFB"
    			data={this.props.timeEstimateGraphData.actual}
			/>
            
            
			</XYPlot>	
        </div>
        )
    }
}

// export default TrackingView
export default connect(
    state => ({ timeEstimateGraphData: getAllChildTimeEstimates(state) }),
    { addTimeEstimate }
  )(TrackingView)