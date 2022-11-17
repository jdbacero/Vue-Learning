import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:3000/events",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const getEvents = () => {
    return apiClient.get("/")
};

const getEvent = (id) => {
    return apiClient.get(`/${id}`)
}

export default {
    getEvents,
    getEvent
};
