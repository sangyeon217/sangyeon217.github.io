import { HTMLAttributes, ReactNode, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsCheck, BsCopy } from "react-icons/bs";
import Clipboard from "clipboard";
import { Tooltip } from "react-tooltip";

type CodeProps = {
  isBlock?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

type UseClipboardProps = {
  copyBtnRef: React.RefObject<HTMLButtonElement>;
  setCopied: React.Dispatch<React.SetStateAction<boolean>>;
};

const InlineCode = styled.code`
  padding: 2px 5px;
  border-radius: 3px;
  font-family: "Nanum Gothic Coding", monospace;
  background: #f1f3f5;
`;

const BlockCodeContainer = styled.div`
  position: relative;
  border-radius: 8px;
  background-color: #2d2d2d; /* PrismJS 테마 배경색상과 동일해야함 */
`;

const BlockCode = styled.pre`
  width: 88%;
  margin: 30px 0 !important;
  border-radius: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  & * {
    font-family: "Nanum Gothic Coding", monospace !important;
  }
`;

const CopyBtnContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 12%;
  height: 100%;
  display: block;
`;

const CopyBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: rgba(
      80,
      80,
      80,
      0.9
    ); /* PrismJS 테마 배경색상과 어울리는 색상이어야함 */
    opacity: 1;
    border-radius: 3px;
    transition-duration: 0.1s;
  }
`;

const useClipboard = ({ copyBtnRef, setCopied }: UseClipboardProps) => {
  useEffect(() => {
    if (!copyBtnRef.current) return;

    const clipboard = new Clipboard(copyBtnRef.current);

    clipboard.on("success", () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

    clipboard.on("error", () => {
      alert("복사에 실패했습니다. 다시 시도해주세요!");
    });

    return () => {
      clipboard.destroy();
    };
  }, [copyBtnRef, setCopied]);
};

export default function Code({
  isBlock = false,
  children,
  ...props
}: CodeProps) {
  if (!isBlock) return <InlineCode {...props}>{children}</InlineCode>;
  else {
    const copyBtnRef = useRef<HTMLButtonElement>(null);
    const [isCopied, setCopied] = useState<boolean>(false);

    useClipboard({ copyBtnRef, setCopied });

    return (
      <BlockCodeContainer {...props}>
        <CopyBtnContainer>
          <CopyBtn
            ref={copyBtnRef}
            data-clipboard-text={children as string}
            data-tooltip-id="copy-tooltip"
          >
            {isCopied ? (
              <BsCheck size="16" color="#7cfc00" />
            ) : (
              <BsCopy size="16" color="#9198a1" />
            )}
          </CopyBtn>
        </CopyBtnContainer>
        <Tooltip
          id="copy-tooltip"
          isOpen={isCopied}
          place="left"
          content="Copied!"
          style={{
            padding: "4px 8px",
            borderRadius: "3px",
            color: "white",
            fontSize: "12px",
            backgroundColor: "#333",
            zIndex: "10",
          }}
        />
        <BlockCode>
          <code {...props}>{children}</code>
        </BlockCode>
      </BlockCodeContainer>
    );
  }
}
