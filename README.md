<div id="top"></div>
<h3 align="center">Bookshelf - Personal Library</h3>

  <p align="center">
    A web application that stores the books you have read, are reading or want to read and makes it easy to search through them.
    <br />
    <a href="https://laughing-galileo-6719bd.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/daduckster/bookshelf/issues">Report Bug</a>
  </p>
</div>



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
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

The project started as inspiration from "[The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/library)", but after implementing the expected
features, it was clear that this application could do more than that. The main features that this
version includes are:
- Add data about the book
  - Author
  - Title
  - Status (Finished, Reading, Stopped, For Later)
  - Rating
  - Page you stopped on
  - Year of Reading
  - Genre (choose from default options or add your own)
  - Note

- Edit or delete any of the books in your library.

- You can search and filter the library by any of the above mentioned criteria
- The arrangement of books is flexible. They intelligently compile to evenly sized columns depending on the
  amount of data in each book tile.

The books are saved in the browser's local storage. The whole application was made with Vanilla
JavaScript without any frameworks or packages besides Sass.

*Mobile version is in development.*
<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* Vanilla JavaScript
* [SCSS](https://sass-lang.com/)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

* Install npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/daduckster/bookshelf.git
   ```
1. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Dive right in by adding your favorite books. You can use the search bar to search for any of the
books you have added, or filter them by clicking  the status icons on the right hand side. You can
always check the current status by looking at the corresponding icon on the book's tile.

Since the book data is saved in your local browser storage, make sure to access the application on
the same device without using Incognito Mode.

<p align="right">(<a href="#top">back to top</a>)</p>