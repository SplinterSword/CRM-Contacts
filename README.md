# CRM Contacts
Contact Management Web Application helps users of the system to keep a track of important contact information of customers / clients. It lets users add, view, update, and delete contact details all in one place. This makes it easy for users to find and manage information, which is especially helpful in a business setting where keeping track of relationships is key.

It is build using NextJS(ReactJS) framework for the frontend and NodeJS is used for the backend. Postgres is used as the database of choice. For more details visit the [Technologies Section](##Technologies).
## Requirements
You will need to download and install the latest version of NodeJS, Postgres Database manangement system and Git Version control from the link given below:-

- [Download NodeJS](https://nodejs.org/en/)
- [Download PostgreSQL](https://www.postgresql.org/download/)
- [Download GIT](https://git-scm.com/downloads)
## Setup

After you have downloaded the everything you need you need to download from the [Requirements Section](##Requirements). You just need to follow the Steps Given Below.

### Step 1 
Clone the repository in your local machine by the navigating to the desired directory and typing the following command in the terminal.
```bash
  git clone https://github.com/SplinterSword/Internship_Assignment.git
  cd Internship_Assignment
```

### Step 2
Install the npm packages for the frontend
```bash
  cd frontend
  npm install
```

### Step 3
Install the npm packages for the backend (if you are in the frontend directory type cd .. to get to the root directory of the project)
```bash
  cd backend
  npm install
```

### Step 4
Now setup your database. Type the following commands in the terminal one by one.

```bash
  sudo -u postgres psql
  CREATE DATABASE crm_contact;
  \c crm_contact
  ALTER USER postgres PASSWORD 'postgres';
```

### Step 5
Before you can use it. You also need to Setup the config.json file located in the rootDirectory_Of_Project/backend/config folder.

Just Copy the text below in the config.json file and make the appropriate changes

```
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "crm_contact",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "crm_contact",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "postgres",
    "database": "crm_contact",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

```

### Step 6
To run the migrations for your database(setup tables in your database), navigate to the backend folder again and run 
```
npm run migrate
```

After you can run the web application without any problems.
## How to run the Application

Make sure you have properly setup the application, if not refer the [Setup Section](##Setup).

#### Backend
To run the backend you run the following commands in the terminal from your root directory of the project.
```
cd backend

npm run dev (for development)
or
npm run start (for production)
```

#### Frontend
To run the frontend you run the following commands in the terminal from your root directory of the project.
```
cd frontend

npm run dev (for development)
or
npm run build 
npm run start (for production)
```
## Technologies

#### NextJS (Frontend)
NextJS was chosen as the frontend framework because of its app routing capabilites making it very easy to route to different webpages without much configuration due to its file routing system.

It also comes with out of the box support for Typescript, TailwindCSS, many ui component libraries like Shadcn and Material UI, and many npm packages like next-auth , which makes it setting up very easy and hassle free.

It also comes with native support for Turbopack which is an incremental bundler optimized for JavaScript and TypeScript. This bundler makes rendering of webpages very fast which makes the website very responsive.

#### NodeJS (Backend)
NodeJS is used for the backend because of its wide support for npm packages like bcrypt(for encryption), ExpressJS, etc.

Sequelize ORM is used to connect to the sql database for many reasons like, it makes it very easy to switch from a one sql database like postgres to another without changing the application code. It also provides with migration and rollback capabilites which ensures that the database is setup correctly.

#### Postgres (database)

I chose SQL database over a NoSQL database because SQL databases are more scalable compare to NoSQL database. As we are doing more writing in the application compare to reading, it make sense we choose a SQL database which is optimized for write operations compare to NoSQL which is more optimized for reading. SQL databases also have the concept of foreign keys which makes establishing relations between different tables(objects) very easy.

As for choosing Postgres specifically, It provides with many features like high data consistency, integrity, flexibility, versatility, etc. It also provides concurrency which can prove useful in the future.
## Working of the application

### Sign Up Page
The first thing you see when you start the application is the signup page where you are required to create an account by filling the fields provided.

On submit, the "POST /users" endpoint is hit which creates the user and before storing it encrypts the password using bcrypt packages to protect the data incase the database is breached. After this you are redirected to the Login Page.

### Login Page
Now login using your username or password. In case you provide the incorrect credentials you will get the approperiate errors.

On submit, the "GET /users" endpoint is hit which authenticates the user. After this the username is stored in the localstorage of your browser for further use you are redirected to the homepage.

### Home Page
In home page you will see all your contacts stored properly, you can sort it with respect to a field by clicking the respective field. The data is also divided in pages to improve user experience.

The contact table is populated by hitting "GET /contacts" api endpoint which returns all the contacts of the user.

You can easily delete or update a contact by hitting the provided action buttons which will hit "DELETE /contacts/:id" and "PUT /contacts/:id" api endpoints respectively which will give you the approperiate errors in case you try to create duplicates.

There is also a Navbar provided which you can use to the contact form page used to create new contacts, Log out, or return to the dashboard.

### Contact Form
This page is used to create new contacts. This page ensures that there are no duplicate contacts.
It creates the contact by hitting "POST /contacts" api endpoint on submit.


## Challenges Faced

- The main challenge I faced was at the starting of the project. I was kinda lost on whether I should start with the frontend or the backend, what technologies to used, etc. I was kinda overwhelming at first, so I decided to took some time before I started coding and on a piece of paper wrote all the things I need to do in this app like the features and how aspect relates to the other. And then chose the technologies which suited my needs the best.

- Another minor issue I faced of security, like how do I store the data securily like what if my database got breached. I thought to create my own encryption algorithm but that would have taken a long time. So I searched the internet and found the Bcyrpt encryption which made allowed me to encrypt user's password easily.