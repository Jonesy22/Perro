import React from 'react'
import {useState, useRef} from 'react';
import LegendView from './LegendView'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, ChartLabel, makeVisFlexible, Hint, LineSeries} from 'react-vis';
import { connect } from 'react-redux'
import { addTimeEstimate } from '../data/actions'
import { getCommitWithTaskId, getGraphDataForTask, getSelectedTask, getSelectedTaskCommits, getSelectedTaskId, getTaskDataByDate } from "../data/selectors";
import CommitListView from "./CommitListView";

const FlexibleXYPlot = makeVisFlexible(XYPlot);

class TrackingView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {milestones: [], hoveredPoint: {
			x: 0,
			y: 0,
			}, 
			isHoveringOverLine: [false, false]};
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
			color="#00000"
				key={0}
				onSeriesMouseOver={(e) => {
					let newHovering = this.state.isHoveringOverLine;
					newHovering[0] = true;
					this.setState({isHoveringOverLine: newHovering})
				}}
				onSeriesMouseOut={(e) => {
					let newHovering = this.state.isHoveringOverLine;
					newHovering[0] = false;
					this.setState({isHoveringOverLine: newHovering})
				}}
				onNearestXY={(e, { index }) => {
				if (this.state.isHoveringOverLine[0]) {
					const hoveredLine = this.props.timeEstimateGraphData.estimate[index];
					this.setState({hoveredPoint: {
					x: hoveredLine.x,
					y: hoveredLine.y,
					}});
				}
				}}
				data={this.props.timeEstimateGraphData.estimate}
			/>

			{this.state.hoveredPoint && this.state.isHoveringOverLine[0] && (this.props.taskByDate[new Date(this.state.hoveredPoint.x).toISOString().substr(0,10)]) && (this.props.taskByDate[new Date(this.state.hoveredPoint.x).toISOString().substr(0,10)]) && <Hint value={this.state.hoveredPoint}>
						  <div style={{backgroundColor: '#b3b6c7', color: 'black',
						  				 border: '2px solid black',
										 borderRadius: 5, padding: '5px',
										 fontSize: '14px'}}>
						  {this.props.taskByDate[new Date(this.state.hoveredPoint.x).toISOString().substr(0,10)].map((value, index) => {
                   				 return  <div>
										<p><b>Name</b>: {value.content.Name}</p>
										<p><b>Description</b>: {value.content.Description}</p>
										<p><b>Due</b>: {value.content.DueDate}</p>
									</div>
                			})}
							<p><b>Story points</b>: {this.state.hoveredPoint.y}</p>
						</div>
					</Hint>}


  		 	<LineMarkSeries
			   color="#41BAFB"
				   key={1}
				   onSeriesMouseOver={(e) => {
					   let newHovering = this.state.isHoveringOverLine;
					   newHovering[1] = true;
					   this.setState({isHoveringOverLine: newHovering})
				   }}
				   onSeriesMouseOut={(e) => {
					   let newHovering = this.state.isHoveringOverLine;
					   newHovering[1] = false;
					   this.setState({isHoveringOverLine: newHovering})
				   }}
				   onNearestXY={(e, { index }) => {
				   if (this.state.isHoveringOverLine[1]) {
					    const hoveredLine = this.props.timeEstimateGraphData.actual[index];
					   this.setState({hoveredPoint: {
					   x: hoveredLine.x,
					   y: hoveredLine.y,
					   }});
				   }
				   }}
				   data={this.props.timeEstimateGraphData.actual}
			   />

			   
			{/* {this.state.hoveredPoint && (this.props.taskByDate[new Date(this.state.hoveredPoint.x).toISOString().substr(0,10)]) && (this.props.taskByDate[new Date(this.state.hoveredPoint.x).toISOString().substr(0,10)]) && <Hint value={this.state.hoveredPoint}>
						  <div style={{background: 'blue', fontSize: '2px'}}>
						  {this.props.taskByDate[new Date(this.state.hoveredPoint.x).toISOString().substr(0,10)].map((value, index) => {
                   				 return  <div>
										<p>{value.content.Name}</p>
										<p>{value.content.Description}</p>
										<p>{value.content.DueDate}</p>
									</div>
                			})}
							<p>{this.state.hoveredPoint.y}</p>
						</div>
					</Hint>} */}
        
            
			</FlexibleXYPlot>	
			<CommitListView></CommitListView>
        </div>
        )
    }
	
}

export default connect(
    state => ({selectedTask: getSelectedTask(state), timeEstimateGraphData: getGraphDataForTask(state, getSelectedTaskId(state)), taskByDate: getTaskDataByDate(state, getSelectedTaskId(state)) }),
    { addTimeEstimate }
  )(TrackingView) 
