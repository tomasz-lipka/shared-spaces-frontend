# Shared Spaces - frontend
This is the front-end for the Shared Spaces application.
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
Live demo: [Click here](http://ec2-54-146-229-245.compute-1.amazonaws.com/)<br/>
Video demo: [YouTube](https://youtu.be/CBPJWvYRU5c)


## Technologies Used
- React - version 18.2.0


## Screenshots
A couple of screenshots illustrating some of the application features
<br/>
![screenshot](./screenshots/screenshots.jpg)


## Features
A reference of all features provided by the application 

|Feature                   |Description |
| ------------------------ | ---------- |
|Register                  |Create a new user account. Provide: login (3-15 characters), password (min 3 characters) and confirm the password. The login must be unique across all logins. |
|Sign in                   |Sign in using an existing user account. |
|Home view                 |A list of all spaces in which the user is a member sorted in an alphabetical order. |
|Create space              |Create a new space. Provide: space name (3-15 characters). The space name doesn't have to be unique. The user who created a space, becomes its admin. |
|Space view                |A list of all shares within a space sorted by creation date.|
|Share tile                |View of a single share. Contains: creator name, creation date, body with descriptions and optionally an image. If the logged in user is the creator of the share, he can edit and deleted it. | 
|Share editor              |A place where the description of the share can be updated and a new image can be uploaded. To drop the changes a cancel button is available.|
|Create share              |Share thoughts with your space. Provide a share description (3-200 characters) and optionally upload an image. |
|Members view              |A list of all members of the space. |
|Member tile               |View of a single member. Contains: <br/>- member name<br/>- label 'admin' if he has administrative privileges within the space<br/>- Grant/Revoke admin button<br/>- Delete button |
|Grant/Revoke admin        |Enabled only for admins. Allows to grant or revoke someone's administrative privileges. The admin can revoke his own admin privileges if there is at least on other admin present within this space. |
|Delete  member            |Enabled only for admins. Allows to delete a member of the space. Also, an admin member can be deleted. You can't delete yourself. Before performing the action, a confirmation window appears. |
|Leave space               |Allows to leave the space. The space will no longer be listed under all your spaces. You can't leave a space when you're and admin. |
|Add member                |Enabled only for admins. Allows to add a new member to the space. An existing user login must be provided. |
|All images view           |View of all images that have been ever uploaded to the space. Even if a share, which contained the image will be deleted - the image itself will remain under the all images view. |
|Configure space page      |Allows to: rename the space, delete the space. |
|Rename space              |Enabled only for admins. Allows to rename the space. New name must have 3-15 characters. |
|Delete space              |Enabled only for admins. You can only delete a space that has no other members except one administrator. This deletes also all shares and images within this space. Before performing the action, a confirmation window appears. |
|Settings page             |Allows to change the password. Provide: old password, new password (min 3 characters) and confirm the password. |
|Logout                    |Logs the user out (revokes the authentication token).|
|Breadcrumb                |Shows the user's current location and the path he followed to arrive at that page. |
|Message bar               |Shows info and error messages. | 


