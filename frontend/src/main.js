import { createApp } from "vue";
import App from "./App.vue";
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import router from "./router";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

const vfm = createVfm();
app.use(vfm); // <- see oli puudu!

app.use(router);
app.component('VueDatePicker', VueDatePicker);
app.mount("#app");
