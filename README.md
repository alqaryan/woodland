__README__
__Woodland Project__
__Iteration 1__
__3/29/2020__

This file provides instructions for downloading our project repository from github, installing the necessary components, and running the application using the Expo-CLI (command line interface) and iOS simulator. Git, yarn, and Expo all need to be correctly installed in order to successfully build and run the application according to these directions. NPM or an alternative package manager can be used instead of yarn.

__Stage I: Downloading the Project__
1. Download git on your local computer. Git can be downloaded [here](https://git-scm.com/downloads). 
2. Using the terminal, navigate to your workplace or the directory that you want to store our project in. Our Github repository is linked [here](https://github.com/alqaryan/woodland).
3. Use the following terminal command to download the project to the working directory: 
`git clone _ https://github.com/alqaryan/woodland.git"`
4. Navigate to project using the command `cd woodland`

__Stage II: Installing Required Components__
1. Install yarn via Homebrew, MacPorts, or shell script following the directions linked [here](https://classic.yarnpkg.com/en/docs/install/#mac-stable). Homebrew is a commonly recommended package manager for Mac users.
2. From within the woodland directory, run the command `yarn install `to install the projects required dependencies. This command should be run every time a new dependency is added to the project.
3. Run the command `yarn global add expo-cli` to install the Expo-CLI 2.0 component, which is a tool used to develop React Native applications. At this point, all required project files and packages should be installed locally.

__Stage III: Running the Application using iOS Simulator__
1. Using the command `expo start --ios` to build and run the mobile application on your local computer using the iOS simulator.
2. Additional XCode components might need to be installed depending upon your device’s current developer settings. If prompted, install the required Xcode components and then restart the application. If the iOS simulator does not start and a prompt does not appear, visit the [Apple Xcode guide](https://develop.apple.com/xcode/download) to install the required developer components.

