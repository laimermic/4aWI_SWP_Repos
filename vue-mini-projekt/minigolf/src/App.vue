<template>
  <header>
    <button v-if="this.currentView != 'home'" @click="goBack">Back</button>
    <h1>Moin moin liebe Sportsfreunde</h1>
    <h3>Herzlich Willkommen zu Laimers Minigolf im Golfmini</h3>
  </header>
  <div v-if="this.currentView === 'home'" class="buttons-flex">
    <button @click="goToBahnen">Anzahl der Bahnen festlegen</button>
    <button :disabled="!this.allowedViews.includes('insert')"
      :class="{ 'disabled-btn': !this.allowedViews.includes('insert') }" @click="goToInsert">Scores eingeben</button>
    <button :disabled="!this.allowedViews.includes('scores')"
      :class="{ 'disabled-btn': !this.allowedViews.includes('scores') }" @click="goToScores">Scores anzeigen</button>
  </div>
  <set-bahn-count @go-back="this.goBack" v-if="this.currentView === 'bahnen'"></set-bahn-count>
  <insert-score @go-back="this.goBack" v-if="this.currentView === 'insert'"></insert-score>
  <view-score v-if="this.currentView === 'scores'"></view-score>
  <h3 v-if="!this.allowedViews.includes('insert')">Bitte anzahl der Bahnen setzen</h3>
</template>

<script>
import insertScore from './components/insertScore.vue';
import SetBahnCount from './components/SetBahnCount.vue';
import viewScore from './components/viewScores.vue'
export default {
  name: 'App',
  components: {
    insertScore,
    SetBahnCount,
    viewScore
  },
  data() {
    return {
      currentView: "home",
      allowedViews: ["home", "bahnen"]
    }
  },
  methods: {
    goBack() {
      this.currentView = "home";
      if (localStorage.getItem("bahnCount") != null) {
        this.allowedViews.push("insert")
        fetch("https://minigolf-f1e32-default-rtdb.europe-west1.firebasedatabase.app/scores.json").then(async (data) => {
          const scores = await data.json()
          if (scores != null) {
            this.allowedViews.push("scores")
          }
        })
      }
    },
    goToBahnen() {
      this.currentView = "bahnen";
    },
    goToInsert() {
      this.currentView = "insert"
    },
    goToScores() {
      this.currentView = "scores"
    }
  },
  beforeMount() {
    if (localStorage.getItem("bahnCount") != null) {
      this.allowedViews.push("insert")
      fetch("https://minigolf-f1e32-default-rtdb.europe-west1.firebasedatabase.app/scores.json").then(async (data) => {
        const scores = await data.json()
        if (scores != null) {
          this.allowedViews.push("scores")
        }
      })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap');

body {
  font-family: 'Quicksand', sans-serif;
}

.buttons-flex {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  border: none;
  font-family: 'Quicksand', sans-serif;
  background: greenyellow;
  width: 200px;
  min-height: 60px;
  max-height: 120px;
  font-size: 18pt;
}

.disabled-btn {
  background: rgb(181, 181, 181);
}

button:hover {
  cursor: pointer;
}

header {
  text-align: center;
}

h3 {
  text-align: center;
}
</style>
