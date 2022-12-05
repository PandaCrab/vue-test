<script>
    import { getProduct, updateProduct, deleteProduct } from '@/api/api';
    import { addProductSchema } from '@/helpers/validations';

    export default {
        name: 'ProductInfo',
        data() {
            return {
                product: {},
                toUpdate: {},
                isRewriting: false,
                resError: false,
                invalid: {
                    path: {},
                    isValid: false,
                },
                deletion: false,
            }
        },
        created() {
            this.catchProduct();
        },
        watch: {
            deletion: function() {
                if (this.deletion) {
                    document.documentElement.style.overflow = 'hidden';
                    return;
                }

                document.documentElement.style.overflow = 'auto';
            }
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
            toRewrite() {
                this.toUpdate = this.product;
                this.isRewriting = true;
            },
            async acceptDelete() {
                const id = this.$route.params?.id
                const res = await deleteProduct(id);

                if (res) {
                    this.deletion = false;
                    this.$router.back()
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
            onChangeUpdaet({ target }) {
                const { name, value } = target;

                this.toUpdate = {
                    ...this.toUpdate,
                    [name]: value,
                };

                if (Object.keys(this.invalid.path).includes([name])) {
                    this.invalid = {
                        ...this.invalid,
                        path: {
                            ...this.invalid.path,
                            [name]: ''
                        }
                    };
                }
            },
            async postUpdateInfo() {{
                try {
                    addProductSchema.validate(this.toUpdate, { abortEarly: false })
                        .then(async (value) => {
                            if (value) {
                                const res = await updateProduct(value);

                                if (res.message) {
                                    this.isRewriting = false;
                                }

                                if (res.error) {
                                    this.resError = res.error
                                }
                            }
                        })
                        .catch((error) => {
                            const validationError = {};

                            error.inner.forEach((err) => {
                                if (err.path) {
                                    validationError[err.path] = err.message;
                                }
                            });

                            this.invalid = {
                                path: validationError,
                                isValid: false
                            };
                        });
                } catch (err) {
                    console.log(err);
                }
                
            }}
        },
    }
</script>

<template>
    <div class="container">
        <div class="deletionWrapper" v-if="deletion">
            <div class="deletionAccept">
                <div>Do You want to delete {{product.name}}</div>
                <div class="btnWrapper deletion">
                    <button class="danger" @click="() => acceptDelete()">Yes</button>
                    <button class="decline" @click="() => this.deletion = false">No</button>
                </div>
            </div>
        </div>
        <div class="btnWrapper">
            <button class="rewriteBtn" @click="() => toRewrite()" v-if="!isRewriting">
                <div class="btnIcon"><font-awesome-icon icon="fa-solid fa-pen" /></div>
                <div class="btnText">Change</div>
            </button>
            <button class="backBtn" @click="this.$router.back" v-if="!isRewriting">
                <div class="btnIcon"><font-awesome-icon icon="fa-solid fa-arrow-left" /></div>
                <div class="btnText">Go back</div>
            </button>
            <button class="closeBtn" @click="this.isRewriting = false" v-if="isRewriting">
                <div class="btnIcon"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
                <div class="btnText">Close</div>
            </button>
            <button class="closeBtn" @click="() => this.deletion = true" v-if="isRewriting">
                <div class="btnIcon"><font-awesome-icon icon="fa-solid fa-trash" /></div>
                <div class="btnText">Delete</div>
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
                    <div class="inputWrapper">
                        <input
                            name="imgUrl"
                            class="rewriteInput"
                            :value="toUpdate.imgUrl"
                            @change="(event) => onChangeUpdate(event)"
                            :placeholer="('Image path' ?? toUpdate.imgUrl)"
                        />
                        <error-tooltip v-if="invalid.path.imgUrl" :message="invalid.path.imgUrl" />
                    </div>
                    <div class="inputWrapper">
                        <input
                            type="number"
                            class="rewriteInput"
                            name="width"
                            :value="toUpdate.width"
                            @change="(event) => onChangeUpdate(event)"
                            placeholder="Please set width of image"
                        />
                        <error-tooltip v-if="invalid.path.width" :message="invalid.path.width" />
                    </div>
                    <div class="inputWrapper">
                        <input
                            type="number"
                            class="rewriteInput"
                            name="height"
                            :value="(toUpdate.height)"
                            @change="(event) => onChangeUpdate(event)"
                            placeholder="Please set height of image"
                        />
                        <error-tooltip v-if="invalid.path.height" :message="invalid.path.height" />
                    </div>
                </div>
                <div class="mainInfo">
                    <div class="row">
                        <div class="title">Name</div>
                        <div class="inputWrapper">
                            <input
                                class="rewriteInput"
                                name="name"
                                :value="toUpdate.name"
                                @change="(event) => onChangeUpdate(event)"
                                placeholder="Name of product"
                            />
                            <error-tooltip v-if="invalid.path.name" :message="invalid.path.name" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="title">Price</div>
                        <div class="inputWrapper">
                            <input
                                type="number"
                                class="rewriteInput"
                                name="price"
                                :value="toUpdate.price"
                                @change="(event) => onChangeUpdate(event)"
                                placeholder="Priduct price"
                            />
                            <error-tooltip v-if="invalid.path.price" :message="invalid.path.price" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="title">Color</div>
                        <div class="inputWrapper">
                            <input
                                class="rewriteInput"
                                name="color"
                                :value="toUpdate.color"
                                @change="(event) => onChangeUpdate(event)"
                                placeholder="Product color"
                            />
                            <error-tooltip v-if="invalid.path.color" :message="invalid.path.color" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="title">Quantity</div>
                        <div class="inputWrapper">
                            <input
                                class="rewriteInput"
                                name="quantity"
                                v-model="product.quantity"
                            />
                            <error-tooltip v-if="invalid.path.quantity" :message="invalid.path.quantity" />
                        </div>
                    </div>
                    <div class="row">
                        <div class="title">Rating</div>
                        <div class="infoItem">{{getRating(product)}}</div>
                    </div>
                </div>
            </div>
            <div class="inputWrapper">
                <textarea
                    class="descriptionTextarea"
                    :value="product?.description"
                    @change="({ target }) => this.product.description = target.value"
                    placeholder="Add description to product"
                ></textarea>
                <error-tooltip v-if="invalid.path.description" :message="invalid.path.description" />
            </div>
            <button class="submitBtn" @click="postUpdateInfo()">Submit</button>
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
                    <div class=row v-if="product?.color">
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
            <div class="description" v-if="product?.description">{{product?.description}}</div>
            <div class="description" v-if="!product?.description">Product doesn't have a description</div>
        </div>
    </div>    
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;
    $borderHover: black;
    $btnBackgroundColor: black;
    $hoverTextColor: white;
    $containerBackground: white;
    $deletionBackground: rgba(128, 128, 128, .6);
    $red: red;
    $white: white;

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

        .deletionWrapper {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $deletionBackground;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1000;
            scroll-behavior: none;

            .deletionAccept {
                margin-top: 20px;
                width: 270px;
                height: 200px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: $white;
                border: 1px solid $lightGrayBorder;
            }
        }

        .btnWrapper {
            padding: 5px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &.deletion {
                justify-content: space-around;

                .danger {
                    padding: 6px 12px;
                    width: 70px;
                    background: none;
                    border: 1px solid $red;
                    color: $red;

                    &:hover {
                        background-color: $red;
                        color: $white;
                    }
                }

                .decline {
                    padding: 6px 12px;
                    width: 70px;
                    background: none;
                    border: 1px solid $lightGrayBorder;

                    &:hover {
                        background-color: $btnBackgroundColor;
                        color: $white;
                    }
                }
            }

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
                    background-color: $btnBackgroundColor;
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

            .inputWrapper {
                margin-bottom: 15px;
                position: relative;

                .rewriteInput {
                    padding: 4px 8px;
                    width: 100px;
                    border: 1px solid $lightGrayBorder;
                    border-radius: 5px;
                }
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
                    margin-bottom: 4px;
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

        .inputWrapper {
            margin-bottom: 15px;
            position: relative;

            .descriptionTextarea {
                width: 100%;
                height: 200px;
                display: flex;
                resize: none;
                font-size: 16px;
                text-align: start;
            }
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
                background-color: $btnBackgroundColor;
                color: $hoverTextColor;
            }
        }
    }
</style>
