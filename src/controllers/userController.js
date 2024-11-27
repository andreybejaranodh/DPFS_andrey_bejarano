const bcrypt = require('bcryptjs');

const userModel = require('../models/user');

const controller = {
    login: (req, res) => {
        res.render('login');
    },
    loginProcess: (req, res) => {
        const { email, password } = req.body;
        const user = userModel.findByField('email', email);

        if (user && bcrypt.compareSync(password, user.password)) {  
            req.session.user = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            };
            
            // if (remember) {
            //     // s = 1000ms
            //     // m = 60s
            //     // h = 60m
            //     // d = 24h
            //     // w = 7d 
            //     res.cookie('userEmail', email, { maxAge: 1000 * 60 * 60 * 24 * 7 });
            // }
            
            return res.redirect('/');
        }

        return res.status(422).render('user/login', {
            errors: {
                crendentials: { msg: 'Usuario y/o contraseña incorrectos!' }
            }
        });
    },
    register: (req, res) => {
        res.render('register');
    },
    registerProcess: (req, res) => {
        const { email, password, name } = req.body;
        userModel.create({
            email,
            password: bcrypt.hashSync(password, 10),
            name,
            role: 'user'
        });
        res.redirect('/user/login');
    }
}

module.exports = controller;