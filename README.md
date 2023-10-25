# Shared Spaces - frontend
This is the front-end for the Shared Spaces application, created using React.
<br/>


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Screenshots](#screenshots)
* [Features](#features)


## General Information
This project utilizes React to create a front-end for the REST API interface of the Shared Spaces application.
All functionalities provided by the back-end are utilized. The UI is responsive and mobile friendly.<br/>
The app is deployed on an AWS EC2 Ubuntu instance and hosted by an Nginx server.<br/><br/>
Live demo: [Click here](http://ec2-54-146-229-245.compute-1.amazonaws.com/)


## Technologies Used
- React - version 18.2.0


## Screenshots
A couple of screenshots illustrating some of the application features
<br/>
![screenshot](./screenshots/screenshots.jpg)


## Features
A reference of all features provided by the application 

|Feature        |Description |
| ------------- | ---------- |
|Register       |Create a new user account. Provide: login (3-15 characters), password (min 3 characters) and confirm the password. The login must be unique across all logins. |
|Sign in        |Sign in using an existing user account. |
|Home view      |A list of all spaces in which the user is a member sorted in an alphabetical order. |
|Create space   |Create a new space. Provide: space name (3-15 characters). The space name doesn't have to be unique. The user who created a space, becomes its admin. |
|Space view     |A list of all shares within a space sorted by creation date.|
|Share tile     |View of a single share. Contains: creator name, creation date, body with descriptions and optionally an image. If the logged in user is the creator of the share, he can edit and deleted it. | 
|Share editor   |A place where the description of the share can be updated and a new image can be uploaded. |

