<script>
    import { sortList, sortFunc } from '@/helpers/filters';

    export default {
        name: 'SortDropdown',
        props: {
            arrToSort: Array,
            setSorted: Function,
        },
        data() {
            return {
                isOpen: false,
                sortCriteria: sortList,
                choosenCriterion: '',
                searchInput: '',             
            }
        },
        updated() {
            this.$nextTick(() => {
                if (this.isOpen) {
                    window.addEventListener('mousedown', this.clickOutside);
                }

                return () => window.removeEventListener('mousedown', this.clickOutside);
            });
        },
        computed: {
            chevronClass() {
                return `chevron ${!this.isOpen && 'down'}`
            },
            dropdownWrapperClass() {
                return `dropdownWrapper ${this.isOpen ? 'open' : 'close'}`
            },
            inputWrapperClass() {
                return `inputWrapper ${this.isOpen ? 'open' : 'close'}`
            },
        },
        methods: {
            clickOutside({ target }) {
                const element = this.$refs.sortDropdown;

                if (element && !element?.contains(target)) {
                    this.isOpen = false;
                }
            },
            toggleDropdown() {
                this.isOpen = !this.isOpen;
            },
            onSelect(sortBy) {
                let sorted = sortFunc(this.arrToSort, sortBy);
                this.setSorted(sorted);

                this.choosenCriterion = sortBy;

            },
        }
    }
</script>

<template>
    <div class="dropdownContainer" ref="sortDropdown">
        <div :class="inputWrapperClass">
            <input
                class="dropdown"
                placeholder="Sort By"
                @click="!this.isOpen && (() => this.isOpen = true)"
                v-if="!this.isOpen"
                :value="this.choosenCriterion.replace(/-/g, ' ') || ''"
                readonly
            />
            <input
                class="dropdown"
                :placeholder="choosenCriterion.replace(/-/g, ' ') || 'Sort By'"
                v-if="this.isOpen"
                v-model="this.searchInput"
            />
            <div :class="chevronClass" @click="() => this.toggleDropdown()">
                <font-awesome-icon icon="fa-solid fa-chevron-up" />
            </div>
        </div>
        <div :class="dropdownWrapperClass">
            <div 
                class="item"
                v-for="(item, index) in sortCriteria.orderHistory" 
                :key="index"
                @click="() => onSelect(item)"
            >
                {{item && item.replace(/-/g, ' ')}}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '../assets/styles/mixins/MediaMixins.module.scss' as media;
    @use '../assets/styles/mixins/ScrollbarMixin.module.scss' as *;

    $lightGrayBorder: #bbbbbb;
    $hoverBackground: rgb(224, 224, 224);
    $shadow: gray;
    $white: white;

    .dropdownContainer {
        margin-bottom: 20px;
        width: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .inputWrapper {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: $white;
            border: 1px solid $lightGrayBorder;
            border-radius: 5px;

            &.open {
                border-radius: 5px 5px 0 0;
            }

            .dropdown {
                padding: 6px 12px;
                width: 120px;
                border: none;

                &:focus {
                    outline: none;
                }
            }

            .chevron {
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: rotate .2s linear;

                &.down {
                    rotate: 180deg;
                }
            }
        }

        .dropdownWrapper {
            width: 100%;
            background: $white;
            border: 1px solid $lightGrayBorder;
            border-top: none;
            border-radius: 0 0 5px 5px;
            transition: height .2s linear;
            position: absolute;
            top: 100%;
            overflow-y: scroll;
            overflow-x: hidden;

            &.open {
                height: 150px;
                box-shadow: 0 2px 5px $shadow;
            }

            &.close {
                height: 0;
                border: none;
                box-shadow: none;
                overflow: hidden;
            }

            .item {
                padding: 15px 5px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;

                &:hover {
                    background-color: $hoverBackground;
                }
            }
        }
    }
</style>
