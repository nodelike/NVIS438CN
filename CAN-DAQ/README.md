# NVIS425 - Data Acquisition Software

### About the software:

Application: **NVIS425-DAQ**

Author: **Kishore Gunalan** - [nodelike @ Twitter/X](https://x.com/nodelike)

Description: This software helps accquire data from the NVIS425 module which is a battery characteristics training system.

Tech Stack: Electron Framework with HTML, CSS & JavaScript

## This codebase has the following files and folder:
```
NVIS425/
│
├── node_modules/                 // Directory containing installed npm packages
│
├── dist/                         // Build setup location
│   ├── 425-DAQ Setup 1.0.0.exe   // Actual SETUP
│
├── src/                          // Build setup location
│   │
│   ├── assets/                   // All the assets are contained in this folder. Logo, images, etc.
│   ├── main.js                   // Main parameters for electron framework and intializing start window and application
│   ├── index.html                // HTML for the whole app
│   ├── styles.css                // Complete CSS for HTML
│   ├── renderer.js               // Logics - defining function and handling DAQ mechanics 
│   

```
---

## Steps to develop:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
To be able to start development on EV-SIMTEL, make sure that you have the following prerequisites installed: 

- [Node.js](https://nodejs.org/en)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [git](https://git-scm.com/downloads)

### Installing

Follow this instructions below to build the application:
 
**1. Install Node.js and npm:**

*For Windows/MacOS*:
- Download and install Node.js from [Node.js website](https://nodejs.org/). npm is included in the installation.

- Alternatively, On MacOS, If you have [`Homebrew`](https://brew.sh/) installed, run:
```bash
brew install node npm
```
 
**2. Open the codebase directory:**
```bash
cd NVIS425
```

**3. Install NPM packages:**
```bash
npm install electron --save-dev
```

**4. Start the application:**
```bash
npm start
```

## License

This project is licensed under the Nvis Technologies Pvt. Ltd - END USER LICENSE AGREEMENT - see the [LICENSE.md](LICENSE.md) file for details.