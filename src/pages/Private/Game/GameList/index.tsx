import styled from 'styled-components'
import tw from 'twin.macro'
import { useScreen } from '../../../../hooks'
import { GameCard } from './GameCard'

type Props = {}

enum GameType {
  // @ts-ignore
  BUNNY_JUMP = END_POINTS.PRIVATE.GAME.BUNNY_JUMP,
}

export type GameModel = {
  path: GameType
  name: string
  image?: string
}

const games: GameModel[] = [
  {
    name: 'Bunny jump',
    path: GameType.BUNNY_JUMP,
  },
]

export const GameList: React.FC<Props> = () => {
  const { isMobileScreen } = useScreen()

  return (
    <Container>
      <Body
        style={{
          gridTemplateColumns: `repeat(auto-fill, 180px)`,
          rowGap: isMobileScreen ? '20px' : '40px',
        }}
      >
        {games.map(item => (
          <GameCard key={item.path} game={item} />
        ))}
      </Body>
    </Container>
  )
}

const Container = styled.div`
  ${tw`h-full flex flex-col gap-4 overflow-y-auto px-40 py-20 cursor-pointer`}
`

const Body = styled.div`
  ${tw`grid justify-evenly gap-x-5`}
`
