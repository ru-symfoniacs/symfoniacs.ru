<template>
    <div>
        <div class="meetup">
            <h2>

                <a :href="'http://www.meetup.com/'+meetupId+'/'" target="_blank" rel="noreferrer noopener nofollow"><i class="fa fa-meetup"></i> {{meetupName}}</a>
            </h2>
            <p v-if="short_description" class="short_description">{{short_description}}</p>

            <loader v-if="meetupLoading(meetupId)"></loader>

            <div class="meetup__events">
                <event :event="event" :meetupId="meetupId" v-for="event in meetupEvents" :key="event.id"></event>
            </div>

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
            Loader
        },
        name: 'Meetup',

        props: [
            'meetupId',
            'meetupName',
            'short_description'
        ],
        inject: ['meetupApi'],

        created() {
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
            meetupEvents() {
                return this.$store.getters.events(this.meetupId);
            }
        }

    }
</script>

<style>
    :root {
        --event-description-bg-color: #F2F2F2;
    }

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

    h3, h3 a {
        color: orangered;
    }

    .meetup__meta {
        font-size: 1.2rem;
    }

    .meetup .meetup__meta {
        margin-bottom: 10px;
    }

    .event {
        padding-bottom: 15px;
    }

    .event_expanded {
        padding: 0 15px;
    }

    .meetup .event {
        border-bottom: 1px solid #EEE;
    }

    .event__title {
        display: flex;
        align-items: baseline;
    }

    .event .event__title {
        margin: 20px 0 10px;
    }

    .event__title h3 {
        margin: 0;
        flex-grow: 2;
    }

    .event .event-description {
        margin-top: 20px;
    }

    .event-description {
        padding: 5px 10px;
        background: var(--event-description-bg-color);
        border-radius: 3px;
        transition: background-color linear 0.2s;
        max-height: 85px;
        overflow: hidden;
        position: relative;
    }

    .event-description_collapsed:after {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 30px;
        content: ' ';
        width: 100%;
        border-bottom: 5px solid var(--event-description-bg-color);
        /*border: 1px solid red;*/
        background: linear-gradient(to top, var(--event-description-bg-color), transparent);
    }

    .event-description_expanded {
        background: #FFF;
        max-height: none;
        padding: 0;
        border-top: 1px dashed #D8D8D8;
        border-radius: 0;
    }

    .event-description .event-description__body {
        margin-top: 5px;
        padding-top: 10px;
    }

    .event-description__body {
        overflow-wrap: break-word;
        padding: 20px;
    }

    .event-description__body_page {
        padding: 20px;
        text-align: left;
        max-height: 10%;
        overflow-y: scroll;
    }

    .event-description__body img, .event-description__body_page img {
        max-width: 100%;
        display: block;
    }

    .event .event__get-invite {
        margin-top: 10px;
    }

    .event__show-more-container {
        padding: 4px 0 0;
        text-align: center;
    }

    .event__show-more-button {
        width: 100px;
    }

    .event__get-invite {
    }

    .event__open-on-meetup {
        text-align: right;
        font-size: 1.1rem;
    }

    .meetup .event__open-on-meetup {
        margin-bottom: 10px;
        float: right;
    }

    .meetup address {
        margin: 0;
    }

    .event-description .btn-link {
        color: #000;
    }

    .event-description .btn-link i {
        margin-right: 10px;
    }

    .loader {
        text-align: center;
        margin: 20px;
    }

    .presentations__item {
        list-style: none;
        margin-left: 0;
        padding-left: 0;
    }

    .presentations__item .fa {
        margin-right: 10px;
    }

    .host__map-link {
        display: inline-block;
        font-size: 2rem;
    }

    .expanded-event {

    }

    .expanded-event__header {

    }

    .expanded-event__title {
        display: block;
        font-size: 2.8rem;
        width: calc(100% - 70px);
    }

    .expanded-event__close-button-container {
        text-align: center;
    }

    .expanded-event__close-button {
        width: 150px;
    }
</style>