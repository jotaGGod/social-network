function assertIsConcreteInstance(instance, abstractClass) {
    if (instance.__proto__ === abstractClass.prototype) {
        throw new Error('Abstract class cannot be instantiated directly');
    }
}

function assertMethodImplemented(instance, methodName) {
    if (!instance[methodName]){
        throw new Error(`Method ${methodName} must be implemented`);
    }
}

function assertIsInstanceOfContract(instance, contractClass){
    if (!(instance instanceof contractClass)) {
        throw new Error(`Type Class must be an instance of ${contractClass}`);
    }
}

class IUserRepository {
    constructor() {
        assertIsConcreteInstance(this, IUserRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getByEmail');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'update');
        assertMethodImplemented(this, 'delete');
        assertMethodImplemented(this, 'getFeedNews');
        assertMethodImplemented(this, 'getPostStatistics');
    }
}

module.exports = {
    IUserRepository,
    assertIsInstanceOfContract
}