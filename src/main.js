import { createApp } from 'vue/dist/vue.esm-bundler';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faUserSecret,
    faBars,
    faXmark,
    faChevronUp,
    faArrowLeft,
    faPen,
    faCartShopping,
    faEye,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import { faStar, faHeart, faEye as eyeRegular } from '@fortawesome/free-regular-svg-icons';

import App from './App.vue';
import router from './routes';
import ErrorTooltip from './components/errorTooltip.vue'

/* add icons to the library */
library.add(
    faUserSecret,
    faBars,
    faXmark,
    faChevronUp,
    faArrowLeft,
    faPen,
    faStar,
    faCartShopping,
    faHeart,
    faEye,
    eyeRegular,
    faTrash
);

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('error-tooltip', ErrorTooltip);
app.mount('#app');
