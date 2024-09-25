import { GatsbySSR } from "gatsby";
import Layout from "./src/components/common/Layout";

const HeadComponents = [
  <link
    rel="stylesheet"
    as="style"
    crossOrigin="anonymous"
    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
    key="pretendard-font"
  />,
];

const PostBodyComponents = [
  <script
    key="buyMeACoffee"
    data-name="BMC-Widget"
    data-cfasync="false"
    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    data-id="sangyeon217"
    data-description="Support me on Buy me a coffee!"
    data-message=""
    data-color="#5F7FFF"
    data-position="Right"
    data-x_margin="18"
    data-y_margin="18"
  ></script>,
];

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
  setPostBodyComponents,
}) => {
  setHeadComponents(HeadComponents);
  setPostBodyComponents(PostBodyComponents);
};

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({
  element,
  props,
}) => {
  return <Layout {...props}>{element}</Layout>;
};
