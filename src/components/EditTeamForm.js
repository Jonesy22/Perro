import { useForm } from "react-hook-form";
import React, { Component, component, useState } from "react";
import { Modal, Button, Row, Col, Form, Table, Dropdown, FormControl,Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addTeam, addMember } from "../data/actions";
import { createTeam } from "../data/createObjects";
import { getIdByEmail, getUserProfile } from "../data/selectors";
import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption,  ComboboxOptionText,} from "@reach/combobox";
import "@reach/combobox/styles.css";
import {matchSorter} from 'match-sorter'
import { useThrottle } from "react-use";
import { createMatchSelector } from "connected-react-router";
import '../App.css';

const membersEmail = [
    "JohnDoe@example.com",
    "JimDoe@example.com",
    "JaneDoe@example.com",
    "JamieDoe@example.com",
    "JackDoe@example.com",
    "JoshDoe@example.com",
    "AlexDoe@example.com",
    "BobDoe@example.com",
    "CartmanDoe@example.com",
]

function EditTeamForm(props) {
    const { register, handleSubmit, errors, reset } = useForm();
    const dispatch = useDispatch();
    const onSubmit = () => {
        console.log("Inviting team member");
        console.log(term);
        //console.log("userbyID :"+  invitedUserId);
        //call useSelectHook with the email
        var userId = findIdByEmail(term);
        dispatch(addMember(userId, props.teamId));
        setShow(true);
        setShowStatus(true);
        setTerm("")
        setTest("")
    };

    function findIdByEmail (term) {
        var value = -1;
        Object.entries(props.users).map(
            (user) => {
                if (user[1].content.email == term){
                    console.log("user found! Email ("+user[1].content.email+") ID ("+user[0]+")")
                    console.log("findIdByEmail return: " + user[0]);
                    value = user[0];
                }
            })
            return value;
    }
    const [term, setTerm] = React.useState("");
    const [show, setShow] = useState(false);
    const [test, setTest] = useState("");
    const [showStatus, setShowStatus] = useState(false);
    const results = useNameMatch(term);
    const handleChange = (event) => {setTerm(event.target.value); setTest(event.target.value);setShowStatus(false);}
    // const invitedUserId = useSelector(state => getIdByEmail(state, term));
    
	console.log(props.teamId);

    const pStyle = {
        color: "red",
    };
    
    function useNameMatch(term) {
        const throttledTerm = useThrottle(term, 100);
        return React.useMemo(
            () =>
                term.trim() === ""
                    ? null
                    : matchSorter(membersEmail, term, {
                        keys: [(item) => `${item}`],
                        }),
                [throttledTerm]
        );
    }

    const createButton = {
        backgroundColor: "white",
        color: "rgba(0, 0, 0, 0.54)",
        height: "43px",
        width: "85px",
        bordeRadius: "2px",
        borderColor: "white",
        fontFamily: "Roboto, sans-serif",
        fontSize: "14px",
    };

    const reqFieldError = "This is a required field";
    return (
        <div className="container">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <div style={{marginTop: "0px"}}>
                        <Button type="submit" variant="primary" style={{marginBottom:"10px", marginLeft:"15px"}} >Invite</Button>
                    </div> 
                    <Col>         
                        <div style={{marginTop:"4px"}}>                              
                            <Combobox>
                                <ComboboxInput
                                    onChange={handleChange}
                                    style={{width: 300, margin: 0 }}
                                    id="comboboxInput"
                                    value={test}
                                    type="email"
                                    required
                                />
                                {results && (
                                    <ComboboxPopover style={{ width: 300, position: "absolute" }} portal={showStatus}>
                                        {results.length > 0 ? (
                                            <ComboboxList>
                                                {results.length > 0 && (
                                                    <React.Fragment>
                                                        {results.slice(0, 10).map((result, index) => (
                                                            <ComboboxOption
                                                                key={index}
                                                                value={`${result}`}
                                                                onClick={ () => {setTest(result); setTerm(result);}}
                                                                id="test"
                                                                required
                                                            />
                                                        ))}
                                                    </React.Fragment>
                                                )}
                                            </ComboboxList>
                                        ) : (
                                            <div>
                                                <p style={{ padding: 10, textAlign: "center", fontFamily:"roboto" }}>
                                                    Don't see an existing member? Invite a new one! ie. name@example.com
                                                </p>
                                            </div>
                                        )}

                                    </ComboboxPopover>
                                )} 
                            </Combobox>
                        </div>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {/* <tbody>
                {Object.entries(this.props.teams[props.teamId]).map(
                                (team, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{team[1].content.teamName}</td>
                                            <td>{team[1].content.teamLead}</td>
                                            <td>
                                                <Button
                                                    onClick={() => {
                                                        this.setState({
                                                            editTeamModalShow: true,
                                                            teamId: team[0],
                                                        });
                                                    }}
                                                    variant="outline-secondary"
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                </tbody> */}
            </Table>
            <Button variant="danger" onClick={props.onHide}>
                Cancel
            </Button>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide
                style={{
                    position: 'absolute',
                    top: "3%",
                    left: "52%",
                }}>
                <Toast.Body>Invite Sent</Toast.Body>
            </Toast>
        </div>
    );
}

export default EditTeamForm;

