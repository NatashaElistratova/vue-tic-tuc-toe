<template>
    <div class="field-wrap">
        <div class="column column_text-right">
            <i class="fas fa-circle fa-3x circle_custom"></i>
        </div>
        <div class="column">
            <div class="field">
                <div class="grid">
                    <div class="grid__item"
                         v-for="(item, i) in cells"
                         :key="i">
                        <i class="far fa-times fa-3x cross_custom"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="column column_text-left">
            <i class="far fa-times fa-3x cross_custom"></i>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cellsInRow: 3,
            }
        },
        computed: {
            cells() {
                return this.cellsInRow ** 2;
            }
        }
    }
</script>

<style scoped>
    .field-wrap {
        width: 100%;
        max-width: 600px;
        height: 100%;
        max-height: 400px;
        background-color: #578cb3;
        box-shadow: 0 0 30px #2e2e2e;
        display: flex;
    }

    .column {
        width: 33.3333%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        box-sizing: border-box;
    }

    .column_text-right {
        justify-content: flex-end;
    }

    .column_text-left {
        justify-content: flex-start;
    }

    .grid {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #ccc;
    }

    .grid__item {
        width: calc(33.3333% - 2px);
        height: 0;
        padding-bottom: calc(33.3333% - 2px);
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .circle_custom {
        color: pink;
        font-weight: 700;
    }
    .cross_custom {
        color: deepskyblue;
        font-weight: 700;
    }
</style>
