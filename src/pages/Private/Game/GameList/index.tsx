import styled from 'styled-components'
import tw from 'twin.macro'
import { useScreen } from '../../../../hooks'
import { Game, GameType } from '../../../../models'
import { GameCard } from './GameCard'

type Props = {}

const games: Game[] = [
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
