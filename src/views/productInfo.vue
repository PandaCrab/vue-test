<script>
    import { getProduct, updateProduct } from '@/api/api';

    export default {
        name: 'ProductInfo',
        data() {
            return {
                product: {},
                toUpdate: {
                    _id: this.product?._id
                },
                isRewriting: false,
            }
        },
        created() {
            this.catchProduct();
        },
        methods: {
            async catchProduct() {
                try {
                    const id = await this.$route.params?.id;
                    const product = await getProduct(id);

                    if (product) {
                        this.product = product;
                    }
                } catch (err) {
                    console.log(err);
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
            },
            catchForUpdate({ target }) {
                const { name, value } = target;

                this.toUpdate = {
                    ...this.toUpdate,
                    [name]: value,
                };
            },
            async postUpdateInfo(data) {{
                try {
                    if (data) {
                        const res = await updateProduct(data);

                        if (res.message) {
                            this.isRewriting = false;
                            console.log(res)
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
                
            }}
        },
    }
</script>

<template>
    <div class="container">
        <div class="btnWrapper">
            <button class="rewriteBtn" @click="this.isRewriting = true" v-if="!isRewriting">
                <div class="btnIcon"><font-awesome-icon icon="fa-solid fa-pen" /></div>
                <div class="btnText">Change</div>
            </button>
            <button class="backBtn" @click="this.$router.back" v-if="!isRewriting">
                <div class="btnIcon"><font-awesome-icon icon="fa-solid fa-arrow-left" /></div>
                <div class="btnText">Go back</div>
            </button>
            <button class="closeBtn" @click="this.isRewriting = false" v-else>
                <div class="btnIcon"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
                <div class="btnText">Close</div>
            </button>
        </div>
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
                        <div class="infoItem">{{getRating(product)}}</div>
                    </div>
                </div>
            </div>
            <textarea
                class="descriptionTextarea"
                :value="product?.description"
                @change="({ target }) => this.product.description = target.value"
                placeholder="Add a description to a product"
            />
            <button class="submitBtn" @click="postUpdateInfo(this.product)">Submit</button>
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
    $borderHover: black;
    $backgroundColor: black;
    $hoverTextColor: white;
    $containerBackground: white;

    .container {
        margin: auto;
        padding: 5px;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: $containerBackground;
        border: 1px solid $lightGrayBorder;
        border-radius: 5px;
        position: relative;

        .btnWrapper {
            padding: 5px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .backBtn,
            .rewriteBtn,
            .closeBtn {
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                align-self: flex-end;
                justify-content: center;
                background: none;
                border: 1px solid $lightGrayBorder;
                border-radius: 50%;
                transition: width .1s linear;

                .btnIcon {
                    display: flex;
                }

                .btnText {
                    display: none;
                }

                &:hover {
                    width: 90px;
                    border-radius: 5px;
                    border-color: $borderHover;
                    background-color: $backgroundColor;
                    color: $hoverTextColor;

                    .btnIcon {
                        display: none;
                    }

                    .btnText {
                        height: 20px;
                        display: flex;
                        align-items: center;
                        white-space: nowrap;
                    }
                }
            }
        }

        .wrapper {
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .rewriteInput {
                padding: 4px 8px;
                width: 100px;
                border: 1px solid $lightGrayBorder;
                border-radius: 5px;
            }

            .imageInfo {
                margin-bottom: 10px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

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
                    padding-bottom: 3px;
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

        .descriptionTextarea {
            margin-bottom: 10px;
            width: 100%;
            height: 200px;
            display: flex;
            resize: none;
            font-size: 16px;
            text-align: start;
        }

        .submitBtn {
            margin: auto;
            padding: 5px 10px;
            width: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: 1px solid $lightGrayBorder;
            border-radius: 5px;

            &:hover {
                background-color: $backgroundColor;
                color: $hoverTextColor;
            }
        }
    }
</style>
