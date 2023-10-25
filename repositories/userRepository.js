const User = require('../models/users');
const Sequelize = require('../models/db');

class Repository {
    async createUser(full_name, email) {
        const t = await Sequelize.transaction();

        const existingUser = await User.findOne({ where: { full_name: full_name, email: email } });

        if (existingUser) throw new Error('User already exists');

      const user = await User.create(
          {
              full_name,
              email
           },
           { transaction: t }
         );
      await t.commit();
      return user;
    };

    async getById(id){
        const user = await User.findOne({ where: { id } });

        if (!user) throw new Error('User not found');

        return user;
    };
    async getAll(){
        return await User.findAll()
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
        await t.commit()            
    };

    async delete (id) {
        const user = await User.findOne({ where: { id } });

        if (!user) throw new Error('User not found');

        await user.destroy();

        return true;
    };
    
}

module.exports = new Repository();
