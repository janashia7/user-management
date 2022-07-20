const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const voteSchema = new Schema(
  {
    from: { type: String },
    to: { type: String },
    vote: { type: Number },
    date: { type: Number, default: Date.now() },
  },
  { timestamps: true }
);

voteSchema.plugin(softDeletePlugin);

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
