const mongoose = require('mongoose')

const claimSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }    
})

module.exports = mongoose.model("Claim", claimSchema)