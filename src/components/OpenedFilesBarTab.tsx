import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";

interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  return (
    <div className="flex items-center p-2">
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mr-2 pl-1 rounded-md">
        {file.name}
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
