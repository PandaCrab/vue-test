<script>
    import { postProduct } from '@/api/api';
    import { addProductSchema } from '@/helpers/validations';
    import PreviewCard from '@/components/previewCard.vue';
    import CategoriesDropdown from '@/components/categoriesDropdown.vue';

    export default {
        name: 'AddProduct',
        data() {
            return {
                formValues: {},
                previewCard: false,
                invalid: {
                    path: {},
                    isValidate: false
                }
            }
        },
        methods: {
            onSubmit() {
                addProductSchema
                    .validate(this.formValues, { abortEarly: false })
                    .then(async (value) => {
                        if (value) {
                            await postProduct(this.formValues);

                            this.formValues = {};

                            this.invalid = {
                                path: {},
                                isValid: true
                            };
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
            CategoriesDropdown,
        }
    };
</script>

<template>
    <div class="addProductContainer">
        <PreviewCard
            v-show="this.previewCard"
            :product="this.formValues"
            :closePreview="() => this.previewCard = false" 
        />
        <div class="addProductForm">
            <div class="inputWrapper">
                <input
                    name="name"
                    class="formInput"
                    :value="formValues.name"
                    @change="(event) => onChange(event)"
                    placeholder="Name of product"
                />
                <error-tooltip v-if="invalid.path.name" :message="invalid.path.name" />
            </div>
            <div class="inputWrapper">
                <input
                    name="price"
                    class="formInput"
                    :value="formValues.price"
                    @change="(event) => onChange(event)"
                    placeholder="Product price"
                />
                <error-tooltip v-if="invalid.path.price" :message="invalid.path.price" />
            </div>
            <div class="inputWrapper">
                <input
                    name="imgUrl"
                    class="formInput"
                    :value="formValues.imgUrl"
                    @change="(event) => onChange(event)"
                    placeholder="Url for product image"
                />
                <error-tootlip v-if="invalid.path.imgUrl" :message="invalid.path.imgUrl" />
            </div>
            <div class="inputWrapper">
                <input
                    name="color"
                    class="formInput"
                    :value="formValues.color"
                    @change="(event) => onChange(event)"
                    placeholder="Which color of the product"
                />
            </div>
            <div class="inputWrapper">
                <input
                    name="quantity"
                    class="formInput"
                    :value="formValues.quantity"
                    @change="(event) => onChange(event)"
                    placeholder="Product quantity"
                />
                <error-tooltip v-if="invalid.path.quantity" :message="invalid.path.quantity" />
            </div>
            <CategoriesDropdown :invalidCategory="this.invalid.path.category" :selected="setCategory" />
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

    .addProductContainer {
        margin: auto;
        width: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;

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
            padding: 20px;
            width: 280px;
            display: flex;
            flex-direction: column;
            align-items: center;
            align-self: center;
            font-size: 16px;

            .inputWrapper {
                margin-bottom: 15px;
                width: 100%;
                position: relative;
                .formInput {
                    padding: 6px 12px;
                    width: 93%;
                    border: 1px solid $lightGrayBorder;
                    border-radius: 5px;
                }
            }
        }
    }
</style>
