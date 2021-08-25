<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- What my readme will consist of:
    1. Title
    2. link to website
    3. Table of Contents
    4. About the Project
        - motivation
        - technologies used
        - Design
    5. Getting started
        - prereqs
        - installation
    5. Features
    6. Usage (screenshots)
    7. Roadmap for Future
    8. License

 -->

 <!-- PROJECT LOGO -->

<br />
<p align="center">
  <img src="./images/icon.png" alt="Logo" width="100" height="100">
  <h1 align="center">iLifts</h1>

  <p align="center">
    A mobile fitness app to track workouts and easily monitor progression!
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#design">Design</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap-for-future">Roadmap For Future</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Motivation

Fitness is a major part of my life and I particularly enjoy weightlifting. Weightlifting requires consistency and incremental progression in order to achieve physique and strength goals.

On both the Apple App store and Google store, there are little to no mobile apps that cater to tracking fitness progression without charging some sort of premium for a subscription plan. Apps that track your weight, strength progression in various exercises and give users access to personalized workout plans all require periodic payments ranging anywhere from $5-20+ per month.

My goal was to create an app with a simple, modern design that can allow users to easily log workouts and track progress weekly, monthly and even yearly for free. In addition, it was an opportunity to learn mobile development and understand the benefits of state management.

### Design

Influenced by mobile apps like Stronglifts, MyFitnessPal, SmartGym and many other fitness apps currently on the market.

### Built With

- [React Native](https://reactnative.dev/)
- [JavaScript](https://www.javascript.com/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MobX](https://mobx.js.org/README.html)
- [React Navigation](https://reactnavigation.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Need to have Node.js installed and configured on your local environment. See package.json for list of additional libraries to install.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/usmanazz/iLifts.git
   ```

2. `cd` into the app folder.
3. Delete the package-lock.json files in the root directory.
4. Delete the node_modules folder in root directory.
5. Install NPM packages in root directory
   ```sh
   npm install
   ```
6. To run React Native project:
   ```sh
   npm start
   ```

<!-- FEATURES EXAMPLES -->

## Features

- Users can create a workout and indicate how many sets and reps were completed for a given exercise.
- A rest timer popup is displayed in between each completed set.
- Users can adjust the weight and number of sets to complete for any exercise.
- Users can reset the sets for any exercise.
- Users can save a workout.
- A list of cards representing previously saved workouts will be displayed with a date, exercises, and sets/reps completed for each exercise on the Workout History screen.
- Users can modify previous workouts as well as delete an entire workout.
- The app currently cycles between 2 default workout plans.

<!-- USAGE EXAMPLES -->

## Usage

### Create Workout

![](https://media.giphy.com/media/klRbEfXkYCNYvN7awg/giphy.gif)

### Results Page

![](images/results_page_screenshot.png)

### Recipe Page

![](images/recipe_page_screenshot.png)

### Sign up Page

![](images/signup_page_screenshot.png)

### Log in Page

![](images/login_page_screenshot.png)

### Account Page showing User's Favorites

![](images/account_page_favorites_screenshot.png)

### Account Page showing Account Details tab

![](images/account_page_details_screenshot.png)

### About Page

![](images/about_page_screenshot.png)

<!-- ROADMAP -->

## Roadmap For Future

### Features to Add

- Add animations and transitions to various React Components for a more modern smooth UI
- Display user's name and user's email on 'Account Details' tab on acccount page
- Persist recipe data on recipe page
- Optimize website Accessibility
- Optimize website SEO

### Fixes/Code Maintenance

- Utilze React Context API to refactor and manage state rather than passing state as props
- Update database schema to normalize database, minimizing redundancy and establishing more meaningful relationships between entities
- Incorporate more robust fetch error handling
- Utilize Jest and other testing libraries to automate testing
- Update api routes to adhere standards for api naming conventions
- Store search results in database to minmize calls to Food api (reduce overage charges)

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.
