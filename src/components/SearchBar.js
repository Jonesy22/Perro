import React, { Component, component, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Row, Col, Form, Table, Dropdown, FormControl,Toast } from "react-bootstrap";
import { addTeam, addMember, removeMember, addTeamToUser, removeTeamFromUser, setSearchTask } from "../data/actions";
import {matchSorter} from 'match-sorter'
import { useThrottle } from "react-use";
import { createMatchSelector } from "connected-react-router";
import { connect } from 'react-redux'
import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption,  ComboboxOptionText,} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { getTasks, getTaskById, getChildrenRecursively, getSearchTask } from "../data/selectors";


function SearchBar(props) {
	const [term, setTerm] = React.useState("");
    //const results = useCityMatch(term);
    const handleChange = (event) => {
		setTerm(event.target.value);
		event.persist();
		//Object.assign(props.searchTerm, term);
	 	props.setSearchTask(event.target.value);
		console.log("******search: ", term);

	}

	useEffect(() => {
		console.log("Search message inside useEffect: ", term);
	  }, [term]);


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
					//if (task.content.child)
					

					
					//while (children())
					// get the task id of task
					// check if this task has parents
					// if it does, then the value will be parent->parent->task were looking for
					// else: just display task

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
	state => ({ tasks: getTasks(state) }),
	{ setSearchTask }
)(SearchBar);
