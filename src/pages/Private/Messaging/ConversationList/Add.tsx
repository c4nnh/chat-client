import { Avatar, Form, Modal } from 'antd'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateConversationMutation } from '../../../../apis'
import { useGetContactsInfiniteQuery } from '../../../../apis/endpoints/user'
import { FormInput, FormSelect } from '../../../../components'
import { CreateConversationDto } from '../../../../models'

type Props = {
  open: boolean
  onClose: () => void
}
export const Add: React.FC<Props> = ({ open, onClose }) => {
  const navigate = useNavigate()

  const formMethods = useForm<CreateConversationDto>()
  const [email, setEmail] = useState<string>()

  const { handleSubmit, reset, watch } = formMethods

  const { mutate, isLoading: isSendingMessage } =
    useCreateConversationMutation()

  const {
    data: contacts,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetContactsInfiniteQuery(
    {
      email,
    },
    {
      enabled: open,
    }
  )

  const handleClose = () => {
    onClose()
  }

  const onSend = handleSubmit(data => {
    mutate(data, {
      onSuccess: res => {
        navigate(res.id)
        reset()
        onClose()
      },
    })
  })

  return (
    <Modal
      title="Send new message to your friend"
      open={open}
      onCancel={handleClose}
      closable={false}
      maskClosable={false}
      destroyOnClose
      okText="Send"
      confirmLoading={isSendingMessage}
      onOk={onSend}
      okButtonProps={{
        disabled: !watch('content') || !watch('userIds'),
      }}
    >
      <FormProvider {...formMethods}>
        <Form layout="vertical">
          <FormSelect
            name="userIds"
            label="To"
            options={
              contacts?.pages
                .map(group =>
                  group.data.map(item => ({
                    value: item.id,
                    label: item.name,
                    optionRender: (
                      <div className="flex items-center gap-2">
                        <Avatar src={item.image} />
                        <span>{item.name}</span>
                      </div>
                    ),
                  }))
                )
                .flat() || []
            }
            infiniteScroll={{
              fetchNextPage,
              hasNextPage,
              isFetchingNextPage,
            }}
            selectProps={{
              loading: isFetching,
              maxTagCount: 5,
              allowClear: true,
              showSearch: true,
              mode: 'multiple',
              onSearch: value => setEmail(value),
            }}
          />
          <FormInput name="content" label="Message" />
        </Form>
      </FormProvider>
    </Modal>
  )
}
