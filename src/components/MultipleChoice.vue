<template>
  <div v-if="!q.isFinished.value">
    <div class="p-7">
      <div class="flex justify-between items-center">
        <p class="text-gray-600">Determine the answer</p>
        <!-- <div class="flex flex-col items-end">
          <p class="text-gray-600 font-bold" v-if="true">
            {{ q.currentIndex.value + 0 }}/{{ q.questions.length }}
          </p>
          <p class="text-gray-600 font-bold" v-else># {{ index }}</p>
          <p v-if="showScore" class="text-green-600">
            Correct: <span class="font-bold">{{ numRight }}</span>
          </p>
          <p v-if="showScore" class="text-red-600">
            Incorrect: <span class="font-bold">{{ numWrong }}</span>
          </p>
        </div> -->
      </div>
      <h2 class="text-3xl leading-6 font-bold text-center mt-8">
        {{ title }}
      </h2>
      <div
        class="grid grid-cols-1 gap-4 mt-12"
        :class="{ 'md:grid-cols-2': choices.length >= 4 }"
      >
        <div
          class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          :class="{ 'bg-green-400': q.questionState.value.isSelected(choice.id) }"
          v-for="(choice, i) in choices"
          :key="choice.id"
        >
          <div class="flex-shrink-1 text-gray-400">{{getHotkey(i)}}.</div>
          <div class="flex-2 min-w-0">
            <button class="focus:outline-none" @click="q.toggleAnswer(choice.id)">
              <span class="absolute inset-1" aria-hidden="true"></span>
              <p class="text-xl font-medium text-gray-900">{{ choice.title }}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <BaseButton
        :disabled="!q.questionState.value.canProceed.value"
        @click="q.next"
        class="m-5"
      >
        Next
      </BaseButton>
      <BaseButton :disabled="q.isAtStart.value" @click="q.previous">Previous</BaseButton>
    </div>
  </div>
  <div v-else>Score: {{ q.score().value }}</div>
</template>

<script setup lang="ts">
import BaseButton from "./BaseButton.vue";
import { ref, computed, watch, unref } from "vue";
import { useQuiz } from "../store/useQuiz";
import {getHotkey} from '../utils/hotkey.js'


const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});


const q = useQuiz(props.data.questions, props.data.scores, "required");

const title = computed(() => q.currentQuestion.value.title);

const choices = computed(() => q.currentQuestion.value.answers);
</script>

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
../composables/useQuiz