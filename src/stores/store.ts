import { ref } from 'vue'
import { defineStore } from 'pinia'



export const usePokemonStore = defineStore('pokemon', () => {
  const count = ref<number>(1)
  const getCount = () => { return count.value }

  const updatePokemonList = (valueToAdd: number) => { count.value += valueToAdd }

  // holds pokemon types to filter - will display only those that are in, if array isnt empty (if empty, show everything)
  const pokemonTypesToShow = ref<string[]>([])
  // push to above
  const addPokemonTypeToShow = (newItem: string) => {
    pokemonTypesToShow.value.push(newItem)
    console.log(pokemonTypesToShow.value)
  }
  return { count, getCount, updatePokemonList, pokemonTypesToShow, addPokemonTypeToShow }
})
