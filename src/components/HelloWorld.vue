<script setup>
import { ref, computed, watch, unref } from 'vue'
import { useStore } from '../store'
import { useNavigation } from '../store/useNavigation'
import { subsetType } from '../store/factory.js';
import { questions } from '../store/questions';
import { useUserScore } from '../store/useUserScore';

defineProps()

const store = useStore()
const q = useNavigation(questions);

// const { answers, saveAnswer, clearAnswers, clearAnswer } = useUserScore(q)
// const a = useNavigation(new Array(questions.length))

const count = ref(0)


const choices = computed(() => {
  return q.currentQuestion.value.answers.map(x => x.id);
});
const type = 'optional';
// const type = 'required';
// const type = 'required-correct';


const sub = computed(() => {
  const correctAnswer = q.currentQuestion.value.correct
  return subsetType[type](correctAnswer, unref(q.currentAnswer), {
    limitChoicesLength: Infinity,
    removeLast: false,
  });
});

const next = () => {
  q.saveAnswer(sub)
  q.next();
}

const previous = () => {
  // clearAnswer(sub)
  q.previous()
}

const reset = () => {
  // clearAnswers();
  q.reset();
}


</script>

<template>


  <h1>{{ msg }}</h1>

  <div>
    Choices
    <div v-for="choice in choices" :key="choice">
      <button @click="sub.toggle(choice)">{{ choice }} - {{ sub.isSelected(choice) }}</button>
    </div>
  </div>

  <div v-for="(value, key) in sub" :key="key">
    <div v-if="typeof value !== 'function'">
      {{ key }} - {{ value }}
    </div>
  </div>

  {{ store }}
  {{ store.name }}
  {{ store.double }}

  <div v-if="q.currentQuestion.value">
    <button :disabled="!sub.canProceed.value" @click="next">Next question</button>
    <button :disabled="q.isAtStart.value" @click="previous">Previous question</button>
    <button @click="reset">Reset</button>
    {{ q.currentQuestion.value.title }}
    <div>
      Finished: {{q.isFinished}}
    </div>

    <!-- <div>
      <div v-for="answer in q.currentQuestion.value.answers">
        <button @click="q.answer(answer.id)">{{answer.title}}</button>
      </div>
    </div> -->
  </div>

  {{answers}}

  <div>
    {{q.data}}
  </div>

  <!-- <div v-if="q.answers.formattedAnswers">
  Answers:
  {{q.answers}}
  <div v-for="answer in q.formattedAnswers">
    {{answer.title}} : {{answer.answer.title}}
  </div></div>

  <div v-if="q.isDone">Points: {{q.points}}</div> -->

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
