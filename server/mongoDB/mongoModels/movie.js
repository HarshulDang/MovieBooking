import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    Rank: Number,
    Title: String,
    Genre: String,
    Description: String,
    Director: String,
    Actors: String,
    Year: Number,
    Runtime: Number,
    Rating: Number,
    Votes: Number,
    Revenue: Number,
    Metascore: Number
});

export default mongoose.model('Movie',movieSchema);