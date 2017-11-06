<template>
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
</template>

<script>
    export default {
        name: 'EventExtraData',
        props: ['event']
    }
</script>