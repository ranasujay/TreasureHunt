import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    password: String,
    currLevel:{
        type: Number,
        default: 1
    },
    lastLevelCompletedAt: {
        type: Date,
        default: Date.now,
        index: true  // Index for faster sorting
    }
}, { 
    timestamps: true  // Adds createdAt and updatedAt with millisecond precision
});

// Compound index for optimal leaderboard sorting (level desc, time asc)
userSchema.index({ currLevel: -1, lastLevelCompletedAt: 1 });

export default mongoose.model("user", userSchema);