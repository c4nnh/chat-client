import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = PropsWithChildren

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <div className="w-1/3 flex flex-col bg-gray-200 p-5 gap-10 rounded-md">
        {children}
      </div>
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-full h-full flex flex-col items-center justify-center bg-blue-200`}
`
