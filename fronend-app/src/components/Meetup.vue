<template>
    <div>
        <div class="meetup" >
            <h2>{{meetupName}}</h2>
            <p v-if="short_description" class="short_description">{{short_description}}</p>

            <loader v-if="meetupLoading(meetupId)"></loader>

            <event :event="event" v-for="event in meetings" :key="event.id"></event>

        </div>
    </div>
</template>

<script>
    import {MEETUP_LOAD_MEETINGS} from "../store/mutation-types";
    import Loader from "./Loader.vue";
    import {mapGetters} from "vuex";
    import Event from "./Event.vue";

    export default {

        components: {
            Event,
            Loader},
        name: 'Meetup',

        props: [
            'meetupId',
            'meetupName',
            'short_description'
        ],
        inject: ['meetupApi'],

        created() {
            this.checkRoute(this.$route);
            this.$store.dispatch(MEETUP_LOAD_MEETINGS, {meetupApi: this.meetupApi, meetupId: this.meetupId});
        },

        data: function () {
            return {
                name: 'Moscow Symfony Meetup',
                expandedItem: null
            }
        },
        computed: {
            ...mapGetters(['meetupLoading']),
            meetings() {
                return this.$store.getters.events(this.meetupId);
            }
        },
        methods: {
            checkRoute(route) {
                console.log(route);
                if (route.name === 'meetingExpand' && route.params.meetupId === this.meetupId) {
                    this.expandedItem = route.params.meetingId;
                }
            },
        },
        watch: {
            '$route'(to, from) {
                this.checkRoute(to);
            }
        }
    }
</script>

<style>
    .meetup {
        text-align: left;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    }

    h2 {
        font-size: 2.5rem;
        text-align: center;
    }

    h3 {
        font-size: 2rem;
        color: orangered;
        /*margin-bottom: 0;*/
    }

    .meetup__meta{
        font-size: 1.2rem;
    }

    .meetup .meetup__meta{
        margin-bottom: 10px;
    }
    .event{
        padding-bottom: 15px;
        border-bottom: 1px solid #EEE;
    }

    .event__title{
        display: flex;
    }

    .event .event__title{
        margin: 20px 0 10px;
    }

    .event__title h3{
        margin: 0;
    }

    .event-description {
        padding: 5px 10px;
        background: #F2F2F2;
        border-radius: 3px;
        transition: background-color linear 0.2s;
    }

    .event-description_expanded{
        background: #FFFFE8;
    }

    .event-description .event-description__body{
        margin-top: 5px;
        border-top: 1px dashed #CCC;
        padding-top: 10px;
    }

    .event-description__body {
        overflow-wrap: break-word;
        padding: 20px;
    }

    .event-description__body img{
        max-width: 100%;
    }

    .event__open-on-meetup{
        text-align: right;
        font-size: 1.1rem;
    }

    .meetup .event__open-on-meetup{
        margin-bottom: 10px;
        float:right;
    }
    .meetup address{
        margin: 0;
    }

    .event-description .btn-link   {
            color: #000;
    }

    .event-description .btn-link i{
        margin-right: 10px ;
    }


    .loader{
        text-align: center;
        margin: 20px;
    }

    .presentations__item{
        list-style: none;
        margin-left: 0;
        padding-left: 0;
    }

    .presentations__item .fa{
        margin-right: 10px;
    }




</style>