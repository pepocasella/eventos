<script setup>
import EventService from '@/services/EventService.js'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

const props = defineProps({
  id: {
    required: true,
  },
})

const queryClient = useQueryClient()

const event = useQuery({
  queryKey: ['events', props.id],
  queryFn: () => EventService.getEvent(props.id),
  placeholderData: () => {
    // como id vem da url ele é uma string, aí vc precisa parsear
    const id = parseInt(props.id)

    // aí a gente pega a entrada do cache, já que a gente tem a lista de eventos
    const events = queryClient.getQueryData(['events'])

    // tem que ser um array, e ter pelo menos um elemento dentro
    if (!(Array.isArray(events) && events.length > 0)) {
      // agora, se não tiver uma entrada no cache, como por exemplo quando vc entra nessa página direto, o `queryFn` vai ser executado normalmente.
      // assim tem fallback pra todos os casos necessários.
      // 1. se tiver dados pre-dispostos, a gente mostra sem estado de loading
      // 2. se não tiver, a gente busca normalmente
      return undefined
    }

    return events.find((event) => event.id === id)
  },
  enabled: props.id != null,
})
</script>

<template>
  <div v-if="event.isSuccess.value">
    <h1>{{ event.data.value.title }}</h1>
    <p>{{ event.data.value.time }} on {{ event.data.value.date }} @ {{ event.data.value.location }}</p>
    <p>{{ event.data.value.description }}</p>
  </div>
</template>
