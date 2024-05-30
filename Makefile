db-gen-migrate:
    knex migrate:make --knexfile ./config/knexfile.js --client=mysql $(filename)
