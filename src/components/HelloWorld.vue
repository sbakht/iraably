<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
import { useQuiz, useQuizStore } from '../store/quiz'

defineProps()

const store = useStore()
const q = useQuizStore();

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <!-- <button @click="store.increment">increment</button>

  {{store}}
  {{store.name}}
  {{store.double}} -->

  <div v-if="q.currentQuestion">
    <button @click="q.next">Next question</button>
    <button @click="q.reset">Reset</button>
    {{q.currentQuestion.title}}

    <div>
      <div v-for="answer in q.currentQuestion.answers">
        <button @click="q.answer(answer.id)">{{answer.title}}</button>
      </div>
    </div>
  </div>

  Answers:
  {{q.answers}}
  <div v-for="answer in q.formattedAnswers">
    {{answer.title}} : {{answer.answer.title}}
  </div>

  <div v-if="q.isDone">Points: {{q.points}}</div>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
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
