import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { GameModel } from '.'

type Props = {
  game: GameModel
}

export const GameCard: React.FC<Props> = ({ game }) => {
  const navigate = useNavigate()

  return <Container onClick={() => navigate(game.path)}></Container>
}

const Container = styled(Card)`
  ${tw`bg-gray-300 h-[180px] w-[180px] border-none`}

  :hover {
    transform: scale(1.25);
  }
  transition: 0.5s;
`
