import { useForm } from "react-hook-form";
import React, {Component, component, useState} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { uploadNewTeam } from '../data/actions';
import {createTeam} from '../data/createObjects';
import { getUserProfile, getAllAppData } from "../data/selectors";

function CreateTeamForm(props) {
    const { register, handleSubmit, errors } = useForm();
    const userProfile = useSelector(state =>  getUserProfile(state));
    const appData = useSelector(state =>  getAllAppData(state));
    console.log("APPDATA: " + JSON.stringify(appData))
    console.log("USERPROFILE: "+ JSON.stringify(userProfile.sd))
    const dispatch = useDispatch();
    
    const onSubmit = (data) => {
        dispatch(uploadNewTeam(createTeam(data.teamName, appData.userProfile.tS)))
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
                            <Form.Control
                                style={{marginRight: "10px"}}
                                type="text"
                                name="teamName"
                                placeholder={`${props.type} Name`}
                                ref={register({ required: true })}
                            />
                        </div>
                        {errors.commitName && <p style={pStyle}> {reqFieldError}</p>}
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Button variant="primary" type="submit">Create</Button>{' '}
                <Button variant="danger" onClick={props.onHide}>Cancel</Button>
            </Form.Group>
        </Form>
        </div> 
    );
}

export default CreateTeamForm; 
