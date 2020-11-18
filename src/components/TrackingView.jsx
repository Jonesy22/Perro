import React, {useState, useEffect } from 'react'
import GraphView from './GraphView'
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

class TrackingView extends React.Component {
    render() {
        return (
            <div>
                <h2>Tracking View</h2>
				<GraphView />
            </div>
        )
    }
}

export default TrackingView
