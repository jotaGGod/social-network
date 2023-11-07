const User = require('../models/users');
const Sequelize = require('../models/db');
const bcrypt = require("bcrypt");
const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class Repository {
    async createUser(full_name, email, hashedPassword) {
        try {
            return Sequelize.transaction(async (t) => {
                return User.create(
                    {
                        full_name,
                        email,
                        password: hashedPassword
                    }, { transaction: t });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating user');
        }
    };
    async getByEmail(email) {
        return User.findOne({ where: { email } });
        /*const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');*/
    };
    async getById(id){
        const user = await User.findOne({ where: { id } });
        if (!user) throw new ApiError('User not found');
        return {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            is_active: user.is_active
        };
    };
    async getAll(){
        return await User.findAll();
    };
    
    async update(id, full_name, email) {
        const t = await Sequelize.transaction();
        const user = await User.findOne({ where: { id } });
        if (!user) throw new ApiError('User not found');
        user.set({
            full_name,
            email
        });
        await user.save({ transaction: t });    
        await t.commit();
        return {
            full_name,
            email
        };
    };

    async delete (id) {
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error('User not found');
        await user.destroy();
        return true;
    };
}

module.exports = new Repository();
