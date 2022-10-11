import { CheckOutlined, CrownFilled } from '@ant-design/icons'
import { Avatar, Card, Tooltip, Typography } from 'antd'
import styled from 'styled-components'
import tw from 'twin.macro'
import { RoomMember, RoomRole } from '../../../../../models'

type Props = {
  members: RoomMember[]
}

export const Members: React.FC<Props> = ({ members }) => {
  return (
    <Container>
      {members
        .sort((a, b) => (a.role > b.role ? 1 : -1))
        .map(member => (
          <Tooltip placement="bottom" title={member.name} key={member.id}>
            <MemberCard>
              <Header>
                {member.role === RoomRole.CREATOR && (
                  <CrownFilled className="text-yellow-300 text-xl" />
                )}
                {member.role === RoomRole.MEMBER && member.isReady && (
                  <CheckOutlined className="text-green-300 text-xl" />
                )}
              </Header>
              <Avatar src={member.image} />

              <Typography.Text style={{ width: 100 }} ellipsis>
                {member.name}
              </Typography.Text>
            </MemberCard>
          </Tooltip>
        ))}
    </Container>
  )
}

const Container = styled.div`
  ${tw`w-full flex justify-center gap-4 cursor-pointer`}
`

const MemberCard = styled(Card)`
  ${tw`bg-gray-500 w-[100px] h-[120px] flex gap-1 border-none rounded-lg text-center`}

  .ant-card-body {
    ${tw`!w-full p-2 flex flex-col items-center h-full`}
  }
`

const Header = styled.div`
  ${tw`w-full h-12 flex gap-1 justify-center items-center`}
`
