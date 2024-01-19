const { User, Friendship, Post, Reaction, ReactionType, sequelize } = require('../database/models');
const { QueryTypes } = require('sequelize');
const httpStatus = require("../utils/statusCodes");
const ApiError = require("../utils/ApiError");

class Repository {
    async createUser(full_name, email, hashedPassword) {
        try {
            return await User.sequelize.transaction(async (t) => {
                return User.create(
                    {
                        full_name: full_name,
                        email: email,
                        password: hashedPassword
                    }, { transaction: t });
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while creating user');
        }
    };
    async getByEmail(email) {
        try {
            return await User.findOne(
                { where: { email } }
            );
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a email by id');
        }
    };
    async getById(id){
        return User.findOne(
            {
                where: { id: id },
                attributes: ['id', 'full_name', 'email']
            }
        );
    };
    async getAll(){
        return User.findAll(
            { attributes: ['id', 'full_name', 'email',] }
        );
    };
    async update(id, full_name, email) {
        try {
            await User.sequelize.transaction(async (t) => {
                return User.update(
                    { full_name: full_name, email: email },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while updating user');
        }
    };

    async delete (id) {
        try {
            await User.sequelize.transaction(async (t) => {
                await User.update(
                    { is_active: false },
                    {
                        where: {id: id},
                        transaction: t
                    }
                );
            });
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR,'Error while deleting user');
        }
    };
    async getFeedNews(id) {
        try {
            return await sequelize.query(`
                SELECT
                    post_id,
                    JSON_OBJECT(
                            'author_  id', post_author_id,
                            'author_name', post_author
                    ) AS author,
                    post_description,
                    created_at,
                    JSON_OBJECT(
                        'likes', SUM(IF(reaction_type = 'like' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'love', SUM(IF(reaction_type = 'love' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'hahah', SUM(IF(reaction_type = 'hahah' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'angry', SUM(IF(reaction_type = 'angry' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'wow', SUM(IF(reaction_type = 'wow' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'sad', SUM(IF(reaction_type = 'sad' AND reaction_quantity IS NOT NULL, reaction_quantity, 0))
                    ) AS reactions,
                    comment_quantity
                FROM
                    (SELECT
                         P.id AS post_id,
                         F.friend_id AS post_author_id,
                         UF.full_name AS post_author,
                         P.description AS post_description,
                         P.created_at,
                         R.reaction_type,
                         R.reaction_quantity,
                         (
                             SELECT COUNT(id)
                             FROM comment
                             WHERE post_id = P.id
                         ) AS comment_quantity

                    FROM user AS U
                            INNER JOIN
                        friendship AS F
                        ON (U.id = F.principal_user_id AND F.is_active = 1)
                              INNER JOIN
                        post AS P
                        ON (F.friend_id = P.user_id AND P.is_active = 1)
                             INNER JOIN
                        user AS UF
                        ON (F.friend_id = UF.id)
                            LEFT JOIN
                        (
                            SELECT
                                R.post_id,
                                COUNT(R.id) AS reaction_quantity,
                                RT.description AS reaction_type
                            FROM reaction AS R
                                    JOIN reaction_type AS RT ON R.reaction_type_id = RT.id
                            GROUP BY R.post_id, RT.description
                        ) AS R ON R.post_id = P.id
                    WHERE U.id = :userId) AS subquery
                GROUP BY post_id, post_description, created_at, comment_quantity
                ORDER BY post_id`,
                {
                    replacements: { userId: id },
                    type: QueryTypes.SELECT,
                }
            )
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a feed');
        }
    };
    async getPostStatistics() {
        try {
            return await sequelize.query(`
                SELECT
                    post_id,
                    JSON_OBJECT(
                            'author_  id', post_author_id,
                            'author_name', post_author
                    ) AS author,
                    post_description,
                    created_at,
                    JSON_OBJECT(
                        'likes', SUM(IF(reaction_type = 'like' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'love', SUM(IF(reaction_type = 'love' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'hahah', SUM(IF(reaction_type = 'hahah' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'angry', SUM(IF(reaction_type = 'angry' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'wow', SUM(IF(reaction_type = 'wow' AND reaction_quantity IS NOT NULL, reaction_quantity, 0)),
                        'sad', SUM(IF(reaction_type = 'sad' AND reaction_quantity IS NOT NULL, reaction_quantity, 0))
                    ) AS reactions,
                    comment_quantity
                FROM
                    (SELECT
                         P.id AS post_id,
                         F.friend_id AS post_author_id,
                         UF.full_name AS post_author,
                         P.description AS post_description,
                         P.created_at,
                         R.reaction_type,
                         R.reaction_quantity,
                         (
                             SELECT COUNT(id)
                             FROM comment
                             WHERE post_id = P.id
                         ) AS comment_quantity

                    FROM user AS U
                            INNER JOIN
                        friendship AS F
                        ON (U.id = F.principal_user_id AND F.is_active = 1)
                              INNER JOIN
                        post AS P
                        ON (F.friend_id = P.user_id AND P.is_active = 1)
                             INNER JOIN
                        user AS UF
                        ON (F.friend_id = UF.id)
                            LEFT JOIN
                        (
                            SELECT
                                R.post_id,
                                COUNT(R.id) AS reaction_quantity,
                                RT.description AS reaction_type
                            FROM reaction AS R
                                    JOIN reaction_type AS RT ON R.reaction_type_id = RT.id
                            GROUP BY R.post_id, RT.description
                        ) AS R ON R.post_id = P.id
                    WHERE U.is_active = 1) AS subquery
                GROUP BY post_id, post_description, created_at, comment_quantity
                ORDER BY post_id`,
                {
                    type: QueryTypes.SELECT,
                }
            )
        } catch (error) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error while getting a feed');
        }
    };
}

module.exports = new Repository();

/*
{
    "feed": [
    {
        "post_id": 1,
        "author": {
            "id": 456,
            "username": "autor_postagem",
            "name": "Nome do Autor"
        },
        "description": "Conteúdo da postagem",
        "created_at": "2024-01-11T12:30:00Z",
        "likes": 20,
        "love": 190,
        "comments": 33
    },
    {
        "post_id": 56,
        "author": {
            "id": 89,
            "username": "autor_postagem",
            "name": "Nome do Autor"
        },
        "description": "Conteúdo da postagem",
        "created_at": "2024-01-11T12:30:00Z",
        "likes": 14,
        "saf": 3,
        "comments": 1
    }
]
}*/
