import React, {useState, useEffect } from 'react'
import {DiscreteColorLegend} from 'react-vis';



const ITEMS = [
    {title: 'Progress', color: "#41BAFB"},
    {title: 'Remaining', color: '#000000'},
    {title: 'Total', color: '#044e06'}
  ];

class LegendView extends React.Component {
    render() {
	return (
        <div>
            <DiscreteColorLegend 
                height={125}
                width={200}
                color='red'
                orientation='horizontal'
                items={ITEMS} 
            />
        </div>
        )
    }
}

export default LegendView
