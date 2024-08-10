# Social Network

Social Network Project is an educational backend API that i used to study and pratice Node.js. Key features are user registration and login, friendship management, posting updates, comments, reactions, accepting or declining friend requests, and creating public or private photo or video albums. 
## Techs

* [Node.js](https://nodejs.org/en) - Runtime
* [JavaScript](https://www.javascript.com) - Programming language
* [MySQL](https://www.mysql.com) - Database
* [Jest](https://jestjs.io) - Testing framework
* [Knex.js](https://knexjs.org) - ORM (Object-Relational Mapping)
* [Jwt](https://jwt.io) - Token management for application access


## Environment Setting

1. **Clone the repository**

```bash
 git clone https://github.com/Jpgomes06/social-network
```

2. **Set the environment variable**
```bash
 DATABASE="mysql://your_database_user:password@localhost/myapp_testsocial_network"
```

3. **Install dependencies**
```bash
 npm install
```

4. **Run the application**
```bash
 npm run dev
```
## Design patterns

1 [Dependency injection](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/#:~:text=In%20software%20engineering%2C%20dependency%20injection,be%20used%20(a%20service).)

2 [Dependency inversion](https://medium.com/@tbaragao/solid-d-i-p-dependency-inversion-principle-e87527f8d0be)

3 [Service and repository](https://medium.com/@ankitpal181/service-repository-pattern-802540254019)

JavaScript does not have built-in interface support like TypeScript. Therefore, implementing dependency inversion as in TypeScript can be challenging. To address this, I created an adaptation of interfaces in JavaScript to facilitate dependency inversion.

The lack of native interfaces means that we don't have compile-time checks to ensure that a class implements all the methods expected by an interface. One approach to mitigate this is to add manual runtime checks to ensure that classes implement the expected methods. While this doesn't offer the same compile-time safety as interfaces, it can help catch errors during development.

Here is an example of how I achieved this:


```
class IFileTypeRepository {
    constructor() {
        assertIsConcreteInstance(this, IFileTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}
```
### Explanation of `IFileTypeRepository` Class

This class defines an interface-like structure in JavaScript to enforce dependency inversion.

#### Key Points:

1. **Class Definition**: `IFileTypeRepository` acts as an interface.
2. **Constructor Assertions**:
    - `assertIsConcreteInstance(this, IFileTypeRepository)`: Ensures the instance is concrete.
    - `assertMethodImplemented(this, 'create')`: Ensures `create` method is implemented.
    - `assertMethodImplemented(this, 'getById')`: Ensures `getById` method is implemented.
    - `assertMethodImplemented(this, 'getAll')`: Ensures `getAll` method is implemented.
    - `assertMethodImplemented(this, 'delete')`: Ensures `delete` method is implemented.

These assertions check at runtime that any class implementing `IFileTypeRepository` provides the required methods, mimicking TypeScript’s interface behavior.

### Explanation of Assertion Functions

These functions enforce interface-like behavior and instance type checks in JavaScript.

#### Functions:

1. **`assertIsConcreteInstance(instance, abstractClass)`**:
    - Checks if the instance is a direct instantiation of the abstract class.
    - Throws an error if the abstract class is instantiated directly.

    ```javascript
    function assertIsConcreteInstance(instance, abstractClass) {
        if (instance.__proto__ === abstractClass.prototype) {
            throw new Error('Abstract class cannot be instantiated directly');
        }
    }
    ```

2. **`assertMethodImplemented(instance, methodName)`**:
    - Checks if a method is implemented in the instance.
    - Throws an error if the method is not implemented.

    ```javascript
    function assertMethodImplemented(instance, methodName) {
        if (!instance[methodName]) {
            throw new Error(`Method ${methodName} must be implemented`);
        }
    }
    ```

3. **`assertIsInstanceOfContract(instance, contractClass)`**:
    - Checks if the instance is of the specified contract class type.
    - Throws an error if the instance is not of the expected type.

    ```javascript
    function assertIsInstanceOfContract(instance, contractClass) {
        if (!(instance instanceof contractClass)) {
            throw new Error(`Type Class must be an instance of ${contractClass}`);
        }
    }
    ```

These functions are used to simulate interface and type-checking mechanisms, ensuring that the instances adhere to the expected structure and behavior at runtime.


## Database Diagram


## Postman collection

- [Click here to postman collection](https://documenter.getpostman.com/view/25048314/2sA3rzJCfw)

## Endpoints

#### Users
- **POST** `/users`: Register an user
- **POST** `/login`: Log in an user and generate a token access
- **POST** `/refresh-token`: Generate a new refresh token
- **GET** `/users`: Get all users
- **GET** `/users/:id`: Get an user by id
- **GET** `/users/feed`: Get an user feed news
- **GET** `/users/reports/post-statistics`: Get an post user post statistics
- **PUT** `/users`: Update an user
- **DEL** `/users`: Delete an user

#### Friendship
- **GET** `/friendship`: Get an user list friendship
- **DEL** `/friendship/:id`: Delete an user friendship

#### Reactions
- **POST** `/reactions`: Register an Reaction
- **GET** `/reactions`: Get all Reactions
- **GET** `/reactions/:id`: Get an Reaction by id
- **PUT** `/reactions/:id`: Update an Reaction
- **DEL** `/reactions/:id`: Delete an Reaction

#### Friendship request type
- **POST** `/friendship_request_type`: Register an friendship request type
- **GET** `/friendship_request_type`: Get all friendship request types
- **GET** `/friendship_request_type/:id`: Get an friendship request type by id
- **DEL** `/friendship_request_type/:id`: Delete an friendship request type by id

#### Friendship request
- **POST** `/friendship_request`: Register an friendship request
- **GET** `/friendship_request`: Get all friendship requests
- **PUT** `/friendship_request/:id`: Update an friendship request by id
- **DEL** `/friendship_request/:id`: Delete an friendship request by id

#### File type
- **POST** `/file_type`: Register an file_type
- **GET** `/file_type`: Get all file types
- **DEL** `/file_type/:id`: Delete an file type

### Target public
- **POST** `/target_public`: Register an target public
- **GET** `/target_public`: Get all target publics
- **DEL** `/target_public/:id`: Delete an target public

### Album
- **POST** `/album`: Register an album
- **GET** `/album`: Get all albums
- **GET** `/album/:id`: Get an album by id
- **PUT** `/album/:id`: Update an album
- **DEL** `/album/:id`: Delete an album

### Post
- **POST** `/post`: Register an post
- **GET** `/post`: Get all posts
- **GET** `/post/:id`: Get an post by id
- **PUT** `/post/:id`: Update an post
- **DEL** `/post/:id`: Delete an post

### Album item
- **POST** `/album_item`: Register an album item
- **GET** `/album_item`: Get all album items
- **DEL** `/album_item/:id`: Delete an album item

### Reactions type
- **POST** `/reactions_type`: Register an Reactions type
- **GET** `/reactions_type`: Get all Reaction types
- **DEL** `/reactions_type/:id`: Delete an Reaction type

### Comments
- **POST** `/comments`: Register an comment
- **GET** `/comments`: Get all comments
- **GET** `/comments/:id`: Get an comments by id
- **PUT** `/comments/:id`: Update an comment
- **DEL** `/comments/:id`: Delete an comment
## Conclusion
I managed to implement tests, patterns, HTTP requests, and OOP. To make the project more robust and closer to what it would be in a real project, I could implement authentication for admin users, logs, metrics dashboards, load tests, and much more.

The application encountered some bugs during the development process related to certain libraries and frameworks, and handling parallel tests using Jest and Knex was quite a challenge.

I really enjoyed doing this challenge; I learned a lot of important concepts about the language and new ways of solving problems. It was a great experience.
