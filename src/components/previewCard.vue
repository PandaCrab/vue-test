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
            getRating({ stars }) {
                const { five, four, three, two, one } = stars;

                return (
                    (5*five + 4*four + 3*three + 2*two + 1*one) / (five + four + three + two + one)
                ).toFixed(2);
            }
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
                    <div class="star" v-for="(star, index) in [...Array(5)]" :key="index">
                        <font-awesome-icon 
                            :icon="(index + 1) > getRating(product) ? 'fa-regular fa-star' : 'fa-solid fa-star'" 
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="btnsWrapper">
            <div class="btn">
                <font-awesome-icon icon="fa-solid fa-cart-shopping" />
            </div>
            <div class="btn">
                <font-awesome-icon icon="fa-regular fa-heart" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;
    $containerBackground: white;
    $white: white;
    $black: black;
    $starColor: rgb(255, 217, 0);

    .cardContainer {
        margin: auto;
        width: 270px;
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
            padding: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            align-content: center;

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
                    margin-bottom: 5px;
                }

                .name {
                    margin-bottom: 10px; 
                    text-align: end;
                    font-weight: bold;
                }

                .starsWrapper {
                    display: flex;
                    align-items: center;
                }

                .star {
                    margin-left: 2px;
                    color: $starColor;
                }
            }
        }
        
        .btnsWrapper {
            padding: 5px;
            width: 100%;
            display: flex;
            align-items: center;
            align-self: end;
            justify-content: flex-end;
            border-top: 1px solid $lightGrayBorder;

            .btn {
                margin-right: 10px;
                width: 25px;
                height: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid $lightGrayBorder;
                border-radius: 50%;

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
</style>
