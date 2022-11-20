<script>
    export default {
        name: 'spinner-loader'
    }
</script>

<template>
    <div class="spinner" />
</template>

<style scoped lang="scss">
    $loaderColor: black;
    .spinner {
        margin-top: 30vh;
        width: 50px;
        height: 50px;
        border-top: 1px solid $loaderColor;
        border-radius: 50%;
        animation: spin .4s linear infinite;

        @keyframes spin {
            0% { rotate: 0deg; }
            100% { rotate: 360deg; }
        }
    }
</style>