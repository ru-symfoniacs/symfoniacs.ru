<template>
    <div :class="{'modal-open':expandedEvent}" class="expanded-event">

        <div class="modal fade static "
             data-backdrop="true"
             :class="{in: (expandedEvent ||expandedEventLoading)}"
             tabindex="-1" role="dialog"
             style="max-height: 100%"
             :style="{display: (expandedEvent ||expandedEventLoading)?'block':'none'}">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">

                        <button @click.prevent="handleClosePage()" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                        </button>

                        <h1 class="modal-title expanded-event__title" v-if="expandedEvent">{{expandedEvent.name}}</h1>
                    </div>
                    <div class="modal-body" style="">
                        <loader v-if="expandedEventLoading"></loader>
                        <event :event="expandedEvent" :meetupId="getMeetupId()" :expanded="true"></event>
                        <div class="expanded-event__close-button-container">
                            <button class="btn btn-primary btn-xs expanded-event__close-button" @click="handleClosePage()">Close</button>
                        </div>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <div class="modal-backdrop fade in" v-if="(expandedEvent ||expandedEventLoading)"></div>

    </div>
</template>


<script>
    import Loader from "./Loader.vue";
    import {mapGetters} from "vuex";
    import Event from "./Event.vue";
    import {MEETUP_UNSET_EXPANDED_EVENT} from "../store/mutation-types";

    export default {
        name: 'ExpandedEventPage',
        components: {Loader, Event},
        computed: {
            ...mapGetters(['expandedEvent', 'expandedEventLoading'])
        },

        methods: {
            handleClosePage() {
                this.$store.commit(MEETUP_UNSET_EXPANDED_EVENT);
                this.$router.push("/");
            },
            getMeetupId() {
                const e = this.expandedEvent;
                return e && e.group && e.group.urlname && e.group.urlname.toLowerCase() || '';
            }
        }


    }
</script>