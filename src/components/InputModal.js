import React, {Component, component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'

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
        //console.log(this.props.taskId)
        
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
                <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={6}>
                            <Form.Group controlId="Name">
                            <Form.Label>{this.props.type} Name</Form.Label>
                            <Form.Control
                                type="text"
                                name={`${this.props.type}Name`}
                                required
                                placeholder={`${this.props.type} Name`}
                            />
                            </Form.Group>
                            <Form.Group controlId="ProjectSummary">
                            <Form.Label>Summary</Form.Label>
                            <Form.Control
                                type="text"
                                name={`${this.props.type}Summary`}
                                required
                                placeholder={`Summary of the ${this.props.type}`}
                            />
                            </Form.Group>   
                        </Col>
                        <Form.Group controlId={`${this.props.type}Estimate`}>
                            <Form.Label>Time Estimate</Form.Label>
                            <Form.Control
                                type="text"
                                name={`${this.props.type}Estimate`}
                                required
                                placeholder="In Hours"
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group controlId={`${this.props.type}Description`}>
                        <Form.Label>{`${this.props.type} Description`}</Form.Label>
                        <Form.Control as="textarea" rows={3} cols={20} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Reporter</Form.Label>
                    <select className="form-control required">
                        placeholder="Assignee"
                        <option>Person1</option>
                    </select>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.onHide}>Create</Button>
                    </Form.Group>
                </Form>
                </div> 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={this.props.onHide}>Cancel</Button>
            </Modal.Footer>
            </Modal>
        )
    }
}

export default connect(
    state => ({}),
    { addTask }
  )(InputModal)