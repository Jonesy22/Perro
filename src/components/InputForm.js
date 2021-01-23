import { useForm } from "react-hook-form";
import React, {Component, component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux'
import { addTask } from '../data/actions'

function InputForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data.ProjectName)
        if(data.TaskName){
            props.addTask({Name: data.TaskName, Estimate: (data.TaskEstimate), Summary: data.TaskSummary, Description: (data.TaskDescription),  parentId:props.taskId, childIds:[]})

        }
        if(data.ProjectName){
            props.addTask({Name: data.ProjectName, Estimate: (data.ProjectEstimate), Summary: data.ProjectSummary, Description: (data.ProjectDescription),  parentId:props.taskId, childIds:[]})
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
        </Row>
        <Form.Group controlId={`${props.type}Description`}>
            <Form.Label>{`${props.type} Description`}</Form.Label>
            <Form.Control name={`${props.type}Desription`} as="textarea" rows={3} cols={20} ref={register} />
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