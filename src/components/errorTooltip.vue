<script>
    export default {
        name: 'ErrorTooltip',
        props: {
            message: String,
        }
    }
</script>

<template>
    <div class="errorContainer">
        {{this.message}}
    </div>
</template>

<style scoped lang="scss">
    $red: red;

    .errorContainer {
        padding-top: 1px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 12px;
        color: $red;
        position: absolute;
        top: 100%;
    }
</style>
