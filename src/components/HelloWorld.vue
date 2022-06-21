<script setup>
import { ref } from 'vue'
import { useStore } from '../store'
import { useQuiz, useQuizStore } from '../store/quiz'
import {subsetType} from '../store/factory.js';

defineProps()

const store = useStore()
const q = useQuizStore();

const count = ref(0)

const choices = [1,2,3,4,5];
const correctAnswer = [1,2,3]

// const type = 'optional';
// const type = 'required';
const type = 'required-correct';
const sub = subsetType[type](correctAnswer, []);

sub.setSelected([1,2])
// sub.setAnswers([])
sub.setSelected([1,3, 2])

</script>

<template>


  <h1>{{ msg }}</h1>

  <div>
    Choices  
    <div v-for="choice in choices" :key="choice">
      <button @click="sub.toggle(choice)">{{choice}} - {{sub.isSelected(choice)}}</button>
    </div>
  </div>

  <div v-for="(value, key) in sub" :key="key">
    <div v-if="typeof value !== 'function'">
    {{key}} - {{value}}
    </div>
  </div>
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
