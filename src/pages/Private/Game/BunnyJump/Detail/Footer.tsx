import { CheckOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'
import { RoomMember, RoomRole } from '../../../../../models'
import { useAuthStore } from '../../../../../stores'

type Props = {
  members: RoomMember[]
}

export const Footer: React.FC<Props> = ({ members }) => {
  const { user } = useAuthStore()

  const startable =
    members.filter(item => item.role !== RoomRole.CREATOR && !item.isReady)
      .length ===
    members.length - 1

  const isCreator = !!members.filter(
    item => item.id === user?.id && item.role === RoomRole.CREATOR
  ).length

  const isReady = !!members.filter(item => item.id === user?.id && item.isReady)
    .length

  return (
    <Container>
      {isCreator && (
        <Button size="large" type="primary" shape="round" disabled={startable}>
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
            >
              Unready
            </Button>
          ) : (
            <Button size="large" type="primary" shape="round">
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
