import FileIcon from "./SVG/FileIcon";
import RightArrowIcon from "./SVG/Right";

interface IProps {
  filename: string;
}

const FileComponent = ({ filename }: IProps) => {
  return (
    <div className="flex items-center">
      <RightArrowIcon />
      <span className="mr-2">
        <FileIcon />
      </span>
      <span className="mr-2">{filename}</span>
    </div>
  );
};

export default FileComponent;
