import styled from "styled-components";
import tw from "twin.macro";

function App() {
  return <StyledDiv>React</StyledDiv>;
}

export default App;

const StyledDiv = styled.div`
  ${tw`text-blue-500`}
`;
