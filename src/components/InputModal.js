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