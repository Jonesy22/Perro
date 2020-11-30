import React, {useState, useEffect } from 'react'
import {DiscreteColorLegend} from 'react-vis';



const ITEMS = [
    {title: 'Progress', color: "#41BAFB", strokeWidth: 50},
    {title: 'Remaining', color: '#000000', strokeWidth: 50},
    {title: 'Total', color: '4EEA00', strokeWidth: 2}
  ];

class LegendView extends React.Component {
    render() {
	return (
        <div>
            <DiscreteColorLegend class="legend"
                height={100}
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
