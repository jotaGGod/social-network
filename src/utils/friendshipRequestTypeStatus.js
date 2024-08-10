/**
 * Status codes for friendship requests.
 * @readonly
 * @enum {number}
 */
module.exports = {
    /**
     * Indicates that the friendship request is awaiting approval.
     * @constant {number}
     */
    AWAITING_APPROVAL: 1,

    /**
     * Indicates that the friendship request has been accepted.
     * @constant {number}
     */
    ACCEPTED: 2,

    /**
     * Indicates that the friendship request has been denied.
     * @constant {number}
     */
    DENIED: 3
};
