import mongoose from "mongoose";

const issueStatusSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    color: {
        type: String,
        default: '#808080'
    }
}, {versionKey: false});

const IssueStatus = mongoose.model('IssueStatus', issueStatusSchema);

export default IssueStatus;