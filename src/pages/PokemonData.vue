<script setup lang="ts">
import { getData } from '@/helpers/ApiCaller';
import { Heart, Sword, Shield, Swords, ShieldEllipsis, ChevronsUp } from 'lucide-vue-next';
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
    <div class="base-data flex flex-col gap-4">
      <span class="capitalize">Name: {{ pokemon.name }}</span>
      <span>ID: {{ pokemon.id }}</span>
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
  </section>

</template>
