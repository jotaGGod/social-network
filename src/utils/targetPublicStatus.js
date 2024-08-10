/**
 * Privacy levels for content visibility.
 * @readonly
 * @enum {number}
 */
module.exports = {
    /**
     * The content is visible to everyone.
     * @constant {number}
     */
    PUBLIC: 1,

    /**
     * The content is visible only to friends.
     * @constant {number}
     */
    FRIENDS: 2,

    /**
     * The content is visible to friends except for specified individuals.
     * @constant {number}
     */
    FRIENDS_EXCEPT: 3,

    /**
     * The content is visible only to the user who created it.
     * @constant {number}
     */
    ONLY_ME: 4,

    /**
     * The content is visible based on custom privacy settings.
     * @constant {number}
     */
    CUSTOM: 5
};
