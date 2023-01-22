# devcamper-api
DevCamper is a backend API to manage tech Bootcamp.
RsetFull API Build on NodeJS and MongoDB.

## Technologies :computer:
- Expressjs
- MongoDB
- Node.js v12

## Getting Started 📣
**1. You can start by cloning the repository on your local machine by running:**

```sh
git clone https://github.com/mAbadsa/devcamper-api.git
cd devcamper-api
```

**2. Create config.env file:**
```
MONGODB_URI=<MONGODB_ATLAS_UIR>
GEOCODER_PROVIDER=google
GEOCODER_API_KEY=<GOOGLE_MAP_API>
MAX_FILE_UPLOAD=20
FILE_UPLOAD_PATH=<FILE_PATH>
JWT_SECRET=<SECRET_KEY>
JWT_EXPIRE=2d
SMTP_HOST=<smtp.example.com>
STMP_PORT=<587>
STMP_EMAIL=<SENDER_EMAIL>
FROM_NAME=<YOUR_NAME>
STMP_PASSWORD=<PASSWORD>
```

**3. Install all of the dependencies:**

```sh
npm i
```
**4. Run app:**
```sh
npm start
```
and you can run as developer by using nodemon by run this command
```sh
nodemon run dev
```

**5. Fake Data:**
```sh
node seeder.js [-i | -d]
-i import data from _data/*
-d delete lagacy data from the database
```
