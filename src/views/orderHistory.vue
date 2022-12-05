<script>
    import { getAllOrders } from '../api/api';
    import { sortFunc } from '../helpers/filters';

    export default {
        name: 'OrderHistory',
        data() {
            return {
                search: '',
                filtered: [],
                allOrders: {}
            }
        },
        created() {
            this.takeOrders();
        },
        methods: {
            async takeOrders() {
                const res = await getAllOrders();

                this.allOrders = res;
            },
            isPayed(item) {
                return item ? 'Yes' : 'No'
            },
            dateFormater(dateToFormat) {
                const time = new Date(dateToFormat).toLocaleTimeString();
                const date = new Date(dateToFormat).toLocaleDateString();

                return `${time} ${date}`;
            },
            onSort(sortBy) {
                this.filtered = sortFunc(this.allOrders, sortBy);
            }
        }
    }
</script>

<template>
    <div class="ordersContainer">
        <h1>Orders history</h1>
        <button @click="onSort('date')">online</button>
        <div class="ordersList" v-if="allOrders?.length">
            <div class="orderWrapper" v-for="order in (filtered ?? allOrders)" :key="order._id">
                <button class="infoBtn">
                    <div class="icon"><font-awesome-icon icon="fa-solid fa-info" /></div>
                    <div class="text">More info</div>
                </button>
                <div class="userInfo">
                    <div class="row">
                        <div>Date:</div>
                        <div><b>{{ dateFormater(order.date) }}</b></div>
                    </div>
                    <div class="row">
                        <div>Username:</div>
                        <div>{{order.username}}</div>
                    </div>
                </div>
                <div class="row">
                    <div>Ordered items:</div>
                    <div>{{order.orderInfo.products.length}}</div>
                </div>
                <div class="wrapper">
                    <h4>Payment</h4>
                    <div class="row">
                        <div>Payed:</div>
                        <div>{{isPayed(order.payment?.payed)}}</div>
                    </div>
                    <div class="row">
                        <div>Payment type:</div>
                        <div>{{order.payment?.paymentType}}</div>
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
    $btnBackground: black;
    $white: white;

    .ordersContainer {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .ordersList {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;

            @include scrollbars(1px, none, $lightGrayBorder);

            .orderWrapper {
                margin-bottom: 10px;
                padding: 10px;
                width: 270px;
                display: flex;
                flex-direction: column;
                align-items: center;
                align-self: center;
                border: 1px solid;
                box-shadow: 0 0 5px gray;

                @include media.tablet {
                    margin-right: 10px;
                }

                @include media.laptop {
                    margin-right: 10px;
                }

                .infoBtn {
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

                    .icon {
                        display: flex;
                    }

                    .text {
                        display: none;
                    }

                    &:hover {
                        width: 100px;
                        word-break: keep-all;
                        background-color: $btnBackground;
                        color: $white;
                        border-radius: 5px;

                        .icon {
                            display: none;
                        }

                        .text {
                            display: flex;
                        }
                    }
                }

                .row {
                    padding: 0 5px;
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;

                    >div {
                        margin-bottom: 5px;

                        &:first-child {
                            font-size: 15px;
                            font-weight: bold;
                        }
                        
                        &:last-child {
                            width: 150px;
                            word-break: break-all;
                        }
                    }
                }

                .userInfo {
                    margin-bottom: 10px;
                    padding: 4px;
                    border-bottom: 1px solid;

                }
            }
        }
    }
</style>