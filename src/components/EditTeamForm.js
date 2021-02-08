import { useForm } from "react-hook-form";
import React, {Component, component, useState} from 'react';
import {Modal, Button, Row, Col, Form, Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam } from '../data/actions';
import {createTeam} from '../data/createObjects';

function EditTeamForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();
    
    const onSubmit = (data) => {
        console.log(data)
        // dispatch(addTeam(createTeam(data.teamName, "Current User")))
        {props.onHide()}
    }

    const pStyle = {
        color: 'red',
    };
    
    const createButton = {
        backgroundColor: "white",
        color:"rgba(0, 0, 0, 0.54)",
        height:"43px",
        width: "85px",
        bordeRadius:"2px",
        borderColor:"white",
        fontFamily:"Roboto, sans-serif",
        fontSize:"14px"
    }
    const reqFieldError = "This is a required field"

    return (
    <div className="container">
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col>
                    <Form.Group controlId="teamName">
                        <div  style={{display: "flex", flexDirection: "col"}}>
                        <Button variant="primary" type="submit" style={{width:"84px"}}>Inivte</Button>{' '}
                            <Form.Control
                            
                                style={{marginRight: "10px", marginLeft: "10px"}}
                                type="text"
                                name="teamName"
                                placeholder="name@example.com"
                                ref={register({ required: true })}
                            />
                        </div>
                        {errors.commitName && <p style={pStyle}> {reqFieldError}</p>}
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
            </Form.Group>
        </Form>
        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Kyler Jacobson</td>
                            <td><Button variant="danger" onClick={props.onHide}>Remove</Button></td>
                            </tr>
                            <tr>
                            <td>Trevor Jones</td>
                            <td><Button variant="danger" onClick={props.onHide}>Remove</Button></td>
                            </tr>
                            <tr>
                            <td>Daniel Jones</td>
                            <td><Button variant="danger" onClick={props.onHide}>Remove</Button></td>
                            </tr>
                            <tr>
                            <td>Matthew Levis</td>
                            <td><Button variant="danger" onClick={props.onHide}>Remove</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button variant="danger" onClick={props.onHide}>Cancel</Button>
        </div> 
    );
}

export default EditTeamForm; 