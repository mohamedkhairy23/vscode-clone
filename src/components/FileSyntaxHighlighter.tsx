import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface IProps {
  content: string | undefined;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  return (
    <SyntaxHighlighter language="javascript" style={docco}>
      {String(content)}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlighter;
