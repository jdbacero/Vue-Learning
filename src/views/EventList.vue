<template>
  <h1>Apps for Good</h1>
  <div class="events">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <EventCard v-for="event in eventStore.events" :key="event.id" :event="event" />

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
import { useEventStore } from "@/store/EventStore";
// import NProgress from 'nprogress'
// import { watchEffect } from "vue";
export default {
  props: ['page'],
  name: "EventListView",
  components: {
    EventCard,
  },
  setup() {
    const eventStore = useEventStore()

    return {
      eventStore
    }
  },
  data() {
    return {
      events: [],
      totalEvents: 0
    };
  },

  created() {
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    // NProgress.start()
    EventService.getEvents(2, parseInt(routeTo.query.page)).then((events) => {
      next(component => {
        component.eventStore.events = events.data;
        component.totalEvents = events.headers['x-total-count']
        console.log(component.events)
      })
    }).catch(error => {
      console.log(error)
      next({name: 'NetworkError'})
    }).finally(() => {
      // NProgress.done()
    })
  },
  beforeRouteUpdate(routeTo) {
    // NProgress.start()
    return EventService.getEvents(2, parseInt(routeTo.query.page)).then((events) => {
        this.eventStore.events = events.data;
        this.totalEvents = events.headers['x-total-count']
        console.log(this.events)
    }).catch(error => {
      console.log(error)
      return {name: 'NetworkError'}
    }).finally(() => {
      // NProgress.done()
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
