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
                sortCriteria: sortList,
                choosenCriterion: ''
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
            filterBarClass() {
                return `filterBar ${this.isOpen ? 'open' : 'close'}`
            },
        },
        methods: {
            clickOutside({ target }) {
                const element = this.$refs.filterBarRef;

                if (element && !element.contains(target)) {
                    this.isopen = false
                }
            },
            toggleBar() {
                this.isOpen = !this.isOpen;
            },
            onSort(sortBy) {
                if (this.sorted) {
                    sortFunc(this.sorted);
                } else {
                    sortFunc(this.sortingArr, sortBy);
                }
                this.choosenCriterion = sortBy;
            },
            onSubmit() {
                this.setFiltered(this.sorted)
            },
        },
    }
</script>
 
<template>
    <div class="filterBarContainer" ref="filterBarRef">
        <button class="filterBtn" @click="this.toggleBar()">
            <font-awesome-icon icon="fa-solid fa-filter" />
        </button>
        <div :class="filterBarClass">
            <div class="row">
                <button class="clearFilter">
                    <div class="text">Clear filter</div>
                </button>
                <button @click="() => this.isOpen = false" class="filterBtn close">
                    <div class="icon"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
                    <div class="text">Close bar</div>
                </button>
            </div>
            <div class="title">Filters</div>
            <div class="sortCriteria">
                <div class="subtitle">Sorting</div>
                <div 
                    class="item"
                    v-for="criteria in sortCriteria?.main"
                    :key="criteria.index"
                    @click="() => onSort(criteria)"
                >
                    <div :class="`checkbox ${criteria === choosenCriterion && 'checked'}`">
                        <font-awesome-icon
                            v-if="criteria === choosenCriterion"
                            icon="fa-solid fa-check"
                        />
                    </div>
                    {{criteria.replace(/-/g, ' ')}}
                </div>
                <div class="subtitle">Payment type</div>
                <div
                    class="item"
                    v-for="criteria in sortCriteria?.paymentType"
                    :key="criteria.index"
                    @click="() => onSort(criteria)"
                >
                    <div :class="`checkbox ${criteria === choosenCriterion && 'checked'}`">
                        <font-awesome-icon
                            v-if="criteria === choosenCriterion"
                            icon="fa-solid fa-check"
                        />
                    </div>
                    {{criteria.replace(/-/g, ' ')}}
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped lang="scss">
    $lightGrayBorder: #bbbbbb;
    $hoveredItem: rgb(243, 243, 243);
    $shadowColor: gray;
    $white: white;
    $black: black;

    .filterBarContainer {
        width: 20px;
        height: 20px;
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
            height: 100vh;
            display: flex;
            flex-direction: column;
            background-color: $white;
            border-left: 1px solid $lightGrayBorder;
            box-shadow: 3px 0 5px $shadowColor;
            transition: width .2s linear;
            overflow: hidden;
            position: fixed;
            top: 0;
            right: 0;
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
                margin-bottom: 10px;
                padding: 5px;
                display: flex;
                justify-content: space-between;
            }

            .title {
                margin-bottom: 15px;
                padding: 5px 0;
                width: 100%;
                font-size: 24px;
                font-weight: bolder;
                text-align: center;
                border-bottom: 2px solid $lightGrayBorder;
            }

            .subtitle {
                margin-bottom: 10px;
                font-size: 20px;
                font-weight: bold;
            }

            .item {
                padding: 5px 10px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: flex-start;

                &:hover {
                    background-color: $hoveredItem;
                    font-weight: bold;
                }

                .checkbox {
                    margin-right: 10px;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: $white;
                    border: 1px solid $lightGrayBorder;

                    &.checked {
                        background-color: $black;
                        color: $white;
                        text-shadow: 0 0 2px $lightGrayBorder;
                    }
                }
            }
        }
    }
</style>
