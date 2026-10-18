# FleetTech — IT Asset Management System

## Project Overview

FleetTech is a web-based IT asset management prototype designed to help a company keep track of technology and equipment assigned to its work trucks. The system provides a central interface for viewing sample truck records, monitoring equipment status, and identifying equipment that may need attention.

The goal of this project is to demonstrate how an IT asset management system can improve organization, visibility, and accountability for company-owned technology.

## Problem Statement

Companies that assign devices and equipment to work trucks need a practical way to track which assets are assigned to which vehicles and whether those assets are active, under maintenance, or experiencing an issue. Without organized records, employees may have difficulty identifying equipment that needs attention or determining where an asset is assigned.

FleetTech demonstrates a simple digital solution to this problem.

## Main Features

- **Dashboard:** Displays total trucks, tracked equipment, and equipment needing attention.
- **Truck records:** Shows truck IDs, assigned employees, and active or inactive status.
- **Equipment inventory:** Tracks sample tablets, GPS units, mobile hotspots, and radios.
- **Equipment assignments:** Associates equipment records with specific truck IDs.
- **Status updates:** Allows equipment status to be changed to Active, Maintenance, or Issue.
- **Search and filtering:** Helps users find truck and equipment records.
- **Persistent status changes:** Saves updated equipment statuses in the browser's local storage so they remain after a page refresh or browser restart in the same browser profile.

## Technologies Used

- **HTML:** Defines the structure and content of the web application.
- **CSS:** Controls the visual design, layout, colors, and responsive styling.
- **JavaScript:** Handles dashboard calculations, search, filtering, equipment status updates, and local storage.
- **GitHub:** Stores the project source code and documentation.
- **GitHub Pages:** Publishes the static web application online.
- **Browser Local Storage:** Saves equipment status changes locally in the user's browser.

## How the System Works

1. A user opens FleetTech in a web browser.
2. GitHub Pages serves the application's HTML, CSS, and JavaScript files.
3. The browser displays the dashboard, truck records, and equipment inventory.
4. JavaScript processes searches, filters records, calculates dashboard totals, and handles equipment status changes.
5. When a user changes an equipment status, FleetTech saves the updated status in the browser's local storage.
6. When the application is reopened in the same browser profile, saved equipment statuses can be loaded again.

## Sample Data

The prototype uses fictional truck and employee records and sample equipment inventory. Equipment types include tablets, GPS units, mobile hotspots, and radios.

The sample data is intended for demonstration purposes and does not represent a live company inventory.

## System Architecture

FleetTech is a client-side web application. Its interface is built with HTML and CSS, while JavaScript handles the application logic. GitHub Pages hosts the static website files, and browser local storage persists equipment status changes.

The prototype does not use a server-side application or a shared database. Changes saved in local storage are specific to the browser profile and device. They are not automatically synchronized with other users or computers.

The system architecture diagram is included with the project's documentation.

## Cost Considerations

FleetTech was developed as a low-cost educational prototype using web technologies and GitHub's repository and static hosting services.

The prototype does not require a dedicated application server or paid database service. A production version could involve additional costs for shared database hosting, user authentication, access controls, backups, maintenance, and support.

Actual production costs would depend on the number of users, security requirements, data storage needs, and hosting choices.

## Limitations and Future Improvements

This prototype demonstrates basic IT asset tracking but is not a complete production fleet management system.

Possible future improvements include:

- A shared database for multiple users and devices.
- User authentication and role-based permissions.
- The ability to add, edit, and remove truck and equipment records.
- More detailed asset history and maintenance records.
- Data export and reporting.
- Automated backups and stronger data validation.

## Project Purpose

FleetTech was created as an IT pathways final project to demonstrate the design and development of a practical IT asset management solution. The project emphasizes organizing IT assets, presenting useful information, managing status updates, documenting system architecture, and considering implementation costs and limitations.
