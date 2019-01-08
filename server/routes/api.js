import express from "express";
const router = express.Router();

import {
    searchMovie,
    findUserByEmail,
    createUser,
    findReviewByMovie,
    findShowByMovie,
    getSeatDoc,
    decreaseSeatCount,
    updateUserBookings
} from "../mongoDB/query";

router.get("/search", (req, res) => {
    const { title } = req.query;

    searchMovie(title)
        .then(movieList => {
            if (movieList.length) res.status(200).json({ result: movieList });
            else
                res.status(400).json({
                    message: "NO SUCH MOVIE EXISTS...!!"
                });
        })
        .catch(err => {
            res.status(404).json({
                message: err //"MOVIE COLLECTION ERROR..."
            });
        });
});

router.post("/auth/signup", (req, res) => {
    const { email, password } = req.body.credentials;

    createUser({ email, password })
        .then(userRecord => {
            res.status(200).json({ user: userRecord.toValidAuthJSON() });
        })
        .catch(error => {
            res.status(400).json({ message: "EMAIL IN USE..." }); //email already taken
        });
});

router.post("/auth/login", (req, res) => {
    const { email, password } = req.body.credentials;

    findUserByEmail(email)
        .then(aUser => {
            if (aUser && aUser.isValidPassword(password))
                res.status(200).json({ user: aUser.toValidAuthJSON() });
            else
                res.status(400).json({
                    message: "INVALID CREDENTIALS...!!"
                });
        })
        .catch(error => {
            res.status(404).json({
                message: error
            }); //"USER COLLECTION ERROR..."
        });
});

router.get("/review/:movie", (req, res) => {
    const movie = req.params.movie;

    findReviewByMovie(movie)
        .then(movieList => {
            res.status(200).json({ result: movieList });
        })
        .catch(err => {
            res.status(404).json({
                message: err //"REVIEW COLLECTION ERROR..."
            });
        });
});

router.get("/shows/:movie", (req, res) => {
    const movie = req.params.movie;

    findShowByMovie(movie)
        .then(showList => {
            res.status(200).json({ result: showList });
        })
        .catch(err => {
            res.status(404).json({
                message: err //"THEATRE COLLECTION ERROR..."
            });
        });
});

router.post("/booking/confirm", (req, res) => {
    const { email, movie, theatre, showTime } = req.body.bookingData;

    getSeatDoc(theatre, movie, showTime)
        .then(doc => {
            // console.log(doc);
            if (!doc.length)
                res.status(400).json({
                    message: "BAD DATA"
                });
            else {
                const { _id, Seat } = doc[0];
                if (Seat > 0) {
                    decreaseSeatCount(_id, Seat).catch(error => {
                        console.log(error);
                    });
                    updateUserBookings(email, doc[0])
                        .then(updoc => {
                            res.status(200).json({
                                user: updoc.toValidAuthJSON()
                            });
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    res.status(400).json({
                        message: "FULLY BOOKED"
                    });
                }
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err //"THEATRE COLLECTION ERROR..."
            });
        });
});

export default router;
