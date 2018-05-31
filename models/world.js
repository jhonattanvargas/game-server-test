'use stric'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const WorldSchema = Schema({
    displayName: String,
    levelMin: Number,
    levelMax: Number,
    users: Array,
    created: Date,
    opened: Date,
    finished: Date
})

module.exports = mongoose.model('World', WorldSchema)
