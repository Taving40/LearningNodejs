const db = require('../models');

const auxFindUserById = async (id) => {
    try{
        const user = await db.User.findByPk(id);
        return user;
    }
    catch(err){
        console.error(err);
        return {
            error: "Something went wrong",
        };
    }
}

module.exports.getAllUsers = (req, res) => {
    
    try {
        db.User.findAll()
        .then(response =>{
            //console.log('allUsers', response);
            res.send(response);
        })
    }   
    catch(err){
        console.error(err);
        res.send({
            error: "Something went wrong",
        })
    }
    
}

//returns the user
module.exports.getUserById = async (req, res) => {
    const {
        id,
    } = req.body
    
    try{
        const user = await db.User.findByPk(id)
        .then(response =>{
            res.send(response);
        });
    }
    catch(err){
        console.error(err);
        res.send({
            error: "Something went wrong",
        });
    }
}

module.exports.createUser = async (req, res) => {
    const {
        email,
        firstName,
        lastName,
    } = req.body

    try {
        const newUser = await db.User.create({
            email,
            firstName,
            lastName,
            //createdAt: new Date(),
            //updatedAt: new Date(),
        });

        res.status(201).send(newUser);
    }
    catch(err){
        console.error(err);
        res.send({
            error: "Something went wrong",
        });
    }

    
}

module.exports.updateUser = async (req, res) => {
    //return updated user
    const {
        id,
        email,
        firstName,
        lastName,
    } = req.body;

    const user = await auxFindUserById(id);

    const new_email = (email === '') ? user.email : email;
    const new_firstName = (firstName === '') ? user.firstName : firstName;
    const new_lastName = (lastName === '') ? user.lastName : lastName;

    try {
        await db.User.update({ email: new_email,
            firstName: new_firstName,
            lastName: new_lastName, }, {
            where: {
              id: id
            }
          });

        const updatedResponse = await auxFindUserById(id);
        res.send(updatedResponse)
    }
    catch(err){
        console.error(err);
        res.send({
            error: "Something went wrong",
        });
    }
}

module.exports.deleteUser = async (req, res) => {
    //set status to 200

    const {
        id,
    } = req.body

    try {
        await db.User.destroy({
            where: {
              id: id,
            }
          })
        .then(() => {
            res.sendStatus(204);
        });
    }
    catch(err){
        console.error(err);
        res.send({
            error: "Something went wrong",
        });
    }
    
}