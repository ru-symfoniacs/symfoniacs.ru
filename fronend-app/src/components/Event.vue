<template>
    <article class="event">
        <div class="event__title">
            <h3>
                {{event.name}}
            </h3>
            <div class="event__open-on-meetup"><a :href="event.link" target="_blank">Open on meetup.com  <i class="fa fa-external-link-square"></i></a></div>
        </div>
        <!--<div class="open-on-meetup"><a :href="event.link" target="_blank">Open on meetup.com  <i class="fa fa-external-link-square"></i></a></div>-->

        <div class="row meetup__meta">
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div>
                    <time>Date: {{timestamp2Date(event.time)}}</time>
                </div>
                <div>
                    <time>Time: {{timestamp2Time(event.time)}}</time>
                </div>
                <div>Guests: {{event.yes_rsvp_count}}</div>
            </div>

            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div class="host">
                    <div class="host__name">{{event.venue.name}}</div>
                    <div class="host__country-city">{{event.venue.city}}, {{event.venue.localized_country_name}}</div>
                    <address class="host__address">{{event.venue.address_1}}</address>
                </div>
            </div>

        </div>

        <div class="event-description" :class="{'event-description_expanded':showDescription}">
            <a class="btn btn-link btn-xs" @click.prevent="showDescription=!showDescription" href="javascript:void(0)">
                <i class="fa" :class="{'fa-expand':!showDescription,'fa-compress':showDescription}"></i>

                {{!showDescription ? 'Show' : 'Hide'}} event's programme
            </a>

            <div v-html="event.description" v-show="showDescription" class="event-description__body"></div>
        </div>

        <div class="presentations" v-if="event.extra_data">
            <h4>Photos, videos, presentations:</h4>
            <div v-for="mediaItem in event.extra_data.media" class="presentations__item">
                <a :href="mediaItem.url" target="_blank" rel="nofollow noopener noreferrer">
                    <i class="fa" :class="{
                            'fa-video-camera':mediaItem.type==='video',
                            'fa-camera': mediaItem.type==='photos'
                        }"></i>
                    {{mediaItem.name}}
                </a>
            </div>

        </div>


    </article>
</template>
<script>
    import spacetime from 'spacetime';

    export default {
        name: 'Event',
        props: ['event'],
        data: function () {
            return {
                showDescription: false
            }
        },
        methods: {
            timestamp2Date(time) {
                const s = spacetime(time);
                return s.format('iso-short');
            },
            timestamp2Time(time) {
                const s = spacetime(time);
                return s.format('time-h24');
            }
        }
    }
</script>

