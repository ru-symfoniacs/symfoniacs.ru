<template>
    <div id="app">
        <router-view name="page"></router-view>

        <expanded-event-page></expanded-event-page>

        <div class="row">
            <div class="col-md-5 col-md-offset-1">
                <meetup meetupId="symfoniacs"
                        meetupName="Moscow Symfony Meetup"
                ></meetup>
            </div>
            <div class="col-md-5 ">
                <meetup meetupId="symfoniacs-spb" meetup-name="S.Peterburg's Symfony Meetup"
                ></meetup>
            </div>
        </div>

    </div>
</template>

<script>
    import Meetup from "./components/Meetup.vue";
    import {MEETUP_SET_EXPANDED_EVENT} from "./store/mutation-types";
    import ExpandedEventPage from "./components/ExpandedEventPage.vue";

    export default {
        components: {
            ExpandedEventPage,
            Meetup
        },
        name: 'app',
        inject: ['meetupApi'],

        created() {
            this.checkRoute(this.$route);
        },

        methods: {
            checkRoute(route) {
                if (route.name === 'eventExpand') {
                    console.log(route);
                    this.$store.dispatch(MEETUP_SET_EXPANDED_EVENT, {meetupApi: this.meetupApi, ...route.params})
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


