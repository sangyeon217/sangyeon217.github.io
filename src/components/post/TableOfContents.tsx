import styled from "styled-components";
import { GatsbyLinkProps, Link } from "gatsby";
import useTableOfContents from "../../hooks/useTableOfContents";

type TableOfContentsProps = {
  content: Queries.ContentfulPostContent;
};

const Wrapper = styled.div`
  position: sticky;
  top: 100px;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #000000;
  font-size: 15px;
  font-weight: 600;
`;

const Items = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 20px;
`;

const Item = styled(({ className, children, to }: GatsbyLinkProps<unknown>) => (
  <Link to={to} onClick={(e) => handleScroll(e, to)} className={className}>
    {children}
  </Link>
))<{ $depth: number; $focused: boolean }>`
  padding-left: ${({ $depth }) => $depth * 10}px;
  font-size: 13px;
  font-weight: ${({ $focused }) => ($focused ? 700 : 300)};
  color: rgba(30, 31, 33, ${({ $focused }) => ($focused ? 1 : 0.5)});
  cursor: pointer;
  text-decoration: none;
  transition: 0.1s all;
`;

const handleScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  targetId: string,
) => {
  e.preventDefault();

  const headerElement = document.querySelector("#header");
  const stickyHeaderHeight = headerElement
    ? headerElement.getBoundingClientRect().height
    : 0;

  const target = document.querySelector(targetId);
  if (!target) return;

  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - stickyHeaderHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export default function TableOfContents({
  content: { raw },
}: TableOfContentsProps) {
  const { toc, activeId } = useTableOfContents(raw as string);

  return (
    <Wrapper>
      <Title>Table of Contents</Title>
      <Items>
        {toc.map(({ id, title, depth }) => (
          <Item
            to={`#${id}`}
            key={id}
            $depth={depth}
            $focused={id === activeId}
          >
            {title}
          </Item>
        ))}
      </Items>
    </Wrapper>
  );
}
