# createAxiosIntance

## Overview

This code defines a utility function createAxiosInstance which creates an instance of the popular HTTP client library axios and extends it with some additional functionality. The created instance can be used to make HTTP requests using the common methods (GET, POST, PUT, PATCH, DELETE) and provides a convenient way of providing common parameters such as the base URL, version, and headers.

## Usage


```ts
import { createAxiosInstance } from '@agungvr/tampan-lib'

const { axiosInstance, Get, Patch, Post, Put, Delete } = createAxiosInstance('https://example.com')

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    ;(config.headers as Exclude<typeof config.headers, undefined>).Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error),
)

export { Get, Patch, Post, Put, Delete }
```

```ts
import { Get } from './apiServices'

const fetchData = async () => {
  try {
    const response = await Get({
        url: '/api/blablabla',
    })
    console.log('response', response)
  } catch (e) {
    console.log(e)   
  }
}

fetchData()
```