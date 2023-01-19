<template>
  <div class="insert-wrapper">
    <div class="insert-grid">
      <h3>Name:</h3>
      <input v-model="this.name" type="text" placeholder="Name">
    </div>
    <h2>Scores</h2>
    <div v-for="i in this.bahnCount" :key="i" class="insert-grid">
      <h3>Bahn {{ i }}</h3>
      <input v-model="this.insertData[i - 1]" type="number">
    </div>
    <button @click="submitScores">Submit</button>
  </div>
</template>

<script>
export default {
  name: 'insertScore',
  emits: [
    "go-back"
  ],
  data() {
    return {
      bahnCount: Number(localStorage.getItem("bahnCount")),
      insertData: [],
      name: ""
    }
  },
  methods: {
    submitScores() {
      if (this.insertData.length == this.bahnCount) {
        this.insertData.forEach(score => {
          if (score == null) {
            alert("please set all scores")
            return;
          }
        });
        if (this.name == null) {
          alert("Please set a name")
          return;
        }
        let id = new Date().toISOString();
        fetch("https://minigolf-f1e32-default-rtdb.europe-west1.firebasedatabase.app/scores.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: id,
            name: this.name,
            scores: this.insertData,
            total: this.insertData.reduce((partialSum, a) => partialSum + a, 0)
          })
        }).then(() => {
          this.insertData = [];
          this.$emit("go-back");
        })
      } else {
        alert("please set all scores")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.insert-grid {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-top: 10px;
}

.insert-grid input {
  width: 200px
}

.insert-wrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.insert-wrapper button {
  margin-top: 30px;
}

input {
  font-size: 15pt;
}

input::placeholder {
  font-size: 15pt;
}
</style>
