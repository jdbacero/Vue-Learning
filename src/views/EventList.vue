<template>
  <h1>Apps for Good</h1>
  <div class="events">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <router-link
      :to="{name: 'EventList', query: {page: page-1} }"
      rel="previous"
      v-if="page != 1"
    >
      Prev Page
    </router-link>
    <router-link
      :to="{name: 'EventList', query: {page: page+1} }"
      rel="next"
      v-if="hasNextPage"
    >
      Next Page
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";
import { watchEffect } from "vue";
export default {
  props: ['page'],
  name: "EventListView",
  components: {
    EventCard,
  },

  data() {
    return {
      events: [],
      totalEvents: 0
    };
  },

  created() {
    watchEffect(() => {
      this.events = null
      EventService.getEvents(2, this.page).then((events) => {
       this.events = events.data;
       this.totalEvents = events.headers['x-total-count']
       console.log(this.events)
     }).catch(error => {
       console.log(error)
     });
    })
  },

  computed: {
    hasNextPage() {
      return this.page < this.numberOfPages
    },
    numberOfPages() {
      return Math.ceil(this.totalEvents / 2)
    }
  }
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
