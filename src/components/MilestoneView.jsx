import React, {useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { Collapse } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { addTask, deleteTask } from '../data/actions'
import { getTaskHierarchy } from "../data/selectors";
const { Panel } = Collapse;

class MilestoneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {milestones: [], showModal: false, deletedId: -1};
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
                    this.setState({showModal: true, deletedId: taskId})
                    // TODO: Add deletion to panel
                    // If you don't want click extra trigger collapse, you can prevent this:
                    event.stopPropagation();
                }}
            />
        </div>  
    );

    buildRecursivePanels = (parentTask) => (
        <Collapse onChange={this.callback} key={parentTask.id} forceRender={true} ghost={true}>
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

    deleteModalClose = () => this.setState({showModal:false});

    deleteSubtasks = () => {
        this.deleteModalClose()
        this.props.deleteTask({id: this.state.deletedId, mode: 0})      // mode 0 means deleting all subtasks
    }

    moveSubtasksUp = () => {
        this.deleteModalClose()
        this.props.deleteTask({id: this.state.deletedId, mode: 1})      // mode 1 means shifting all subtasks
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

                <Modal
                    show={this.state.showModal}
                    onHide={this.deleteModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Would you like to delete this tasks and all tasks below it, or move it's subtasks up to it's parent task?
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.deleteModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={this.deleteSubtasks}>
                        Delete Subtasks
                    </Button>
                    <Button variant="primary" onClick={this.moveSubtasksUp}>Move Subtasks to Parent</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({ taskHierarchy: getTaskHierarchy(state) }),
    { addTask, deleteTask }
  )(MilestoneView)