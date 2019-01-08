import axios from "axios";

export default {
    user: {
        login: credentials =>
            axios.post("/api/auth/login", { credentials }).then(res => {
                return res.data.user;
            }),
        signup: credentials =>
            axios.post("/api/auth/signup", { credentials }).then(res => {
                return res.data.user;
            }),
        search: query =>
            axios.get("/api/search?title=" + query.title).then(res => {
                return res.data.result;
            }),
        review: Title =>
            axios.get("/api/review/" + Title).then(res => {
                return res.data.result ? res.data.result.UserReviews : [];
            }),
        theatres: Title =>
            axios.get("/api/shows/" + Title).then(res => {
                return res.data.result;
            }),
        confirmBooking: bookingData =>
            axios.post("/api/booking/confirm", { bookingData }).then(res => {
                return res.data.user;
            })
    }
};
