<template>
  <Navbar />
  <SearchBar :data="data_temp" @searchMovie="searchMovie($event)" />
  <p><button @click="showAllMovie">전체 보기</button></p>
  <Movies
    :data="data_temp"
    @increaseLike="increaseLike($event)"
    @openModal="isModal = true"
    selectedMovie="$event"
  />

  <Modal
    :data="data"
    :isModal="isModal"
    :selectedMovie="selectedMovie"
    @closeModal="isModal = false"
  />
</template>

<script>
import data from "./assets/movies";
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
import Movies from "./components/Movies.vue";
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  data() {
    return {
      isModal: false,
      selectedMovie: 0,
      data, // 원본
      data_temp: [...data], // 사본
    };
  },
  methods: {
    increaseLike(id) {
      // this.data[index].like++;
      this.data.find((movie) => {
        if (movie.id == id) {
          movie.like += 1;
        }
      });
    },
    searchMovie(title) {
      // 영화 제목이 포함된 데이터를 가져옴
      this.data_temp = this.data.filter((movie) => {
        return movie.title.includes(title);
      });
    },
    showAllMovie() {
      this.data_temp = [...data];
    },
  },
  components: {
    Navbar: Navbar,
    Modal: Modal,
    Movies: Movies,
    SearchBar: SearchBar,
  },
  mounted() {
    console.log("마운트");
  },
};
</script>

<style>
.bg-yellow {
  background: yellow;
}

.modal {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal .inner {
  background: #fff;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
}
</style>
