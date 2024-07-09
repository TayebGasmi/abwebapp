
# Online Course Booking App

Welcome to the Online Course Booking App! This application allows users to book a teacher to teach them a course seamlessly. Below you'll find the setup instructions, features, and other relevant details about the app.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Deployment](#deployment)

## Features

- **User Authentication:** Secure user registration and login.

## Technologies Used

- **Frontend:**
  - Angular
- **Backend:**
  - Spring Boot
- **Database:**
  - PostgreSQL

## Installation

### Prerequisites

- Node.js and npm or Yarn (recommended)
- Java JDK
- Maven
- PostgreSQL

### Frontend Setup

1. Clone the repository:
    ```
    git clone https://github.com/TayebGasmi/abwebapp
    ```
2. Navigate to the frontend directory:
    ```
    cd src/frontend/ab-web-app-ui
    ```
3. Install dependencies:
    ```
    npm install
    ```
    or (recommended)
    ```
    yarn
    ```
4. Start the Angular app:
    ```
    ng serve
    ```
5. Open your browser and navigate to `http://localhost:4200`.

### Backend Setup

1. Navigate to the backend directory:
    ```
    cd src/backend/appointment-booking
    ```
2. Update the `application.properties` file with your PostgreSQL configuration.

3. Build the project using Maven:
    ```
    mvn clean install
    ```
   
4. Run the Spring Boot application with Java:
    ```
    java -jar target/appointment-booking-0.0.1-SNAPSHOT.jar
    ```

## Deployment

### Frontend Deployment

1. **Build the Angular App:**

   Before deploying your Angular app, you need to build it for production.

   - Navigate to the frontend directory:
     ```
     cd src/frontend/ab-web-app-ui
     ```
   - Build the Angular app:
     ```
     ng build --prod
     ```

   This command compiles the Angular app into the `dist/` directory, optimized for production.

2. **Deploy the Angular App:**

   After building the app, you can deploy it to your preferred hosting service. Here are some general steps:

   - Copy the contents of the `dist/` directory to your web server or hosting service.
   - Configure your web server to serve the Angular app. For example, if using Apache HTTP Server, you might configure it like this in your `httpd.conf` or virtual host configuration:
     ```
     <VirtualHost *:80>
         ServerName your-domain.com
         DocumentRoot /path/to/your/angular/app/dist/
         
         <Directory /path/to/your/angular/app/dist/>
             Options Indexes FollowSymLinks
             AllowOverride All
             Require all granted
         </Directory>
     </VirtualHost>
     ```

   - Restart your web server to apply the changes.

3. **Access Your Deployed App:**

   Once deployed, users can access your application by navigating to your domain (e.g., `http://your-domain.com`).

### Spring Boot Deployment with Docker

1. **Build the Spring Boot Application Docker Image:**

   - Ensure Docker is installed on your system.
   - Navigate to the directory containing your Dockerfile:
     ```
     cd src/backend/appointment-booking
     ```

2. **Build the Docker Image:**

   - Use the Docker build command to create an image based on your Dockerfile:
     ```
     docker build -t appointment-booking-app .
     ```

   Replace `appointment-booking-app` with your desired image name.

3. **Run the Docker Container:**

   - Once the Docker image is built, you can run it as a container:
     ```
     docker run -p 8080:8080 appointment-booking-app
     ```

   This command starts a container from the `appointment-booking-app` image and maps port 8080 of the container to port 8080 on your host system.

4. **Access Your Deployed API:**

   - After the container is running, your Spring Boot application’s RESTful API endpoints will be accessible at `http://localhost:8080`.





