import { createApp } from 'vue';

import App from './App.vue';

// globales importieren der Komponenten
import BaseBadge from './components/BaseBadge.vue';

const app = createApp(App); 

// globales Registrieren der Komponente BaseBadge
app.component('base-badge', BaseBadge);

app.mount('#app');
 