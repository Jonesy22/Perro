import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import { addTeam, addMember, removeMember, addTeamToUser, removeTeamFromUser, updateTeamsTeamStatus, updateUsersTeamStatus, removeTeamDB, acceptTeamInvDB, declineTeamInvDB } from "../data/actions";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import Table from "react-bootstrap/Table";
import InputModal from "./InputModal";
import { getAllAppData, getAllTeams, getAllInvitations, getAllUsers } from "../data/selectors";
import { ListGroup, Row } from "react-bootstrap";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ConsoleSqlOutlined, PropertySafetyFilled } from "@ant-design/icons";
import {HiOutlineBell} from "react-icons/hi";


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

        function RenderDeleteButton(props){
            const dispatch = useDispatch();
            if (props.teamLead != props.userEmail){
                return ''
            }
            else{
                return(
                <span>
                <Button
                    onClick={() => {
                        dispatch(props.removeTeamDB(props.teamId));
                    }}
                    variant="danger"
                >
                    Delete
                </Button>
            </span>
                );
            }
        }

        function NotifcationRenderer(props) {
            const notifications = props.notificationsBool;
            const dispatch = useDispatch();
            if (props.invitations.length > 0)
            {
                return (
                <div class="invitation-table-container">
                <span style={{fontSize: 20}}>Invitations <span style={{color: "#0275d8"}}><HiOutlineBell /></span></span>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th style={{width:200}}>Team</th>
                            <th style={{width:200}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.invitations.map(
                                (inv, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{props.teams[[inv.teamId]].content.teamName}</td>
                                            <td>
                                            <span style={{marginRight: 10}}>
                                                <Button
                                                    onClick={() => {
                                                        dispatch(acceptTeamInvDB(props.userEmail, inv.teamId))
                                                    }}
                                                    variant="primary"
                                                >
                                                    Accept
                                                </Button>
                                            </span>
                                            <span>
                                                <Button
                                                    onClick={() => {
                                                        dispatch(declineTeamInvDB(props.userEmail, inv.teamId))
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
                            )}
                    </tbody>
                </Table>
            </div>);
            }
            else
            {
                return(
                        <div class="no-notifications">
                            <span style={{fontSize: 20}}>No Invitations <span style={{color: "#0275d8"}}><HiOutlineBell /></span></span>
                        </div>
                    );
            }
        };
        return (
            <div class="float-container">
                <Header />
                <div class="flex-wrapper">
                    <NotifcationRenderer notificationsBool={true} invitations={this.props.invitations} teams={this.props.teams} userId={this.props.appData.userProfile.id} userEmail={this.props.appData.userProfile.email} deleteTeam={this.props.deleteTeam}/>
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
                                        var i = 0;
                                        let accepted = false;
                                        let memberArray = team[1].content.teamMembers;
                                        for(i = 0; i < memberArray.length; i++){
                                            if(memberArray[i].userId === this.props.appData.userProfile.email && memberArray[i].teamStatus == true){
                                                accepted = true
                                            }
                                        }
                                        if (accepted){
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
                                                        <RenderDeleteButton teamLead={team[1].content.teamLead} teamId={team[0]} userEmail={this.props.appData.userProfile.email} userId={this.props.appData.userProfile.id} deleteTeam={this.props.deleteTeam} removeTeamDB={removeTeamDB}/>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        else{
                                            return('')
                                        }

                                    }
                                )}
                            </tbody>
                        </Table>
                    </div>

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
                    appData={this.props.appData}
                    />
                </div>               
                <Footer />
            </div>
        );
    }
}

export default connect(
    //takes states and returns => an object with the properties
    (state) => ({ teams: getAllTeams(state), invitations: getAllInvitations(state), appData: getAllAppData(state), users: getAllUsers(state) }),
    { removeTeamDB }
)(SettingsView);
