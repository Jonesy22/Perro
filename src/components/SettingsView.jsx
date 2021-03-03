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

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamCreateModalShow: false,
            editTeamModalShow: false,
            teamId: -1,
            users:{},
        };
    }
    //Object.entries(OBJECT).forEach(([key, value]) => ...)

    render() {
        // console.log(typeof(this.props.teams))

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

        return (
            <div class="float-container">
                <Header />
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

export default connect(
    //takes states and returns => an object with the properties
    (state) => ({ teams: getAllTeams(state), users: getAllUsers(state) }),
    {}
)(SettingsView);
