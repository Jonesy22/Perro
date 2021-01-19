import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addTimeEstimate } from '../data/actions'
import { getAllChildTimeEstimates } from "../data/selectors";


class SummaryView extends React.Component {
    constructor(props) {
		super(props);
		this.state = {milestones: []};
    }

    render() {
        return (
            <div>
                <h2>Summary View</h2>
            </div>
        )
    }
} 



export default SummaryView
