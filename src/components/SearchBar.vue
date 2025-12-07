<script setup lang="ts">
//@ts-ignore
import { usePokemonStore } from '@/stores/store'

import { typeColors } from '@/helpers/AdditionalData'
const store = usePokemonStore()

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
const filteredTypes = pokeTypes?.filter((item: string) => item.name !== "unknown" && item.name !== "stellar")
// console.log(filteredTypes)
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
    <button @click="handleFilters(type.name)" v-for="type in filteredTypes" :key="type.name" :class="{ 'border-white border-solid': store.pokemonTypesToShow.includes(type.name) }"
      class="border-4 border-transparent capitalize cursor-pointer px-2 py-1 rounded-xl font-semibold text-white tracking-wider" :style="{
        background: typeColors[type.name]
      }">
      {{ type.name }}
    </button>
  </section>
</template>
<style scoped>
button {
  -webkit-text-stroke: 4px rgba(0, 0, 0, 1);
  paint-order: stroke fill;
}
</style>
