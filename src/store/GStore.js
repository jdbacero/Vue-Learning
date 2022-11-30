import { defineStore } from "pinia";

export const useGStore = defineStore('GStore', {
    state() {
        return {
            flashMessage: ''
        }
    },
    actions: {
        showMessage(message, duration = 5000) {
            this.flashMessage = message
            setTimeout(() => {
                this.flashMessage = ''
            }, duration)
        }
    },
    getters: {

    }
})