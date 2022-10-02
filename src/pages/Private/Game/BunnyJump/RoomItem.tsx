import { ArrowRightOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Card, Form, Modal } from 'antd'
import { useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useJoinRoomMutation } from '../../../../apis'
import { ChairIcon } from '../../../../assets'
import { FormPassword } from '../../../../components'
import { SocketContext } from '../../../../contexts'
import { JoinRoomDto, Room } from '../../../../models'

type Props = {
  room: Room
}

export const RoomItem: React.FC<Props> = ({ room }) => {
  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const [openJoinModal, setOpenJoinModal] = useState(false)
  const formMethods = useForm<JoinRoomDto>()
  const { handleSubmit, watch } = formMethods

  const { mutate, isLoading } = useJoinRoomMutation()

  const joinRoom = () => {
    if (room.hasPassword) {
      setOpenJoinModal(true)
    } else {
      handleJoinRoom()
    }
  }

  const handleJoinRoom = handleSubmit(data => {
    mutate(
      {
        roomId: room.id,
        dto: data,
      },
      {
        onSuccess: () => {
          navigate(room.id)
          socket.emit('joinRoom', { roomId: room.id })
        },
      }
    )
  })

  return (
    <Container>
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
      <div className="join-button" onClick={joinRoom}>
        {room.numberOfMember < room.max ? (
          <JoinButton
            type="primary"
            icon={<ArrowRightOutlined />}
            loading={isLoading}
          >
            Join
          </JoinButton>
        ) : (
          <div>full</div>
        )}
      </div>
      <Modal
        open={openJoinModal}
        closable={false}
        destroyOnClose
        maskClosable={false}
        title={`Join room ${room.name ? `:${room.name}` : ''}`}
        onCancel={() => {
          setOpenJoinModal(false)
        }}
        onOk={handleJoinRoom}
        confirmLoading={isLoading}
        okButtonProps={{
          disabled: !watch('password'),
        }}
      >
        <FormProvider {...formMethods}>
          <Form
            layout="vertical"
            size="middle"
            className="flex flex-col"
            onFinish={handleJoinRoom}
          >
            <FormPassword
              name="password"
              label="Password"
              inputProps={{
                readOnly: isLoading,
                placeholder: 'Enter password to join room',
              }}
            />
          </Form>
        </FormProvider>
      </Modal>
    </Container>
  )
}

const Container = styled(Card)`
  ${tw`bg-gray-300 h-[180px] flex gap-1 border-none rounded-lg`}

  .ant-card-body {
    ${tw`!w-full p-2 flex flex-col h-full`}
  }

  .join-button {
    ${tw`hidden z-[1] absolute w-full h-full top-0 left-0`}
  }

  :hover {
    .room-info {
      ${tw`opacity-30`}
    }
    .join-button {
      ${tw`flex items-center justify-center`}
    }
  }
  transition: 0.5s;
`

const TableContainer = styled.div`
  ${tw`flex-1 grid py-2 justify-center gap-x-10 items-center`}
  grid-template-columns: auto auto;
`

const JoinButton = styled(Button)``
