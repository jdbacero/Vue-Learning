import axios from "axios";
const apiClient = axios.create({
    baseURL: "http://localhost:3000/events",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const getEvents = (perPage, page) => {
    return apiClient.get(`?_limit=${perPage}&_page=${page}`)
};

const getEvent = (id) => {
    return apiClient.get(`/${id}`)
}

export default {
    getEvents,
    getEvent
};
