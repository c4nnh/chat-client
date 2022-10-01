import { Navigate, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { END_POINTS } from '../../../constants'
import { BunnyJump } from './BunnyJump'
import { GameList } from './GameList'

type Props = {}

export const Game: React.FC<Props> = () => {
  return (
    <Container>
      <Routes>
        <Route path={''} element={<GameList />} />
        <Route
          path={`${END_POINTS.PRIVATE.GAME.BUNNY_JUMP}/*`}
          element={<BunnyJump />}
        />
        <Route path="" element={<Navigate to={''} replace />} />
      </Routes>
    </Container>
  )
}

const Container = styled.div`
  ${tw`bg-gray-600 w-full`}
`
