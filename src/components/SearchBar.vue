<script setup lang="ts">
//@ts-ignore
import { usePokemonStore } from '@/stores/store'
import { ref } from 'vue'

const store = usePokemonStore()
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
}
const pokeList = async () => {
  const apiUrl = await fetch(`https://pokeapi.co/api/v2/type/`)
  if (apiUrl.ok) {
    const results = await apiUrl.json()
    return results.results
  }
}


const pokeTypes = await pokeList()

// na zdjęciu poglądowym nie było tych twóch typów, nie mają również przypisanych kolorów w obiekcie typeColors, więc wycinamy
//@ts-ignore
const filteredTypes = pokeTypes.filter((item: string) => item.name !== "unknown" && item.name !== "stellar")

function handleFilters(type: string) {
  if (!store.pokemonTypesToShow.includes(type)) {
    store.addPokemonTypeToShow(type)
  } else {
    store.pokemonTypesToShow.splice(store.pokemonTypesToShow.indexOf(type), 1)
  }
}

</script>

<template>
  <section class="flex flex-col gap-2">
    <input type="search" name="search" id="poke-search" class="border border-white w-[400px] mx-auto text-white px-4 py-1" placeholder="Type in to search">
  </section>
  <section class="filters mx-auto flex gap-2">
    <button @click="handleFilters(type.name)" v-for="type in filteredTypes" :key="type.name" class="text-white capitalize  cursor-pointer px-2 py-1 rounded-xl text-shadow-black text-shadow-lg"
      :style="{ background: typeColors[type.name] }">{{ type.name
      }}</button>
  </section>
</template>
