<script setup lang="ts">
import { getData } from '@/helpers/ApiCaller';
import { Heart, Sword, Shield, Swords, ShieldEllipsis, ChevronsUp } from 'lucide-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute()
const api = getData()
const pokemon = await api.pokemonSingle(route.params.id as string)
console.dir(pokemon)

const regexNoSpecials = /[^a-zA-Z0-9_]+/
</script>

<template>

  <section class="pokemon-page flex flex-col items-center gap-4 text-white">
    <div class="gallery flex">
      <div v-show="typeof sprite === 'string'" v-for="sprite, key in pokemon.sprites" class="photo-box flex flex-col items-center">
        <img :src="sprite" alt="" height="200" width="200">
        <span class="capitalize text-white">{{ String(key).replaceAll('_', ' ') }} </span>
      </div>
    </div>
    <div class="base-data flex flex-col gap-4">
      <h1 class="capitalize font-bold text-2xl">Name: {{ pokemon.name }}</h1>
      <span>ID: {{ pokemon.id }}</span>
      <span v-for="type in pokemon.types" class="capitalize">Type: {{ type.type.name }}</span>
      <div class="stats flex flex-col gap-2">
        <h2>Stats</h2>
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
            <td class="text-center border border-white" v-for="stat in pokemon.stats">{{ stat.base_stat }}</td>
          </tbody>
        </table>

      </div>
      <ul class="flex flex-col gap-2">
        <h2>Abilities: </h2>
        <li class="flex gap-2 capitalize" v-for="ability in pokemon.abilities">
          {{ ability.ability.name.replace('-', ' ') }}
        </li>
      </ul>
    </div>
  </section>

</template>
