import React, {useState, useEffect } from 'react'
import GraphView from './GraphView'
import MilestoneView from './MilestoneView'

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
