# PROJECT 4 README <!-- omit in toc -->

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Time Estimates](#time-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

\_**Chatter** is a Twitter clone built on a Ruby on Rails backend and React front end.

<br>

## MVP

\_The MVP for **Chatter** will feature user creation, authentication, the ability to create, favorite, comment on, and repost posts, and follow users.

<br>

### Goals

- _User CRUD_
- _Followers and following_
- _Following feed_
- _Post, repost, favorite, comments_

<br>

### Libraries and Dependencies

|    Library    | Description                                          |
| :-----------: | :--------------------------------------------------- |
|     React     | _Library for building front end interfaces with JSX_ |
| React Router  | _Library for simulating route changes in React apps_ |
|  Material UI  | _Component library for interface styling_            |
|     Sass      | _CSS with added functionality_                       |
| Ruby on Rails | _Framework for building back ends with Ruby_         |
|    bcrypt     | _Library for hashing passwords_                      |
|      JWT      | _Library for creating tokens_                        |

<br>

### Client (Front End)

#### Wireframes

> Use the Wireframes section to display desktop, tablet and mobile views. No hand-drawn wireframes. Use a tool like wireframe.cc, Whimsical or AdobeXD

![Dummy Link](url)

- Desktop Landing

![Dummy Link](url)

- Desktop Hero

![Dummy Link](url)

- Resource Index

![Dummy Link](url)

- Resource Show

![Dummy Link](url)

- Tablet Resource Index

![Dummy Link](url)

- Mobile Resource Index

#### Component Tree

(proposal/component-tree.png)

#### Component Hierarchy

```structure

src
|__ proposal/
|__ components/
      |__ nav.component.jsx
      |__ post.component.jsx
      |__ create.component.jsx
      |__ buttons.component.jsx
|__ screens/
      |__ profile.component.jsx
      |__ feed.component.jsx
      |__ messages.component.jsx

```

#### Component Breakdown

| Component |    Type    | state | props | Description                      |
| :-------: | :--------: | :---: | :---: | :------------------------------- |
|    Nav    | functional |   y   |   n   | _Nav will link to other screens_ |
|   Post    | functional |   n   |   y   | _Create posts_                   |
| Comments  | functional |   n   |   y   | _Comment on posts_               |
| Messages  | functional |   n   |   y   | _Send messages_                  |
|  Profile  | functional |   n   |   y   | _See your profile_               |
|   Feed    | functional |   n   |   y   | _See posts from following_       |

#### Time Estimates

| Task      | Priority | Estimated Time | Time Invested | Actual Time |
| --------- | :------: | :------------: | :-----------: | :---------: |
| HTML      |    L     |      1 hr      |     0 hrs     |    0 hrs    |
| Styling   |    L     |     10 hrs     |     0 hrs     |    0 hrs    |
| Front End |    L     |     20 hrs     |     0 hrs     |    0 hrs    |
| Back End  |    L     |     10 hrs     |     0 hrs     |    0 hrs    |
| TOTAL     |          |     41 hrs     |     0 hrs     |     TBD     |

<br>

### Server (Back End)

#### ERD Model

(proposal/erd.jpg)

<br>

---

## Post-MVP

- View posts by hashtags
- View trending posts

---

## Code Showcase

> Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

## Code Issues & Resolutions

> Use this section to list of all major issues encountered and their resolution.
