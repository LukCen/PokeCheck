<script setup lang="ts">
import { RouterView } from 'vue-router';


</script>

<template>
  <main class="flex flex-col gap-4 bg-slate-700 py-4 min-h-screen">
    <header class="mx-auto flex gap-2">
      <img src="/favicon.svg" height="40" width="40" alt="">
      <h1 class="text-orange-500 text-4xl font-bold">Pokemon Explorer</h1>
    </header>
    <Suspense>
      <RouterView />
    </Suspense>
  </main>
</template>
