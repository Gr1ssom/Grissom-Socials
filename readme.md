# Social Media API

This is an API for a social media platform that handles large amounts of unstructured data using a NoSQL database. It allows you to perform various operations related to users, thoughts, and reactions.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository: `git clone git@github.com:Gr1ssom/Grissom-Socials.git`
2. Navigate to the project directory: `cd grissom-socials`
3. Install the dependencies: `npm install`

## Usage

1. Start the server: `npm start`
2. Access the API routes using a tool like Insomnia or Postman.

## API Routes

### Users

- `GET /api/users`: Get all users.
- `GET /api/users/:userId`: Get a single user by their `_id` and retrieve their thoughts and friend data.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:userId`: Update a user by their `_id`.
- `DELETE /api/users/:userId`: Remove a user by their `_id`. (Bonus: Associated thoughts will also be deleted.)
- `POST /api/users/:userId/friends/:friendId`: Add a new friend to a user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thoughts

- `GET /api/thoughts`: Get all thoughts.
- `GET /api/thoughts/:thoughtId`: Get a single thought by its `_id`.
- `POST /api/thoughts`: Create a new thought. The `username` field should match an existing user, and the created thought's `_id` will be pushed to the associated user's thoughts array.
- `PUT /api/thoughts/:thoughtId`: Update a thought by its `_id`.
- `DELETE /api/thoughts/:thoughtId`: Remove a thought by its `_id`. (Associated reactions will also be deleted.)
- `POST /api/thoughts/:thoughtId/reactions`: Create a reaction stored in a single thought's reactions array field.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Pull and remove a reaction by its `reactionId` value.

## Schema Models

### User

- `username`: String (Required, Unique, Trimmed)
- `email`: String (Required, Unique, Valid email format)
- `thoughts`: Array of _id values referencing the Thought model
- `friends`: Array of _id values referencing the User model (self-reference)

### Thought

- `thoughtText`: String (Required, 1-280 characters)
- `createdAt`: Date (Default: Current timestamp)
- `username`: String (Required)
- `reactions`: Array of nested documents created with the Reaction schema

### Reaction

- `reactionId`: ObjectId (Default: New ObjectId)
- `reactionBody`: String (Required, 280 character maximum)
- `username`: String (Required)
- `createdAt`: Date (Default: Current timestamp)

## License

This project is licensed under the [MIT License](LICENSE).
