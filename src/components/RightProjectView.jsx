import Button from 'react-bootstrap/Button'
import React from 'react'
import {Tabs, Tab} from 'react-bootstrap'
import { connect } from 'react-redux'
import TrackingView from './TrackingView'
import InputModal from './InputModal'
import DataView from './DataView'
import SummaryView from './SummaryView'
import SharingView from './SharingView'
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

                <Button variant="primary" onClick={()=>this.setState({commitModalShow: true})} style={{float: "right"}}>Commit Time</Button>{' '}
                

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
                    <Tab eventKey="sharingView" title="Share">
                        <SharingView />
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