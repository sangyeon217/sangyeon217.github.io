import { Link } from "gatsby";
import styled from "styled-components";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
`;

const Title = styled(Link)`
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  color: inherit;
`;

const Menu = styled.div`
  display: flex;
  gap: 15px;
  font-size: 25px;

  & > a {
    display: flex;
    color: initial;
  }
`;

export default function Header() {
  return (
    <Wrapper>
      <Title to="/">Sangyeon Song</Title>

      <Menu>
        <a
          href="https://github.com/sangyeon217"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/sangyeon-song-301383202/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin />
        </a>
      </Menu>
    </Wrapper>
  );
}
