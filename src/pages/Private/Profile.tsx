import { Button } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {}

export const Profile: React.FC<Props> = () => {
  const [audioLoaded, setAudioLoaded] = useState(0)
  const [selectedFile, setSelectedFile] = useState<any>()

  const onUpload = async () => {
    let endpoint =
      'https://storage.googleapis.com/bunny-jump-37a26.appspot.com/abcd?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=firebase-adminsdk-cwbtj%40bunny-jump-37a26.iam.gserviceaccount.com%2F20221004%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221004T142455Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=content-type%3Bhost&X-Goog-Signature=54b984b103a4d495c8dea12cfbd0967febdd618bd33c02ed114e2b0a8a7a06e1365b1fe25b062c2fd43e571282d7c7fb01bb149504536c720151f3d6b56f2d1674f756f004743a051c5ba884270e0575a66dcde313bcd4c200acd9536f4ce6542ce698d6c69f6f886b30b876b27ec1d00a529c65dde094ca49ef8448c9386f15f90a72c9ff2de50b914f100715e1e377ec24c3196cfbc52fc682f6009b5c02298efb81084eb2f0f1d2d9478f05ef613060b8c5549eea085e7280e5c4cb3c5a180bf09b6a93afe3331e171ba25c6d747137fe2238ca7cb51d15cffe51f06ccb9874e6261d961630c9f82bc2cb7a9a3e56ce137424b3b0bb0184cb4b70a4caebfe'

    const options = {
      params: { Key: selectedFile.name, ContentType: selectedFile.type },
      headers: {
        'Content-Type': 'image/jpg',
        'Access-Control-Allow-Origin': '*',
      },
    }

    axios
      .put(endpoint, selectedFile, {
        onUploadProgress: ProgressEvent => {
          setAudioLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100)
        },
        ...options,
      })
      .then(res => {
        console.log(res)
      })
      .catch(e => console.log(e))
  }

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <Container>
      <input type="file" name="file" onChange={changeHandler} />
      <Button onClick={onUpload}>upload</Button>
      {audioLoaded}
    </Container>
  )
}

const Container = styled.div`
  ${tw`bg-gray-500 flex-1`}
`
