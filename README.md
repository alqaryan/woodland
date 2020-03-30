## README
## Woodland Project 
## Iteration 1
## 3/29/2020

This file provides instructions for downloading our project repository from github, installing the necessary components, and running the application using the Expo-CLI (command line interface) and iOS simulator. Git, yarn, and expo all need to be correctly installed in order to successfully build and run the application according to these directions. NPM or an alternative package manager can be used instead of yarn.



## Stage I: Downloading the Project
Download git on your local computer.
Using the terminal, navigate to your workplace or the directory that you want to store our project in. Our Github repository is linked here (https://github.com/alqaryan/woodland).
Use the following terminal command to download the project to the working directory: 
“git clone https://github.com/alqaryan/woodland.git”.
Navigate to project using the command “cd woodland”.

## Stage II: Installing Required Project Components
Install yarn via Homebrew, MacPorts, or shell script following the directions linked here. Homebrew is a commonly recommended package manager for Mac users. We recommend using Homebrew, especially if it is already installed on your device.
From within the woodland directory, run the command “yarn install” to install the projects required dependencies. This command should be run every time a new dependency is added to the project.
Run the command “yarn global add expo-cli” to install the Expo-CLI 2.0 component, which is a tool used to develop React Native applications. At this point, all required project files and packages should be installed locally.

##Stage III: Running the Application using iOS Simulator
Using the command “expo start --ios” to build and run the mobile application on your local computer using the iOS simulator. 
Additional XCode components might need to be installed depending upon your device’s current developer settings. If prompted, install the required XCode components and then restart the application. If the iOS simulator does not start and no prompt appears, visit “https://develop.apple.com/xcode/download” to install the required developer components.

