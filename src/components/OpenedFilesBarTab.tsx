import { useDispatch } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import { setClickedFile } from "../app/features/fileTreeSlice";

interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();

  // ** Handlers
  const onClick = () => {
    const { name, content } = file;
    dispatch(setClickedFile({ filename: name, fileContent: content }));
  };

  return (
    <div className="flex items-center p-2" onClick={onClick}>
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mr-2 pl-1 rounded-md">
        {file.name}
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
