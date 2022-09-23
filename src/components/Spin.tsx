import { Spin } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'

export const StyledSpin = styled(Spin)`
  .ant-spin-dot-item {
    ${tw`bg-gray-300`}
  }
`
