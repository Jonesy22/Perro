import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'
import InputForm from './InputForm'
import CommitForm from './CommitForm'
import EditForm from './EditForm';
import EditTeamForm from './EditTeamForm'
import CreateTeamForm from './CreateTeamForm';

class InputModal extends Component{

    components = {
        inputForm: InputForm,
        commitForm: CommitForm,
        editForm: EditForm,
        createTeamForm: CreateTeamForm,
        editTeamForm: EditTeamForm
    };
    
    render(){      
        const TagName = this.components[this.props.inputForm || 'inputForm'] || this.components[0];
        return(
            <Modal
            show={this.props.show}
            onHide={this.props.onHide}
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