import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { MyThickKlassPreset } from './theme'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: MyThickKlassPreset,
    options: {
      darkModeSelector: '.app-dark',
    },
  },
})
app.use(ToastService)

app.mount('#app')
