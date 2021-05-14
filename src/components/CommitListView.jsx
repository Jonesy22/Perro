import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Button, Row } from 'react-bootstrap'
import { getAllUsers, getSelectedTaskCommits, getSelectedTaskId } from "../data/selectors";
import { removeCommitDB } from "../data/actions";
import InputModal from "./InputModal";

class CommitListView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {
            commitEditModalShow: false,
            selectedCommitId: 0,
        };
    }

    render() {
        let commitEditModalClose = () => this.setState({commitEditModalShow:false})
        return (
            <div>
                <ListGroup style={{marginTop: "5px"}}>
                    {Object.entries(this.props.taskCommits).sort((a, b) => (a[1].commitTimestamp < b[1].commitTimestamp) - (a[1].commitTimestamp > b[1].commitTimestamp)).map((value, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <Row style={{display: "flex", flexDirection:"row", flexWrap:"nowrap"}}>
                                    <b>{(this.props.users[value[1].commitReporter] ? this.props.users[value[1].commitReporter].content.fname + " " + this.props.users[value[1].commitReporter].content.lname : "Private User") + ":"}</b><div style={{textOverflow: "ellipsis", overflow:"hidden", flexGrow: "1"}}>&nbsp;{value[1].commitName}</div>
                                
                                    <p className="text-success" style={{float: "right", fontWeight: "bold", fontSize: "18px", marginBottom: "0px", marginRight: "5px"}}>+{value[1].commitWorkCompleted}</p>
                                    <Button onClick={() => {this.setState({commitEditModalShow: true, selectedCommitId: value[1].commitId})}} variant="outline-secondary" size="sm" style={{float: "right", marginRight: "4px"}}>Edit</Button>
                                </Row>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>

                <InputModal
                    type= "EditCommit"
                    inputForm="commitForm"
                    show={this.state.commitEditModalShow}
                    onHide={commitEditModalClose}
                    taskId={this.props.selectedTaskId}
                    selectedCommitId={this.state.selectedCommitId}
                    loadFromSelectedCommitId={true}
                    clickDeleteCommitButton={() => {
                        console.log(this.state.selectedCommitId);
                        commitEditModalClose()
                        this.props.removeCommitDB({ commitId: this.state.selectedCommitId, taskId: this.props.selectedTaskId})
                    }}
                />
            </div>
        )
    }
}

export default connect(
    state => ({ taskCommits: getSelectedTaskCommits(state), selectedTaskId: getSelectedTaskId(state), users: getAllUsers(state) }),
    { removeCommitDB }
  )(CommitListView)