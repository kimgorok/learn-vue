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
  { text: "텍스트 h1 사이즈", action: "h1" },
  { text: "텍스트 h2 사이즈", action: "h2" },
  { text: "텍스트 h3 사이즈", action: "h3" },
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
      case "h1":
        wrap("h1");
        break;
      case "h2":
        wrap("h2");
        break;
      case "h3":
        wrap("h3");
        break;
    }
  }
};

const wrap = (tag) => {
  document.execCommand("formatBlock", false, tag);
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
.editor h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

.editor h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.83em 0;
}

.editor h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 1em 0;
}

.editor b,
.editor strong {
  font-weight: bold;
}
</style>
