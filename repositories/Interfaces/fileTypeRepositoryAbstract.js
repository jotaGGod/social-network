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

class IFileTypeRepository {
    constructor() {
        assertIsConcreteInstance(this, IFileTypeRepository);
        assertMethodImplemented(this, 'create');
        assertMethodImplemented(this, 'getById');
        assertMethodImplemented(this, 'getAll');
        assertMethodImplemented(this, 'delete');
    }
}

module.exports = {
    IFileTypeRepository,
    assertIsInstanceOfContract
}