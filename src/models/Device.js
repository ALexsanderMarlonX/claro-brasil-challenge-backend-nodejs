const { Schema, model } = require('mongoose')

const DeviceSchema = new Schema({
    deviceId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdby: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    system: {
        type: String,
        enum: ['ios','android'],
        require: true
    },

}, {
    timestamps: true
})

module.exports = model('Device', DeviceSchema)