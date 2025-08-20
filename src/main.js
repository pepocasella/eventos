// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// pra usar o vue query, vc precisa instalar o plugin dele
// deixo 5s de stale time pra n ficar fazendo requisição toda hora
app.use(VueQueryPlugin, { queryClientConfig: { defaultOptions: { queries: { staleTime: 5_000 } } } })

app.mount('#app')
