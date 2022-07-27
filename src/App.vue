<template>
  <Main :data="data" />
  <Main :data="{questions: pronounQuestions, scores : {}}" />
</template>

<script setup lang="ts">
import Main from "./components/MultipleChoice.vue";
import { questions, scores } from "./store/questions";
import { generateArToEn } from "./utils/pronouns";

const pronounQuestions = generateArToEn({ count: 3 });

const data = {
  questions,
  scores,
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
