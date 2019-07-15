<template>
    <div class="field-wrap">
        <div class="row row_score">
            <div class="column">{{scoreo}}</div>
            <div class="column">score</div>
            <div class="column">{{scorex}}</div>
        </div>
        <div class="column column_text-right">
            <div class="marker circle_custom"
                 :class="{'border_white': activeMarker==='o'}">O
            </div>
        </div>
        <div class="column">
            <div class="field">
                <div class="grid">
                    <svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"
                         class="cross-line"
                         v-if="isWinner">
                          <line :x1="crossLine.x1"
                                :y1="crossLine.y1"
                                :x2="crossLine.x2"
                                :y2="crossLine.y2"
                                stroke="red" />
                    </svg>
                    <div class="grid__item"
                         :class="{'border_white': activeCell===i}"
                         v-for="(item, i) in cells"
                         :key="i"
                         @click="onClickCell(i, $event)">
                        <transition name="fade">
                            <template v-if="moves[i]">
                                <div v-if="moves[i]==='x'"
                                     class="marker cross_custom">X
                                </div>
                                <div v-else
                                     class="marker circle_custom">O
                                </div>
                            </template>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
        <div class="column column_text-left">
            <div class="marker cross_custom"
                 :class="{'border_white': activeMarker==='x'}">X
            </div>
        </div>
        <div class="row">
            <transition name="fade">
                <button v-if="startButton"
                        class="button_custom"
                        @click="onStartGame">{{buttonText}}
                </button>
            </transition>
        </div>
        <transition name="fade">
            <app-modal v-if="modal"
                       :message="message"
                       @closeModal="closeModal"></app-modal>
        </transition>
    </div>
</template>

<script>
    import AppModal from './AppModal';

    export default {
        components: {
            AppModal,
        },
        data() {
            return {
                cellsInRow: 3,
                activeMarker: '',
                moves: [],
                activeCell: null,
                isWinner: null,
                winningCombination: [],
                modal: false,
                message: '',
                startGame: false,
                restartGame: false,
                startButton: true,
                buttonText: 'start game',
                scoreo: 0,
                scorex: 0,
                crossLine: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 0
                }
            }
        },
        computed: {
            cells() {
                return this.cellsInRow ** 2;
            },
            winningCombinations() {
                return [
                    [0, 1, 2], [3, 4, 5], [6, 7, 8],
                    [0, 3, 6], [1, 4, 7], [2, 5, 8],
                    [0, 4, 8], [2, 4, 6]
                ]
            }
        },
        methods: {
            onStartGame() {
                this.moves = [];
                this.winningCombination = [];
                this.isWinner = false;
                //fill center cell by cross
                this.moves.length = this.cells;
                this.activeCell = (this.cells - 1) / 2;
                this.moves[this.activeCell] = 'x';

                this.startGame = true;
                this.activeMarker = 'o';
                this.startButton = false;
            },
            onClickCell(i) {
                if (this.startGame && !this.moves[i]) {
                    this.moves[i] = this.activeMarker;
                    this.activeCell = i;
                    this.changeMarker();
                    this.checkWinner(i, this.moves[i]);
                    this.checkEndGame();
                }
            },
            changeMarker() {
                this.activeMarker = this.activeMarker === 'o' ? this.activeMarker = 'x' : this.activeMarker = 'o';
            },
            checkEndGame() {
                if (!this.isWinner && !this.moves.includes(undefined)) {
                    this.message = 'Draw!!!';
                    this.modal = true;
                }
            },
            checkWinner(i, marker) {
                const possibleCombinations = this.winningCombinations.filter(combination => {
                    return combination.includes(i);
                });

                possibleCombinations.forEach(combination => {
                    this.isWinner = combination.every((val, i, arr) => {
                        return this.moves[val] === this.moves[arr[0]];
                    });
                    if (this.isWinner) {
                        this.winningCombination = combination;
                    }
                });

                if (this.isWinner) {
                    this.isWinner = true;
                    this.drawCrossLine();
                    this.message = `${marker} wins!`;
                    this.modal = true;
                    this.startGame = false;
                    this[`score${marker}`]++;
                    localStorage.setItem(`score${marker}`, this[`score${marker}`]);
                }
            },
            closeModal() {
                this.modal = false;
                this.buttonText = 'restart game';
                this.startButton = true;
            },
            drawCrossLine(){
                switch (this.winningCombination.toString()) {
                    case [0, 1, 2].toString(): return this.crossLine = {x1: 0, y1: 125, x2: 150, y2: 125};
                    case [3, 4, 5].toString(): return this.crossLine = {x1: 0, y1: 75, x2: 150, y2: 75};
                    case [6, 7, 8].toString(): return this.crossLine = {x1: 0, y1: 25, x2: 150, y2: 25};
                    case [0, 3, 6].toString(): return this.crossLine = {x1: 25, y1: 0, x2: 25, y2: 150};
                    case [1, 4, 7].toString(): return this.crossLine = {x1: 75, y1: 0, x2: 75, y2: 150};
                    case [2, 5, 8].toString(): return this.crossLine = {x1: 125, y1: 0, x2: 125, y2: 150};
                    case [0, 4, 8].toString(): return this.crossLine = {x1: 150, y1: 150, x2: 0, y2: 0};
                    case [2, 4, 6].toString(): return this.crossLine = {x1: 0, y1: 150, x2: 150, y2: 0};
                }
            }
        },
        created() {
            this.scorex = localStorage.getItem('scorex') || 0;
            this.scoreo = localStorage.getItem('scoreo') || 0;
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
        flex-wrap: wrap;
    }

    .column {
        width: 33.3333%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .row {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .column_text-right {
        justify-content: flex-end;
    }

    .column_text-left {
        justify-content: flex-start;
    }

    .field {
        width: 158px;
    }

    .grid {
        display: flex;
        flex-wrap: wrap;
        border: 1px solid #ccc;
        position: relative;
    }

    .grid__item {
        width: 50px;
        height: 50px;
        border: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .circle_custom,
    .cross_custom {
        font-weight: 700;
        font-size: 24px;

    }

    .circle_custom {
        color: pink;
    }

    .cross_custom {
        color: deepskyblue;
    }

    .marker {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid transparent;
    }

    .border_white {
        border-color: #fff;
        transition: border-color .5s;
    }

    .button_custom {
        padding: 10px 15px;
        border: none;
        outline: none;
        background-color: aliceblue;
        color: deepskyblue;
        font-size: 18px;
        font-weight: 700;
        text-transform: uppercase;
        cursor: pointer;
    }

    .row_score {
        color: #fff;
        text-transform: uppercase;
    }

    .cross-line {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
