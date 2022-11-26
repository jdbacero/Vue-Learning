<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div v-if="GStore.event">
      <h1>{{ GStore.event.title }}</h1>
  
      <!-- <router-link :to="{ name: 'EventDetails', params: { id } }"
          >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link
      > -->
        <!-- Removed ID params because Vue router will use ID automatically present in the URL -->
      <router-link :to="{ name: 'EventDetails' }"
          >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister'}"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit'}"
        >Edit</router-link
      >

        <router-view :event="GStore.event" />

    </div>
  </template>
  
  <script>
  // import EventService from '@/services/EventService';
  export default {
    inject: ['GStore']
    // props: ['id'],
    // data() {
    //   return {
    //     event: null,
    //   };
    // },
    // created() {
      // fetch event (by id) and set local event data
      // EventService.getEvent(this.id)
      //   .then(event => {
      //     this.event = event.data
      //   })
      //   .catch(error => {
      //       if(error.response && error.response.status == 404) {
      //           this.$router.push({
      //               name: '404Resource',
      //               params: { resource: 'event'}
      //           })
      //       } else {
      //           this.$router.push({
      //               name: 'NetworkError'
      //           })
      //       }
      //   })
    // },
  };
  </script>
  