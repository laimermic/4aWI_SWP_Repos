<template>
  <section>
    <button @click="LoadContacts">Load Contacts</button>
    <new-friend-vue @add-contact="addContact"></new-friend-vue>
    <header>
      <h1>Liste mit vfor</h1>
    </header>
    <ul>
      <friend-contact v-for="friend in friends" :id="friend.id" :key="friend.id" :name="friend.name"
        :phoneNumber="friend.phone" :emailAddress="friend.email" :isFavorite="friend.isFavorite"
        @toggle-favorite="toggleFavorite" @delete-friend="deleteFriend"></friend-contact>
    </ul>
  </section>
</template>

// ***************************************************************************
// Aufgaben:  1. toggleFavorite als Event in FriendContact einbauen
//            2. deleteContact in FriendContact einbauen
              3. Übung für Schüler: Eigene Komponente NewFriend.vue erstellen
// ***************************************************************************
<script>
import FriendContact from "./components/FriendContact.vue";
import NewFriendVue from "./components/NewFriend.vue";

export default {
  components: {
    FriendContact,
    NewFriendVue
  },
  data() {
    return {
      friends: [],
    };
  },

  methods: {
    toggleFavorite() {
      /*let friend = this.friends.find((friend) => friend.id === friendid)
      if (friend) {
        friend.isFavorite = !friend.isFavorite;
      }*/
    },
    deleteFriend(friendid) {
      //this.friends.splice(this.friends.findIndex(friend => friend.id == friendid), 1);
      fetch("https://vue-test-faf2a-default-rtdb.europe-west1.firebasedatabase.app/contacts/" + friendid + ".json", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.LoadContacts()
      })
    },
    addContact(name, phone, email) {
      let fakeID = new Date().toISOString();

      fetch("https://vue-test-faf2a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: fakeID,
          name: name,
          phone: phone,
          email: email
        })
      }).then((res) => {
        console.log(res);
        this.LoadContacts();
      })
      /*var newContact = {
        id: name.toLowerCase(),
        name: name,
        phone: phone,
        email: email
      }
      this.friends.push(newContact);*/
    },
    LoadContacts() {
      fetch("https://vue-test-faf2a-default-rtdb.europe-west1.firebasedatabase.app/contacts.json").then((data) => {
        return data.json();
      }).then((data) => {
        var results = [];
        for (const id in data) {
          results.push({
            id: id,
            name: data[id].name,
            phone: data[id].phone,
            email: data[id].email
          })
        }
        this.friends = results;
      })
    }
  }
};
</script>





<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  margin-left: 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li,
form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

#app input {
  font: inherit;
  padding: 0.15rem;
}

#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}

#app form div {
  margin: 1rem 0;
}

* {
  box-sizing: border-box;
}

html {
  font-family: "Jost", sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li,
form {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

#app input {
  font: inherit;
  padding: 0.15rem;
}

#app label {
  font-weight: bold;
  margin-right: 1rem;
  width: 7rem;
  display: inline-block;
}

#app form div {
  margin: 1rem 0;
}
</style>