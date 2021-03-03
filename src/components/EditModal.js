import React, {Component, component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'
import EditForm from './EditForm'

class EditModal extends Component{
        constructor(props){
            super(props);
        this.state = {
            selectedEditId: 0,
        };
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
    { addTask }
  )(EditModal)