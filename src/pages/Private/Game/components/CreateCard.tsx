import { PlusOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {
  onClick: () => void
}

export const CreateCard: React.FC<Props> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <PlusOutlined className="text-4xl text-gray-400" />
    </Container>
  )
}

const Container = styled(Card)`
  ${tw`bg-gray-500 h-[180px] flex gap-1 border-none rounded-lg hover:bg-gray-400`}

  .ant-card-body {
    ${tw`!w-full p-2 flex items-center justify-center flex-col h-full`}
  }

  :hover {
    ${tw`bg-gray-300`}
    transform: scale(1.05);
  }

  transition: 0.5s;
`
