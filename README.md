# Delightree
This is a Node.js-based backend project designed for aggregating user activity data, including posts, comments, likes, and views, based on user age ranges. 
The project uses MongoDB to store data for users, posts, comments, likes, and views, and includes an advanced MongoDB aggregation pipeline to fetch the total activity per user age group.

## Prerequisites
1. MongoDB running locally or on Atlas.(you can leave this part as it is running on atlas).
2. Nodejs installed locally ([How to install NodeJS ?](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))


## Setup
### Local Nodejs Instance
1. Clone the repository using ```git clone https://github.com/Avinendra08/Delightree.git``` and navigate to the folder.
2. Create a ```.env``` file in root folder
   
   ``` bash
   touch .env
   ```
3. Enter the following details in the ```.env``` file

   ``` bash
   MONGODB_URI = YOUR_MONGO_URL
   PORT = 1215
   
4. Open the terminal in the root folder and run the following commands :

   ``` bash
   npm install
   ```
5. Run the server in Dev mode using
    ``` bash
    npm run dev
    ```
    or use command
   ``` bash
    npm start
   ``` 
6. Once this is done, the server is up and runnning at port 1215

   ``` bash
    MongoDB connected !! DB HOST: cluster0-shard-00-02.kstwn.mongodb.net
    Server is running at port : 1215
   ```
   

## Architecture
### Tech Stack
- Backend - **NodeJS**

  Node.js is used for making the backend as it is developer friendly and allows use to build scalable application at ease.
- Database - **MongoDB**

  MongoDB is as it provides complete flexibility over schema and facilitates faster & accessible development with help of its cloud clusters.
  It can also cater to handle large data and it read/write using various features like indexes.

## API Endpoints (please hit these in Postman or similar server platforms)
## Get User Activity Aggregated by Age Range
   Endpoint: http://localhost:1215/getUserActivityByAgeRange 
   
   Method: GET
   
   Description:Retrieves the total number of posts, comments, likes, and views for users grouped by age ranges (18-24, 25-34, 35-44, 45+, or below 18).

## CRUD APIs for all models.
   Endpoint: (/user/)

      app.use("/user",userRouter);

      router.post("/", createUser);

      router.get("/", getUsers);

      router.get("/:id", getUserById);

      router.put("/:id", updateUser);

      router.delete("/:id", deleteUser);
   
   Description: First one is for creating a new user , second one is for getting all users, third is for getting a single user by id , 
     fourth is for updating any user details and fifth is for deleting a user from database.

   Similar apis for like,post,comment,views .
