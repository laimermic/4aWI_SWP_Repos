<template>
    <div class="calc-flex">
        <h1>Simple Calculator</h1>
        <input ref="calcInput" class="input" v-model="this.calcText">
        <div class="btns">
            <simple-button @btnClicked="addOperation" :btnText="'+'"></simple-button>
            <simple-button @btnClicked="addOperation" :btnText="'-'"></simple-button>
            <simple-button @btnClicked="addOperation" :btnText="'*'"></simple-button>
            <simple-button @btnClicked="addOperation" :btnText="'/'"></simple-button>
            <button class="calculateButton" @click="performOperation">=</button>
        </div>
    </div>
</template>

<script>
import SimpleButton from './SimpleButton.vue';
export default {
    data() {
        return {
            calcText: ""
        }
    },
    components: { SimpleButton },
    methods: {
        addOperation(operationType) {
            console.log(operationType)
            this.calcText = this.calcText + " " + operationType + " ";
            console.log(this.calcText)
            this.$refs.calcInput.focus();
        },
        performOperation() {
            try {
                this.calcText = eval(this.calcText);
            } catch (error) {
                alert("Ungültiger Rechenstring")
            }
            this.$refs.calcInput.focus();
        }
    }
}
</script>

<style>
body {
    background-color: rgb(251, 255, 126);
    text-align: center;
}

.input {
    height: 50px;
    width: 90%;
}

.calc-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.btns {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    width: 90%;
    column-gap: 10px;
    row-gap: 10px;
    margin-top: 20px;
}

button {
    font-size: 3em;
}

button:hover {
    cursor: pointer;
}

.calculateButton {
    grid-column-start: 1;
    grid-column-end: 5;
    height: 80px;
    background-color: rgb(255, 157, 0);
    border: none;
}
</style>