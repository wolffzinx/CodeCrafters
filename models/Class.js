const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            options: [{ type: String }],
            correctAnswer: { type: String }
        }
    ],
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Class', classSchema);
