import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import React, {useState, useEffect } from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { connect } from 'react-redux'
import TrackingView from './TrackingView'
import InputModal from './InputModal'
import DataView from './DataView'
import SummaryView from './SummaryView'
import { getSelectedTaskId } from "../data/selectors";

class RightProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewId: 0,
            commitModalShow: false,
        };
    }

    setView(newViewId) {
        this.setState({
            viewId: newViewId
        })
    }

    render() {
        let commitModalClose = () => this.setState({commitModalShow:false})
        return(
            <div>                
                {/* <ButtonGroup aria-label="View Selector">
                    <Button variant="primary" onClick={()=>this.setView(0)}>Summary</Button>{' '}
                    <Button variant="primary" onClick={()=>this.setView(1)}>Data</Button>{' '}
                    <Button variant="primary" onClick={()=>this.setView(2)}>Tracking</Button>{' '}
                </ButtonGroup> */}

                <Button variant="primary" onClick={()=>this.setState({commitModalShow: true})} style={{float: "right"}}>Commit Time</Button>{' '}
                
                {/* {this.state.viewId === 0 &&
                    <SummaryView />
                }

                {this.state.viewId === 1 &&
                    <DataView />
                }

                {this.state.viewId === 2 &&
                    <TrackingView />
                } */}

                <Tabs defaultActiveKey="trackingView" id="right-side-view-tabs">
                    <Tab eventKey="summaryView" title="Summary">
                        <SummaryView />
                    </Tab>
                    <Tab eventKey="dataView" title="Data">
                        <DataView />
                    </Tab>
                    <Tab eventKey="trackingView" title="Tracking">
                        <TrackingView />
                    </Tab>
                </Tabs>

                <InputModal
                    type= "Commit"
                    inputForm="commitForm"
                    show={this.state.commitModalShow}
                    onHide={commitModalClose}
                    taskId={this.props.selectedTaskId}
                />
            </div>
        )
    }
}


export default connect(
    state => ({ selectedTaskId: getSelectedTaskId(state) }),
    {}
)(RightProjectView)