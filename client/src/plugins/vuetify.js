import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        light: true,
        themes: {
            light: {
                primary: '#c21923',
                secondary: '#555555',
                accent: '#edb9af',
            }
        }
    },
});
