import React, {useState, useEffect } from 'react'
import MilestoneView from './MilestoneView'
import LegendView from './LegendView'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, ChartLabel, DiscreteColorLegend, makeVisFlexible} from 'react-vis';
import { connect } from 'react-redux'
import { addTimeEstimate } from '../data/actions'
import { getGraphDataForTask, getSelectedTask, getSelectedTaskId } from "../data/selectors";

const FlexibleXYPlot = makeVisFlexible(XYPlot);

class TrackingView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {milestones: []};
		this.printName = this.printName.bind(this);
    }
    printName() {
        return (this.props.selectedTask.content.Name);
    }
    render() {
	return (
        <div>
			<h2><b>{this.printName()}</b></h2>
			<LegendView />
            <FlexibleXYPlot height = {500}
				xType = 'time-utc'
				yDomain = {[0, Math.round(this.props.timeEstimateGraphData.estimate[this.props.timeEstimateGraphData.estimate.length - 1].y * 1.1)]}
				xDomain = {[this.props.timeEstimateGraphData.estimate[0].x, this.props.timeEstimateGraphData.estimate[this.props.timeEstimateGraphData.estimate.length - 1].x]}
				margin={{bottom: 110, left: 50, right: 10}} >
					
  		 	<HorizontalGridLines />
            
			<XAxis tickFormat={function tickFormat(d){
						return d.toISOString().substr(0, 10)
					}}
					tickLabelAngle={-90}/>
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
            //Black line
			   color="#41BAFB"
    			data={this.props.timeEstimateGraphData.estimate}
			/>
  		 	<LineMarkSeries
               //Blue line
			   color="#000000"
    			data={this.props.timeEstimateGraphData.actual}
			/>
            
            
			</FlexibleXYPlot>	
        </div>
        )
    }
}

export default connect(
    state => ({selectedTask: getSelectedTask(state), timeEstimateGraphData: getGraphDataForTask(state, getSelectedTaskId(state)) }),
    { addTimeEstimate }
  )(TrackingView)