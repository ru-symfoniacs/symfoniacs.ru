<template>
    <div class="loader"><i class="loader__spinner fa fa-repeat"></i> loading...</div>
</template>
<script>
    export default {
        name: 'Loader'
    }
</script>

<style>
    .loader {
        color: darkgrey;
        font-size: 2rem;
    }
    .loader .loader__spinner{
        margin-right: 3px;
    }
    .loader__spinner{
        animation: spinner linear 4s infinite;
        color: lightgray;
    }

    @keyframes spinner {
        0%{
            transform: rotateZ(0deg);
        }

        100%{
            transform: rotateZ(360deg);
        }
    }
</style>