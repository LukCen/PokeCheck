import { describe, it, expect, vi } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import App from '../App.vue'
import { routes } from '@/router/index'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import { getData } from '@/helpers/ApiCaller'


describe('App', () => {
  it('App renders and mounts', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const testRouter = createRouter({
      history: createMemoryHistory(),
      routes: routes
    })
    const app = mount(App, {
      global: {
        plugins: [pinia, testRouter],
        stubs: {
          RouterView: true,
          Suspense: true
        }
      }
    })
    await testRouter.isReady()
    await flushPromises()
    expect(app.exists()).toBe(true)
  })
})

describe('Fetching', () => {
  global.fetch = vi.fn((): Promise<Response> => Promise.resolve({
    ok: true,
    json: async () => Promise.resolve({ name: 'pikachu' })
  } as Response))
  it('Fetch code works', async () => {
    const fetcher = await getData()
    const getSingle = await fetcher.pokemonSingle(1)
    const getMulti = await fetcher.pokemonMultiple(1, 1)
    expect(getSingle).toEqual({ name: 'pikachu' })
    expect(getMulti).toEqual([{ name: 'pikachu' }])
  })
})
