<script>
    import { getOneOrder } from '@/api/api';

    export default {
        name: 'OrderInfo',
        data() {
            return {
                order: {}
            }
        },
        created() {
            this.getOrder();
        },
        computed: {
            checkPayed() {
                return this.order.payment?.payed ? 'Payed' : 'Not payed';
            },
            checkShippingStatus() {
                return this.order.shippingStatus ? this.order.shippingStatus : 'none';
            },
            shippingStatusClass() {
                const status = this.order.shippingStatus;

                return `shippingStatus ${
                    status === 'rejected' ? 'rejected'
                    : status === 'completed' ?  'completed' : 'inProgress'
                }`
            }
        },
        methods: {
            async takeOrderFromHistory(id) {
                const res = await getOneOrder(id);

                this.order = res;
            },
            getOrder() {
                const id = this.$route.params.id;

                if (id) {
                    this.takeOrderFromHistory(id);
                }
            },
            getRating({ stars }) {
                if (stars) {
                    const { five, four, three, two,one } = stars;

                    return (
                        (5*five + 4*four + 3*three + 2*two + 1*one) / (five + four + three + two + one)
                    ).toFixed(2);
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<template>
    <div class="orderContainer" @click="() => this.$router.back()">
        <div class="backBtn">
            <font-awesome-icon icon="fa-soliid fa-arrow-left" />
        </div>
        <div class="header">
            <div class="fullDate">
                <div class="time">
                    {{new Date(order.date).toLocaleTimeString()}}
                </div>
                <div calss="date">
                    {{new Date(order.date).toLocaleDateString()}}
                </div>
            </div>
            <div :class="shippingStatusClass">
                {{checkShippingStatus}}
            </div>
        </div>
        <div class="infoWrapper">
            <div class="userInfo">
                <div class="row">
                    <div>Username</div>
                    <div>{{this.order.username}}</div>
                </div>
                <div class="title">Shipping info</div>
                <div class="shippingInfo">
                    <div class="row">
                        <div>Street:</div>
                        <div>{{this.order.shippingInfo?.street}}</div>
                    </div>
                    <div class="row">
                        <div>City:</div>
                        <div>{{this.order.shippingInfo?.city}}</div>
                    </div>
                    <div class="row">
                        <div>Country:</div>
                        <div>{{this.order.shippingInfo?.country}}</div>
                    </div>
                    <div class="row">
                        <div>ZIP code:</div>
                        <div>{{this.order.shippingInfo?.zip}}</div>
                    </div>
                    <div class="row" v-if="this.order.optional">
                        <div>Additional information</div>
                        <div>{{this.order.optional}}</div>
                    </div>
                </div>
                <div class="title">Payment</div>
                <div class="row">
                    <div>Payed status:</div>
                    <div>{{checkPayed}}</div>
                </div>
                <div class="row">
                    <div>Payment type:</div>
                    <div>{{this.order.payment?.paymentType}}</div>
                </div>
            </div>
            <div class="title">Ordered products</div>
            <div class="orderedProducts">
                <div class="productWrapper" v-for="product in order.orderInfo?.products" :key="product.index">
                    <img
                        class="productImage"
                        :src="product.imgUrl"
                        :alt="product.name"
                        :width="product.width"
                        :height="product.height"
                    />
                    <div class="productInfo">
                        <div class="row">
                            <div>Name:</div>
                            <div>{{product.name}}</div>
                        </div>
                        <div class="row">
                            <div>Price:</div>
                            <div>{{product.price}}</div>
                        </div>
                        <div class="row">
                            <div>Color:</div>
                            <div>{{product.color}}</div>
                        </div>
                        <div class="row">
                            <div>Quantity:</div>
                            <div>{{product.quantity}}</div>
                        </div>
                        <div class="row">
                            <div>Rating:</div>
                            <div>{{this.getRating(product)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '../assets/styles/mixins/MediaMixins.module.scss' as media;
    @use '../assets/styles/mixins/ScrollbarMixin.module.scss' as *;

    $lightGrayBorder: #bbbbbb;
    $productInfoText: #9c9c9c;
    $ordersWrapperShadow: #b6b6b6;
    $red: red;
    $green: green;
    $orange: orange;

    .orderContainer {
        margin: auto;
        width: 310px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid $lightGrayBorder;

        .backBtn {
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid $lightGrayBorder;
            border-radius: 5px;
            position: absolute;
            top: 5px;
            right: 5px;
        }

        .header {
            padding: 5px;
            width: 300px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid $lightGrayBorder;

            .fullDate {
                font-size: 16px;
                font-weight: bold;

                .time {
                    margin-right: 5px;
                    font-style: italic;
                }
            }

            .shippingStatus {
                font-size: 14px;

                &.rejected {
                    color: $red;
                    text-shadow: 0 0 1px;
                }

                &.inProgress {
                    color: $orange;
                    text-shadow: 0 0 1px;
                }

                &.completed {
                    color: $green;
                    text-shadow: 0 0 1px;
                }
            }
        }

        .infoWrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .row {
                    margin-bottom: 5px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: 14px;

                    >div {
                        &:first-child {
                            font-weight: bold;
                            text-align: start;
                        }

                        &:last-child {
                            font-size: 15px;
                            text-align: end;
                            color: $productInfoText;
                        }
                    }
                }

                .title {
                    margin-bottom: 10px;
                    width: 100%;
                    text-align: center;
                    font-size: 18px;
                    font-weight: bolder;
                }

            .userInfo {
                margin-bottom: 20px;
                padding: 5px;
                width: 300px;
                display: flex;
                flex-direction: column;
                
                .shippingInfo {
                    margin-bottom: 10px;
                    padding: 5px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-right: 1px solid $lightGrayBorder;
                }

            }

            .orderedProducts {
                margin: 5px;
                padding: 5px;
                max-height: 250px;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-shadow: 0 0 5px $ordersWrapperShadow;
                overflow-y: scroll;

                @include scrollbars(1px, $lightGrayBorder, none);

                .productWrapper {
                    margin-bottom: 10px;
                    padding: 5px;
                    width: 280px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    border: 1px solid $lightGrayBorder;

                    .productImage {
                        padding: 5px;
                        width: 100px;
                        height: 120px;
                        border: 1px solid $lightGrayBorder;

                        img {
                            width: 100%;
                            max-width: 150px;
                            height: auto;
                        }
                    }

                    .productInfo {
                        width: 160px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-end;
                    }
                }
            }
        }
    }
</style>
