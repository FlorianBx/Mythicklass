import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';

const app = createApp(App)

app.use(createPinia())
app.use(PiniaColada)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  }
});
app.use(ToastService);

app.mount('#app')
