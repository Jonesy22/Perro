import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask, addTeam } from '../data/actions'
import EditForm from './EditForm'

class EditModal extends Component{
        constructor(props){
            super(props);
        this.state = {
            selectedEditId: 0,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(event.target.TaskName){
            this.props.addTask({Name: event.target.TaskName.value, Estimate: (event.target.TaskEstimate.value), Summary: event.target.TaskSummary.value, Description: (event.target.TaskDescription.value),  parentId:this.props.taskId, childIds:[]})


        }
        if(event.target.ProjectName){
            this.props.addTask({Name: event.target.ProjectName.value, Estimate: (event.target.ProjectEstimate.value), Summary: event.target.ProjectSummary.value, Description: (event.target.ProjectDescription.value),  parentId:this.props.taskId, childIds:[]})
        }
        
    }
    render(){      
        return(
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            type="EditTask"
            inputForm="editForm"
            selectedEditId={this.state.selectedEditId}
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Edit
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <EditForm {...this.props}/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(
    state => ({}),
    { addTask, addTeam }
  )(EditModal)