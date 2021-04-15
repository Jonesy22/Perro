import React from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { Collapse } from 'antd';
import { PlusOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { setSelectedId, removeTaskDB } from '../data/actions'
import { getSelectedTaskId, getTaskHierarchy, getUserProfile, getSelectedTask } from "../data/selectors";
import InputModal from './InputModal';
const { Panel } = Collapse;

class MilestoneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {milestones: [], addProjectModalShow: false, addTaskModalShow: false, editProjectModalShow: false, editTaskModalShow: false, showModal: false, deletedId: -1 };
    }

    callback = (key) => {
        console.log(parseInt(key[0]));
        let selectedId = parseInt(key[0]);
        if (!isNaN(selectedId)) {
            this.props.setSelectedId(selectedId);
        }
    }

    genAnotherPanel = (taskId) => (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "nowrap", marginLeft: "auto", paddingTop: "12px", paddingBottom: "12px"}}>
            <PlusOutlined
                onClick={event => {
                    console.log("add a new panel");
                    // TODO: Add a new nested panel
                    // If you don't want click extra trigger collapse, you can prevent this:
                    this.setState({addTaskModalShow: true, taskId: taskId})
                    event.stopPropagation();
                }}
            />
            <EditOutlined
                onClick={event => {
                    console.log("edit panel");
                    this.setState({editTaskModalShow: true, taskId: taskId})
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
        <Collapse key={parentTask.id} forceRender={true} ghost={false} bordered={false}>
            <Panel showArrow={parentTask.content.childIds.length > 0} header={<div onClick={(event) => {event.stopPropagation(); this.callback([parentTask.id]);}} style={{display: "flex", overflow:"hidden", flexGrow: "1" }}><div style={{display: "inline-block", whiteSpace: "nowrap", overflow:"hidden", textOverflow: "ellipsis", marginLeft: "41px", marginTop: "10px", marginBottom: "10px"}}>{parentTask.content.Name}{parentTask.content.completed ? "✔" : ""}</div>{this.genAnotherPanel(parentTask.id)}</div>} key={parentTask.id}>
                {Object.entries(parentTask.content.children).map((value, index) => {
                    return this.buildRecursivePanels(value[1])
                })}
            </Panel>
        </Collapse>
    );

    deleteModalClose = () => this.setState({showModal:false});

    deleteSubtasks = () => {
        this.deleteModalClose()
        if(this.props.selectedId === this.state.deletedId) {
            this.props.setSelectedId(this.props.selectedTask.content.parentId)
        }
        this.props.removeTaskDB({taskId: this.state.deletedId, mode: 0})      // mode 0 means deleting all subtasks
    }

    moveSubtasksUp = () => {
        this.deleteModalClose()
        if(this.props.selectedId === this.state.deletedId) {
            this.props.setSelectedId(this.props.selectedTask.content.parentId)
        }
        this.props.removeTaskDB({taskId: this.state.deletedId, mode: 1})      // mode 1 means shifting all subtasks
    }

    render() {
        let addProjectModalClose = () => this.setState({addProjectModalShow:false});
        let addTaskModalClose = () => this.setState({addTaskModalShow:false});
        let editTaskModalClose = () => this.setState({editTaskModalShow:false});
        return (
            <div>
                <Button 
                variant="primary"
                onClick={() => this.setState({addProjectModalShow: true, taskId: null})}
                >Create Project</Button>
                <InputModal
                type= "Project"
                title = "Create Project"
                show={this.state.addProjectModalShow}
                onHide={addProjectModalClose}
                taskId={this.state.taskId}
                closeModalFunc = {this.closeModalFunc}
                />


                <InputModal
                type= "Task"
                title = "Edit Task"
                inputForm="editForm"
                show={this.state.editTaskModalShow}
                onHide={editTaskModalClose}
                taskId={this.state.taskId}
                />


                <InputModal
                type= "Task"
                title = "Create Task"
                show={this.state.addTaskModalShow}
                onHide={addTaskModalClose}
                taskId={this.state.taskId}
                closeModalFunc = {this.closeModalFunc}
                />
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
                    <Modal.Header >
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
    state => ({ taskHierarchy: getTaskHierarchy(state), userProfile: getUserProfile(state), selectedId: getSelectedTaskId(state), selectedTask: getSelectedTask(state) }),
    { setSelectedId, removeTaskDB }
  )(MilestoneView)