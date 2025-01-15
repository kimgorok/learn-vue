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
  if (!selection.rangeCount) return;
  const range = selection.getRangeAt(0); // 선택된 범위 저장
  const selectedText = range.toString(); // 선택 범위 텍스트 내용을 문자열로 반환

  switch (action) {
    case "bold": {
      isBoldActive.value = !isBoldActive.value;

      if (isBoldActive.value) {
        // Bold On
        const strong = document.createElement("strong");

        // 선택된 텍스트가 없을 경우에도 포커스 유지
        if (!selectedText && editorRef.value) {
          strong.innerHTML = "\u200B"; // 눈에 보이지 않는 제로 너비 공백 문자를 생성하여 strong 태그 삽입
          range.insertNode(strong); // range 시작 위치에 strong 태그 삽입
          const newRange = document.createRange();
          newRange.setStart(strong.firstChild, 1); // Range의 시작점을 strong 태그 내부 첫 번째 자식(공백 문자) 뒤로 설정
          newRange.setEnd(strong.firstChild, 1); // Range의 끝점도 동일한 위치로 설정 (캐럿이 깜빡이는 위치)
          selection.removeAllRanges(); // 기존의 모든 선택 영역을 제거
          selection.addRange(newRange); // 새로 생성한 Range를 선택 영역으로 추가 (캐럿 위치 확정)
        } else {
          const fragment = range.extractContents(); // 선택된 텍스트 추출
          strong.appendChild(fragment); // 추출한 텍스트를 strong 태그에 추가
          range.insertNode(strong); // 선택된 텍스트 범위에 strong 태그 삽입
          const newRange = document.createRange();
          newRange.selectNodeContents(strong); // 새로운 Range를 strong 태그 전체 영역으로 설정
          selection.removeAllRanges(); // 기존의 모든 선택 영역을 제거
          selection.addRange(newRange); // 새로 생성한 Range를 선택 영역으로 추가 (캐럿 위치 확정)
        }
      } else {
        // 태그 닫음
        let container = range.startContainer;

        // strong 태그 찾기
        while (container && container.nodeName !== "STRONG") {
          container = container.parentNode;
        }

        if (container && container.nodeName === "STRONG") {
          // 눈에 보이지 않는 제로 너비 공백 문자를 생성하여 strong 태그 삽입
          const textNode = document.createTextNode("\u200B");
          container.parentNode.insertBefore(textNode, container.nextSibling);

          // 커서 이동
          const newRange = document.createRange();
          newRange.setStart(textNode, 1);
          newRange.setEnd(textNode, 1);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else if (!selectedText && editorRef.value) {
          // 선택된 텍스트가 없을 경우에도 포커스 유지
          const textNode = document.createTextNode("\u200B");
          range.insertNode(textNode);
          const newRange = document.createRange();
          newRange.setStart(textNode, 1);
          newRange.setEnd(textNode, 1);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
      break;
    }
    case "normalText": {
      const span = document.createElement("span"); // 새로운 span 요소 생성
      span.style.fontSize = "1rem";
      const fragment = range.extractContents(); // 선택된 범위의 내용을 추출
      span.appendChild(fragment); // 추출한 내용을 span 요소에 추가
      range.insertNode(span); // 새로운 span 요소를 선택된 범위에 삽입
      break;
    }
    case "largeText": {
      const span = document.createElement("span");
      span.style.fontSize = "1.25rem";
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      break;
    }
    case "largerText": {
      const span = document.createElement("span");
      span.style.fontSize = "1.5rem";
      const fragment = range.extractContents();
      span.appendChild(fragment);
      range.insertNode(span);
      break;
    }
  }

  if (editorRef.value) {
    editorRef.value.focus();
  }
};
</script>

<style scoped>
.text-area {
  display: flex;
  flex-direction: column;
  width: 100%;
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
  text-align: left;
}

.editor b,
.editor strong {
  font-weight: bold;
}
</style>
