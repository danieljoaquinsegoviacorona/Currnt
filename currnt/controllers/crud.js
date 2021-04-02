var controller = require('sequelize');
const db = require("../models");
//const { Op } = db.sequelize.Op;

controller.healthCheck = (req, res) => {
    console.log('%c Success!', 'background: #0F0; color: #FFF');
    const data = { value: 'Success!' };
    res.json(data);
};

controller.list = async (req, res) => {
    const response = await db.USERS.findAll()
        .then((data) => {
            //const res = { success: true, data: data };
            return data;
        }).catch(error => {
            const res = { success: false, error: error };
            return res;
        });
    res.json(response);
};

controller.create = async (req, res) => {
    try {
        const { first_name, last_name, birth_date, password, gender } = req.body;
        const response = await db.USERS.create({
            first_name: first_name,
            last_name: last_name,
            birth_date: birth_date,
            password: password,
            gender: gender
        }).then(function (data) {
            const res = { success: true, data: data, message: "created successful" }
            return res;
        }).catch(error => {
            console.log(`%c Error: ${error} `, 'background: #FFF; color: #000');
            const res = { success: false, error: error }
            return res;
        });
        res.json(response);
    } catch (e) {
        console.log(`%c Error: ${e} `, 'background: #F00; color: #FFF');
    }
};

controller.update = async (req, res) => {
    try {
        const { id } = req.params;
        //const { user_id, first_name, last_name, birth_date, password, gender } = req.body;
        const response = await db.USERS.update(req.body, {
            where: { user_id: id }
        }).then(function (data) {
            console.log(JSON.stringify(data));
            if (data == 1) {
                const res = { success: true, data: data, message: "update successful" }
                return res;
            } else {
                const res = { success: false, data: data, message: "update NOT successful" }
                return res;
            }

        }).catch(error => {
            const res = { success: false, error: JSON.stringify(error) }
            return res;
        });
        res.json(response);
    } catch (e) {
        console.log(`%c Error: ${e} `, 'background: #F00; color: #FFF');
    }
};

controller.get = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await db.USERS.findAll({
            where: { user_id: id }
            // where: { id: [ 1, 3, 5 ] }
            // like: { name: "Mike" }
            // where: {
            //   name: {
            //     [Op.like]: '%Mike%'
            //   }
            // }
        }).then((data) => {
            return data;
        }).catch(error => {
            const res = { success: false, error: error };
            return res;
        });
        res.json(response);
    } catch (e) {
        console.log(`%c Error: ${e} `, 'background: #F00; color: #FFF');
    }
};

controller.getGender = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await db.GENDERS.findAll({
            where: { user_id: id }
        }).then((data) => {
            return data;
        }).catch(error => {
            const res = { success: false, error: error };
            return res;
        });
        console.dir(response);
        res.json(response);
    } catch (e) {
        console.log(`%c Error: ${e} `, 'background: #F00; color: #FFF');
    }
};

controller.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await db.USERS.destroy({
            where: { user_id: id }
        }).then(function (data) {
            const res = { success: true, data: data, message: "Deleted successful" }
            return res;
        }).catch(error => {
            const res = { success: false, error: error }
            return res;
        });
        res.json(response);
    } catch (e) {
        console.log(`%c Error: ${e} `, 'background: #F00; color: #FFF');
    }
};

module.exports = controller;