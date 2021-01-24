import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Button, Row } from 'react-bootstrap'
import { getSelectedTaskCommits, getSelectedTaskId } from "../data/selectors";
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
                                    <b>{value[1].commitReporter + ":"}</b><div style={{textOverflow: "ellipsis", overflow:"hidden", flexGrow: "1"}}>&nbsp;{value[1].commitName}</div>
                                
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
                />
            </div>
        )
    }
}

export default connect(
    state => ({ taskCommits: getSelectedTaskCommits(state), selectedTaskId: getSelectedTaskId(state) }),
    {}
  )(CommitListView)