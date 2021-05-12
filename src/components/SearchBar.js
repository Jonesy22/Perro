import React from "react";
import { setSearchTask } from "../data/actions";
import { connect } from 'react-redux'
import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption,  ComboboxOptionText,} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { getTasks } from "../data/selectors";


function SearchBar(props) {
	const [term, setTerm] = React.useState("");
    //const results = useCityMatch(term);
    const handleChange = (event) => {
		setTerm(event.target.value);
		Object.assign(props.searchTerm, term)
		console.log("******search: ", props.searchTerm);
	}
	return (
	  <div>
		<Combobox aria-labelledby="search box" >
		  <ComboboxInput 
		  placeholder="Search for a task..."
		  onChange={handleChange}	
		  
		  />
		  <ComboboxPopover>
			<ComboboxList>
				{props.tasks.map((task) => {
					console.log("TASK: ", task);

					const taskName = task.content.Name;
					
					return <ComboboxOption key={taskName} value={taskName} />
				})}
			</ComboboxList>
		  </ComboboxPopover>
		</Combobox>
	  </div>
	);
  }


  
export default connect(
	state => ({ tasks: getTasks(state), searchTerm: setSearchTask(state)}),
	{}
)(SearchBar);
