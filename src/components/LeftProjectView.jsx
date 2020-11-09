import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import React, {useState, useEffect } from 'react'
import GraphView from './GraphView'
import MilestoneView from './MilestoneView'

class LeftProjectView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return(
            <div>
                <MilestoneView/>
                <GraphView/>
            </div>
        )
    }
}

export default LeftProjectView