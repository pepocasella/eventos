<script setup>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { useQuery } from '@tanstack/vue-query'

const eventsQuery = useQuery({
  queryKey: ['events'], // essa aqui é a entrada no cache que o vue-query vai usar, isso garante que as requests sejam reusadas
  queryFn: () => EventService.getEvents(), // essa é a função que vai popular o cache
  // staleTime: 10_000, // 10s
})

// pra experimentar, navega entre a tela de `events` e a tela de `about`
// você vai ver que a request até acontece mais uma vez, se ela tiver considerada `stale` ou `velha`, mas não tem estado de loading.
// altera o staleTime da query e navega pra vc ver.
</script>

<template>
  <h1>Events For Good</h1>
  <div class="events" v-if="eventsQuery.isSuccess.value">
    <EventCard v-for="event in eventsQuery.data.value" :key="event.id" :event="event" />
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
