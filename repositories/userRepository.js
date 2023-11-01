const User = require('../models/users');
const Sequelize = require('../models/db');
const bcrypt = require("bcrypt");

class Repository {
    async createUser(full_name, email, criptoPass) {
        const t = await Sequelize.transaction();
        const existingUser = await User.findOne({ where: { full_name, email } });
        if (existingUser) throw new Error('User already exists');
        const user = await User.create(
          {
              full_name,
              email,
              criptoPass
           },
           { transaction: t }
         );
        await t.commit();
        const id = user.id;
        const is_active = user.is_active;
        return {
            is_active,
            id,
            full_name,
            email
        };
    };

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Email not found');
        return await bcrypt.compare(password, user.password)
    };

    async getById(id){
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error('User not found');
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
        if (!user) throw new Error('User not found');
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
