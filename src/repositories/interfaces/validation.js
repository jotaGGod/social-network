/**
 * Asserts that an instance is not a direct instantiation of an abstract class.
 * Throws an error if the instance is created directly from the abstract class.
 * @param {Object} instance - The instance to check.
 * @param {Function} abstractClass - The abstract class constructor.
 * @throws {Error} Throws an error if the instance is created directly from the abstract class.
 */
function assertIsConcreteInstance(instance, abstractClass) {
    if (instance.__proto__ === abstractClass.prototype) {
        throw new Error('Abstract class cannot be instantiated directly');
    }
}

/**
 * Asserts that a method is implemented in the instance.
 * Throws an error if the method is not implemented.
 * @param {Object} instance - The instance to check.
 * @param {string} methodName - The name of the method to check.
 * @throws {Error} Throws an error if the method is not implemented in the instance.
 */
function assertMethodImplemented(instance, methodName) {
    if (!instance[methodName]) {
        throw new Error(`Method ${methodName} must be implemented`);
    }
}

/**
 * Asserts that an instance is an instance of a specific contract class.
 * Throws an error if the instance is not of the specified contract class.
 * @param {Object} instance - The instance to check.
 * @param {Function} contractClass - The contract class constructor.
 * @throws {Error} Throws an error if the instance is not an instance of the contract class.
 */
function assertIsInstanceOfContract(instance, contractClass) {
    if (!(instance instanceof contractClass)) {
        throw new Error(`Type Class must be an instance of ${contractClass}`);
    }
}

module.exports = {
    assertIsConcreteInstance,
    assertMethodImplemented,
    assertIsInstanceOfContract
};
