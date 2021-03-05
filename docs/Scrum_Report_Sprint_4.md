# __Sprint 4__ (Scrum Master: Trevor)

## __Sprint goal:__  
Our goal for this sprint is to get authenticated routes on the backend setup, such that users can get and update their data on the database from their logged in account, and their data will be stored privately without risk of being exposed to other users through various vulnerabilities. We also want to finalize the graph/commit front end functionality, such that data points are displayed correctly on the graph while handling all edge cases, such as overdue tasks. Displaying tasks on the graph is already complete, however ironing out how the application should handle certain cases needs to be done with the project partner, and implemented. We also want to get initial teams functionality implemented into the front end, such that users can see the teams they are a part of, and edit/create new teams. Associating project/tasks with teams in the database and for authentication is a stretch goal for this sprint. Finally, adding functionality to link to a project or task such that that task is displayed when clicking the link. Making tasks/project public to anybody with a link is a stretch goal for this sprint.

## __Product log:__ 
- Create user authentication sessions on backend server
- Create sql queries to get data by inserting userID from user session
- Document how to handle edge cases on graph and implement solution
- Create separate page for displaying teams and related functionality
- Create teams table in db and define required data
- Improve api requests to get and send data to backend using async requests with a callback to update data in redux on successful db updates.
- Implement teams into authenticated routes for getting data such that a user has access to all project associated with teams they are on (stretch goal for this sprint)
- Hookup task creation user dropdown to pull from teams/users on existing projects (stretch goal for this sprint)

## __Member tasks:__ 
Kyler: Create teams page, incorporate into redux and backend.

Matthew: Create user sessions and authenticated routes on backend server.

Daniel: Handle graph edge cases, improve graph with tooltips.

Trevor: Ability to link to tasks, async api requests from components that update redux on return.

## __Scrum record:__ 

### Meeting 1/29:
In this meeting, we finished up pull requests for last sprint, and decided what needed to be done for sprint 4 and who would tackle what. Our project partner was pleased with the progress we have been making, and gave some insight on how we should be handling certain edge cases with the graph, and how we should define the units for time worked/estimated. Everybody is going to start looking into how to complete their tasks, and report back next week with any issues they ran into or successes they achieved.

### Meeting 2/1:
In this meeting, we iterated on Kyler's design for the teams page, defining the functionality it will need for an MVP as well as stretch goals to make managing teams/projects easier from both the project view and the teams view. We also talked about how we want to implement user authentication sessions, Matthew and Trevor are going to do more research into implementation specific details such as what library to use for managing sessions, and how we want to store the tokens in the database. We also had some issues with React router, which we were able to iron out by working together right before this meeting, and the frontend routes are much more well defined as a result. We discussed what improvements should be made to the graph, and are going to create a more solid design for next meeting.

### Meeting 2/5:
In this meeting, we talked about the changes that need to be made to the graph, and Daniel is investigating how to get tooltips to show up on the graph, pulling data from the individual tasks. We also got a more final design for the teams page, and talked about how Kyler should start tieing it into redux, which will use dummy data for now until we can get routes setup to populate it from the backend. Trevor and Matthew decided on libraries to use for the user sessions, and are working on getting that setup, which also needs some modifications to the database to store user tokens under users.

### Meeting 2/8:
Not much has been completed since last meeting, and we are continuing to work on the same tasks. Trevor did more research on redux middlewares, and came to the conclusion that they should be used for updating the database with new data, as it can easily hook into the existing redux actions we have setup, and finish the action after the database update is completed. The teams page is able to pull some data from redux, and Daniel did some testing with getting tooltips to show up on the graph. Matthew is continuing to work on user sessions for backend authentication.

### Meeting 2/12
Trevor is still working on testing a custom redux middleware that will handle updating the database when actions to do so are fired, and Matthew is working in implementing user sessions on the backend, along with authenticated routes to get that users data. Once these two pieces come together (redux middleware and backend auth sessions), the backend persistence should be finished. Daniel is working on cleaning up some errors/warnings, and working on getting the required data for the graph tooltips from redux. Kyler is finishing up getting the teams page to insert data into redux such that other components can pull from it.

### Meeting 2/17
In this meeting, we showed our Jira board to our project partner, and got positive feedback on the progress we have been making. He said that the last thing required for minimum viable product is the backend persistence, which Matthew and Trevor are close to getting to work. Daniel is cleaning up many of the warnings and errors, and still working on implementing graph tooltips with all of the information that we need from redux. Kyler is still working on getting the frontend functionality for the teams page finished and tied into redux and the other components.
