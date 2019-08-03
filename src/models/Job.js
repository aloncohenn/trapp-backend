const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  user_id: String,
  companyName: String,
  position: String,
  location: String,
  jobPosting: String,
  techStack: Array,
  created_at: { type: Date, required: true, default: Date.now },
  dateApplied: { type: Date, required: true, default: Date.now },
  Notes: String,
  category: String
});

let Job = mongoose.model('Job', JobSchema);
module.exports = Job;
