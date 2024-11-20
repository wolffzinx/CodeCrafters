const Class = require('../models/Class');

exports.createClass = async (req, res) => {
    const { code, subject, questions } = req.body;

    try {
        const newClass = new Class({
            code,
            subject,
            questions,
            teacherId: req.user.id
        });
        await newClass.save();
        res.status(201).json({ message: 'Sala criada com sucesso!', newClass });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getClassesByTeacher = async (req, res) => {
    try {
        const classes = await Class.find({ teacherId: req.user.id });
        res.json(classes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getClassByCode = async (req, res) => {
    try {
        const classData = await Class.findOne({ code: req.params.code });
        if (!classData) return res.status(404).json({ message: 'Sala não encontrada.' });
        res.json(classData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
