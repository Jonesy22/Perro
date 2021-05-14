import React from 'react'
import { connect } from 'react-redux'
import { getSelectedTask, getAllTeams, getTaskChildrenIds } from "../data/selectors";
import { uploadShareTeam, uploadRemoveShareTeam } from "../data/actions";
import {Form, Button, InputGroup, Table} from "react-bootstrap";

class SharingView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {selectedTeamId: -1};
    }

    createSharedTeamsTable = () => {
        let teamsArray = [];
        for (let i = 0; i < this.props.selectedTask.content.sharedTeamIds.length; i++) {
            const id = this.props.selectedTask.content.sharedTeamIds[i];
            if(this.props.teams[id]) {
                teamsArray.push(<tr><td>{this.props.teams[id].content.teamName}</td><td><Button variant="danger" onClick={() => {this.props.dispatch(uploadRemoveShareTeam(this.props.allChildIds, id))}}>Remove</Button></td></tr>);
            }
        }
        return teamsArray;
    }

    createSelectTeams = () => {
        let teamsArray = [<option key={-1} value={-1}>{"------"}</option>];
        let id = -1;
        for (let i = 0; i < Object.keys(this.props.teams).length; i++) {
            id = Object.keys(this.props.teams)[i];
            teamsArray.push(<option key={id} value={id}>{this.props.teams[id].content.teamName}</option>);
        }
        return teamsArray;
    }

    updateInputValue(evt) {
        this.setState({
            selectedTeamId: evt.target.value
        });
      }

    render() {
        return (
            <div style={{marginTop: "15px"}}>
                {this.props.selectedTask.content.sharedTeamIds.length > 0 && 
                    <div>
                        <h5>Shared With Teams</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createSharedTeamsTable()}
                            </tbody>
                        </Table>
                    </div>}

                <h5>Add Team (also shares all tasks below, new and old)</h5>
                <InputGroup className="mb-3">
                        <Form.Control as="select" custom value={this.state.selectedTeamId} onChange={evt => this.updateInputValue(evt)}>
                            {this.createSelectTeams()}
                        </Form.Control>
                    <InputGroup.Append>
                    <Button variant="outline-primary" disabled={this.state.selectedTeamId < 0} onClick={() => {this.props.dispatch(uploadShareTeam(this.props.allChildIds, this.state.selectedTeamId))}}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
} 



export default connect(
    state => ({ selectedTask: getSelectedTask(state), teams: getAllTeams(state), allChildIds: getTaskChildrenIds(state, getSelectedTask(state).id) })
  )(SharingView)
