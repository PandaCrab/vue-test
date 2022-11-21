<script>
    import { getProduct } from '@/api/api';

    export default {
        name: 'ProductInfo',
        data() {
            return {
                product: {},
                isRewriting: false
            }
        },
        created() {
            this.catchProduct();
            console.log(this.$route.params.id)
        },
        methods: {
            async catchProduct() {
                const id = await this.$route.params?.id;
                const product = await getProduct(id);

                if (product) {
                    this.product = product;
                }
            },
            getRating({ stars }) {
                if (stars) {
                    const {
                        five, four, three, two, one,
                    } = stars;

                    return ((
                        5 * five + 4 * four + 3 * three + 2 * two + 1 * one
                    ) / (five + four + three + two + one)).toFixed(2);
                } else {
                    return null;
                }
            }
        },
    }
</script>

<template>
    <div class="container">
        <button class="backBtn" @click="this.$router.back"><font-awesome-icon icon="fa-solid fa-arrow-left" /></button>
        <div class="inforewrite" v-if="isRewriting">
            <div class="wrapper">
                <div class="imageInfo">
                    <img
                        class="productImage"
                        :src="product?.imgUrl"
                        :alt="product?.name"
                        :width="product?.width"
                        :height="product?.height"
                    />
                    <input
                        name="imgUrl"
                        class="rewriteInput"
                        v-model="product.imgUrl"
                    />
                    <input
                        class="rewriteInput"
                        name="width"
                        v-model="product.width"
                    />
                    <input
                        class="rewriteInput"
                        name="height"
                        v-model="product.height"
                    />
                </div>
                <div class="mainInfo">
                    <div class="row">
                        <div class="title">Name</div>
                        <input
                            class="rewriteInput"
                            name="name"
                            v-model="product.name"
                        />
                    </div>
                    <div class="row">
                        <div class="title">Price</div>
                        <input
                            class="rewriteInput"
                            name="price"
                            v-model="product.price"
                        />
                    </div>
                    <div class="row">
                        <div class="title">Color</div>
                        <input
                            class="rewriteInput"
                            name="color"
                            v-model="product.color"
                        />
                    </div>
                    <div class="row">
                        <div class="title">Quantity</div>
                        <input
                            class="rewriteInput"
                            name="quantity"
                            v-model="product.quantity"
                        />
                    </div>
                    <div class="row">
                        <div class="title">Rating</div>
                        <div class="infoItem">{{product?.rating}}</div>
                    </div>
                </div>
            </div>
            <textarea
                col="100"
                row="150"
                :value="product?.description"
                @change="({ target }) => this.product.description = target.value"
            />{{product?.description}}
        </div>
        <div class="infoWrapper" v-else>
            <div class="wrapper">
                <img
                    class="productImage"
                    :src="product?.imgUrl"
                    :alt="product?.name"
                    :width="product?.width"
                    :height="product?.height"
                />
                <div class="mainInfo">
                    <div class=row>
                        <div class="title">Name</div>
                        <div class="infoItem">{{product?.name}}</div>
                    </div>
                    <div class=row>
                        <div class="title">Price</div>
                        <div class="infoItem">{{product?.price}}</div>
                    </div>
                    <div class=row>
                        <div class="title">Color</div>
                        <div class="infoItem">{{product?.color}}</div>
                    </div>
                    <div class=row>
                        <div class="title">Quantity</div>
                        <div class="infoItem">{{product?.quantity}}</div>
                    </div>
                    <div class=row>
                        <div class="title">Rating</div>
                        <div class="infoItem">{{getRating(product)}}</div>
                    </div>
            </div>
            </div>
            <div class="description">{{product?.description}}</div>
        </div>
    </div>    
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;

    .container {
        margin: auto;
        padding: 5px;
        width: 95%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid $lightGrayBorder;
        border-radius: 5px;
        position: relative;

        .wrapper {
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .productImage {
                margin-bottom: 10px;
            }

            .mainInfo {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

                .row {
                    margin-bottom: 2px;
                    padding-bottom: 1px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid;

                    .title {
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
