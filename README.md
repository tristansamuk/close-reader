# Project Title

Close Reader

## Overview

Close Reader is an app for reading and learning about poetry with the help of generative AI.

### Problem

Almost all the poetry that students read in English literature programs can be found online for free, but very few readers take advantage of its availability. One barrier is the poor user experience offered by the websites that host these texts; another is that the interpretive guidance readers need is largely restricted to those who can afford post-secondary education. The internet has democratized access to poetry, but not the means to read and understand it. My project tries to bridge this gap by providing a visually appealing and illuminating environment for anyone who wants to explore the poetic tradition.

### User Profile

- General readers:
  - Curious about great poets like Shakespeare or Wordsworth, but don’t know where to start
  - Looking for a clean, well-designed reading environment that looks good on mobile devices
  - Want help understanding and interpreting what they’re reading

### Features

- As a user, I want to be able to view poems sorted by author
- As a user, I want to be able to search for poems by author, title
- As a user, I want to click on a poem and see it displayed in a reader-friendly view
- As a user viewing a poem I want to click on a button that will display AI-generated analysis to help me understand the text

- As as user, I want to be able to create an account to manage
- As a logged-in user, I want to curate playlist-like collections of poems that other users can access
- As a logged-in user, I want to be able to “like” my favourite collections
- As a logged-in user, I want to be able to “like” my favourite poems and add them to a personal collection
- As a logged-in user, I want to be to to “unlike” and remove poems from my personal collection
- As logged-in user, I want to be able to upvote my favourite poems

## Implementation

### Tech Stack

- React
- Node
- Front-end libraries
  - A front end library for pre-styled components (e.g., MaterialUI)
  - Framer Motion to handle animations
- Client libraries:
  - React
  - React-router
  - Axios
- Server libraries:
  - Express

### APIs

- I'll be using an external API called [PoetryDB](https://github.com/thundercomb/poetrydb/tree/master)

### Sitemap

- Home Page
- Browse Poets Page
- Poetry Collections Page
- Individual Poet Page
- Poem Page
- User's Favorite Poems Page
- Register/Login

### Mockups

#### Home Page

![]()

#### Browse Poets Page

![]()

#### Poetry Collections Page

![]()

#### Individual Poet Page

![]()

#### Poem Page

![]()

#### User's Favourite Poems Page

![]()

### Endpoints

**GET /title/:poemTitle/**

- Gets a JSON with each specific poem by title

Parameters:

- Input field: `title`
- Search term: title, or part of the title, of a poem
- Example request: `https://poetrydb.org/title/Ozymandias`

Response:

```json
[
  {
    "title": "Ozymandias",
    "author": "Percy Bysshe Shelley",
    "lines": [
      "I met a traveller from an antique land",
      "Who said: Two vast and trunkless legs of stone",
      "Stand in the desert...Near them, on the sand,",
      "Half sunk, a shattered visage lies, whose frown,",
      "And wrinkled lip, and sneer of cold command,",
      "Tell that its sculptor well those passions read",
      "Which yet survive, stamped on these lifeless things,",
      "The hand that mocked them, and the heart that fed:",
      "And on the pedestal these words appear:",
      "'My name is Ozymandias, king of kings:",
      "Look on my works, ye Mighty, and despair!'",
      "Nothing beside remains. Round the decay",
      "Of that colossal wreck, boundless and bare",
      "The lone and level sands stretch far away."
    ],
    "linecount": "14"
  }
]
```

**GET /author/:authorName**

- Get all poems by a single author

Parameters:

- Input field: `author`
- Search term: name, or part of the name, of the author
- Example request: `https://poetrydb.org/author/Keats`

Response:

```json
[
  {
    "title": "Happy Is England! I Could Be Content",
    "author": "John Keats",
    "lines": [
      // Lines
    ],
    "linecount": "14"
  },
  {
    "title": "To Hope",
    "author": "John Keats",
    "lines": [
      // Lines
    ],
    "linecount": "48"
  },
  {
    "title": "To My Brothers",
    "author": "John Keats",
    "lines": [
      // LInes
    ],
    "linecount": "14"
  }
  // More poems here
]
```

**_ GET /author _**

- Get all authors
- Input field: `author`
- Search term: none
- Example request

**POST /cafes/:id/rating**

- Logged in user can add their rating of a café

Parameters:

- id: Café id
- token: JWT of the logged in user
- rating: Number Rating out of 5 in 0.5 increments

Response:

```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**PUT /cafes/:id/rating**

- Logged in user can update their rating of a café

Parameters:

- id: Café id
- token: JWT of the logged in user
- rating: Number Rating out of 5 in 0.5 increments

Response:

```
{
    "id": 1,
    "name": "Quantum Coffee",
    "distance": 0.25,
    "averageRating": 4.5,
    "userRating": 5
}
```

**POST /users/register**

- Add a user account

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

**POST /users/login**

- Login a user

Parameters:

- email: User's email
- password: User's provided password

Response:

```
{
    "token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}
```

### Auth

- JWT auth
  - Before adding auth, all API requests will be using a fake user with id 1
  - Added after core features have first been implemented
  - Store JWT in localStorage, remove when a user logs out
  - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create migrations

- Gather 15 sample café geolocations in two different cities

- Create seeds with sample café data

- Deploy client and server projects so all commits will be reflected in production

- Feature: List cafés from a given location

  - Implement list cafés page including location form
  - Store given location in sessionStorage
  - Create GET /cafes endpoint

- Feature: View café

  - Implement view café page
  - Create GET /cafes/:id

- Feature: Rate café

  - Add form input to view café page
  - Create POST /ratings
  - States for add & update ratings

- Feature: Home page

- Feature: Create account

  - Implement register page + form
  - Create POST /users/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /users/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in local storage, include JWT on axios calls

- Bug fixes

- DEMO DAY

## Nice-to-haves

- Integrate Google Places / Maps
  - View more details about a café
  - Visual radius functionality
- Forgot password functionality
- Ability to add a café
- Elite status badging for users and cafés: Gamify user ratings
- Expand rating system
  - Coffee
  - Ambiance
  - Staff
- Expanded user information: full name, favorite café
- Unit and Integration Tests
