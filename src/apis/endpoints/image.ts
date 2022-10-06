import { MutationFunction, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { ImageFolder } from '../../models'
import { request } from '../request'
import { MutationOptions } from '../type'

type Response = {
  createSignedUrl: {
    uploadUrl: string
    publicUrl: string
  }
  upload: null
}

type Variables = {
  createSignedUrl: {
    fileName: string
    fileType: string
    folder: ImageFolder
  }
  upload: {
    file: File
    url: string
  }
}

type API = {
  createSignedUrl: MutationFunction<
    Response['createSignedUrl'],
    Variables['createSignedUrl']
  >
  upload: MutationFunction<Response['upload'], Variables['upload']>
}

const PREFIX = 'images'

const image: API = {
  createSignedUrl: data => request.post(PREFIX, data),
  upload: async data => {
    const res = await axios({
      method: 'put',
      url: data.url,
      headers: {
        'Content-Type': data.file.type,
      },
      data: data.file,
    })
    return res.data
  },
}

export const useCreateSignedUrlMutation = (
  options?: MutationOptions<
    Response['createSignedUrl'],
    Variables['createSignedUrl']
  >
) => useMutation(['createSignedUrl'], image.createSignedUrl, options)

export const useUploadImageMutation = (
  options?: MutationOptions<Response['upload'], Variables['upload']>
) => useMutation(['upload'], image.upload, options)
