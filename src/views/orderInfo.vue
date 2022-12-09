<script>
    import { getOneOrder } from '@/api/api';

    export default {
        name: 'OrderInfo',
        data() {
            return {
                product: {}
            }
        },
        created() {
            this.getOrder();
        },
        computed: {
            checkPayed() {
                return this.product.payment.payed ? 'Payed' : 'Not payed';
            },
            checkShippingStatus() {
                return this.product.shippingStatus ? this.product.shippingStatus : 'none';
            }
        },
        methods: {
            async takeOrderFromHistory(id) {
                const res = await getOneOrder(id);

                this.product = res;
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
    <div class="orderContainer">
        <div class="header">
            <div class="fullDate">
                <div class="time">
                    {{new Date(product.date).toLocaleTimeString()}}
                </div>
                <div calss="date">
                    {{new Date(product.date).toLocaleDateString()}}
                </div>
            </div>
            <div class="status">
                {{this.checkShippingStatus}}
            </div>
        </div>
        <div class="infoWrapper">
            <div class="userInfo">
                <div class="subtitle">Username</div>
                <div>{{this.product.username}}</div>
                <div class="subtitle">Shipping info</div>
                <ul class="shippingInfo">
                    <li>{{this.product.shippingInfo.street}}</li>
                    <li>{{this.product.shippingInfo.city}}</li>
                    <li>{{this.product.shippingInfo.country}}</li>
                    <li>{{this.product.shippingInfo.zip}}</li>
                    <li v-if="this.product.optional">{{this.product.optional}}</li>
                </ul>
            </div>
            <div class="orderedProducts">
                <div class="product" v-for="product in product.orderInfo.products" :key="product.index">
                    <div class="productWrapper">
                        <div class="row">
                            <img
                                class="productImage"
                                :src="this.product.imgUrl"
                                :alt="this.product.name"
                                :width="this.product.width"
                                :height="this.product.height"
                            />
                            <div class="wrapper">
                                <div>{{this.product.name}}</div>
                                <div>{{this.product.price}}</div>
                                <div>{{this.product.color}}</div>
                                <div>{{this.product.quantity}}</div>
                                <div>{{this.getRating(this.product)}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .orderContainer {
        padding: 2px;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
    }
</style>
