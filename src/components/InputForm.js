import { useForm } from "react-hook-form";
import React, {Component, component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { addTask } from '../data/actions'
import {createTask} from '../data/createObjects.js';

function InputForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data)
        if(data.TaskName){
            props.addTask(createTask(data.TaskName, parseInt(data.TaskEstimate), data.DueDate, data.TaskSummary, data.TaskDescription,  props.taskId, []));

        }
        if(data.ProjectName){
            props.addTask(createTask(data.ProjectName, parseInt(data.ProjectEstimate), data.DueDate, data.ProjectSummary, data.ProjectDescription,  props.taskId, []));
        }
        {props.onHide()}
    }

    const pStyle = {
        color: 'red',
    };

    const reqFieldError = "This is a required field"
    return (
    <div className="container">
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col sm={6}>
                    <Form.Group controlId="Name">
                        <Form.Label>{props.type} Name</Form.Label>
                            <Form.Control
                                type="text"
                                name={`${props.type}Name`}
                                placeholder={`${props.type} Name`}
                                ref={register({ required: true })}
                            />
                        {errors.TaskName && <p style={pStyle}> {reqFieldError}</p>}
                        {errors.ProjectName && <p style={pStyle}> {reqFieldError}</p>}
                    </Form.Group>
                    <Form.Group controlId="ProjectSummary">
                        <Form.Label>Summary</Form.Label>
                            <Form.Control
                                type="text"
                                name={`${props.type}Summary`}
                                placeholder={`Summary of the ${props.type}`}
                                ref={register({ required: true })}
                            />
                        {errors.TaskSummary && <p style={pStyle}> {reqFieldError}</p>}
                        {errors.ProjectSummary && <p style={pStyle}> {reqFieldError}</p>}
                    </Form.Group>   
                </Col>
                
                <Col sm={6}>
                    <Form.Group controlId={`${props.type}Estimate`}>
                        <Form.Label>Time Estimate</Form.Label>
                            <Form.Control
                                type="text"
                                name={`${props.type}Estimate`}
                                placeholder="In Hours"
                                ref={register({ required: true, pattern: /^[0-9]*$/g })}
                            />
                        {console.log(errors)}
                        {errors.TaskEstimate && errors.TaskEstimate.type === "pattern" && <p style={pStyle}>Estimate must be a numerical value</p>}
                        {errors.ProjectEstimate && errors.ProjectEstimate.type === "pattern" && <p style={pStyle}>Estimate must be a numerical value</p>}
                        {errors.TaskEstimate && errors.TaskEstimate.type === "required" && <p style={pStyle}> {reqFieldError}</p>}
                        {errors.ProjectEstimate && errors.ProjectEstimate.type === "required" && <p style={pStyle}> {reqFieldError}</p>}

                    </Form.Group>
                    
                    <Form.Group controlId={"DueDate"}>
                        <Form.Label>Due Date</Form.Label>
                            <Form.Control
                                type="date" 
                                defaultValue={new Date().toISOString().substr(0, 10)} 
                                name={"DueDate"}
                                min={new Date().toISOString().substr(0, 10)}
                                ref={register({ required: true })}
                            />
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId={`${props.type}Description`}>
                <Form.Label>{`${props.type} Description`}</Form.Label>
                <Form.Control name={`${props.type}Description`} as="textarea" rows={3} cols={20} ref={register} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Reporter</Form.Label>
                <select name="Reporter" ref={register({ required: true })} className="form-control required">
                    placeholder="Assignee"
                    <option>Person1</option>
                </select>
            </Form.Group>
            <Form.Group>
                <Button variant="primary" type="submit">Create</Button>{' '}
                <Button variant="danger" onClick={props.onHide}>Cancel</Button>
            </Form.Group>
        </Form>
        </div> 
    );
}

export default InputForm;