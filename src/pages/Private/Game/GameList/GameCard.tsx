import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import tw from 'twin.macro'
import { GameModel } from '.'

type Props = {
  game: GameModel
}

export const GameCard: React.FC<Props> = ({ game }) => {
  const navigate = useNavigate()

  return (
    <Container
      cover={<img alt={game.name} width={180} height={180} src={game.image} />}
      onClick={() => navigate(game.path)}
    >
      <Meta title={game.name} />
    </Container>
  )
}

const Container = styled(Card)`
  ${tw`bg-gray-400 h-[180px] w-[180px] border-none`}

  :hover {
    ${tw`bg-gray-300`}
    transform: scale(1.05);
  }
  transition: 0.5s;

  .ant-card-body {
    ${tw`px-2 pb-1 pt-0 bg-gray-400`}

    .ant-card-meta-title {
      ${tw`text-gray-600`}
    }

    .ant-card-meta {
      ${tw`flex justify-center uppercase -mt-8`}
    }
  }
`
