<script setup lang="ts">
import PokemonCard from '@/components/PokemonCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { Suspense } from 'vue';

</script>

<template>
  <Suspense>
    <SearchBar />
  </Suspense>
  <Suspense>
    <PokemonCard />
  </Suspense>
</template>
