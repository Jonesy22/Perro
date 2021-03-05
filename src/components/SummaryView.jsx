import React from 'react'
import { connect } from 'react-redux'
import { getSelectedTask } from "../data/selectors";

class SummaryView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {milestones: []};
        this.printSummary = this.printSummary.bind(this);
        this.printName = this.printName.bind(this);
    }
    printSummary() {
       return (this.props.selectedTask.content.Summary);
    }
    printName() {
        return (this.props.selectedTask.content.Name);
     }
    render() {
        return (
            <div>
                <h2><b>{this.printName()}</b></h2>
                {this.printSummary()}
            </div>
        )
    }
} 



export default connect(
    state => ({ selectedTask: getSelectedTask(state) }),
    {}
  )(SummaryView)
