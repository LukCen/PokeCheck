<script setup lang="ts">
import { Suspense } from 'vue';
import PokemonCard from './components/PokemonCard.vue';
import SearchBar from './components/SearchBar.vue';

</script>

<template>
  <main class="flex flex-col gap-4">
    <header class="mx-auto flex gap-2">
      <img src="/poke-ball.png" height="40" width="40" alt="">
      <h1 class="text-orange-500 text-4xl font-bold">Pokemon Explorer</h1>
    </header>
    <Suspense>
      <SearchBar />
    </Suspense>
    <Suspense>
      <PokemonCard />
    </Suspense>
  </main>
</template>

<style scoped></style>
