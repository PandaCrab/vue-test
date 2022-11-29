<script>
    export default {
        name: 'PreviewCard',
        props: {
            product: Object,
            closePreview: Function,
        },
        methods: {
            clickOutside({ target }) {
                const el = this.$refs.cardRef;

                if (!el?.contains(target)) {
                    this.closePreview();
                }
            },
        },
        created() {
            document.addEventListener('mousedown', this.clickOutside);
        },
        unmounted() {
            () => document.removeEventListener('mousedown', this.clickOutside);
        }
    }
</script>

<template>
    <div class="cardContainer" ref="cardRef">
        <button class="closeBtn" @click="this.closePreview()">
            <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
        <div class="infoWrapper">
            <img
                class="productImage"
                :src="this.product.imgUrl"
                :alt="this.product.name"
                :width="this.product.width"
                :height="this.product.height"
            />
            <div class="productInfo">
                <div class="name">{{this.product.name}}</div>
                <div>${{this.product.price}}</div>
                <div>{{this.product.color}}</div>
                <div>{{this.product.quantity}}</div>
                <div class="starsWrapper">
                    <div class="star" v-for="star in [...Array(5)]" :key="star?.index">
                        <font-awesome-icon icon="fa-regular fa-star" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;
    $containerBackground: white;
    $white: white;
    $black: black;

    .cardContainer {
        margin: auto;
        padding: 10px;
        width: 230px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background-color: $containerBackground;
        border: 1px solid $lightGrayBorder;
        position: absolute;
        left: 4px;
        top: 50%;
        right: 4px;
        z-index: 100;

        .closeBtn {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $white;
            border: 1px solid $lightGrayBorder;
            border-radius: 50%;
            cursor: pointer;
            position: absolute;
            top: -15px;
            right: -15px;
        }

        .infoWrapper {
            width: 100%;
            display: flex;
            flex-direction: row;

            .productImage {
            margin-right: 10px;
            width: 50%;
            height: 130px;
            }

            .productInfo {
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                &>div {
                    margin-bottom: 2px;
                }

                .name {
                    text-align: end;
                    font-weight: bold;
                    margin-bottom: 5px
                }

                .starsWrapper {
                    display: flex;
                    align-items: center;
                }

                .star {
                    margin-left: 2px;

                }
            }
        }
    }
</style>
