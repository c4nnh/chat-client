import { ArrowRightOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { ChairIcon } from '../../../../assets'
import { Room } from '../../../../models'

type Props = {
  room: Room
}

export const RoomItem: React.FC<Props> = ({ room }) => {
  const navigate = useNavigate()

  const joinRoom = () => {
    if (room.hasPassword) {
      alert(123)
    }
    navigate(room.id)
  }

  return (
    <Container onClick={joinRoom}>
      <div className="room-info flex flex-col h-full">
        <div className="h-[14px]">
          {room.hasPassword && <LockOutlined className="flex justify-end" />}
        </div>
        <span className="flex justify-center font-bold">{room.game.name}</span>
        <span className="flex justify-center h-[22px]">{room.name}</span>
        <TableContainer>
          {Array.from(Array(room.numberOfMember).keys()).map(item => (
            <ChairIcon
              key={item}
              fill={room.numberOfMember === room.max ? 'red' : undefined}
            />
          ))}
        </TableContainer>
      </div>
      <div className="join-button">
        <JoinButton type="primary" icon={<ArrowRightOutlined />}>
          Join
        </JoinButton>
      </div>
    </Container>
  )
}

const Container = styled(Card)`
  ${tw`bg-gray-300 h-[180px] flex gap-1 border-none rounded-lg`}

  .ant-card-body {
    ${tw`!w-full p-2 flex flex-col h-full`}
  }

  .join-button {
    display: none;
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  :hover {
    .room-info {
      opacity: 0.3;
    }
    .join-button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  transition: 0.5s;
`

const TableContainer = styled.div`
  ${tw`flex-1 grid py-2 justify-center gap-x-10 items-center`}
  grid-template-columns: auto auto;
`

const JoinButton = styled(Button)``
