<script setup lang="ts">
import { getData } from '@/helpers/ApiCaller';
import { Heart, Sword, Shield, Swords, ShieldEllipsis, ChevronsUp } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute()
const api = getData()
const pokemon = await api.pokemonSingle(route.params.id as string)
// console.dir(pokemon)

/**
 * Custom implementation of the .replaceAll() method because TS is having a moment
 * 
 * @param target - string to execute the function on
 * @param oldChar - character you want to replace
 * @param newChar - character to replace oldChar with
 */
const customReplaceAll = (target: string, oldChar: string, newChar: string): string => {

  const returnValue: string[] = []
  const arrayfied = target.split('')
  arrayfied.forEach((char: string) => {
    if (char === oldChar) {
      char = newChar
      returnValue.push(char)
    } else {
      returnValue.push(char)
    }
  })
  return returnValue.join('')
}

</script>

<template>

  <section class="pokemon-page max-w-[1200px] mx-auto flex flex-col items-center gap-4 text-white">
    <div class="gallery flex">
      <div v-show="typeof sprite === 'string'" v-for="sprite, index in pokemon.sprites" :key="index" class="photo-box flex flex-col items-center">
        <img :src="sprite" alt="" height="200" width="200">
        <span class="capitalize text-white">{{ customReplaceAll(String(index), '_', ' ') }} </span>
      </div>
    </div>
    <div class="base-data flex flex-col gap-4">
      <h1 class="capitalize font-bold text-2xl">Name: {{ pokemon.name }}</h1>
      <span>ID: {{ pokemon.id }}</span>
      <span v-for="type in pokemon.types" class="capitalize">Type: {{ type.type.name }}</span>
      <div class="stats flex flex-col gap-2">
        <h2 class="font-semibold text-lg">Stats</h2>
        <table>
          <thead>
            <th v-for="stat in pokemon.stats" class="px-4 py-1 capitalize border-4 border-white">
              <Heart color="#ffffff" class="align-self-center mx-auto" :size="30" v-if="stat.stat.name === 'hp'" />
              <Sword color="#ffffff" class="align-self-center mx-auto" :size="30" v-if="stat.stat.name === 'attack'" />
              <Shield color="#ffffff" class="align-self-center mx-auto" :size="30" v-if="stat.stat.name === 'defense'" />
              <Swords color="#ffffff" class="align-self-center mx-auto" :size="30" v-if="stat.stat.name === 'special-attack'" />
              <ShieldEllipsis color="#ffffff" class="align-self-center mx-auto" :size="30" v-if="stat.stat.name === 'special-defense'" />
              <ChevronsUp color="#ffffff" class="align-self-center mx-auto" :size="30" v-if="stat.stat.name === 'speed'" />
              {{ stat.stat.name.replace('-', ' ') }}
            </th>
          </thead>
          <tbody>
            <td class="text-center border border-white" v-for="stat, index in pokemon.stats" :key="index">{{ stat.base_stat }}</td>
          </tbody>
        </table>

      </div>
      <div class="flex flex-col gap-2">
        <h2 class="font-semibold text-lg">Abilities: </h2>
        <ul class="flex gap-2">
          <li class="flex gap-2 capitalize" v-for="ability, index in pokemon.abilities" :key="index">
            {{ ability.ability.name.replace('-', ' ') }}
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="font-semibold text-lg">Pokemon game appearances: </h2>
        <ul class="flex max-w-fit flex-wrap">
          <li class="flex capitalize flex-wrap max-w-fit" v-for="game, index in pokemon.game_indices" :key="index">
            {{ game.version.name.replace('-', ' ') }}
          </li>

        </ul>
      </div>
    </div>
  </section>

</template>

<style scoped>
/* for cleaner separation of the items on this card */
ul li:not(:last-child)::after {
  content: " • ";
  padding: 0 5px;
}
</style>
