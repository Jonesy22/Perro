import React, { Component, component, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Button, Row, Col, Form, Table, Dropdown, FormControl,Toast } from "react-bootstrap";
import { addTeam, addMember, removeMember, addTeamToUser, removeTeamFromUser } from "../data/actions";
import {matchSorter} from 'match-sorter'
import { useThrottle } from "react-use";
import { createMatchSelector } from "connected-react-router";
import { connect } from 'react-redux'
import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption,  ComboboxOptionText,} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { getTasks } from "../data/selectors";

const searchExamples = [
    "My First Project",
	"Project 2",
]

function SearchBar(props) {
	const [term, setTerm] = React.useState("");
    //const results = useCityMatch(term);
    const handleChange = (event) => setTerm(event.target.value);
	console.log("SEARCH!!!!! :", props);
	return (
	  <div>
		<Combobox aria-labelledby="search box" >
		  <ComboboxInput placeholder="Search for a task..."/>
		  <ComboboxPopover>
			<ComboboxList>
				{props.tasks.map((task) => {
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
	{}
)(SearchBar);
