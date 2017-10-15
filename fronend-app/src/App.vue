<template>
    <div id="app">

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

        <!--<router-view></router-view>-->
    </div>
</template>

<script>
    import Meetup from "./components/Meetup.vue";

    export default {
        components: {Meetup},
        name: 'app'
    }
</script>


