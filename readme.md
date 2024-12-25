# PocketComp

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Ionic](https://img.shields.io/badge/Ionic-7.2.0-blue.svg)
![RapidAPI](https://img.shields.io/badge/RapidAPI-Integration-green.svg)

PocketComp is a versatile mobile application built with [Ionic](https://ionicframework.com/) that allows users to compile and execute code snippets directly from their devices. Leveraging the powerful [RapidAPI Compiler10](https://rapidapi.com/realbrain-realbrain-default/api/code-compiler10), PocketComp supports multiple programming languages and provides a seamless experience for developers on the go.

## Table of Contents

- [Features](#features)
  - [Supported Programming Languages](#supported-programming-languages)
  - [Supported Application Languages](#supported-application-languages)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Running the App](#running-the-app)

## Features

- **Code Compilation:** Compile code in various programming languages with optional input parameters.
- **Save Compilations:** Save your code compilations with custom titles for easy reference.
- **Search Functionality:** Quickly search through your saved compilations.
- **Custom Settings:** Set default programming language, application language, and theme according to your preferences.
- **Multilingual Support:** Available in Czech, English, and Polish.

### Supported Programming Languages

PocketComp supports a wide range of programming languages, including:

- PHP
- Python
- C
- C/C++
- C#
- Kotlin
- Go (Golang)
- R
- Java
- TypeScript
- Node.js
- Ruby
- Perl
- Swift
- Fortran
- Bash

### Supported Application Languages

- Czech
- English
- Polish

## Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **Ionic CLI:** Install the Ionic CLI globally if you haven't already:

  ```bash
  npm install -g @ionic/cli

### Running the App

1. Install dependencies using ```npm i```
2. Obtain ```x-rapidapi-key``` with ```x-rapidapi-host``` for [RapidAPI Compiler10](https://rapidapi.com/realbrain-realbrain-default/api/code-compiler10)
3. Set into ```/src/environments/environment(.prod).ts```
4. Run app using ```ionic serve```

For further development use:
- ```ionic build``` to build your app
- ```ionic cap sync``` to sync with platforms (android, ios)
