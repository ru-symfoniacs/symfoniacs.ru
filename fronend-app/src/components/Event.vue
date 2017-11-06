<template>
    <article class="event" :class="{event_expanded:expanded}" v-if="event">
        <div class="event__title" v-if="!expanded">
            <h3>
                <router-link v-if="!expanded"
                             :to="{name: 'eventExpand', params:{meetupId, eventId:event.id}}">
                    {{event.name}}
                </router-link>

                <span v-if="expanded">{{event.name}}</span>
            </h3>
            <div class="event__open-on-meetup"><a :href="event.link" target="_blank">Open on meetup.com  <i class="fa fa-external-link-square"></i></a></div>
        </div>

        <div v-if="expanded" class="event__open-on-meetup"><a :href="event.link" target="_blank">Open on meetup.com  <i class="fa fa-external-link-square"></i></a></div>

        <div class="row meetup__meta">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <event-info :event="event"></event-info>
            </div>

            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <event-host-info :event="event"></event-host-info>
            </div>
            <div class="clearfix"></div>

            <div v-if="isRegistrationOpen" class="event__get-invite col-sm-12">
                <a :href="event.link" target="_blank" rel="noreferrer noopener nofollow" class="btn btn-success btn-block btn-sm">
                    Registration
                </a>
            </div>
        </div>

        <event-extra-data :event="event"></event-extra-data>

        <div class="event-description event-description_expanded" v-if="expanded">
            <div class="event-description__body_page" v-html="event.description"></div>
        </div>

        <div class="event-description event-description_collapsed" v-if="!expanded">
            <div v-html="event.description" class="event-description__body"></div>
        </div>

        <div class="event__show-more-container" v-if="!expanded">
            <router-link :to="{name: 'eventExpand', params:{meetupId, eventId:event.id}}" class="btn btn-link  btn-xs event__show-more-button">
                Show more
                <i class="fa fa-chevron-down"></i>
            </router-link>
        </div>


    </article>
</template>
<script>
    import EventHostInfo from "./EventHostInfo.vue";
    import EventInfo from "./EventInfo.vue";
    import EventExtraData from "./EvntExtraData.vue";

    export default {
        components: {
            EventExtraData,
            EventInfo,
            EventHostInfo
        },
        name: 'Event',
        props: ['event', 'meetupId', 'expanded'],
        data: function () {
            return {
                showDescription: false
            }
        },
        computed: {
            isRegistrationOpen() {
                const currDate = new Date();
                return this.event.time > currDate.getTime();
            }
        }

    }
</script>

