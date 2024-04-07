import IconImg from "./IconImg";
import FileIcon from "./SVG/FileIcon";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}

const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extension = filename.split(".").pop();

  // files
  if (extension === "tsx") return <IconImg src="/icons/react_ts.svg" />;
  if (extension === "js") return <IconImg src="/icons/javascript.svg" />;
  if (extension === "jsx") return <IconImg src="/icons/react.svg" />;
  if (extension === "html") return <IconImg src="/icons/html.svg" />;

  // folders
  if (isFolder && extension === "node_modules")
    return isOpen ? (
      <IconImg src="/icons/folder-node-open.svg" />
    ) : (
      <IconImg src="/icons/folder-node.svg" />
    );
  if (isFolder && extension === "public")
    return isOpen ? (
      <IconImg src="/icons/folder-public-open.svg" />
    ) : (
      <IconImg src="/icons/folder-public.svg" />
    );
  if (isFolder && extension === "src")
    return isOpen ? (
      <IconImg src="/icons/folder-src-open.svg" />
    ) : (
      <IconImg src="/icons/folder-src.svg" />
    );
  if (isFolder && extension === "components")
    return isOpen ? (
      <IconImg src="/icons/folder-components-open.svg" />
    ) : (
      <IconImg src="/icons/folder-components.svg" />
    );

  if (isFolder && isOpen)
    return <IconImg src="/icons/folder-default-open.svg" />;
  if (isFolder && !isOpen) return <IconImg src="/icons/folder-default.svg" />;

  return <FileIcon />;
};

export default RenderFileIcon;
