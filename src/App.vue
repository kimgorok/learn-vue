<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">프로젝트 일정표</h1>

    <!-- 컨트롤 버튼들 -->
    <div class="mb-4 space-x-2">
      <button
        @click="showItemForm = true"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        작업 추가
      </button>
      <button
        @click="showGroupForm = true"
        class="bg-green-500 text-white px-4 py-2 rounded"
      >
        그룹 추가
      </button>
    </div>

    <!-- 타임라인 -->
    <div
      ref="timeline"
      class="w-full h-[600px] border border-gray-200 rounded-lg mb-4"
    ></div>

    <!-- 작업 추가/수정 모달 -->
    <div
      v-if="showItemForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ editingItem ? "작업 수정" : "새 작업 추가" }}
        </h2>
        <form @submit.prevent="saveItem" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">작업명</label>
            <input
              v-model="itemForm.content"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">시작일</label>
            <input
              type="date"
              v-model="itemForm.start"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">종료일</label>
            <input
              type="date"
              v-model="itemForm.end"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">그룹</label>
            <select
              v-model="itemForm.group"
              class="w-full border rounded px-3 py-2"
              required
            >
              <option v-for="group in groups" :key="group.id" :value="group.id">
                {{ group.content }}
              </option>
            </select>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showItemForm = false"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              취소
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded"
            >
              저장
            </button>
            <button
              v-if="editingItem"
              type="button"
              @click="deleteItem"
              class="bg-red-500 text-white px-4 py-2 rounded"
            >
              삭제
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 그룹 추가/수정 모달 -->
    <div
      v-if="showGroupForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ editingGroup ? "그룹 수정" : "새 그룹 추가" }}
        </h2>
        <form @submit.prevent="saveGroup" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">그룹명</label>
            <input
              v-model="groupForm.content"
              class="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showGroupForm = false"
              class="bg-gray-500 text-white px-4 py-2 rounded"
            >
              취소
            </button>
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              저장
            </button>
            <button
              v-if="editingGroup"
              type="button"
              @click="deleteGroup"
              class="bg-red-500 text-white px-4 py-2 rounded"
            >
              삭제
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";

const timeline = ref(null);
const timelineInstance = ref(null);
const showItemForm = ref(false);
const showGroupForm = ref(false);
const editingItem = ref(null);
const editingGroup = ref(null);

const itemForm = reactive({
  content: "",
  start: "",
  end: "",
  group: null,
});

const groupForm = reactive({
  content: "",
});

const items = ref([
  {
    id: 1,
    content: "프로젝트 기획",
    start: "2025-01-15",
    end: "2025-01-20",
    group: 1,
    className: "bg-blue-100",
  },
  {
    id: 2,
    content: "요구사항 분석",
    start: "2025-01-18",
    end: "2025-01-25",
    group: 1,
  },
  {
    id: 3,
    content: "UI/UX 디자인",
    start: "2025-01-20",
    end: "2025-02-10",
    group: 2,
  },
  {
    id: 4,
    content: "프로토타입 개발",
    start: "2025-01-25",
    end: "2025-02-15",
    group: 3,
  },
  {
    id: 5,
    content: "프론트엔드 개발",
    start: "2025-02-01",
    end: "2025-03-15",
    group: 3,
  },
  {
    id: 6,
    content: "백엔드 개발",
    start: "2025-02-01",
    end: "2025-03-20",
    group: 4,
  },
  {
    id: 7,
    content: "데이터베이스 설계",
    start: "2025-01-25",
    end: "2025-02-15",
    group: 4,
  },
  {
    id: 8,
    content: "API 개발",
    start: "2025-02-10",
    end: "2025-03-10",
    group: 4,
  },
  {
    id: 9,
    content: "단위 테스트",
    start: "2025-02-15",
    end: "2025-03-25",
    group: 5,
  },
  {
    id: 10,
    content: "통합 테스트",
    start: "2025-03-01",
    end: "2025-04-01",
    group: 5,
  },
  {
    id: 11,
    content: "성능 최적화",
    start: "2025-03-15",
    end: "2025-04-05",
    group: 3,
  },
  {
    id: 12,
    content: "보안 검토",
    start: "2025-03-20",
    end: "2025-04-10",
    group: 6,
  },
  {
    id: 13,
    content: "사용자 매뉴얼 작성",
    start: "2025-03-25",
    end: "2025-04-15",
    group: 7,
  },
  {
    id: 14,
    content: "베타 테스트",
    start: "2025-04-01",
    end: "2025-04-20",
    group: 5,
  },
  {
    id: 15,
    content: "최종 배포",
    start: "2025-04-20",
    end: "2025-04-25",
    group: 1,
  },
]);

