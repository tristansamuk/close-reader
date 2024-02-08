# Project Title

_CloseReader_ is an app for reading and learning about poetry with the help of generative AI.

### Problem

Almost all the poetry that students read in English literature programs can be found online for free, but very few readers take advantage of its availability. One barrier is the poor user experience offered by the websites that host these texts; another is that the interpretive guidance readers need is largely restricted to those who can afford post-secondary education. The internet has democratized access to poetry, but not the means to read and understand it. My project tries to bridge this gap by providing a visually appealing and illuminating environment for anyone who wants to explore the poetic tradition.

### Sprint 1 Notes

- For this sprint, I only populated poems and analyses for Shakespeare, Donne, and Wordsworth
- I also opted to store pre-generated analyses rather because of some issues with my OpenAI api key

### User Profile

- General readers:
  - Curious about the poetic tradition, but don’t know where to start
  - Looking for a clean, well-designed reading environment that looks good on mobile devices
  - Want help understanding and interpreting what they’re reading

## Installation

- Clone repository
- Install dependencies for both client and server
- Follow instructions in .env.example for setting local host, cors origin, etc.
- Using Knex, run migration file and seed data

### Tech Stack

#### Languages

- TypeScript
- Sass/CSS
- HTML

#### Build/Development

- Vite

#### Runtime Environment

- Node

#### Database Management

- MySQL

#### Frameworks and Libraries

- Axios
- Express
- Knex
- React
- React Hamburger
- React Router

### Sitemap

- Home Page
- Poems Page
- Poets Page
- Single Poet Page
- Single Poem Page

## Next Steps

- Connect analysis button to OpenAI endpoint
- Create poetry collections feature
- Add login and saved poems functionality
- Add search functionality
- Populate database with at least five poems per poet
- Create an admin page for uploading, editing, and deleting poems and poets
