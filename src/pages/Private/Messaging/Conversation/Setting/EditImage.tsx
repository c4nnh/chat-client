import { PictureFilled, SyncOutlined } from '@ant-design/icons'
import { notification } from 'antd'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import {
  useCreateSignedUrlMutation,
  useUpdateConversationMutation,
  useUploadImageMutation,
} from '../../../../../apis'
import { ImageFolder } from '../../../../../models'
import { useConversationStore } from '../../../../../stores'

type Props = {}

export const EditImage: React.FC<Props> = () => {
  const { id } = useParams()
  const inputFile = useRef(null)

  const { updateConversation } = useConversationStore()
  const { mutate: mutateCreateSignedUrl, isLoading: isCreatingSignedUrl } =
    useCreateSignedUrlMutation()
  const { mutate: mutateUploadImage, isLoading: isUploadingImage } =
    useUploadImageMutation()
  const {
    mutate: mutateUpdateConversation,
    isLoading: isUpdatingConversation,
  } = useUpdateConversationMutation()

  const changeHandler = (event: any) => {
    if (!event.target.files.length) return
    const selectedFile = event.target.files[0]
    const { name, type } = selectedFile!
    mutateCreateSignedUrl(
      {
        fileName: name,
        fileType: type,
        folder: ImageFolder.CONVERSATION_FOLDER,
      },
      {
        onSuccess: async res => {
          const { uploadUrl, publicUrl } = res
          await mutateUploadImage(
            {
              file: selectedFile,
              url: uploadUrl,
            },
            {
              onSuccess: () => {
                mutateUpdateConversation(
                  { id: id!, dto: { image: publicUrl } },
                  {
                    onSuccess: () => {
                      updateConversation({ image: publicUrl })
                    },
                  }
                )
              },
              onError: e => {
                notification.error({
                  message: e.message,
                  description:
                    'Can not upload image now. Please try again later',
                })
              },
            }
          )
        },
      }
    )
  }

  return (
    <Container onClick={() => (inputFile?.current as any).click()}>
      <PictureFilled />
      <span>Edit image</span>
      <input
        accept="image/*"
        type="file"
        ref={inputFile}
        className="hidden"
        onChange={changeHandler}
      />
      {(isCreatingSignedUrl || isUploadingImage || isUpdatingConversation) && (
        <SyncOutlined spin />
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex gap-3 text-gray-300 items-center py-2 px-3 rounded hover:bg-gray-500 cursor-pointer`}
`
