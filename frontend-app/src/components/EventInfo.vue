<template>
    <div>
        <div>
            <time>Date: {{timestamp2Date(event.time)}}</time>
        </div>
        <div>
            <time>Time: {{timestamp2Time(event.time)}}</time>
        </div>
        <div>Guests: {{event.yes_rsvp_count}}</div>
    </div>
</template>

<script>
    import spacetime from 'spacetime';

    export default {
        name: 'event-info',
        props: ['event'],
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