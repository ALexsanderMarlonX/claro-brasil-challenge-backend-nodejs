const {
    Schema,
    model
} = require('mongoose')

const SessionSchema = new Schema({
    userSessionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdby: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listDevices: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }]
}, {
    timestamps: true
})

module.exports = model('Session', SessionSchema);
