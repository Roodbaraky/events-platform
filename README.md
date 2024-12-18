# EventLite

## TODO:
- **responsive design** - fix mobile view
  - fix event image on mobile view
- organise buttons better
- **accessibility** - scan with lightpost, fix errors
- clearly communicate errors - **error pages & notifs**
- remove console.logs etc
  - replace console.error with error popup
  - 
- finish readme
- add hosted site link to repo
- 
## Live Site
Please find the hosted site [here:](https://eventlite.koo.codes/)
```
https://eventlite.koo.codes/
```
## Summary
EventLite is an events sharing/signup site for a local business, allowing users to signup to events and add them to their google calendars and admins to create and edit events.



## Test Accounts
The password for all test accounts is:
```
test123
```

Users:
```
testuser@test.com
testuser2@test.com

```

Admins:
```
testadmin@test.com
testadmin2@test.com

```

You are also welcome to create your own account to test, but note that it will only be granted user privileges and so, only able to sign up and add events to calendar.

This is also limited to a small quota of signups due to using a free tier SMTP service, so sometimes signup is unavailable.


## Installation / How to run
### Prerequisites

### Installation
Clone this repo in your desired directory via:
```git clone https://github.com/Roodbaraky/events-platform```

Install necessary dependencies via:
```npm install`` or use your preferred dependency manager e.g. *bun*


### Setup
To run this project with your own database you will need to create a Supabase project with events, user_events, and authors tables OR adapt the code to use an alternative database client, in place of the Supabase client. Please refer to the schema for table structure:
![schema](./config/schema.png)

This application makes use of Postgres database functions, namely *"get_user_events"* which you can find the SQL for in *./config* and uses the Supabase client to invoke them - you may need to make further adaptations to invoke these if using an alternative client.

You will need to create a *.env* file in the project root directory, populating the following variables and/or suitable alternatives if you choose to use an alternative means of database management.
``` 
VITE_PASSWORD=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GOOGLE_CLIENT_ID=
```

### Development
To run the development server, use the command:
``` npm run dev ``` or ``` npm run dev -- --host ``` to expose the dev site to other devices on your network e.g. mobile, you will find respective addresses for this in the console e.g.:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.0.168:5173/
  ➜  Network: http://172.18.0.1:5173/
  ➜  Network: http://172.19.0.1:5173/
  ➜  Network: http://172.17.0.1:5173/
  ```



