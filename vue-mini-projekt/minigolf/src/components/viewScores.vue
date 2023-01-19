<template>
    <div class="scores-grid">
        <div class="score-box" v-for="score in this.scores" :key="score" @click="this.showDetails(score)">
            <h1>{{ score.name }}</h1>
            <h3>Gesamt Score: {{ score.total }}</h3>
        </div>
    </div>
    <div class="score-modal" v-if="this.selectedScore != null">
        <div class="score-details-modal-wrapper">
            <score-details @close-modal="this.closeModal()" :score="this.selectedScore"
                :score-id="this.selectedScoreId"></score-details>
        </div>
    </div>
</template>

<script>
import ScoreDetails from "./scoreDetails.vue";
export default {
    name: 'viewScores',
    components: {
        ScoreDetails
    },
    data() {
        return {
            scores: [],
            selectedScoreId: null,
            selectedScore: null
        }
    },
    methods: {
        getScores() {
            fetch("https://minigolf-f1e32-default-rtdb.europe-west1.firebasedatabase.app/scores.json").then(async (data) => {
                const scores = await data.json()
                if (scores != null) {
                    this.scores = scores;
                }
            })
        },
        showDetails(score) {
            this.selectedScore = score;
            var parsedScores = JSON.parse(JSON.stringify(this.scores));
            var parsedScoreValues = Object.values(parsedScores);
            console.log(parsedScores)
            var scoreIds = Object.keys(parsedScores);
            this.selectedScoreId = scoreIds[parsedScoreValues.findIndex(parsedScore => parsedScore.id == score.id)];
            console.log(this.selectedScoreId)
        },
        closeModal() {
            this.selectedScore = null;
            this.getScores();
        }
    },
    beforeMount() {
        this.getScores();
    }
}
</script>

<style scoped>
.score-modal {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.05);
}

.score-details-modal-wrapper {
    min-height: 50%;
    max-height: 90%;
    width: 50%;
    background: #fff;
    border-radius: 20px;
    overflow-y: scroll
}

.scores-grid {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    column-gap: 20px;
    row-gap: 20px;
}

.score-box {
    text-align: center;
    padding: 30px;
    border-radius: 20px;
    background-color: greenyellow;
}

.score-box:hover {
    cursor: pointer;
}
</style>