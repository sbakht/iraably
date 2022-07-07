<script setup>
import { ref, computed, watch, unref } from "vue";
import { useStore } from "../store";
import { questions, scores } from "../store/questions";
import { useQuiz } from "../store/useQuiz";

defineProps();

const store = useStore();

const q = useQuiz(questions, scores, 'required');
</script>

<template>

  <div v-if="!q.isFinished.value">
    <h1>{{ q.currentQuestion.value.title }}</h1>

    <div>
      <div v-for="choice in q.currentQuestion.value.answers" :key="choice.id">
        <button @click="q.toggleAnswer(choice.id)">{{ choice.title }}</button>
        {{ q.questionState.value.isSelected(choice.id) }}
      </div>
    </div>


    <div v-if="q.currentQuestion.value">
      <button :disabled="!q.questionState.value.canProceed.value" @click="q.next">Next question</button>
      <button :disabled="q.isAtStart.value" @click="q.previous">Previous question</button>
    </div>

    {{q.currentIndex.value + 1}} / {{q.questions.length}}

  </div>
  <div v-else>
    Score: {{q.score().value}}
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
