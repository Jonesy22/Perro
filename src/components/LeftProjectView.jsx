import React from 'react'
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
            </div>
        )
    }
}

export default LeftProjectView