<template>
  <div class="text-area">
    <div class="button-container">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        class="text-area-btn"
        :class="{ active: button.action === 'bold' && isBoldActive }"
        @mousedown.prevent="applyStyle(button.action)"
      >
        {{ button.text }}
      </button>
    </div>
    <div
      ref="editorRef"
      class="editor"
      contenteditable="true"
      @keydown="handleKeyDown"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const editorRef = ref(null);
const isBoldActive = ref(false);

const buttons = [
  { text: "텍스트 굵게", action: "bold" },
  { text: "기본 텍스트", action: "normalText" },
  { text: "큰 텍스트", action: "largeText" },
  { text: "더 큰 텍스트", action: "largerText" },
];

const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault();
    applyStyle("bold");
  }
};

const applyStyle = (action) => {
  const selection = window.getSelection(); // 사용자가 현재 선택한 텍스트 범위
  // if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0); // 선택된 범위 저장
  const selectedText = range.toString(); // 선택 범위 텍스트 내용을 문자열로 반환

  switch (action) {
    case "bold":
      isBoldActive.value = !isBoldActive.value;
      document.execCommand("bold", false, null);

      // 선택된 텍스트가 없을 경우에도 포커스 유지
      if (!selectedText && editorRef.value) {
        editorRef.value.focus();
      }
      break;
    case "normalText": {
      // if (!selectedText) return;
      const span = document.createElement("span"); // 새로운 span 요소 생성
      span.style.fontSize = "1rem";
      const fragment = range.extractContents(); // 선택된 범위의 내용을 추출
      span.appendChild(fragment); // 추출한 내용을 span 요소에 추가
      range.insertNode(span); // 새로운 span 요소를 선택된 범위에 삽입
      // selection.removeAllRanges(); // 선택 범위 초기화
      // selection.addRange(range); // 새로운 선택 범위 설정
      break;
    }
    case "largeText": {
      // if (!selectedText) return;
      const span = document.createElement("span");
      span.style.fontSize = "1.25rem";
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      // selection.removeAllRanges();
      // selection.addRange(range);
      break;
    }
    case "largerText": {
      // if (!selectedText) return;
      const span = document.createElement("span");
      span.style.fontSize = "1.5rem";
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      // selection.removeAllRanges();
      // selection.addRange(range);
      break;
    }
  }
};
</script>

<style scoped>
.text-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.text-area-btn {
  margin: 40px 0px 20px 40px;
  background-color: white;
  width: fit-content;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.text-area-btn:hover {
  background-color: #f5f5f5;
}

.text-area-btn.active {
  background-color: #eebbbb;
  border-color: #ffaaaa;
}

.editor {
  min-height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  line-height: 1.5;
  outline: none;
}

.editor b,
.editor strong {
  font-weight: bold;
}
</style>
