# __Sprint 5__ (Scrum Master: Daniel)

## __Sprint goal:__  
Our goal for this sprint is to finish up our Minimal Viable Product (MVP), so we have something to display for the expo. This includes polishing up some of our codebase as well as
finishing some of the functionality that allows users to actually use this software for a project.

## __Product log:__ 
- Create user entity in the backend that can then be used in the team management page
- Connect this user entity to the task modal so that a user can be assigned a task
- Connect Redux with the backend so we can store user information and easily pull from there
- Polish / Edit data visualization
- Finish graph tool tip when hovering over points on the graph
## __Member tasks:__ 
Kyler: Team management page. Ensuring that a user in the team can view their own team, and that it works as intended.

Matthew: Backend server management. Making sure the Google Login feature is working as intended and working on the routes.

Daniel: Graph tool tip. Hovering over a point in the line which marks a task, will pull up information from that task, or from that commit. Handling edge cases where a commit and estimate are plotted at the same point.

Trevor: Ability to link to tasks, async api requests from components that update redux on return.

## __Scrum record:__ 

### Meeting 2/22:
We met today to talk about what we have done so far and what we are going to be working on this week. Some of us have been busy with another course as an assignment was due this Monday, but were still able to get some work completed. Daniel is working on the tooltip for the graph that displays info about each project/task/subtask. Trevor helped Daniel immensely with completing this, as well working on backend server calls. Matthew is working on the backend as well and hasn't noted any roadblocks currently, and Kyler is working on the team management page so that a employee or manager can add new people to the project and change who has access to the project. Will be meeting Wednesday with our project partner Taj.

### Meeting 2/26:
We had a quick meeting today just to go over things that we are working on, and where we are stuck. Everyone seemed to be doing just fine, we are in a good spot right now and the only thing getting in our way is being busy with all other classes as it's getting towards the end of the term, but it's not bad enough where we are struggling. We are going to meet with our TA Peter on Monday to discuss the Beta Functionality video, so we make sure we know what we need to do for that. Overall, everyone is optimistic going into week 9, and are excited to show Taj what we have accomplished since last week.

### Meeting 3/1:
First day of March, and the group is feeling good about Perro! We met today right after our meeting with our TA Peter, and it went pretty well. Peter informed us we have the Oral Team Defense at the end of the term, and that we will find out more about it later this week. We aren't too worried as we have all contributed our own parts, and will continue to work on these things until we are done with the class. We are all working on our tasks, in addition to our increasing work loads in other courses as it is getting close to the end of the term. Nothing extremely new besides everyone working on their own tasks. We will be meeting with Taj this week, and maybe bring up some questions or things he think we should talk about for our beta functionality video we will be making, which is due Saturday 3/6.


### Meeting 3/5:
The group met today to discuss things related to the Beta Functionality Video as well as our project status. We got a lot accomplished this week just in time for the video. Daniel was able to finish the Tooltip for both the Estimate line as well as the commit line on the graph. Trevor finished up the API calls and was able to incorporate the middleware to make the application run smoothly. Kyler got a lot of work done on the Team Management page that allows a user to invite a new person to work on a project. And Matthew finished the logging in and backend things, so now a Google login box appears when you click login and along with Trevors work, we can login, add content, and then logout, and next time you start the app, you will see your work still there because of the persistence with the database. We are very excited with our progess, and it's great to see our work paying off from the past 2 terms.
