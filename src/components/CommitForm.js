import { useForm } from "react-hook-form";
import React, {Component, component, useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

function CommitForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const [completedSwitch, setCompletedSwitch] = useState(false);
    
    const onSubmit = (data) => {
        console.log(data)
        console.log(completedSwitch);

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
                                name="commitWorkCompleted"
                                placeholder="Same Units as Task Estimation"
                                ref={register({ required: true, pattern: /^[0-9]*$/g })}
                            />
                        {errors.commitWorkCompleted && errors.commitWorkCompleted.type === "pattern" && <p style={pStyle}>Estimate must be a numerical value</p>}
                        {errors.commitWorkCompleted && errors.commitWorkCompleted.type === "required" && <p style={pStyle}> {reqFieldError}</p>}

                    </Form.Group>
                </Col>

                <Col sm={6}>
                    <Form.Group controlId="commitTime">
                        <Form.Label>Commit Timestamp</Form.Label>
                            <Form.Control
                                type="datetime-local" step="any"
                                defaultValue={new Date().toISOString().substring(0,19)} 
                                name="commitTime"
                            />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group controlId="commitDescription">
                <Form.Label>{"Commit Description"}</Form.Label>
                <Form.Control name="commitDescription" as="textarea" rows={3} cols={20} ref={register} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Reporter</Form.Label>
                <select name="commitReporter" ref={register({ required: true })} className="form-control required">
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

export default CommitForm;