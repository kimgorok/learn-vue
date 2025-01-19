<script setup lang="ts">
import { ref, onMounted } from 'vue'; // Vue의 반응형 시스템과 생명주기 훅을 가져옴
import type { User } from '@/types/user';
import { userApi } from '@/services/userService/userService'; // 유저 관련 서비스 함수 import

const users = ref<User[]>([]); // 사용자 목록을 저장할 반응형 배열
const loading = ref(false);
const error = ref('');

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await userApi.getUsers();
    users.value = response.data;
  } catch (err) {
    error.value = '사용자 목록을 불러오는데 실패했습니다.';
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (id: number) => {
  if (!confirm('정말 삭제하시겠습니까?')) return; // 삭제 확인받는 창

  try {
    await userApi.deleteUser(id);
    users.value = users.value.filter((user) => user.id !== id);
  } catch (err) {
    alert('삭제에 실패했습니다.');
  }
};

// 컴포넌트가 마운트 될 때 사용자 목록 로드
onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="bg-white dark:bg-dark-bg text-black-0 dark:text-dark-text-primary">
    <p class="text-gray-0 dark:text-dark-text-secondary">유저 목록 테스트 페이지</p>
  </div>

  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">사용자 목록</h1>
    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error" class="text-red-500">
      {{ error }}
    </div>

    <div v-else class="flex flex-col gap-4">
      <div v-for="user in users" :key="user.id" class="border p-4 rounded flex justify-between items-center">
        <div>
          <h3 class="font-bold">{{ user.username }}</h3>
        </div>

        <div class="flex gap-2">
          <!-- 버튼 클릭 시 deleteUser 함수 호출 -->
          <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-4 py-2 rounded">삭제</button>
        </div>
      </div>
    </div>
  </div>
</template>
