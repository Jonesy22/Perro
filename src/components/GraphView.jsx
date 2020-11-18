import React, {useState, useEffect } from 'react'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

class GraphView extends React.Component {
    render() {
	return (
            <div>
               <XYPlot
 		 width={300}
  		 height={300}>
  		 <HorizontalGridLines />
  		 <LineSeries
    			data={[
      			{x: 1, y: 10},
      			{x: 2, y: 5},
      			{x: 3, y: 15}
    			]}/>
  		 <XAxis />
  		 <YAxis />
		</XYPlot>		
            </div>
        )
    }
}

export default GraphView
