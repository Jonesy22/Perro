import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import React, {useState, useEffect } from 'react'
import TrackingView from './TrackingView'
import DataView from './DataView'
import SummaryView from './SummaryView'

class RightProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewId: 0,
        };
    }

    setView(newViewId) {
        this.setState({
            viewId: newViewId
        })
    }

    render() {
        return(
            <div>                
                <ButtonGroup aria-label="View Selector">
                    <Button variant="primary" onClick={()=>this.setView(0)}>Summary</Button>{' '}
                    <Button variant="primary" onClick={()=>this.setView(1)}>Data</Button>{' '}
                    <Button variant="primary" onClick={()=>this.setView(2)}>Tracking</Button>{' '}
                </ButtonGroup>
                
                {this.state.viewId === 0 &&
                    <SummaryView />
                }

                {this.state.viewId === 1 &&
                    <DataView />
                }

                {this.state.viewId === 2 &&
                    <TrackingView />
                }
                
            </div>
        )
    }
}

export default RightProjectView