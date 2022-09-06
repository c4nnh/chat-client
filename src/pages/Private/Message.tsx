import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {}

export const Message: React.FC<Props> = () => {
  return <Container>Message</Container>
}

const Container = styled.div`
  ${tw`bg-red-200 flex-1`}
`
