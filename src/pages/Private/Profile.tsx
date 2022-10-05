import { Button, notification } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import {
  useCreateSignedUrlMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
} from '../../apis'
import { useAuthStore } from '../../stores'

type Props = {}

export const Profile: React.FC<Props> = () => {
  const [selectedFile, setSelectedFile] = useState<any>()
  const { mutate: mutateCreateSignedUrl, isLoading: isCreatingSignedUrl } =
    useCreateSignedUrlMutation()
  const { mutate: mutateUploadImage, isLoading: isUploadingImage } =
    useUploadImageMutation()
  const { mutate: mutateUpdateUser, isLoading: isUpdatingUser } =
    useUpdateUserMutation()
  const { me } = useAuthStore()

  const onUpload = async () => {
    const { name, type } = selectedFile!
    mutateCreateSignedUrl(
      {
        fileName: name,
        fileType: type,
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
                mutateUpdateUser(
                  {
                    image: publicUrl,
                  },
                  {
                    onSuccess: data => {
                      me(data)
                      notification.success({
                        message: 'Success',
                        description: 'Your avatar is on air',
                      })
                      setSelectedFile(undefined)
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

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <Container>
      <input type="file" name="file" onChange={changeHandler} />
      <Button
        onClick={onUpload}
        loading={isCreatingSignedUrl || isUploadingImage || isUpdatingUser}
        disabled={!selectedFile}
      >
        {' '}
        Upload avatar
      </Button>
    </Container>
  )
}

const Container = styled.div`
  ${tw`bg-gray-500 flex-1`}
`
