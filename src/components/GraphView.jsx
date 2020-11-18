import React, {useState, useEffect } from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, ChartLabel} from 'react-vis';

class GraphView extends React.Component {
    render() {
	return (
        <div>
            <XYPlot
 		 		width={800}
  		 		height={500}
				margin={{bottom: 80, left: 50, right: 10, top: 20}} >
  		 	<HorizontalGridLines />
  		 	<LineSeries
    			data={[
      			{x: 1, y: 10},
      			{x: 2, y: 5},
      			{x: 3, y: 15}
    		]}/>
  			<XAxis />
			<YAxis />
		   	<ChartLabel
				text="Time Estimate(Days)"
				xPercent={.45}
    			yPercent={.85}
    			className="alt-x-label"
				style={{
					title: {font: '45px'}
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

export default GraphView
