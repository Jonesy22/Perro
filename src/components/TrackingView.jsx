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
            <XYPlot width={800} height={500}
			    xType = 'ordinal'
				margin={{bottom: 80, left: 50, right: 10, top: 20}} >
  		 	<HorizontalGridLines />
               <LegendView />
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
			   color="red"
    			data={[
					{x: "01/01/2020", y: 0},
					{x: "01/8/2020", y: 1},
					{x: "01/15/2020", y: 2},
					{x: "01/22/2020", y: 1},
					{x: "01/29/2020", y: 2},
					{x: "02/05/2020", y: 3}
			]}
			/>
			<LineMarkSeries
			   color="green"
    			data={[
					{x: "01/01/2020", y: 3},
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
