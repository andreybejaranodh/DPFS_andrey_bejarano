const bcrypt = require('bcryptjs');

const db = require('../database/models');

const controller = {
    login: (req, res) => {
        res.render('login');
    },
    loginProcess: async (req, res) => {
        const { email, password } = req.body;
        const user = await db.User.findOne({ where: { email }, include: ['role'] });

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role.name
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
    registerProcess: async (req, res) => {
        const { email, password, name } = req.body;
        const role = await db.Role.findOne({ where: { name: 'user' } });
        const user = await db.User.create({
            email,
            password,
            name,
            roles_id: role.id
        });
        res.redirect('/user/login');
    }
}

module.exports = controller;