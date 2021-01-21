import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getSelectedTask } from "../data/selectors";

class SummaryView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {milestones: []};
        this.printSummary = this.printSummary.bind(this);
    }
    printSummary() {
        
       return (this.props.selectedTask.content.Summary);
    }
    render() {
        return (
            <div>
                <h2><b>Summary</b></h2>
                {this.printSummary()}
            </div>
        )
    }
} 



export default connect(
    state => ({ selectedTask: getSelectedTask(state) }),
    {}
  )(SummaryView)
