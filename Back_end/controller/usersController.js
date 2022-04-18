'use strict'
var User = require('../models/user');

var controller = {
    saveUser: (req, res) => {
        let usuario = new Usuario();
        var params = req.body;
        usuario.nombre = params.nombre;
        usuario.UserName = params.UserName;
        usuario.Password = params.Password;
        usuario.edad = params.edad;
        usuario.direccion = params.direccion;
        usuario.rol = params.rol
        usuario.save((err, userStored) => {
            if (err) {
                return res.status(500).send({ msg: 'Error en la petición' })
            }
            if (!userStored) {
                return res.status(404).send({ msg: 'No se ha podido guardar el usuario' })
            }
            return res.status(200).send({ msg: 'Usuario agregado exitosamente', usuario: userStored })
        })

    },
    getUser: function(req, res) {
        var userId = req.params.id;

        if (userId == null) {
            return req.status(404).send({ message: 'El usuario no existe' })
        }


        User.findById(userId, (err, user) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if (!user) return req.status(404).send({ message: 'El usuario no existe' })

            return res.status(200).send({ user });
        })
    },
    getUsers: function(req, res) {
        User.find({}).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' })

            if (!users) return res.status(404).send({ message: 'No hay usuarios para mostrar' })

            return res.status(200).send({ users });
        })

    },
    updateUser: function(req, res) {
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });

            if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar' });

            return res.status(200).send({
                user: userUpdated
            })
        })
    },
    deleteUser: function(req, res) {
        var userId = req.params.id;

        User.findByIdAndDelete(userId, (err, userRemoved) => {
            if (err) return res.status(500).send({ message: 'No se ha podido borrar el proyecto' })

            if (!userRemoved) return res.status(404).send({ message: 'No se puede eliminar ese usuario' })

            return res.status(200).send({
                user: userRemoved
            })
        })
    }
}
module.export = controller