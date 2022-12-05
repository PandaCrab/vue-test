<script>
    import { sortList, sortFunc } from '@/helpers/filters';

    export default {
        name: 'FilterBar',
        props: {
            setFiltered: Function,
            sortingArr: Array,
            orders: Boolean,
            products: Boolean,
        },
        data() {
            return {
                sorted: [],
                isOpen: false,
            }
        },
        computed: {
            sortList,
            filterBarClass() {
                return `filterBar ${this.isOpen ? 'open' : 'close'}`
            }
        },
        methods: {
            toggleBar() {
                this.isOpen = !this.isOpen;
            },
            onSort(sortBy) {
                if (this.sorted) {
                    sortFunc(this.sorted);
                } else {
                    sortFunc(this.sortingArr, sortBy);
                }
            },
            onSubmit() {
                this.setFiltered(this.sorted)
            }
        },
    }
</script>

<template>
    <div class="filterBarContainer">
        <button class="filterBtn" @click="this.toggleBar()">
            <font-awesome-icon icon="fa-solid fa-filter" />
        </button>
        <div v-show="this.isOpen" :class="filterBarClass">
            <div class="row">
                <button class="filterBtn close">
                    <div class="icon"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
                    <div class="text">Close bar</div>
                </button>
                <button class="clearFilter">
                    <div class="text">Cler filter</div>
                </button>
            </div>
            <div class="title">Filters</div>
            <div class="sortCriteria">
                <h5>Sorting</h5>
                <div 
                    class="item"
                    v-for="criteria in sortList?.main"
                    :key="criteria.index"
                    @click="() => onSort(criteria)"
                >
                    {{criteria.reduce('-', ' ')}}
                </div>
                <h5>Payment type</h5>
                <div
                    class="item"
                    v-for="criteria in sortList?.paymentType"
                    :key="criteria.index"
                    @click="() => onSort(criteria)"
                >
                    {{criteria.reduce('-', ' ')}}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;
    $shadowColor: gray;
    $white: white;
    $black: black;
    .filterBarContainer {
        width: 250px;
        height: 100vh;
        position: absolute;
        top: 0;
        right: 0;

        .filterBtn {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: 1px solid $lightGrayBorder;
            border-radius: 5px;
            position: absolute;
            top: 5px;
            right: 5px;

            &:hover {
                background-color: $black;
                color: $white;
            }

            &.close {
                width: 20px;
                height: 20px;
                position: static;
                transition: width .2s linear;

                .icon {
                    display: flex;
                }

                .text {
                    display: none;
                }

                &:hover {
                    width: 100px;

                    .icon {
                        display: none;
                    }

                    .text {
                        display: flex;
                    }
                }
            }

        }

        .clearFilter {
            padding: 6px 12px;
            width: 100px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: 1px solid $lightGrayBorder;
            border-radius: 5px;

            &:hover {
                background-color: $black;
                color: $white;
            }
        }

        .filterBar {
            padding: 10px;
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: $white;
            border-left: 1px solid $lightGrayBorder;
            box-shadow: 3px 0 5px $shadowColor;
            z-index: 1000;

            &.open {
                width: 250px;
            }
            
            &.close {
                width: 0;
                border: none;
                box-shadow: none;
            }

            .row {
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
