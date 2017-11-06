<template>
    <div class="host">
        <div class="host__name">{{event.venue.name}}</div>
        <div class="host__country-city">{{event.venue.city}}, {{event.venue.localized_country_name}}</div>
        <address class="host__address">
            <a :href="'https://maps.yandex.ru/?text='+event.venue.lat+','+event.venue.lon" target="_blank">
                <i class="fa fa-map-marker"></i>
                {{event.venue.address_1}}
            </a>
        </address>
    </div>
</template>

<script>
    export default {
        name: 'EventHostInfo',
        props: ['event']
    }
</script>
