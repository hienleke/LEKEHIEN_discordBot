# DISCORD_FEEDBACK_BOT

LE KE HIEN

Discord Bot and API Project
Introduction
Welcome to the Discord Bot and API project! This repository houses the development of a Discord bot and backend API to facilitate the collection of player feedback regarding their in-game experience. Here's a brief overview of the key components and technologies employed in this project.

Key Components:

1. Discord Bot Implementation (Node.js and Discord.js):
   Developed using Node.js and the Discord.js library, the Discord bot listens for the "/feedback" command in designated channels. When a user submits feedback, the bot responds with an acknowledgment message: "Thanks for reaching out! We’ll be passing this along to the team directly! Good luck playing the game!"

2. Deployment on AWS EC2 (PM2):
   The project is deployed on an AWS EC2 instance, utilizing PM2 for process management. PM2 ensures robust and reliable deployment by automatically restarting the application in case of failures, helping maintain high availability.

3. Database Storage (MongoDB):
   For data storage, MongoDB is employed as a NoSQL database. It provides scalability and flexibility to store and manage player feedback efficiently.

4. Continuous Integration and Continuous Deployment (CI/CD) with GitHub Actions:
   The CI/CD pipeline is implemented using GitHub Actions. On every push to the main branch, tests are automatically triggered using Jest to ensure code quality. Upon successful tests, the application is deployed to the EC2 instance, guaranteeing a streamlined development and deployment process.

5. Logging with Log4js:
   Log4js is integrated to facilitate logging activities, capturing important information and events within the application. Logs are directed to files for easy monitoring and debugging.
