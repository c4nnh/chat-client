import { Route, Routes } from 'react-router-dom'
import { BunnyJumpDetail } from './Detail'
import { ListRoom } from './ListRooms'

export const BunnyJump: React.FC = () => {
  return (
    <Routes>
      <Route path="" element={<ListRoom />} />
      <Route path=":id" element={<BunnyJumpDetail />} />
    </Routes>
  )
}
