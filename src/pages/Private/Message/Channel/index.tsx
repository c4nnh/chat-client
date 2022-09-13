import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = {}

export const Channel: React.FC<Props> = () => {
  const location = useLocation()

  const conversationId = location.pathname.split('/').pop()

  useEffect(() => {
    console.log('Change conversation')
  }, [conversationId])

  return <Container>{conversationId}</Container>
}

const Container = styled.div`
  ${tw`flex-1 bg-gray-200`}
`
