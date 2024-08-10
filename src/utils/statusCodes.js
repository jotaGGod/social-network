/**
 * HTTP status codes.
 * @readonly
 * @enum {number}
 */
module.exports = {
    /**
     * Indicates an internal server error.
     * @constant {number}
     */
    INTERNAL_SERVER_ERROR: 500,

    /**
     * Indicates that the requested resource was not found.
     * @constant {number}
     */
    NOT_FOUND: 404,

    /**
     * Indicates that the request could not be understood by the server due to malformed syntax.
     * @constant {number}
     */
    BAD_REQUEST: 400,

    /**
     * Indicates that a resource has been successfully created.
     * @constant {number}
     */
    CREATED: 201,

    /**
     * Indicates that the request has succeeded.
     * @constant {number}
     */
    OK: 200,

    /**
     * Indicates that the request requires user authentication.
     * @constant {number}
     */
    UNAUTHORIZED: 401,

    /**
     * Indicates that the request could not be processed due to a conflict with the current state of the resource.
     * @constant {number}
     */
    CONFLICT: 409
};
