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
      @keydown="handleKeyDown"
    ></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const editorRef = ref(null);

const buttons = [
  { text: "텍스트 굵게", action: "bold" },
  { text: "큰 텍스트", action: "largeText" },
  { text: "더 큰 텍스트", action: "largerText" },
];

const handleKeyDown = (e) => {
  // Ctrl + B (or Cmd + B for Mac)
  if ((e.ctrlKey || e.metaKey) && e.key === "b") {
    e.preventDefault(); // 브라우저 기본 동작 방지
    applyStyle("bold");
  }
};

const applyStyle = (action) => {
  try {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (!selectedText) return;

    switch (action) {
      case "bold":
        document.execCommand("bold", false, null);
        break;
      case "largeText": {
        const span = document.createElement("span");
        span.style.fontSize = "1.25rem";
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
        // 선택 상태 유지
        selection.removeAllRanges();
        selection.addRange(range);
        break;
      }
      case "largerText": {
        const span = document.createElement("span");
        span.style.fontSize = "1.5rem";
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
        // 선택 상태 유지
        selection.removeAllRanges();
        selection.addRange(range);
        break;
      }
    }
  } catch (error) {
    console.error("Error applying style:", error);
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

.editor b,
.editor strong {
  font-weight: bold;
}
</style>
