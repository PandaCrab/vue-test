<script>
import loaderComponent from '@/components/loaderComponent.vue';
import { getProducts } from '@/api/api';

    export default {
        name: 'StorageProducts',
        data: () => ({
            products: [],
            isPreview: false,
            search: '',
            filtered: null,
            error: ''
        }),
        created() {
            this.takeProducts()
        },
        watch: {
            search: 'onSearch'
        },
        methods: {
            async takeProducts() {
                try {
                    const fetched = await getProducts();

                    if (fetched.length) {
                        this.products = await fetched;
                    }

                    if (fetched.message) {
                        return this.error = `Fetch problems: ${fetched.message}`
                    }

                    return null
                } catch (err) {
                    this.error = 'Fetch problems:' + err
                }
            },
            onSearch() {
                if (this.search.length >= 3) {
                    const filter = this.products.filter(el => el.name.toLowerCase().includes(this?.search));

                    if (filter.length) {
                        this.filtered = filter;
                    }

                    if (!filter.length) {
                        this.filtered = `Didn't find anything`
                    }
                } else {
                    this.filtered = null;
                }
            }
        },
        components: {
            loaderComponent
        }
    }
</script>

<template>
    <div class="container">
        <input
            name="search"
            class="searchInput"
            placeholder="What do we search?"
            v-if="this.products.length"
            v-model="search"
        />
        <div class="productsList" v-if="(filtered instanceof Array)">
            <div 
                class="product"
                v-for="product in filtered" 
                :key="product._id"
                @click="() => this.$router.push(`/product/${product._id}`)"
                @mousedown="this.isPreview = true"
                @mouseup="this.isPreview = false"
            >
                <img
                    :src="product.imgUrl"
                    :alt="product.name"
                    class="image"
                />
                <div class="name">{{product.name}}</div>
            </div>

        </div>
        <div class="productsList" v-else-if="!filtered && this.products?.length">
            <div 
                class="product"
                v-for="product in products" 
                :key="product._id"
                @click="() => this.$router.push(`/product/${product._id}`)"
                @mousedown="this.isPreview = true"
                @mouseup="this.isPreview = false"
            >
                <img
                    :src="product.imgUrl"
                    :alt="product.name"
                    :width="product.width"
                    :height="product.height"
                    class="image"
                />
                <div class="name">{{product.name}}</div>
            </div>
        </div>
        <div v-else-if="filtered && !(filtered instanceof Array)">{{this.filtered}}</div>
        <div class="errorWrapper" v-else-if="this.error">{{error}}</div>
        <div class="loader" v-else>
            <loaderComponent />
        </div >
    </div>
</template>

<style scoped lang="scss">
    @use '../assets/styles/mixins/ScrollbarMixin.module.scss' as *;
    @use '../assets/styles/mixins/MediaMixins.module.scss' as media;

    $lightGrayBorder: #bbbbbb;

    .container {
        margin: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .loader {
            font-size: 50px;
        }

        .searchInput {
            margin-bottom: 10px;
            padding: 6px 12px;
            width: 70%;
            border: 1px solid $lightGrayBorder;
            border-radius: 5px;
        }
        .productsList {
            margin-bottom: 15px;
            width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: scroll;
            overflow-x: hidden;

            @include scrollbars(1px, $lightGrayBorder, none);

            .product {
                margin-bottom: 10px;
                padding: 2px;
                width: 98%;
                height: 50px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                border: 1px solid $lightGrayBorder;
                border-radius: 5px;

                .image {
                    width: 40px;
                    height: 50px;

                }
            }
        }
    }
</style>