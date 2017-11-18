import Vuex from "vuex";

import {MEETUP_LOAD_MEETINGS, MEETUP_LOAD_SET_LOADING, MEETUP_SET_EXPANDED_EVENT, MEETUP_SET_EXPANDED_EVENT_LOADING, MEETUP_UNSET_EXPANDED_EVENT} from "./mutation-types";

export let store = new Vuex.Store({
    state: {
        meetups: {
            'expandedEvent': null,
            'expandedEventLoading': false,
            'symfoniacs': {
                events: [],
                loading: false,
            },
            'symfoniacs-spb': {
                events: [],
                loading: false,
            }
        }
    },

    mutations: {
        [MEETUP_LOAD_MEETINGS](state, {meetupId, events}) {
            state.meetups[meetupId].events = events;
        },

        [MEETUP_LOAD_SET_LOADING](state, {meetupId, loadingStatus}) {
            state.meetups[meetupId].loading = loadingStatus;
        },

        [MEETUP_SET_EXPANDED_EVENT_LOADING](state, {loadingStatus}) {
            state.meetups.expandedEventLoading = loadingStatus;
        },
        [MEETUP_SET_EXPANDED_EVENT](state, {event}) {
            state.meetups.expandedEvent = event;
        },

        [MEETUP_UNSET_EXPANDED_EVENT](state) {
            state.meetups.expandedEventLoading = false;
            state.meetups.expandedEvent = null;
        }

    },
    getters: {
        events: (state) => (meetupId) => {
            return state.meetups[meetupId].events
        },
        meetupLoading: (state) => (eventId) => {
            return !!(state.meetups[eventId] && state.meetups[eventId].loading)
        },

        expandedEvent(state) {
            return state.meetups.expandedEvent;
        },

        expandedEventLoading(state) {
            return state.meetups.expandedEventLoading;
        }
    },
    actions: {
        /**
         *
         * @param commit
         * @param meetupApi {MeetupApiFacade}
         * @param meetupId
         */
        [MEETUP_LOAD_MEETINGS]({commit}, {meetupApi, meetupId}) {
            commit(MEETUP_LOAD_SET_LOADING, {meetupId, loadingStatus: true});
            return meetupApi.getAllMeetings(meetupId)
                .then(function (response) {
                    return response.data;
                })
                .then(function (json) {
                    console.log('resp----', json);
                    // commit(MEETUP_LOAD_MEETINGS, meetupId, response.json());
                    commit(MEETUP_LOAD_MEETINGS, {meetupId, events: json.events});
                    commit(MEETUP_LOAD_SET_LOADING, {meetupId, loadingStatus: false});
                })
                .catch(error => console.log("ERR", error))
                ;
        },

        [MEETUP_SET_EXPANDED_EVENT]({commit, state}, {meetupApi, meetupId, eventId}) {
            const events = state.meetups[meetupId].events;
            let promise;

            commit(MEETUP_SET_EXPANDED_EVENT_LOADING, {loadingStatus: true});

            if (!events || events.length === 0) {
                promise = store.dispatch(MEETUP_LOAD_MEETINGS, {meetupApi, meetupId});
            } else {
                promise = Promise.resolve();
            }

            return promise
                .then(() => {
                    const event = state.meetups[meetupId].events.find(e => e.id == eventId)
                    if (!event) {
                        throw new Error('The Event not found:' + eventId);
                    }
                    commit(MEETUP_SET_EXPANDED_EVENT, {event});
                })
                .catch((err) => {
                    console.log("err", err);
                    commit(MEETUP_SET_EXPANDED_EVENT, {event: null})
                })
                .then(() => {
                    commit(MEETUP_SET_EXPANDED_EVENT_LOADING, {loadingStatus: false})
                });
        }
    }
});