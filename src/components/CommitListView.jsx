import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Button } from 'react-bootstrap'
import { getSelectedTaskCommits } from "../data/selectors";

class CommitListView extends React.Component {
    constructor(props) {
		super(props);
    }

    render() {
        return (
            <div>
                <ListGroup style={{marginTop: "5px"}}>
                    {this.props.taskCommits.map((value, index) => {
                        return (
                            <ListGroup.Item key={index}>
                                <b>{value.commitReporter + ": "}</b>{value.commitName}
                                <Button onClick={() => {console.log(index)}} variant="outline-secondary" size="sm" style={{float: "right"}}>View</Button>
                                <p className="text-success" style={{float: "right", fontWeight: "bold", fontSize: "18px", marginBottom: "0px", marginRight: "5px"}}>+{value.commitWorkCompleted}</p>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        )
    }
}

export default connect(
    state => ({ taskCommits: getSelectedTaskCommits(state) }),
    {}
  )(CommitListView)