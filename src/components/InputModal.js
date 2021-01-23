import React, {Component, component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'
import InputForm from './InputForm'

class InputModal extends Component{
    constructor(props){
        super(props);
        //this.state = {takskId:-10};
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
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                Create {this.props.type}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputForm {...this.props}/>
            </Modal.Body>
            </Modal>
        )
    }
}

export default connect(
    state => ({}),
    { addTask }
  )(InputModal)