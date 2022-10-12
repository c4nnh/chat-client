import { Form, Modal } from 'antd'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useUpdateConversationMutation } from '../../../../../apis'
import { FormInput } from '../../../../../components'
import { UpdateConversationDto } from '../../../../../models'
import { useConversationStore } from '../../../../../stores'

type Props = {
  open: boolean
  onClose: () => void
}

export const EditName: React.FC<Props> = ({ open, onClose }) => {
  const { id } = useParams()
  const formMethods = useForm<UpdateConversationDto>()
  const { conversation, updateConversation } = useConversationStore()

  const { handleSubmit, watch } = formMethods
  const { mutate, isLoading } = useUpdateConversationMutation()

  useEffect(() => {
    formMethods.setValue('name', conversation?.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    onClose()
  }

  const onSave = handleSubmit(dto => {
    mutate(
      { id: id!, dto },
      {
        onSuccess: () => {
          updateConversation({ name: dto.name })
          onClose()
        },
      }
    )
  })

  return (
    <Modal
      title="Change name of conversation"
      open={open}
      onCancel={handleClose}
      closable={false}
      maskClosable={false}
      destroyOnClose
      okText="Save"
      confirmLoading={isLoading}
      onOk={onSave}
      okButtonProps={{
        disabled: watch('name') === conversation?.name,
      }}
    >
      <FormProvider {...formMethods}>
        <Form layout="vertical">
          <FormInput name="name" label="Name" />
        </Form>
      </FormProvider>
    </Modal>
  )
}
