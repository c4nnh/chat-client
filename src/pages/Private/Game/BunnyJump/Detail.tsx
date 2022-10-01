import { useParams } from 'react-router-dom'
import styled from 'styled-components'

type Props = {}

export const BunnyJumpDetail: React.FC<Props> = () => {
  const { id } = useParams()

  return <Container>{id}</Container>
}

const Container = styled.div``
