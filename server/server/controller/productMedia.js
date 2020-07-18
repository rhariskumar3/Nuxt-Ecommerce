"use strict";

const Media = require("../model/productMedia");

exports.listAll = function(req, res) {
    Media.findAll()
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.read = function(req, res) {
    Media.findOne({ where: { id: req.params.id } })
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function(req, res) {
    Media.create(req.body)
        .then((values) => res.send(values))
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.createLocal = function(files) {
    return new Promise((resolve, reject) => {
        try {
            let media = {};
            if (files.image1 && files.image1[0]) media.image1 = files.image1[0].path;
            if (files.image2 && files.image2[0]) media.image2 = files.image2[0].path;
            if (files.image3 && files.image3[0]) media.image3 = files.image3[0].path;
            if (files.image4 && files.image4[0]) media.image4 = files.image4[0].path;
            if (files.image5 && files.image5[0]) media.image5 = files.image5[0].path;
            if (files.video && files.video[0]) media.video = files.video[0].path;

            if (
                media.image1 ||
                media.image2 ||
                media.image3 ||
                media.image4 ||
                media.image5 ||
                media.video
            )
                Media.create(media)
                .then(values => resolve({sucess: true, data: values.dataValues}))
                .catch(err => resolve({sucess: false, data: null}));
            else resolve({ sucess: false, data: null });
        } catch (error) {
            resolve({ sucess: false, data: null });
        }
    });
};

exports.update = function(req, res) {
    Media.update(req.body, { where: { id: req.body.id } })
        .then(updated => {
            if (updated)
                Media.findOne({ where: { id: req.body.id } })
                .then(values => res.send(values))
                .catch(err => res.status(500).send({ message: err.message }));
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};

exports.updateLocal = function(id, files) {
    return new Promise((resolve, reject) => {
        try {
            let media = {};
            if (files.image1 && files.image1[0]) media.image1 = files.image1[0].path;
            if (files.image2 && files.image2[0]) media.image2 = files.image2[0].path;
            if (files.image3 && files.image3[0]) media.image3 = files.image3[0].path;
            if (files.image4 && files.image4[0]) media.image4 = files.image4[0].path;
            if (files.image5 && files.image5[0]) media.image5 = files.image5[0].path;
            if (files.video && files.video[0]) media.video = files.video[0].path;

            if (id) return {sucess: false, data: null};
            else if (
                media.image1 ||
                media.image2 ||
                media.image3 ||
                media.image4 ||
                media.image5 ||
                media.video
            )
                Media.update(media, {where: {id: id}})
                    .then((updated) => {
                        if (updated)
                            Media.findOne({where: {id: id}})
                                .then(values => resolve({sucess: true, data: values.dataValues}))
                                .catch(err => resolve({sucess: false, data: null}));
                    })
                    .catch(err => resolve({sucess: false, data: null}));
            else resolve({ sucess: false, data: null });
        } catch (error) {
            resolve({ sucess: false, data: null });
        }
    });
};

exports.delete = function(req, res) {
    Media.destroy({
            where: { id: req.params.id },
        })
        .then((deleted) => {
            if (deleted) res.json({ message: "Media successfully deleted" });
        })
        .catch((err) => res.status(500).send({ message: err.message }));
};