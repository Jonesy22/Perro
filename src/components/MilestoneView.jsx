import React, {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Collapse } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'
import { getTaskHierarchy } from "../data/selectors";
const { Panel } = Collapse;

class MilestoneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {milestones: []};
    }

    callback(key) {
        console.log(key);
    }

    genAnotherPanel = (taskId) => (
        <div>
            <PlusOutlined
                onClick={event => {
                    console.log("add a new panel");
                    this.handleAddTask(taskId);
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

    buildRecursivePanels = (parentTask) => (
        <Collapse onChange={this.callback} forceRender={true} ghost={true}>
            <Panel header={parentTask.content.text} key={parentTask.id} extra={this.genAnotherPanel(parentTask.id)}>
                {Object.entries(parentTask.content.children).map((value, index) => {
                    return this.buildRecursivePanels(value[1])
                })}
            </Panel>
        </Collapse>
    );

    handleAddTask = (parentId) => {
        // dispatches actions to add task
        console.log("handling new task")
        this.props.addTask({text: "test task name", time: 12, childIds: [], parentId: parentId})
    }

    render() {
        return (
            <div>
                <Button variant="primary">Project</Button>

                <div>
                {Object.entries(this.props.taskHierarchy).map((value, index) => {
                    return this.buildRecursivePanels(value[1]);
                })}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ taskHierarchy: getTaskHierarchy(state) }),
    { addTask }
  )(MilestoneView)