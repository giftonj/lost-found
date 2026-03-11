const mongoose = require('mongoose')

const claimSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
})

module.exports = mongoose.Schema("Claim", claimSchema)