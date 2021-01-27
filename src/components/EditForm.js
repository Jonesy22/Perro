import { useForm } from "react-hook-form";
import React, {Component, component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { addTask } from '../data/actions';
import { getTaskById } from "../data/selectors";
import { useSelector } from 'react-redux';
import { createTask } from '../data/createObjects.js';

function EditForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const selectedEdit = useSelector(state =>  getTaskById(state, props.selectedEditId));
    const onSubmit = (data) => {
        console.log(data);
        console.log(data.ProjectName);

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
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name={`Name`}
                    placeholder={`Name`}
                    value={selectedEdit.TaskName}
                    ref={register({ required: true })}
                />
                {errors.Name && <p style={pStyle}> {reqFieldError}</p>}
                </Form.Group>
                <Form.Group controlId="ProjectSummary">
                <Form.Label>Summary</Form.Label>
                <Form.Control
                    type="text"
                    name={`Summary`}
                    placeholder={`Summary`}
                    ref={register({ required: true })}
                />
                {errors.Summary && <p style={pStyle}> {reqFieldError}</p>}
                </Form.Group>   
            </Col>
            <Form.Group controlId={`${props.type}Estimate`}>
                <Form.Label>Time Estimate</Form.Label>
                <Form.Control
                    type="text"
                    name={`Estimate`}
                    placeholder="In Hours"
                    ref={register({ required: true, pattern: /^[0-9]*$/g })}
                />
                {console.log(errors)}
                {errors.Estimate && errors.Estimate.type === "pattern" && <p style={pStyle}>Estimate must be a numerical value</p>}
                {errors.Estimate && errors.Estimate.type === "required" && <p style={pStyle}> {reqFieldError}</p>}
            </Form.Group>
        </Row>
        <Form.Group controlId={`Description`}>
            <Form.Label>{`Description`}</Form.Label>
            <Form.Control name={`Description`} as="textarea" rows={3} cols={20} ref={register} />
        </Form.Group>
        <Form.Group>
        <Form.Label>Reporter</Form.Label>
        <select name="Reporter" ref={register({ required: true })} className="form-control required">
            placeholder="Assignee"
            <option>Person1</option>
        </select>
        </Form.Group>
        <Form.Group>
            <Button variant="primary" type="submit">Submit Changes</Button>{' '}
            <Button variant="danger" onClick={props.onHide}>Cancel</Button>
        </Form.Group>
    </Form>
    </div> 
);
}

export default EditForm;