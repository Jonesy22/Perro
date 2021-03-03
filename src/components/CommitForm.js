import { useForm } from "react-hook-form";
import React, {Component, component, useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { addCommit, uploadCommit } from '../data/actions'
import { createCommit } from '../data/createObjects.js';
import { getCommitWithTaskId } from "../data/selectors";

function CommitForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const selectedCommit = useSelector(state => props.loadFromSelectedCommitId ? getCommitWithTaskId(state, props.taskId, props.selectedCommitId) : createCommit(null, "", props.taskId, null, "", null, false, ""));
    const [completedSwitch, setCompletedSwitch] = useState(selectedCommit.commitCompleted);
    
    const onSubmit = (data) => {
        console.log(data)
        console.log(completedSwitch);

        // selectedCommit.commitId will be -1 above if props.loadFromSelectedCommitId = false and thus will generate a new id in the action addCommit()
        // dispatch(addCommit(createCommit(selectedCommit.commitId, data.commitName, props.taskId, parseInt(data.commitWorkCompleted), data.commitDescription, data.commitTimestamp, completedSwitch, data.commitReporter)))
        dispatch(uploadCommit(createCommit(selectedCommit.commitId, data.commitName, props.taskId, parseInt(data.commitWorkCompleted), data.commitDescription, data.commitTimestamp, completedSwitch, data.commitReporter)))
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
                <Col>
                    <Form.Group controlId="commitName">
                        <Form.Label>Name</Form.Label>
                        <Form.Label style={{display: "flex", float: "right"}}>Completed</Form.Label>
                        <div  style={{display: "flex", flexDirection: "col"}}>
                            <Form.Control
                                style={{marginRight: "10px"}}
                                defaultValue={selectedCommit.commitName}
                                type="text"
                                name="commitName"
                                placeholder={`${props.type} Name`}
                                ref={register({ required: true })}
                            />
                            <Form.Check inline type="switch" checked={completedSwitch} onChange={() => setCompletedSwitch(!completedSwitch)} id="custom-switch" style={{margin: "6px"}}/>
                        </div>
                        {errors.commitName && <p style={pStyle}> {reqFieldError}</p>}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col sm={6}>
                    <Form.Group controlId="commitWorkCompleted">
                        <Form.Label>Work Completed</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={selectedCommit.commitWorkCompleted}
                                name="commitWorkCompleted"
                                placeholder="Same Units as Task Estimation"
                                ref={register({ required: true, pattern: /^[0-9]*$/g })}
                            />
                        {errors.commitWorkCompleted && errors.commitWorkCompleted.type === "pattern" && <p style={pStyle}>Estimate must be a numerical value</p>}
                        {errors.commitWorkCompleted && errors.commitWorkCompleted.type === "required" && <p style={pStyle}> {reqFieldError}</p>}

                    </Form.Group>
                </Col>

                <Col sm={6}>
                    <Form.Group controlId="commitTimestamp">
                        <Form.Label>Commit Timestamp</Form.Label>
                            <Form.Control
                                type="datetime-local" step="any"
                                defaultValue={selectedCommit.commitTimestamp ? selectedCommit.commitTimestamp.substring(0, 16) : new Date().toISOString().substring(0,19)} 
                                name="commitTimestamp"
                                ref={register({ required: true })}
                            />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="commitDescription">
                <Form.Label>{"Commit Description"}</Form.Label>
                <Form.Control name="commitDescription" defaultValue={selectedCommit.commitDescription} as="textarea" rows={3} cols={20} ref={register} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Reporter</Form.Label>
                <select name="commitReporter" defaultValue={selectedCommit.commitReporter} ref={register({ required: true })} className="form-control required">
                    <option>Person1</option>
                </select>
            </Form.Group>

            <Form.Group>
                <Button variant="primary" type="submit">{props.loadFromSelectedCommitId ? "Update" : "Create"}</Button>{' '}
                <Button variant="danger" onClick={props.onHide}>Cancel</Button>
            </Form.Group>
        </Form>
        </div> 
    );
}

export default CommitForm;