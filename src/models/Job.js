const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
  user_id: { type: String, required: true },
  companyName: String,
  position: String,
  location: String,
  jobPosting: String,
  techStack: Array,
  created_at: { type: Date, required: true, default: Date.now },
  dateApplied: { type: Date, required: true, default: Date.now },
  category: String,
  logo: String
});

let Job = mongoose.model('Job', JobSchema);
module.exports = Job;