import React, {Component, component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'

export class InputModal extends Component{
    constructor(props){
        super(props);
    }

    handleSubmit(event){
        event.preventDefault();
        if(event.target.TaskName){
            console.log(event.target.TaskName.value);
            console.log(event.target.TaskSummary.value);
            console.log(event.target.TaskEstimate.value);
            console.log(event.target.TaskDescription.value);
        }
        if(event.target.ProjectName){
            console.log(event.target.ProjectName.value);
            console.log(event.target.ProjectSummary.value);
            console.log(event.target.ProjectEstimate.value);
            console.log(event.target.ProjectDescription.value);
        }
        
    }
    render(){
        // console.log(this.props.type)
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
                        <Button variant="primary" type="submit" >Create</Button>
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
    state => ({ taskHierarchy: getTaskHierarchy(state) }),
    { addTask }
  )(InputModal)