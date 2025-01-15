<template>
  <div class="black-bg" v-if="모달창열렸니 == true">
    <div class="white-bg">
      <h4>상세페이지임</h4>
      <p>상세페이지 내용임</p>
      <button @click="모달창열렸니 = false">닫기</button>
    </div>
  </div>

  <div class="menu">
    <a v-for="(작명, index) in 메뉴들" :key="index">{{ 작명 }}</a>
  </div>

  <div v-for="(room, index) in 원룸들" :key="index">
    <img :src="room.image" class="room-img" />
    <h4 @click="모달창열렸니 = true" :style="{ fontWeight: 스타일 }">
      {{ room?.title }}
    </h4>
    <p>{{ room?.price }} 원</p>
    <p>{{ room?.content }}</p>
    <button @click="increase(index)">허위매물신고</button>
    <span>신고수 : {{ 신고수[index] }}</span>
  </div>
</template>

<script>
import onerooms from "./oneroom";

export default {
  name: "App",
  data() {
    return {
      원룸들: onerooms,
      모달창열렸니: false,
      신고수: [0, 0, 0, 0, 0, 0],
      메뉴들: ["Home", "Shop", "About"],
      products: ["역삼동 원룸", "천호동 원룸", "마포구 원룸"],
      스타일: "bold",
    };
  },
  methods: {
    increase(i) {
      this.신고수[i]++;
    },
  },
  components: {},
};
</script>

<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.room-img {
  width: 400px;
  margin-top: 40px;
  height: 200px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a {
  color: white;
  padding: 10px;
}
</style>
