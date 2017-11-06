import Vue from 'vue'
import Router from 'vue-router'
import Event from '../components/Event.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path:'',
            name: 'home'
        },
        {
            path: '/meetup/:meetupId/:eventId',
            name: 'eventExpand',
            // components: {page: Event},
            // params: {expanded: true},
            // props: {page: true}
        }
    ]
})
