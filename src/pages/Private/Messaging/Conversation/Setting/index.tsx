import { CaretRightOutlined, EditFilled } from '@ant-design/icons'
import { Avatar, Collapse } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { useConversationStore } from '../../../../../stores'
import { EditImage } from './EditImage'
import { EditName } from './EditName'

type Props = {}

export const Setting: React.FC<Props> = () => {
  const { conversation } = useConversationStore()
  const [openEditName, setOpenEditName] = useState(false)

  return (
    <Container
    // className={classnames({
    //   close: close,
    // })}
    >
      <Body>
        <Avatar size={64} src={conversation?.image} />
        <Name>{conversation?.name}</Name>
        <StyledCollapse
          bordered={false}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
        >
          <StyledCollapse.Panel header="Conversation setting" key="setting">
            <div className="flex flex-col gap-1">
              <Item onClick={() => setOpenEditName(true)}>
                <EditFilled />
                <span>Edit conversation name</span>
              </Item>
              <EditImage />
            </div>
          </StyledCollapse.Panel>
          <StyledCollapse.Panel header="Member" key="member">
            <p>abcd</p>
          </StyledCollapse.Panel>
        </StyledCollapse>
      </Body>
      {/* <Footer onClick={() => setClose(!close)}>
        <StyledStepBackwardIcon
          className={classnames({
            close: close,
          })}
        />
      </Footer> */}
      <EditName
        open={openEditName}
        onClose={() => {
          setOpenEditName(false)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  ${tw`flex flex-col border-r-[1px] border-gray-200 w-80`}

  &.close {
    ${tw`w-20`}
  }

  transition: 0.5s;
`

const Body = styled.div`
  ${tw`flex-1 flex flex-col items-center py-10 gap-3`}
`

const Name = styled.span`
  ${tw`text-2xl text-gray-300 font-semibold`}
`

const Item = styled.div`
  ${tw`flex gap-3 text-gray-300 items-center py-2 px-3 rounded hover:bg-gray-500 cursor-pointer`}
`

const StyledCollapse = styled(Collapse)`
  ${tw`w-full bg-gray-700 text-gray-300`}

  .ant-collapse-item {
    ${tw`hover:bg-gray-600`}
    border-bottom: none;

    .ant-collapse-header {
      ${tw`text-gray-300`}
    }

    /* .ant-collapse-content {
      .ant-collapse-content-box {
        ${tw`px-0`}
      }
    } */
  }
`

// const Footer = styled.div`
//   ${tw`h-14 flex justify-center items-center cursor-pointer`}

//   .close {
//     transform: rotate(0);
//     transition: 0.5s;
//   }

//   span {
//     transform: rotate(180deg);
//     transition: 0.5s;
//   }
// `

// const StyledStepBackwardIcon = styled(StepBackwardOutlined)`
//   ${tw`text-xl text-gray-400 cursor-pointer`}
// `
