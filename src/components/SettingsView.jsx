import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import { addTeam, addMember, removeMember, addTeamToUser, removeTeamFromUser, updateTeamsTeamStatus, updateUsersTeamStatus, removeTeamDB } from "../data/actions";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
import InputModal from "./InputModal";
import { getAllTeams, getAllUsers } from "../data/selectors";
import { ListGroup, Row } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConsoleSqlOutlined } from "@ant-design/icons";
import {HiOutlineBell} from "react-icons/hi";

let tempUserId = 0;

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamCreateModalShow: false,
            editTeamModalShow: false,
            teamId: -1,
            users:{},
            notifications: false,
        };
    }
    //Object.entries(OBJECT).forEach(([key, value]) => ...)

    render() {
        let teamCreateModalClose = () =>{
            this.setState({
                teamCreateModalShow: false,
            });
        }
        
        let editTeamModalClose = () =>{
            this.setState({
                editTeamModalShow: false,
            });
        }
        const CreateTeamButton = {
            backgroundColor: "white",
            color: "rgba(0, 0, 0, 0.54)",
            height: "43px",
            width: "85px",
            bordeRadius: "2px",
            borderColor: "white",
            fontFamily: "Roboto, sans-serif",
            fontSize: "14px",
        };

        function NotifcationRenderer(props) {
            const notifications = props.notificationsBool;
            let invitations = false;
            const dispatch = useDispatch();
            console.log(props)
            let teamSize = props.users[tempUserId].content.teams.length;
            let i = 0;
            console.log(i)
            for (i = 0; i < teamSize; i++){
                // console.log(props.users[tempUserId.content.teams])
                if (props.users[tempUserId].content.teams[i].teamStatus == false)
                invitations = true;
            }
            if (invitations)
            {
                return (
                <div class="invitation-table-container">
                <span style={{fontSize: 20}}>Invitations <span style={{color: "#0275d8"}}><HiOutlineBell /></span></span>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.entries(props.users[tempUserId].content.teams).map(
                                (team, index) => {
                                    if(team[1].teamStatus == false){
                                    return (
                                        <tr key={index}>
                                            <td>{props.teams[[team[1].teamId]].content.teamName}</td>
                                            <td>
                                            <span style={{marginRight: 10}}>
                                                <Button
                                                    onClick={() => {
                                                        dispatch(updateTeamsTeamStatus(team[1].teamId, tempUserId));
                                                        dispatch(updateUsersTeamStatus(tempUserId, team[1].teamId));
                                                    }}
                                                    variant="primary"
                                                >
                                                    Accept
                                                </Button>
                                            </span>
                                            <span>
                                                <Button
                                                    onClick={() => {
                                                        //replace first argument with current users userID
                                                        dispatch(removeMember(tempUserId, team[1].teamId));
                                                        dispatch(removeTeamFromUser(tempUserId, team[1].teamId))
                                                    }}
                                                    variant="danger"
                                                >
                                                    Decline
                                                </Button>
                                            </span>
                                            </td>
                                        </tr>
                                    );
                                    }
                                }
                            )}
                    </tbody>
                </Table>
            </div>);
            }
            else
            {
                return '';
            }
        };
        return (
            <div class="float-container">
                <Header />
                <NotifcationRenderer notificationsBool={true} users={this.props.users} teams={this.props.teams}/>
                <div class="team-table-container">
                    <Button
                        onClick={() => {
                            this.setState({ teamCreateModalShow: true });
                        }}
                        variant="outline-secondary"
                        style={{
                            float: "left",
                            marginTop: "20px",
                            marginBottom: "10px",
                        }}
                    >
                        Create Team
                    </Button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Team Lead</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(this.props.teams).map(
                                (team, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{team[1].content.teamName}</td>
                                            <td>{team[1].content.teamLead}</td>
                                            <td>
                                                <span style={{marginRight: 10}}>
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
                                                </span>
                                                <span>
                                                    <Button
                                                        onClick={() => {
                                                            this.props.removeTeamDB(team[0]);
                                                        }}
                                                        variant="danger"
                                                    >
                                                        Delete
                                                    </Button>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                }
                            )}
                        </tbody>
                    </Table>
                </div>

                <Button onClick={notify}>Notify!</Button>

                <InputModal
                type="Team"
                inputForm="createTeamForm"
                show={this.state.teamCreateModalShow}
                onHide={teamCreateModalClose}
                />
                <InputModal
                type="Team Changes"
                inputForm="editTeamForm"
                show={this.state.editTeamModalShow}
                onHide={editTeamModalClose}
                teamId={this.state.teamId}
                teams={this.props.teams}
                users={this.props.users}
                />               
                <Footer />
            </div>
        );
    }
}

const notify = () => toast("New team invitation");


export default connect(
    //takes states and returns => an object with the properties
    (state) => ({ teams: getAllTeams(state), users: getAllUsers(state) }),
    { removeTeamDB }
)(SettingsView);
