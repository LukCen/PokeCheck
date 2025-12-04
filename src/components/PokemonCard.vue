<script setup lang="ts">
import { typeColors } from '@/helpers/AdditionalData';
import { getData } from '@/helpers/ApiCaller';
import { usePokemonStore } from '@/stores/store';
import { ref, TransitionGroup } from 'vue';

// how many pokemon are to appear per fetch
const numberToFetch = 24
const store = usePokemonStore()

// data pulled from API goes in here
const pokeData = ref<any[]>([])


const api = getData()

async function fetchMore() {
  const newPokemon = await api.pokemonMultiple(store.count, numberToFetch)
  if (newPokemon) {
    pokeData.value.push(...newPokemon)
    store.updatePokemonList(numberToFetch)
  }
}

// initial fetch to populate the screen
fetchMore()
</script>
<template>

  <TransitionGroup class="grid grid-cols-4 gap-4 p-4" name="pokemon-list" tag="section">
    <div v-show="store.pokemonTypesToShow.length === 0 || store.pokemonTypesToShow.includes(poke.types[0]?.type.name || poke.types[1]?.type.name)" :key="poke" v-for="poke in pokeData" :style="{
      background: poke.types.length === 1 ? typeColors[poke.types[0].type.name] : `linear-gradient(to right, ${poke.types.map((t: any) => typeColors[t.type.name]).join(', ')})`
    }" class="pokemon-card flex flex-col items-center text-white rounded py-4">
      <img :src="poke.sprites.front_default" alt="">
      <p class="capitalize text-3xl">{{ poke.name }}</p>
      <p class="text-xl">#{{ poke.id }}</p>
      <div class="types flex gap-2">

        <div :data-type="type.type.name" v-for="type in poke.types" class="type-pill bg-[rgba(255,255,255,0.3)] px-2 py-1 capitalize rounded-xl text-xl">
          {{ type.type.name }}
        </div>
      </div>
    </div>
  </TransitionGroup>

  <button @click="fetchMore" class="px-4 py-2 w-fit mx-auto bg-green-600 text-white font-black tracking-widest cursor-pointer">FETCH MORE</button>
</template>
<style scoped>
/* border around text for better visibility, no matter the background color */
button, .pokemon-card {
  -webkit-text-stroke: 4px rgba(0, 0, 0, 1);
  paint-order: stroke fill;
}
</style>
