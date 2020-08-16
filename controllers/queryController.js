const db = require('../models/index.js');

const Sequelize = require('sequelize');
var sequelize = new Sequelize('koperasi', 'root', null, {
    dialect: 'mysql',
});

exports.getborrow = (req, res) => {
    sequelize.query('SELECT book_name, first_name FROM users,books, borrows WHERE users.user_id = borrows.user_id and books.book_id = borrows.book_id', {
            type: sequelize.QueryTypes.SELECT
        })
        .then(books => {
            res.json({
                data: books,
                message: 'You got the details of All Books'
            })
        })
};

exports.getbook = (req, res) => {
    sequelize.query('    SELECT book_id, book_name,author_name FROM books,authors WHERE books.author_id= authors.author_id', {
            type: sequelize.QueryTypes.SELECT
        })
        .then(bookdetails => {
            res.json({
                data: bookdetails,
                message: 'You got the details of All Books'
            })
        })
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    Users.findAll({})
    .then(user => res.json({
        data: user,
        message: 'You got the details of All Users'
    }))
    .catch(error => res.json({
        error: true,
        data: [],
        error: error
    }));
};


// Find a single User with a userId
exports.findOne = (req, res) => {
    //Get One User using ID
    const id_user = req.params.id_user;
    Users.findOne({
        where: {
            id_user: id_user
        }
    }, )
    .then(users => res.status(201).json({
        data: users,
        message: 'You Got the User detail with Id:' + id_user
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
    const id_user = req.params.id_user;
    const {
        first_name,
        last_name,
        number,
        email,
        password
    } = req.body;
    Users.update({
        first_name: first_name,
        last_name: last_name,
        email: email,
        number: number,
        password: password,
    }, {
        where: {
            id_user: id_user
        }
    })
    .then(users => res.status(201).json({
        message: 'User has been updated.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    const id_user = req.params.id_user;

    Users.destroy({
        where: {
            id_user: id_user
        }
    })
    .then(status => res.status(201).json({
        message: 'User has been delete.'
    }))
    .catch(error => res.json({
        error: true,
        error: error
    }));
};

// Retrieve and return all Users above User input Params
exports.getage = (req, res) => {
    sequelize.query('SELECT * FROM users WHERE age>' + req.params.age, {
        type: sequelize.QueryTypes.SELECT
    })
    .then(users => {
        res.json({
            data: users,
            message: 'You got the details of All Users'
        })
    })
};