<template>
    <div class="score-details-wrapper">
        <div @click="this.$emit('close-modal')" class="score-details-close"></div>
        <h1>{{ score.name }}</h1>
        <div class="scores-grid" v-for="i in this.bahnCount" :key="i">
            <h3>Bahn {{ i }}</h3>
            <input v-bind:value="this.score.scores[i - 1]" type="number" disabled>
        </div>
        <button class="deleteBtn" @click="this.deleteScore()">Delete</button>
    </div>
</template>

<script>
export default {
    name: "scoreDetails",
    props: {
        score: {
            type: Object,
            required: true
        },
        scoreId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            bahnCount: Number(localStorage.getItem("bahnCount"))
        }
    },
    emits: [
        'close-modal'
    ],
    methods: {
        deleteScore() {
            fetch("https://minigolf-f1e32-default-rtdb.europe-west1.firebasedatabase.app/scores/" + this.scoreId + ".json", {
                method: "DELETE"
            }).then(() => {
                this.$emit('close-modal');
            })
        }
    }
}
</script>

<style scoped>
.score-details-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    overflow-y: scroll;
}

.scores-grid {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-top: 10px;
}

.score-details-close:after {
    display: inline-block;
    content: "\00d7";
}

.score-details-close {
    width: 10px;
    align-self: flex-end;
}

.score-details-close:hover {
    cursor: pointer;
}

.deleteBtn {
    margin-top: 10px;
}
</style>