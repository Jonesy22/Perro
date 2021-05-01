import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
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
            console.log("running")
            console.log(notifications)
            if (notifications)
            {
                return (<div class="team-table-container">
                <span>New Notification</span>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Team Lead</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </div>);
            }
            else
            {
                return <h1>No new invitations</h1>;
            }
        };
        return (
            <div class="float-container">
                <Header />
                <NotifcationRenderer notificationsBool={false} />
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
    {}
)(SettingsView);
