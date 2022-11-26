<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <p>Edit for the Event</p>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
      unsavedChanges: false
    }
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if(this.unsavedChanges) {
      const confirm = window.confirm(
        'Are you sure you want to leave? You have unsaved changes.'
      )

      if(confirm) {
        next()
      } else {
        next(false)
      }
    } else {
      next()
    }
  }   
};
</script>
