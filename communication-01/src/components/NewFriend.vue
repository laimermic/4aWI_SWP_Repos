<template>
    <form @submit.prevent="submitData">
        <div>
            <label for="name">Name</label>
            <input v-model="this.name" type="text" name="name">
        </div>
        <div>
            <label for="phone">Phone</label>
            <input v-model="this.phone" type="text" name="phone">
        </div>
        <div>
            <label for="email">E-Mail</label>
            <input v-model="this.email" type="text" name="email">
        </div>
        <div>
            <button @click="addContact">Add Contact</button>
        </div>
    </form>
</template>

<script>
export default {
    emits: [
        'add-contact'
    ],
    data() {
        return {
            name: "",
            phone: "",
            email: ""
        }
    },
    methods: {
        addContact() {
            this.$emit('add-contact', this.name, this.phone, this.email);
        }
    }
}
</script>

<style>

</style>