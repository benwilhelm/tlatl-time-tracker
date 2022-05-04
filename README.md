# Time Tracking CLI 

This is a group project that we'll be hacking on during office hours. It's a command line tool for tracking time.

## Installation 

Clone the repository and run `npm install`

```
git clone git@github.com:benwilhelm/tlatl-time-tracker.git 
cd tlatl-time-tracker 
npm install 
```

## Testing 

```npm test```

to test once, or 

```npm run test:watch```

for watch mode

## Usage 

Interface is in progress and subject to change, and for more context you can have a look at office hours recordings starting May 4. Basic usage is intended to be

```node index.js [command]```


#### Command: `start`

```node index.js start``` 

Begins timing 

#### Command: `stop`

```node index.js stop``` 

Stops timing

#### Command: `report' 

```node index.js report```

Displays list of recorded sessions (start/stop pairs) and total time recorded