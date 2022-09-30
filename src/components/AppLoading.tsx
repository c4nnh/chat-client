import styled from 'styled-components'
import tw from 'twin.macro'
import { StyledSpin } from './Spin'

type Props = {}

export const AppLoading: React.FC<Props> = () => {
  return (
    <Container>
      <StyledSpin />
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-full h-full flex items-center justify-center`}
`
