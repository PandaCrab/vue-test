<script>
    import { ref } from 'vue';

    export default {
        name: 'CategoriesDropdown',
        props: {
            selected: Function,
            invalidCategory: String,            
        },
        setup() {
            const searchInput = ref();
            const focusInput = () => searchInput.value.focus();

            return { searchInput, focusInput }
        },
        data() {
            return {
                isOpen: {
                    categories: false,
                    subcategories: false
                },
                selectedItem: {
                    category: '',
                    subcategory: ''
                },
                search: '',
                categories: ['devices', 'clothes', 'room'],
                subcategories: {
                    devices: [
                        'mobile',
                        'smart watches',
                        'TV',
                        'smartphone'
                    ]
                }, 
            }
        },
        watch: {
            search: 'onSearch'
        },
        updated() {
            this.$nextTick(() => {
                if (this.isOpen.categories || this.isOpen.subcategories) {
                    document.addEventListener('mousedown', this.clickOutside);
                }

                return () => document.removeEventListener('mousedown', this.clickOutside);
            });
        },
        methods: {
            clickOutside({ target }) {
                const el = this.$refs.dropdownRef;

                if (!el?.contains(target)) {
                    this.isOpen = {
                        categories: false,
                        subcategories: false
                    }
                }
            },
            onSelect(item) {
                const { category, subcategory } = item

                if (subcategory) {
                    this.selected({
                        category: this.selectedItem.category,
                        subcategory
                    });
                    this.selectedItem = {
                        ...this.selectedItem,
                        subcategory
                    }
                }

                if (!subcategory) {
                    this.selected(category)
                    this.selectedItem = {
                        subcategory: '',
                        category
                    }
                }
                this.isOpen = false;
            },
            toggleDropdown(dropdown) {
                if (dropdown === 'categories') {
                    this.isOpen = {
                        categories: !this.isOpen.categories,
                        subcategories: false,
                    }
                }

                if (dropdown === 'subcategories') {
                    this.isOpen = {
                        categories: false,
                        subcategories: !this.isOpen.subcategories
                    }
                }

                if (this.isOpen.categories || this.isOpen.subcategories) {
                    this.$nextTick(() => {
                        this.focusInput();
                    });
                }
            },
            onSearch() {
                if (this.search) {
                    return this.categories.filter(el => el === this.search);
                }

                return this.categories;
            }
        }
    }
</script>

<template>
    <div class="dropdownWrapper" ref="dropdownRef">
        <div class="category">
            <div :class="`dropdown ${this.invalidCategory && 'error'}`">
                <input
                    name="searchInput"
                    ref="searchInput"
                    :class="`dropdownText ${this.invalidCategory && 'error'}`"
                    :value="this.search"
                    @change="({ target }) => this.search = target.value"
                    autofocuse
                    :placeholder="'Category' ?? this.selectedItem.category"
                    v-if="this.isOpen.categories"
                />
                <input
                    readonly
                    :class="`dropdownText ${this.invalidCategory && 'error'}`"
                    :value="this.selectedItem.category"
                    :placeholder="'Category' ?? this.selectedItem.category"
                    @click="() => toggleDropdown('categories')"
                    v-else-if="!this.isOpen.categories"
                />
                <font-awesome-icon 
                    icon="fa-solid fa-chevron-up"
                    :class="`chevron ${this.isOpen.categories ? 'up' : 'down'}`"
                    @click="() => toggleDropdown('categories')"
                />
                <error-tooltip v-if="this.invalidCategory" :message="this.invalidCategory" />
            </div>
            <div 
                :class="`itemWrapper ${this.isOpen.categories ? 'open' : 'close'}`"
            >
                <div 
                    class="dropdownItem" 
                    @click="onSelect({category: item})"
                    v-for="item in this.categories"
                    :key="item"
                >
                    {{item}}
                </div>
            </div>
        </div>
        <div class="subcategory" v-show="this.selectedItem.category">
            <div class="dropdown">
                <input
                    name="searchInput"
                    class="dropdownText"
                    ref="searchInput"
                    :value="this.search"
                    @change="({ target }) => this.search = target.value"
                    autofocuse
                    :placeholder="this.selectedItem.subcategory ?? 'Subcategory'"
                    v-if="this.isOpen.subcategories"
                />
                <input
                    readonly
                    class="dropdownText"
                    :value="this.selectedItem.subcategory"
                    :placeholder="'Subcategory' ?? this.selectedItem.subcategory"
                    @click="() => toggleDropdown('subcategories')"
                    v-else-if="!this.isOpen.subcategories"
                />
                <font-awesome-icon 
                    icon="fa-solid fa-chevron-up"
                    :class="`chevron ${this.isOpen.subcategories ? 'up' : 'down'}`"
                    @click="() => toggleDropdown('subcategories')"
                />
            </div>
            <div 
                :class="`itemWrapper ${this.isOpen.subcategories ? 'open' : 'close'}`" 
            >
                <div 
                    class="dropdownItem" 
                    @click="onSelect({subcategory: item})"
                    v-for="item in this.subcategories[selectedItem.category]"
                    :key="item"
                >
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '../assets/styles/mixins/ScrollbarMixin.module.scss' as *;

    $lightGrayBorder: #bbbbbb;
    $errorBorder: red;
    $itemBackground: #fafafa;
    $shadowColor: gray;
    $white: white;
    $red: red;

    .dropdownWrapper {
        width: 100%;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
        position: relative;

        .category,
        .subcategory {
            margin: 0;
            margin-bottom: 15px;
            width: 100%;
            position: relative;

            .dropdown {
                padding-right: 3px;
                width: 100%;
                display: flex;
                align-items: center;
                border: 1px solid $lightGrayBorder;
                border-radius: 5px;
                position: relative;

                &.error {
                    border-color: $errorBorder;
                }

                .dropdownText {
                    padding: 6px 12px;
                    width: 80%;
                    font-size: 14px;
                    border: none;
                    border-radius: 5px;

                    &:focus {
                        outline: none;
                    }

                    &.error {
                        &::placeholder {
                            color: $red;
                            opacity: .7;
                        }
                    }
                }

                .chevron {
                    width: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    transition: rotate .2s linear;

                    &.up {
                        rotate: 0deg;
                    }

                    &.down {
                        rotate: 180deg;
                    }
                }
            }

            .itemWrapper {
                width: 100%;
                flex-direction: column;
                align-items: center;
                background-color: $white;
                border: 1px solid $lightGrayBorder;
                border-radius: 0 0 5px 5px;
                box-shadow: 0 4px 10px $shadowColor;
                overflow-x: hidden;
                overflow-y: scroll;
                position: absolute;
                top: 100%;
                z-index: 100;

                &.open {
                    animation: dropdown-open .2s linear forwards;
                }

                &.close {
                    animation: dropdown-close .1s linear forwards;
                }

                @keyframes dropdown-open {
                    0% { height: 0; }
                    100% { height: 250px; }
                }

                @keyframes dropdown-close {
                    0% { height: 250px; }
                    100% {
                        height: 0;
                        border: none;
                        box-shadow: none;
                        overflow: hidden;
                    }
                }

                @include scrollbars(1px, none, $lightGrayBorder);

                .dropdownItem {
                    padding: 10px;
                    width: 100%;
                    display: flex;
                    align-items: center;

                    &:hover {
                        background-color: $itemBackground;
                    }
                }
            }
        }
    }
</style>
