import { CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useUpdateReadyStatusMutation } from '../../../../../apis'
import { RoomMember, RoomRole } from '../../../../../models'
import { useAuthStore } from '../../../../../stores'

type Props = {
  members: RoomMember[]
}

export const Footer: React.FC<Props> = ({ members }) => {
  const { user } = useAuthStore()
  const { id } = useParams()
  const { mutate: mutateReady, isLoading: isUpdatingReadyStatus } =
    useUpdateReadyStatusMutation()

  const canStart =
    members.filter(item => item.role !== RoomRole.CREATOR && !item.isReady)
      .length ===
    members.length - 1

  const isCreator = !!members.filter(
    item => item.id === user?.id && item.role === RoomRole.CREATOR
  ).length

  const isReady = !!members.filter(item => item.id === user?.id && item.isReady)
    .length

  const updateReadyStatus = (isReady: boolean) => {
    mutateReady({
      roomId: id!,
      dto: {
        isReady,
      },
    })
  }

  return (
    <Container>
      {isCreator && (
        <Button size="large" type="primary" shape="round" disabled={canStart}>
          Start game
        </Button>
      )}
      {!isCreator && (
        <>
          {isReady ? (
            <Button
              size="large"
              shape="round"
              type="primary"
              style={{ background: 'yellowgreen', borderColor: 'yellowgreen' }}
              icon={<CheckOutlined />}
              onClick={() => updateReadyStatus(false)}
              loading={isUpdatingReadyStatus}
            >
              Unready
            </Button>
          ) : (
            <Button
              size="large"
              type="primary"
              shape="round"
              onClick={() => updateReadyStatus(true)}
              loading={isUpdatingReadyStatus}
            >
              Ready
            </Button>
          )}
        </>
      )}
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex w-full justify-center`}
`