const groups = ref([
  { id: 1, content: "기획" },
  { id: 2, content: "디자인" },
  { id: 3, content: "프론트엔드" },
  { id: 4, content: "백엔드" },
  { id: 5, content: "QA" },
  { id: 6, content: "보안" },
  { id: 7, content: "문서" },
]);

// 작업 저장
const saveItem = () => {
  if (editingItem.value) {
    // 기존 항목 수정
    const index = items.value.findIndex(
      (item) => item.id === editingItem.value.id
    );
    items.value[index] = {
      ...editingItem.value,
      ...itemForm,
    };
  } else {
    // 새 항목 추가
    const newId = Math.max(...items.value.map((item) => item.id)) + 1;
    items.value.push({
      id: newId,
      ...itemForm,
    });
  }

  updateTimeline();
  resetItemForm();
};

// 작업 삭제
const deleteItem = () => {
  if (editingItem.value) {
    items.value = items.value.filter(
      (item) => item.id !== editingItem.value.id
    );
    updateTimeline();
    resetItemForm();
  }
};

// 그룹 저장
const saveGroup = () => {
  if (editingGroup.value) {
    // 기존 그룹 수정
    const index = groups.value.findIndex(
      (group) => group.id === editingGroup.value.id
    );
    groups.value[index] = {
      ...editingGroup.value,
      ...groupForm,
    };
  } else {
    // 새 그룹 추가
    const newId = Math.max(...groups.value.map((group) => group.id)) + 1;
    groups.value.push({
      id: newId,
      ...groupForm,
    });
  }

  updateTimeline();
  resetGroupForm();
};

// 그룹 삭제
const deleteGroup = () => {
  if (editingGroup.value) {
    // 해당 그룹의 작업들도 함께 삭제
    items.value = items.value.filter(
      (item) => item.group !== editingGroup.value.id
    );
    groups.value = groups.value.filter(
      (group) => group.id !== editingGroup.value.id
    );
    updateTimeline();
    resetGroupForm();
  }
};

// 폼 초기화
const resetItemForm = () => {
  itemForm.content = "";
  itemForm.start = "";
  itemForm.end = "";
  itemForm.group = null;
  editingItem.value = null;
  showItemForm.value = false;
};

const resetGroupForm = () => {
  groupForm.content = "";
  editingGroup.value = null;
  showGroupForm.value = false;
};

// 타임라인 업데이트
const updateTimeline = () => {
  if (timelineInstance.value) {
    timelineInstance.value.setItems(items.value);
    timelineInstance.value.setGroups(groups.value);
  }
};

onMounted(() => {
  const options = {
    editable: {
      add: true,
      updateTime: true,
      updateGroup: true,
      remove: true,
    },
    horizontalScroll: true,
    zoomable: true,
    stack: true,
    start: "2025-01-01",
    end: "2025-05-01",
    orientation: "top",
    timeAxis: { scale: "day", step: 1 },
    margin: {
      item: {
        horizontal: 10,
        vertical: 5,
      },
    },
    groupOrder: "id",
  };

  // 타임라인 초기화
  timelineInstance.value = new Timeline(
    timeline.value,
    items.value,
    groups.value,
    options
  );

  // 항목 선택 이벤트
  timelineInstance.value.on("select", (properties) => {
    if (properties.items.length) {
      const selectedItem = items.value.find(
        (item) => item.id === properties.items[0]
      );
      if (selectedItem) {
        editingItem.value = selectedItem;
        Object.assign(itemForm, selectedItem);
        showItemForm.value = true;
      }
    }
  });

  // 항목 이동 이벤트
  timelineInstance.value.on("move", (item, callback) => {
    const index = items.value.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      items.value[index] = {
        ...items.value[index],
        start: item.start,
        end: item.end,
        group: item.group,
      };
    }
    callback(item);
  });
});
</script>

<style scoped>
:deep(.vis-item) {
  border-color: #4f46e5;
  background-color: #e0e7ff;
  color: #1e1b4b;
}

:deep(.vis-item.vis-selected) {
  background-color: #818cf8;
  border-color: #4338ca;
  color: white;
}

:deep(.vis-time-axis .vis-text) {
  color: #4b5563;
}

:deep(.vis-group-label) {
  background-color: #f3f4f6;
  padding: 4px;
  font-weight: bold;
}
</style>
