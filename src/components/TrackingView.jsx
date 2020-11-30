import React, {useState, useEffect } from 'react'
import MilestoneView from './MilestoneView'
import LegendView from './LegendView'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries, ChartLabel, DiscreteColorLegend} from 'react-vis';


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
    			data={[
					{x: "01/01/2020", y: 0},
					{x: "01/8/2020", y: .65},
					{x: "01/15/2020", y: 1.3},
					{x: "01/22/2020", y: 1},
					{x: "01/29/2020", y: 1},
					{x: "02/05/2020", y: .75}
			]}
			/>
  		 	<LineMarkSeries
               //Blue line
			   color="#41BAFB"
    			data={[
					{x: "01/01/2020", y: 0},
					{x: "01/8/2020", y: 1.5},
					{x: "01/15/2020", y: 3},
					{x: "01/22/2020", y: 2},
					{x: "01/29/2020", y: 2.5},
					{x: "02/05/2020", y: 3}
			]}
			/>
			<LineMarkSeries
            //Green line
			   color="#4EEA00"
    			data={[
					{x: "01/01/2020", y: 1},
					{x: "01/8/2020", y: 2},
					{x: "01/15/2020", y: 4},
					{x: "01/22/2020", y: 3},
					{x: "01/29/2020", y: 3},
					{x: "02/05/2020", y: 3.5}
			]}
			/>
            
            
			</XYPlot>	
        </div>
        )
    }
}

export default TrackingView
