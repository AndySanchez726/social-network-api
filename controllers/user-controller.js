const { Users } = require('../models');

const userController = {
    // get all users
    getAllUsers(req,res) {
        Users.find({})
            .populate({
                path: 'thoughts',
                select: '__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    // get one user by id
    getUserById({ params }, res) {
        Users.findOne({ _id: params.id})
            .populate({
                path: 'thoughts',
                select: '__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a user
    createUser({ body }, res) {
        Users.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with this id was found.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        Users.findOneAndDelete({ _id:params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with this id was found.'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => res.status(400).json(err));
    },

    // add a friend to list
    // addFriend({ body }, res) {

    // }
}

module.exports = userController;