import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getSelectedTask } from "../data/selectors";

class DataView extends React.Component {
    constructor(props) {
		super(props);
        this.state = {milestones: []};
        this.printName = this.printName.bind(this);
        this.printEstimate = this.printEstimate.bind(this);
        this.printDescription = this.printDescription.bind(this);
    }
    printName() {
        return (this.props.selectedTask.content.Name);
    }
    printEstimate() {
        return (this.props.selectedTask.content.Estimate);
    }
    printDescription() {
        return (this.props.selectedTask.content.Description);
    }
    render() {
        return (
            <div>
                <h2><b>{this.printName()}</b></h2>
                <div>
                        <u>Time Estimate (Days):</u> {this.printEstimate()}<br></br>
                        <u>Description:</u>  {this.printDescription()}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ selectedTask: getSelectedTask(state) }),
    {}
  )(DataView)