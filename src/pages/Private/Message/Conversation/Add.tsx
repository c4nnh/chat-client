import { Form, Modal } from 'antd'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useGetContactsInfiniteQuery } from '../../../../apis/endpoints/user'
import { FormInput, FormSelect } from '../../../../components'

type Props = {
  open: boolean
  onClose: () => void
}

type CreateConversationPayload = {
  userIds: string[]
  content: string
}

export const Add: React.FC<Props> = ({ open, onClose }) => {
  const formMethods = useForm<CreateConversationPayload>()
  const [email, setEmail] = useState<string>()

  const { handleSubmit } = formMethods

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
    console.log(data)
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
      //   confirmLoading={true}
      onOk={onSend}
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
              onSearch: value => setEmail(value),
            }}
          />
          <FormInput name="content" label="Message" />
        </Form>
      </FormProvider>
    </Modal>
  )
}
