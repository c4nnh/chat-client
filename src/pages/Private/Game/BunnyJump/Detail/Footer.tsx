import {
  ArrowLeftOutlined,
  CheckOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useUpdateReadyStatusMutation } from '../../../../../apis'
import { RoomMember, RoomRole } from '../../../../../models'
import { useAuthStore } from '../../../../../stores'

type Props = {
  members: RoomMember[]
}

export const Footer: React.FC<Props> = ({ members }) => {
  const navigate = useNavigate()
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

  const leave = () => {
    Modal.confirm({
      title: 'Do you want to leave this room?',
      icon: <WarningOutlined />,
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => navigate(-1),
    })
  }

  return (
    <Container>
      <div className="flex-1">
        <Button
          size="large"
          danger
          type="primary"
          shape="round"
          icon={<ArrowLeftOutlined />}
          onClick={leave}
        >
          Leave
        </Button>
      </div>
      <>
        {' '}
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
                style={{
                  background: 'yellowgreen',
                  borderColor: 'yellowgreen',
                }}
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
      </>
      <div className="flex-1"></div>
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex w-full justify-center`}
`
