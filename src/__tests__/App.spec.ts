import { describe, it, expect } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import App from '../App.vue'
import { routes } from '@/router/index'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'


describe('App', () => {
  it('mounts renders properly', async () => {
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
