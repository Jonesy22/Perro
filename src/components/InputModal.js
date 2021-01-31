import React, {Component, component} from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'
import InputForm from './InputForm'
//import CommitForm from './CommitForm'
import EditForm from './EditForm';

class InputModal extends Component{
    constructor(props){
        super(props);
        //this.state = {takskId:-10};
    }

    components = {
        inputForm: InputForm,
        //commitForm: CommitForm,
        editForm: EditForm
    };
    
    render(){      
        const TagName = this.components[this.props.inputForm || 'inputForm'] || this.components[0];
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
                {this.props.loadFromSelectedCommitId && <Button onClick={this.props.clickDeleteCommitButton} variant='danger'>Delete</Button>}
            </Modal.Header>
                <Modal.Body>
                    <TagName {...this.props}/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(
    state => ({}),
    { addTask }
  )(InputModal)



/* import React, {Component, component} from 'react';
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
  )(InputModal) */