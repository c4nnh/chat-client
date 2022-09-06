import { Route, Routes } from "react-router-dom";
import { END_POINTS } from "../../constants/endpoints";
import { Message } from "./Message";

export const PrivatePages: React.FC = () => {
  return (
    <Routes>
      <Route path={END_POINTS.PRIVATE.MESSAGE} element={<Message />} />
      <Route path="" element={<Message />} />
    </Routes>
  );
};
