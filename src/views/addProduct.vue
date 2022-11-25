<script>
    // import { postProduct } from '@/api/api';
    import PreviewCard from '@/components/previewCard.vue';
    import CategoriesDropdown from '@/components/categoriesDropdown.vue';

    export default {
        name: 'AddProduct',
        data() {
            return {
                formValues: {},
                previewCard: false
            }
        },
        methods: {
            onSubmit() {

                console.log(this.formValues);
            },
            onChange({ target }) {
                const { name, value } = target;

                this.formValues = {
                    ...this.formValues,
                    [name]: value
                };
            },
            setCategory(item) {
                if (item.subcategory) {
                    this.formValues = {
                        ...this.formValues,
                        category: item.category,
                        subcategory: item.subcategory
                    };
                }

                this.formValues = {
                    ...this.formValues,
                    category: item
                }
            }
        },
        components: {
            PreviewCard,
            CategoriesDropdown
        }
    };
</script>

<template>
    <div class="container">
        <PreviewCard v-if="this.previewCard" :product="this.formValues" :closePreview="() => this.previewCard = false" />
        <div class="addProductForm">
            <input
                name="name"
                class="formInput"
                :value="formValues.name"
                @change="(event) => onChange(event)"
                placeholder="Name of product"
            />
            <input
                name="price"
                class="formInput"
                :value="formValues.price"
                @change="(event) => onChange(event)"
                placeholder="Product price"
            />
            <input
                name="imgUrl"
                class="formInput"
                :value="formValues.imgUrl"
                @change="(event) => onChange(event)"
                placeholder="Url for product image"
            />
            <input
                name="color"
                class="formInput"
                :value="formValues.color"
                @change="(event) => onChange(event)"
                placeholder="Which color of the product"
            />
            <input
                name="quantity"
                class="formInput"
                :value="formValues.quantity"
                @change="(event) => onChange(event)"
                placeholder="Product quantity"
            />
            <CategoriesDropdown :selected="setCategory" />
            <div class="btnWrapper">
                <button @click="onSubmit()">Submit</button>
                <button v-if="!this.previewCard" @click="this.previewCard = true">show</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;
    $black: black;
    $white: white;

    .container {
        margin: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;

        .btnWrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            &>button {
                margin-right: 10px;
                padding: 5px 10px;
                width: 100px;
                background: none;
                border: 1px solid $lightGrayBorder;
                border-radius: 5px;

                &:hover {
                    background-color: $black;
                    color: $white;
                }
            }

            &:last-child {
                margin-right: none;
            }
        }

        .addProductForm {
            width: 280px;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: center;
            font-size: 16px;

            .formInput {
                margin-bottom: 10px;
                padding: 6px 12px;
                width: 100%;
                text-align: start;
                border: 1px solid #bbbbbb;
                border-radius: 5px;
            }
        }
    }
</style>
