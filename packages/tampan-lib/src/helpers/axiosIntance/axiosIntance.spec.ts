import axios from 'axios'
import { SpyInstance } from 'vitest'
import { createAxiosInstance } from './axiosIntance'

vi.mock('axios')

describe('createAxiosInstance', () => {
  const baseURL = 'https://example.com/api'

  const axiosCreateSpy = vi.spyOn(axios, 'create') as SpyInstance
  const axiosGetSpy = vi.spyOn(axios, 'get')
  const axiosPatchSpy = vi.spyOn(axios, 'patch')
  const axiosPostSpy = vi.spyOn(axios, 'post')
  const axiosPutSpy = vi.spyOn(axios, 'put')
  const axiosDeleteSpy = vi.spyOn(axios, 'delete')

  axiosCreateSpy.mockImplementation(() => ({
    get: axiosGetSpy,
    patch: axiosPatchSpy,
    post: axiosPostSpy,
    put: axiosPutSpy,
    delete: axiosDeleteSpy,
  }))

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('calls GET with correct url and params', async () => {
    const instance = createAxiosInstance(baseURL)
    const response = { data: 'mock-data' }

    axiosGetSpy.mockResolvedValue(response)

    const result = await instance.Get<typeof response>({
      url: '/some-url',
      urlParams: { id: 1 },
      version: 'v1',
    })

    expect(result).toEqual(response)
  })

  it('calls Patch with correct url and params', async () => {
    const instance = createAxiosInstance(baseURL)
    const response = { data: 'mock-data' }

    axiosPatchSpy.mockResolvedValue(response)

    const result = await instance.Patch<typeof response>({
      url: '/some-url',
      urlParams: { id: 1 },
      version: 'v1',
    })

    expect(result).toEqual(response)
  })

  it('calls Post with correct url and payload data', async () => {
    const instance = createAxiosInstance(baseURL)
    const response = { data: 'mock-data' }

    axiosPostSpy.mockResolvedValue(response)

    const result = await instance.Post<typeof response>({
      url: '/some-url',
      data: {
        key: '1',
      },
    })

    expect(result).toEqual(response)
  })

  it('calls Put with correct url and payload data', async () => {
    const instance = createAxiosInstance(baseURL)
    const response = { data: 'mock-data' }

    axiosPutSpy.mockResolvedValue(response)

    const result = await instance.Put<typeof response>({
      url: '/some-url/1',
      data: {
        key: '1',
      },
    })

    expect(result).toEqual(response)
  })

  it('calls GET with correct url', async () => {
    const instance = createAxiosInstance(baseURL)
    const response = { data: 'mock-data' }

    axiosDeleteSpy.mockResolvedValue(response)

    const result = await instance.Delete<typeof response>({
      url: '/some-url/1',
    })

    expect(result).toEqual(response)
  })
})
