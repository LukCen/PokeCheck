<script setup lang="ts">
import { getData } from '@/helpers/ApiCaller';
import { usePokemonStore } from '@/stores/store';
import { ref, TransitionGroup } from 'vue';

const numberToFetch = 20
const store = usePokemonStore()
const pokeData = ref<any[]>([])

const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};
const api = getData()
async function fetchMore() {
  const newPokemon = await api.pokemonMultiple(store.count, numberToFetch)
  if (newPokemon) {
    pokeData.value.push(...newPokemon)
    store.updatePokemonList(numberToFetch)
  }
}

fetchMore()
</script>
<template>

  <TransitionGroup class="grid grid-cols-2 gap-4 px-2" name="pokemon-list" tag="section">
    <div :key="poke" v-for="poke in pokeData" :style="{
      background: poke.types.length === 1 ? typeColors[poke.types[0].type.name] : `linear-gradient(to right, ${poke.types.map((t: any) => typeColors[t.type.name]).join(', ')})`
    }" class="flex flex-col items-center text-white rounded py-1">
      <img :src="poke.sprites.front_default" alt="">
      <p class="capitalize text-3xl">{{ poke.name }}</p>
      <p class="text-xl">{{ poke.id }}</p>
      <div class="types flex gap-2">

        <div v-for="type in poke.types" class="type-pill bg-[rgba(255,255,255,0.3)] px-2 py-1 capitalize rounded-xl text-xl">
          {{ type.type.name }}
        </div>
      </div>
    </div>
  </TransitionGroup>

  <button @click="fetchMore" class="btn bg-green-300 text-black font-black">FETCH MORE</button>
</template>
