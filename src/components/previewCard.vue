<script>
    export default {
        name: 'PreviewCard',
        props: {
            product: Object,
        }
    }
</script>

<template>
    <div class="container">
        <button calss="closeBtn"><font-awesome-icons icon="fa-solid fa-xmark" /></button>
        <div>
            <img
                class="productImage"
                :src="this.product.imgUrl"
                :alt="this.product.name"
                :width="this.product.width"
                :height="this.product.height"
            />
            <div>
                <div>{{this.product.name}}</div>
                <div>{{this.product.price}}</div>
                <div>{{this.product.color}}</div>
                <div>{{this.product.quantity}}</div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $containerBackground: white;

    .container {
        width: 180px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $containerBackground;
        position: absolute;
        left: 4px;
        top: 50%;
        right: 4px;
        z-index: 100;

        
    }
</style>
