import React from 'react'
import LegendView from './LegendView'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, ChartLabel, makeVisFlexible} from 'react-vis';
import { connect } from 'react-redux'
import { addTimeEstimate } from '../data/actions'
import { getGraphDataForTask, getSelectedTask, getSelectedTaskId } from "../data/selectors";
import CommitListView from "./CommitListView";

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
		if(this.props.timeEstimateGraphData.actual.length + this.props.timeEstimateGraphData.estimate.length <= 1) {
			var xDomain = [new Date().setDate(Math.min(this.props.timeEstimateGraphData.estimate[0].x.getDate(), new Date().getDate()) - 7), new Date().setDate(Math.max(this.props.timeEstimateGraphData.estimate[0].x.getDate(), new Date().getDate()) + 7)];
		} else {
			 xDomain = [Math.min(this.props.timeEstimateGraphData.estimate[0].x, this.props.timeEstimateGraphData.actual.length > 0 ? this.props.timeEstimateGraphData.actual[0].x : Infinity), Math.max(this.props.timeEstimateGraphData.estimate[this.props.timeEstimateGraphData.estimate.length - 1].x, this.props.timeEstimateGraphData.actual.length > 0 ? this.props.timeEstimateGraphData.actual[this.props.timeEstimateGraphData.actual.length - 1].x : 0)];
		}
		
	return (
        <div>
			<h2><b>{this.printName()}</b></h2>
			<LegendView />
            <FlexibleXYPlot height = {500}
				xType = 'time-utc'
				yDomain = {[0, Math.round(Math.max(this.props.timeEstimateGraphData.estimate[this.props.timeEstimateGraphData.estimate.length - 1].y, this.props.timeEstimateGraphData.actual.length > 0 ? this.props.timeEstimateGraphData.actual[this.props.timeEstimateGraphData.actual.length - 1].y : 0) * 1.1)]}
				xDomain = {xDomain}
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
			   color="#000000"
    			data={this.props.timeEstimateGraphData.estimate}
				onValueMouseOver={(data, event)=>{
					console.log(this.props.timeEstimateGraphData.name)
				  }}
			/>
			{this.props.selectedTask && (
			<Hint value={this.props.selectedTask}>
              <div background={seriesColors['series1']}>
                <div>Name 1:</div>
                <div>${this.state.hoverValue1.y}</div>
              </div>
</Hint>
)}
  		 	<LineMarkSeries
               //Blue line
			   color="#41BAFB"
    			data={this.props.timeEstimateGraphData.actual}
				onValueMouseOver={(data, event)=>{
					console.log(this.props.selectedTask.content.name)
				  }}
			/>
            
            
			</FlexibleXYPlot>	

            <CommitListView></CommitListView>
        </div>
        )
    }
}

export default connect(
    state => ({selectedTask: getSelectedTask(state), timeEstimateGraphData: getGraphDataForTask(state, getSelectedTaskId(state)) }),
    { addTimeEstimate }
  )(TrackingView)