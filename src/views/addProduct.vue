<script>
    export default {
        name: 'AddProduct',
        data() {
            return {
                formValues: {}
            }
        },
        methods: {
            submit() {
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
        <form class="addProductForm" @submit="submit()">
            <input
                name="name"
                class="input"
                v-model="formValues.name"
                @change="(event) => onChange(event)"
                placeholder="Name of product"
            />
            <input
                name="price"
                class="input"
                v-model="formValues.price"
                @change="(event) => onChange(event)"
                placeholder="Product price"
            />{{this.formValues.price}}
            <input
                name="imgUrl"
                class="input"
                v-model="formValues.imgUrl"
                @change="(event) => onChange(event)"
                placeholder="Url for product image"
            />
            <input
                name="quantity"
                class="input"
                v-model="formValues.quantity"
                @change="(event) => onChange(event)"
                placeholder="Product quantity"
            />{{this.formValues.quantity}}
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
    .container {
        margin: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;

    }
</style>
