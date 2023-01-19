<template>
    <div class="bahnWrapper">
        <input v-model="this.bahnCount" type="number">
        <button @click="this.setBahnCount">Submit</button>
    </div>
</template>

<script>
export default {
    name: "SetBahnCount",
    emits: [
        "go-back"
    ],
    data() {
        return {
            bahnCount: localStorage.getItem("bahnCount") ?? 0
        }
    },
    methods: {
        setBahnCount() {
            localStorage.setItem("bahnCount", this.bahnCount);
            this.$emit("go-back");
        }
    }
}
</script>

<style scoped>
.bahnWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.bahnWrapper input {
    height: 40px;
    width: 200px;
    font-size: 16pt;
}

.bahnWrapper button {
    margin-top: 10px;
    border: none;
    background: greenyellow;
    width: 200px;
    height: 60px;
    font-size: 18pt;
}

.bahnWrapper button:hover {
    cursor: pointer;
}
</style>