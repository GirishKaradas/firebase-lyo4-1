# Firestore Clone and make new app 
    1. npm install -g node-firestore-import-export
    2. Export : firestore-export --accountCredentials path/to/credentials/file.json --backupFile /backups/myDatabase.json
    3. Import: firestore-import --accountCredentials path/to/credentials/file.json --backupFile /backups/myDatabase.json
    4. Authentication : 
        4.1 Enable Authentication from Firebase project (Email, Pass)
        4.2 Enable Firestore --> Change rules Read/Write --> true
        4.3 Enable Storage --> Read/Write True 
    5. Project Settings --> Web --> Config 
    6. Copy and Paste Credentials to firebase.js file in "src" folder
    7. Create New User From Firebase Authentication and Add it's credential to firestore in "users" collection 

# install in local 
    1. "npm install" to install node modules 
    2. "npm start" to run the development server in localhost:3000
    3. "npm run build" to make a production build
    

# Database --> firebase commands 

    1. "firebase login" to login to connected project account
    2. "firebase init" to initialize new firebase log (Not required)
    3. "firebase deploy" to deploy the build folder ("npm run build" --> run this command before deploying)
    4. "firebase deploy --only functions" to deploy functions folder for 'REST API" calls (if any)


# Sprint 2 major updates 

    1. Video Call build (& Redesign)
    2. Steps having different views (Carousel and step view)
    3. Filters for all Page 
    4. Redesign users Page 
    5. Whiteboard
    6. Share media from web to glass 
    7. Chatbot integration 
    8. Chatbox for Video call 
    9. File management system 
    10. Invite users outside the app from VC model 
    11. Added Relayed and Routed for Video Call 
    12. Added settings to different modules(Video call , Update company name and logo, download web and android app from web)
    13. 3D Model (Pending build)
    