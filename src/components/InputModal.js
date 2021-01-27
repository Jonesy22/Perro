import React, {Component, component} from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'
import InputForm from './InputForm'
import CommitForm from './CommitForm'

class InputModal extends Component{
    constructor(props){
        super(props);
        //this.state = {takskId:-10};
    }

    components = {
        inputForm: InputForm,
        commitForm: CommitForm
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