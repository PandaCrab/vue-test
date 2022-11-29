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
                        console.log(this.invalid.path)
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
                    :class="`formInput ${this.invalid.path.name && 'error'}`"
                    :value="formValues.name"
                    @change="(event) => onChange(event)"
                    placeholder="Name of product"
                />
                <error-tooltip v-if="invalid.path.name" :message="invalid.path.name" />
            </div>
            <div class="inputWrapper">
                <input
                    name="price"
                    :class="`formInput ${this.invalid.path.price && 'error'}`"
                    :value="formValues.price"
                    @change="(event) => onChange(event)"
                    placeholder="Product price"
                />
                <error-tooltip v-if="invalid.path.price" :message="invalid.path.price" />
            </div>
            <div class="inputWrapper">
                <input
                    name="imgUrl"
                    :class="`formInput ${this.invalid.path.imgUrl && 'error'}`"
                    :value="formValues.imgUrl"
                    @change="(event) => onChange(event)"
                    placeholder="Url for product image"
                />
                <error-tooltip v-if="invalid.path.imgUrl" :message="invalid.path.imgUrl" />
            </div>
            <div class="inputWrapper">
                <input
                    name="color"
                    :class="`formInput ${this.invalid.path.color && 'error'}`"
                    :value="formValues.color"
                    @change="(event) => onChange(event)"
                    placeholder="Which color of the product"
                />
            </div>
            <div class="inputWrapper">
                <input
                    name="quantity"
                    :class="`formInput ${this.invalid.path.quantity && 'error'}`"
                    :value="formValues.quantity"
                    @change="(event) => onChange(event)"
                    placeholder="Product quantity"
                />
                <error-tooltip v-if="invalid.path.quantity" :message="invalid.path.quantity" />
            </div>
            <CategoriesDropdown :invalidCategory="this.invalid.path.category" :selected="setCategory" />
            <div class="inputWrapper">
                <textarea 
                    name="description"
                    :class="`description ${this.invalid.path.description && 'error'}`"
                    :value="formValues.description"
                    @change="(event) => onChange(event)"
                    placeholder="Product description"
                ></textarea>
                <error-tooltip v-if="this.invalid.path.description" :message="this.invalid.path.description" />
            </div>
            <div class="btnWrapper">
                <button @click="onSubmit()">Submit</button>
                <button v-if="!this.previewCard" @click="this.previewCard = true">show</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;
    $errorBorder: red;
    $black: black;
    $white: white;
    $red: red;

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

                    &.error {
                        border-color: $errorBorder;

                        &::placeholder {
                            color: $red;
                            opacity: .7;
                        }
                    }
                }
            }

            .description {
                padding: 5px;
                width: 98%;
                height: 250px;
                font-size: 14px;
                border: 1px solid $lightGrayBorder;
                border-radius: 5px;
                resize: none;

                &.error {
                    border-color: $errorBorder;

                    &::placeholder {
                        color: $red;
                        opacity: .7;
                    }
                }
            }
        }
    }
</style>
