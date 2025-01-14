<template>
  <form v-on:submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <input type="text" id="username" v-model="username" />
    </div>
    <div>
      <label for="password">pw: </label>
      <input type="password" id="password" v-model="password" />
    </div>
    <button type="submit" v-on:click="submitForm">로그인</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    submitForm: function () {
      console.log(this.username, this.password);
      var url = "https://jsonplaceholder.typicode.com/posts";
      var data = {
        username: this.username,
        password: this.password,
      };
      axios
        .post(url, data)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
body {
  text-align: center;
  color: #2c3e50;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

div {
  margin-bottom: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
