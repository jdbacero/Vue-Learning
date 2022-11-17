<template>
  <h1>Apps for Good</h1>
  <div class="events">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService";
export default {
  name: "EventListView",
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    };
  },
  created() {
     EventService.getEvents().then((events) => {
      this.events = events.data;
      console.log(this.events)
    }).catch(error => {
      console.log(error)
    });
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
