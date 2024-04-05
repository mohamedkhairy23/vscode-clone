import { useState } from "react";
import { IFile } from "../interfaces";
import FileIcon from "./SVG/FileIcon";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({
  fileTree: { name, isFolder, children },
}: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="mb-2 ml-2 cursor-pointer">
      <div className="flex items-center mb-1">
        {isFolder ? (
          <div onClick={toggle} className="flex items-center">
            {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            <FileIcon />
            <span>{name}</span>
          </div>
        ) : (
          <div className="flex items-center mr-2">
            <FileIcon />
            <span className="ml-2">{name}</span>
          </div>
        )}
      </div>

      {isOpen &&
        children &&
        children?.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
