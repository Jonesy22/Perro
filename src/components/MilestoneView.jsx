import React, {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Collapse } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

class MilestoneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {milestones: []};
    }

    callback(key) {
        console.log(key);
    }
    genAnotherPanel = () => (
        <div>
            <PlusOutlined
                onClick={event => {
                    console.log("add a new panel")
                    // TODO: Add a new nested panel
                    // If you don't want click extra trigger collapse, you can prevent this:
                    event.stopPropagation();
                }}
                />
            <CloseOutlined
                onClick={event => {
                    console.log("delete panel")
                    // TODO: Add deletion to panel
                    // If you don't want click extra trigger collapse, you can prevent this:
                    event.stopPropagation();
                }}
            />
        </div>  
      );
      
    render() {
        return (
            <div>
                <h2>MilestoneView</h2>
                <Button variant="primary">Project</Button>

                <div>
                <Collapse onChange={this.callback} forceRender={true} ghost={true}>
                    <Panel header="Critical Project" key="1" extra={this.genAnotherPanel()}>

                        <Collapse defaultActiveKey="1" ghost={true}>
                            <Panel header="First Milestone" key="1" extra={this.genAnotherPanel()}>
                                <p>Get Ready...</p>
                            </Panel>
                        </Collapse>

                        <Collapse defaultActiveKey="1" ghost={true}>
                            <Panel header="Second Milestone" key="1" extra={this.genAnotherPanel()}>
                                <p>Prepare Thing...</p>
                                <p>Do Other Thing...</p>
                            </Panel>
                        </Collapse>

                    </Panel>
                </Collapse>
                </div>
            </div>
        )
    }
}

export default MilestoneView