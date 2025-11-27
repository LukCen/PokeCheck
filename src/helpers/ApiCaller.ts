
function getData() {
  const baseApi = 'https://pokeapi.co/api/v2'

  // get one pokemon - can search either name or id
  async function pokemonSingle(query: string | number) {
    const data = await fetch(baseApi + `/pokemon/${query}`)
    if (data) return data.json()
  }

  /**
   * Fetch data for multiple pokemon
   * @param {number} startAt - id of the pokemon you want to start fetching from
   * @param {number} amount - how many pokemons to fetch
   */
  async function pokemonMultiple(startAt?: number, amount?: number) {
    const pokePromises = []
    if (startAt && amount) {
      for (let i = startAt; i <= amount; i++) {
        pokePromises.push(pokemonSingle(i))
      }
    }
    const result = await Promise.all(pokePromises)
    return result
  }
  return { pokemonSingle, pokemonMultiple }
}

export { getData }
