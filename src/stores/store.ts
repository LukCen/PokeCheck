import { ref } from 'vue'
import { defineStore } from 'pinia'



export const usePokemonStore = defineStore('pokemon', () => {
  const count = ref<number>(1)
  const getCount = () => { return count.value }

  const updatePokemonList = (valueToAdd: number) => { count.value += valueToAdd }

  return { count, getCount, updatePokemonList }
})
