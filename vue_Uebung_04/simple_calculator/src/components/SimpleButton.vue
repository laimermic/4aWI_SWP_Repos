<template>
    <button> {{ this.btnText }}</button>
</template>

<script>
export default {
    props: {
        btnText: {
            type: String,
            required: false
        }
    },
    emits: ["btnClicked"],
    methods: {
        clickEvent() {
            this.$emit('btnClicked', this.btnText)
        }
    }
}
</script>

<style>
button {
    height: 80px;
    background-color: rgb(255, 157, 0);
    border: none;
}
</style>