<script setup lang="ts">
import { getData } from '@/helpers/ApiCaller';
import { useRoute } from 'vue-router';

const route = useRoute()
const api = getData()
const pokemon = await api.pokemonSingle(route.params.id as string)
console.dir(pokemon)
</script>

<template>
  <section class="pokemon-page flex flex-col items-center gap-4 text-white">
    <div class="gallery flex">
      <div v-show="typeof sprite === 'string'" v-for="sprite, key in pokemon.sprites" class="photo-box flex flex-col items-center">
        <img :src="sprite" alt="" height="200" width="200">
        <span class="capitalize text-white">{{ String(key).replace('_', ' ') }} </span>
      </div>
    </div>
    <div class="base-data grid grid-cols-4 gap-4">
      <span class="capitalize">Name: {{ pokemon.name }}</span>
      <span>ID: {{ pokemon.id }}</span>
    </div>
  </section>

</template>
