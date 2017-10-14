import Vuex from "vuex";

import {MEETUP_LOAD_MEETINGS, MEETUP_LOAD_SET_LOADING} from "./mutation-types";

export let store = new Vuex.Store({
    state: {
        meetups: {
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
        }

    },
    getters: {
        events: (state) => (eventId) => {
            return state.meetups[eventId].events
        },
        meetupLoading:(state)=>(eventId) =>{
            return !!(state.meetups[eventId] && state.meetups[eventId].loading)
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
            meetupApi.getAllMeetings(meetupId)
                .then(function (response) {
                    return response.json()
                })
                .then(function (json) {
                    console.log('resp----', json);
                    // commit(MEETUP_LOAD_MEETINGS, meetupId, response.json());
                    commit(MEETUP_LOAD_MEETINGS, {meetupId, events: json.events});
                    commit(MEETUP_LOAD_SET_LOADING, {meetupId, loadingStatus: false});
                })
                .catch(error => console.log("ERR", error))
            ;

        }
    }
});