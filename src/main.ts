import PrimeVue from 'primevue/config';
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(PrimeVue)

  import AutoComplete from 'primevue/autocomplete';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Toast from 'primevue/toast';
  // import Menu from 'primevue/menu';

  app.component('AutoComplete', AutoComplete);
  app.component('InputText', InputText);
  app.component('Button', Button);
  app.component('Toast', Toast);
  
  // app.component('Menu', Menu);

  app.mount('#app')