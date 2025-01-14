<template>
  <div class="text-area">
    <div class="button-container">
      <button
        v-for="(button, index) in buttons"
        :key="index"
        class="text-area-btn"
        @click="applyStyle(button.action)"
      >
        {{ button.text }}
      </button>
    </div>
    <div
      ref="editorRef"
      class="editor"
      contenteditable="true"
      @input="handleInput"
      @keydown="handleKeyDown"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const editorRef = ref(null);

const buttons = [
  { text: "텍스트 굵게", action: "bold" },
  { text: "텍스트 크게", action: "sizeUp" },
  { text: "텍스트 작게", action: "sizeDown" },
];

const handleKeyDown = (e) => {
  // Ctrl + B (or Cmd + B for Mac)
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault(); // 브라우저 기본 동작 방지
    applyStyle("bold");
  }
};

const applyStyle = (action) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = range.toString();

  if (selectedText) {
    switch (action) {
      case "bold":
        document.execCommand("bold", false, null);
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

.editor {
  min-height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  line-height: 1.5;
  outline: none;
}

/* 에디터 내부 스타일 */

.editor b,
.editor strong {
  font-weight: bold;
}
</style>
