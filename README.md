

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img width="1511" alt="image" src="https://github.com/gilsontomyicloud/tesla-hero-app/assets/97668108/6a8fab03-2350-48a6-a262-ba1e7287c417">

<img width="1511" alt="image" src="https://github.com/gilsontomyicloud/tesla-hero-app/assets/97668108/6c73a7a5-a0ae-4008-9ab4-21fd559a37da">





A Laravel - React Full Stack Development project with Tailwind CSS support for UI


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![React][React.js]][React-url]
* [![Laravel][Laravel.com]][Laravel-url]
* [Tailwind CSS]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps

### Prerequisites


* Node JS
  ```sh
  sudo apt install nodejs
  ```
* npm
  ```sh
  npm install npm@latest -g
  ```
* PHP 8.2 or above
  ```sh
  brew install php
  ```

  or install XAMPP/Laragon/MAMP
  
* Composer
  
  Follow the steps mentioned in the folllowing link https://www.digitalocean.com/community/tutorials/how-to-install-and-use-composer-on-ubuntu-20-04

* MySQL or MariaDB

  If you are downloading XAMPP/Laragon you will have one available with the package

  

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone git@github.com:gilsontomyicloud/tesla-hero-app.git
   ```
2. First we will start with installation of Laravel backend API project with all required dependencies. Make sure you have MYSQL, PHP, Composer up and running in your local machine
3. Navigate to `api` folder in your project directory and enter the following commands in your terminal(make sure you are in api folder)
   ```sh
   composer install
   cp .env.example .env
   ```
4. Once the dependencies are installed create a database in your MYSQL server and have the credenetials available with you to insert it into the .env file created using the above step
5. Open .env file in api folder and enter the following with your MYSQL server details DB_HOST,DB_PORT,DB_DATABASE,DB_USERNAME,DB_PASSWORD and save it
6. Now in your terminal run the following commands to generate key, migrate table structures, some seed table values and symnlink creatiion
   ```sh
   php artisan key:generate
   php artisan migrate --seed
   php artisan storage:link
   ```
7. Once all the above steps are completed you can run the follwoing command to start the API server
   ```sh
   php artisan serve
   ```
8. You can view the server defualt page using the following link once the server is up and running http://127.0.0.1:8000/
9. Our next step is to install all dependencies for React Web Application to run in our local machine. So open a new terminal and navigate to the folder web in the clonned directory
10. Make sure you have the Node.JS(Version 19+ or above) to make this project running without any issues. In your opened terminal run the following
   ```sh
   npm install
   ```
11. Create a .env file in the web folder with the following values(assuming your API server is running on 127.0.0.1:8000)
   ```env
   VITE_API_BASE_URL = http://127.0.0.1:8000
   VITE_API_MODEL_IMAGE_PATH = http://127.0.0.1:8000/storage/models/
   VITE_API_VARIANT_IMAGE_PATH = http://127.0.0.1:8000/storage/variants/
   VITE_API_MODEL_IMAGE_GALLERY_PATH = http://127.0.0.1:8000/storage/variants/gallery/
   ```
12. After the installation and env file creation is completed run the following to start the React JS web app
  ```sh
   npm run dev
   ```
13. You can access the web app from the following link in your local machine  http://localhost:3000/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

For API access to create Vehicle model, its variants and checking all the API endpoints used in the system please follow the POSTMAN documentation
https://documenter.getpostman.com/view/11897167/2sA35G2M4V

<p align="right">(<a href="#readme-top">back to top</a>)</p>




