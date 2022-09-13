import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { ChangeEvent } from 'react'
import styled from 'styled-components'
import tw, { theme } from 'twin.macro'

type Props = {
  onSearch: (searchText: string) => void
}

export const Header: React.FC<Props> = ({ onSearch }) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  return (
    <Container>
      <StyledInput
        placeholder="Search conversation..."
        prefix={<SearchOutlined className="text-gray-300" />}
        allowClear
        onChange={handleSearch}
      />
      <PlusOutlined className="text-gray-500 cursor-pointer" />
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-[65px] flex gap-2 p-3 items-center justify-center`};
  border-bottom: 1px solid ${theme`colors.gray.700`};
`

const StyledInput = styled(Input)`
  ${tw`bg-gray-700`};

  border: none;

  .ant-input {
    ${tw`bg-gray-700 text-gray-300`}

    ::placeholder {
      ${tw`text-gray-300`}
    }
  }

  :focus {
    border-color: ${theme`colors.gray.700`};
  }

  .ant-input-clear-icon {
    ${tw`text-gray-300`}
  }
`
