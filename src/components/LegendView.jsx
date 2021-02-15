import React from 'react'
import {DiscreteColorLegend} from 'react-vis';



const ITEMS = [
    {title: 'Total Days Needed', color: "#000000", strokeWidth: 50},
    {title: 'Progress', color: '#41BAFB', strokeWidth: 50}
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
