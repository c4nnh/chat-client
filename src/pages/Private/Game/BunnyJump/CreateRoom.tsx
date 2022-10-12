import { Form, Modal } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateRoomMutation } from '../../../../apis'
import { FormInput, FormPassword } from '../../../../components'
import { CreateRoomDto } from '../../../../models'

type Props = {
  open: boolean
  onClose: () => void
}

export const CreateRoom: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate()
  const formMethods = useForm<CreateRoomDto>()
  const { handleSubmit, reset } = formMethods

  const { mutate, isLoading: isCreatingRoom } = useCreateRoomMutation()

  const createRoom = handleSubmit(data => {
    mutate(
      {
        ...data,
        max: data.max || undefined,
      },
      {
        onSuccess: roomId => {
          reset()
          onClose()
          navigate(roomId)
        },
      }
    )
  })

  return (
    <Modal
      open={open}
      closable={false}
      destroyOnClose
      maskClosable={false}
      title="Create new room"
      onCancel={onClose}
      onOk={createRoom}
      confirmLoading={isCreatingRoom}
    >
      <FormProvider {...formMethods}>
        <Form
          layout="vertical"
          size="middle"
          className="flex flex-col"
          onFinish={createRoom}
        >
          <FormInput
            name="name"
            label="Name"
            inputProps={{
              readOnly: isCreatingRoom,
              placeholder: 'Enter name of room',
            }}
          />
          <FormPassword
            name="password"
            label="Password"
            inputProps={{
              readOnly: isCreatingRoom,
              placeholder: 'Enter password of room',
            }}
          />
          <FormInput
            name="max"
            label="Max member of room"
            inputProps={{
              type: 'number',
              readOnly: isCreatingRoom,
              placeholder: 'Enter number of member (from 2 to 4)',
              allowClear: false,
              min: 2,
              max: 4,
            }}
          />
        </Form>
      </FormProvider>
    </Modal>
  )
}
