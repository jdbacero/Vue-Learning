import { defineStore } from "pinia"
import EventService from "@/services/EventService"
export const useEventStore = defineStore('EventStore', {
    state() {
        return {
            events: [],
            event: {},
        }
    },
    actions: {
        fetchEvents(perPage, page) {
            return EventService.getEvents(perPage, page)
                .then(response => {
                    this.events = response.data
                })
                .catch(error => {
                    throw error
                })
        }
    },
    getters: {

    }
})