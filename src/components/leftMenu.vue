<script>
    export default {
        name: 'LeftMenu',
        data() {
            return {
                isOpen: false,
            }
        },
        updated() {
            this.$nextTick(() => {
                if (this.isOpen) {
                    window.addEventListener('mousedown', this.clickOutside);
                }

                return () => window.removeEventListener('mousedown', this.clickOutside);
            })
        },
        watch: {
            isOpen: function() {
                if (this.isOpen) {
                    document.documentElement.style.overflow = 'hidden';
                    return;
                }

                document.documentElement.style.overflow = 'auto';
            }
        },
        methods: {
            clickOutside({ target }) {
                const el = this.$refs.menuRef;
                if (el && !el?.contains(target)) {
                    this.isOpen = false;
                }
            },
            toggleMenu() {
                this.isOpen = !this.isOpen;
            },
            closeMenu() {
                this.isOpen = false;
            },
            clickHandler(path) {
                this.$router.push(path);
                this.isOpen = false
            }
        },
    }; 
</script>

<template>
    <div class="container" ref="menuRef">
        <button class="menuBtn" @click="toggleMenu">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
        <div :class="`menu ${this.isOpen ? 'open' : 'close'}`">
            <button class="menuBtn closeBtn" @click="closeMenu">
                <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
            <div class="title">Menu</div>
            <div class="menuItem" @click="clickHandler('/')">
                Home
            </div>
            <div class="menuItem" @click="clickHandler('/products')">
                Products
            </div>
            <div class="menuItem" @click="clickHandler('/add_product')">
                Add new product
            </div>
            <div class="menuItem" @click="clickHandler('/order_history')">
                Orders History
            </div>
            <div class="menuItem" @click="clickHandler('/test2')">
                Some interest
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .container {
        width: 20px;
        height: 20px;
        position:absolute;
        left: 5px;
        top: 5px;

        .menuBtn {
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: 1px solid #bbbbbb;
            border-radius: 5px;

            &.closeBtn {
                margin: 5px 5px 0 0;
                align-self: flex-end;
            }

            &:hover {
                background-color: black;
                color: white;
                box-shadow: -2px 2px 10px gray;
            }

            &:active {
                box-shadow: 0 0 5px gray;
            }

        }

        .menu {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background-color: white;
            border-right: 1px solid #bbbbbb;
            box-shadow: 2px 0 10px gray;
            position: absolute;
            top: -5px;
            left: -5px;
            overflow: hidden;
            z-index: 1000;
            transition: width .2s linear;

            &.open {
                width: 270px;
            }

            &.close {
                width: 0;
                border: none;
                box-shadow: none;
            }

            .title {
                margin-bottom: 15px;
                padding: 6px 12px;
                width: 100%;
                font-size: 18px;
                font-weight: bold;
                text-align: start;
                border-bottom: 1px solid #bbbbbb;
            }

            .menuItem {
                cursor: pointer;
                padding: 10px;
                width: 100%;
                font-size: 16px;
                text-align: start;
                white-space: nowrap;

                &a {
                width: 100%;
                color: black;
                text-decoration: none;
                }

                &:hover {
                    background-color: #c0c0c0;

                }
            }
        }
    }    
</style>
