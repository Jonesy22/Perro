import React from 'react';
import { stringSimilarity } from "string-similarity-js";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import { Collapse } from 'antd';
import { PlusOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { setSelectedId, removeTaskDB } from '../data/actions'
import { getSelectedTaskId, getTaskHierarchy, getUserProfile, getSelectedTask, getSearchTask } from "../data/selectors";
import InputModal from './InputModal';

const { Panel } = Collapse;

class MilestoneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {searchTerm: {}, milestones: [], addProjectModalShow: false, addTaskModalShow: false, editProjectModalShow: false, editTaskModalShow: false, showModal: false, deletedId: -1 };
        this.setState({searchTerm: this.props.searchTerm});
        console.log("*************Milestone: ", this.props.searchTerm);
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

    dfs = (parentTask, currentTask) => {
        if (parentTask.content.Name == currentTask.content.Name) {
            return true;
        }
        const children = parentTask.content.children;
        if (!parentTask.content.children) {
        
            Object.entries(parentTask.content.children).map((value, index) => {
                this.dfs(parentTask, value[1]);
            })
        }
        return false;

    }

    buildRecursivePanels = (parentTask) =>  {
        console.log("parentTask name: ", parentTask.content.Name);
        // loop through the children of a parent passed in and see if theyre equal
        const parentsChildren = parentTask.content.children;
        var isChild = false;
        Object.entries(parentTask.content.children).map((value, index) => {
            if (this.dfs(parentTask, value[1])) {
                isChild = true;
            }
        })
        var i;
        if (this.props.searchTerm == "") {
            return <Collapse key={parentTask.id} forceRender={true} ghost={false} bordered={false}>
                <Panel showArrow={parentTask.content.childIds.length > 0} header={<div onClick={(event) => {event.stopPropagation(); this.callback([parentTask.id]);}} style={{display: "flex", overflow:"hidden", flexGrow: "1" }}><div style={{display: "inline-block", whiteSpace: "nowrap", overflow:"hidden", textOverflow: "ellipsis", marginLeft: "41px", marginTop: "10px", marginBottom: "10px"}}>{parentTask.content.Name}{parentTask.content.completed ? "✔" : ""}</div>{this.genAnotherPanel(parentTask.id)}</div>} key={parentTask.id}>
                    {Object.entries(parentTask.content.children).map((value, index) => {
                        return this.buildRecursivePanels(value[1])
                    })}
                </Panel>
            </Collapse>
        }

        else {
            if (stringSimilarity(this.props.searchTerm, parentTask.content.Name) > .15 || isChild || (this.props.searchTerm[0] == parentTask.content.Name[0]) && this.props.searchTerm.length == 1) {
                return <Collapse key={parentTask.id} forceRender={true} ghost={false} bordered={false}>
                    <Panel showArrow={parentTask.content.childIds.length > 0} header={<div onClick={(event) => {event.stopPropagation(); this.callback([parentTask.id]);}} style={{display: "flex", overflow:"hidden", flexGrow: "1" }}><div style={{display: "inline-block", whiteSpace: "nowrap", overflow:"hidden", textOverflow: "ellipsis", marginLeft: "41px", marginTop: "10px", marginBottom: "10px"}}>{parentTask.content.Name}{parentTask.content.completed ? "✔" : ""}</div>{this.genAnotherPanel(parentTask.id)}</div>} key={parentTask.id}>
                     {Object.entries(parentTask.content.children).map((value, index) => {
                         return this.buildRecursivePanels(value[1])
                     })}
                 </Panel>
             </Collapse>
            }
        }
    }

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
        console.log("STATE: ", this.props);
        // this.setState({searchTerm: this.props.searchTerm});
        // console.log("*************Milestone: ", this.props.searchTerm);
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
    state => ({ taskHierarchy: getTaskHierarchy(state), userProfile: getUserProfile(state), selectedId: getSelectedTaskId(state), selectedTask: getSelectedTask(state), searchTerm: getSearchTask(state) }),
    { setSelectedId, removeTaskDB }
  )(MilestoneView)