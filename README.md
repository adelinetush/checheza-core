# Laraland: Core
Laraland's core is responsible for locating and loading different addons and their dependencies as well as providing an easy way to access resources throughout the system.

## Prerequisites
You need to make sure you have some stuff available before you try to build the core. You will need the following packages installed and present in your $PATH:
- Java JDK, works with both Oracles JDK and OpenJDK
- Apache Cordova
- Android SDK
- AVD / Android device


## Submodules
If you want our standard addons in your build you can easily run some commands to fetch them from our other repositories.

### Current submodules
| Addon        | Type   | Progress        |
|--------------|:------:|----------------:|
| Treehouse    | Main   | In developement |

In order to fetch the addons you can run:
```
git submodule init
```
Then:
```
git submodule update
```
## Building and running
In order to run or build the application you just run the normal cordova commands. Make sure you are somewhere inside the project's folder structure when running on of the following commands.

Building:
```
cordova build android
```

Running:
```
cordova run android
```