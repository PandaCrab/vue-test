<script>
    export default {
        name: 'AddProduct',
        data() {
            return {
                formValues: {}
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
            }
        }
    };
</script>

<template>
    <div class="container">
        <div class="addProductForm">
            <input
                name="name"
                class="formInput"
                v-model="formValues.name"
                @change="(event) => onChange(event)"
                placeholder="Name of product"
            />
            <input
                name="price"
                class="formInput"
                v-model="formValues.price"
                @change="(event) => onChange(event)"
                placeholder="Product price"
            />
            <input
                name="imgUrl"
                class="formInput"
                v-model="formValues.imgUrl"
                @change="(event) => onChange(event)"
                placeholder="Url for product image"
            />
            <input
                name="quantity"
                class="formInput"
                v-model="formValues.quantity"
                @change="(event) => onChange(event)"
                placeholder="Product quantity"
            />
            <button @click="onSumbit">Submit</button>
        </div>
    </div>
</template>

<style scoped>
    .container {
        margin: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    .addProductForm {
        width: 290px;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        font-size: 16px;
    }

    .formInput {
        margin-bottom: 10px;
        padding: 6px 12px;
        width: 100%;
        text-align: start;
        border: 1px solid #bbbbbb;
        border-radius: 5px;
    }
</style>
