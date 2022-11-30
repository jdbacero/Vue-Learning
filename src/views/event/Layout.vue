<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div v-if="EventStore.event">
      <h1>{{ EventStore.event.title }}</h1>
  
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

        <router-view :event="EventStore.event" />

    </div>
  </template>
  
  <script setup>
  import { useEventStore } from '@/store/EventStore';
  const EventStore = useEventStore()
  </script>
  