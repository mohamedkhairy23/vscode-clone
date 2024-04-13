import { useState } from "react";
import { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFile, setOpenedFiles } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { name, isFolder, children, id, content } = fileTree;
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = () => setIsOpen((prev) => !prev);

  const onFileClicked = () => {
    const exists = doesFileObjectExist(openedFiles, id);
    dispatch(
      setClickedFile({ filename: name, fileContent: content, activeTabId: id })
    );
    if (exists) return;

    dispatch(setOpenedFiles([...openedFiles, fileTree]));
  };

  return (
    <div className="mb-2 ml-2 cursor-pointer">
      <div className="flex items-center mb-1.5">
        {isFolder ? (
          <div onClick={toggle} className="flex items-center">
            <span>{isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}</span>
            <RenderFileIcon
              filename={name}
              isFolder={isFolder}
              isOpen={isOpen}
            />
            <span>{name}</span>
          </div>
        ) : (
          <div className="flex items-center ml-2" onClick={onFileClicked}>
            <RenderFileIcon filename={name} />
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
