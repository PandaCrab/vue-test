import { createApp } from 'vue/dist/vue.esm-bundler';

import App from './App.vue';
import router from './routes';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faUserSecret, faBars, faXmark);

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
