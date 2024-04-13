import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import {
  setClickedFile,
  setOpenedFiles,
  setTabIdToRemoveAction,
} from "../app/features/fileTreeSlice";
import CloseIcon from "./SVG/CloseIcon";
import { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();

  const {
    openedFiles,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.tree);

  const onClick = () => {
    const { id, name, content } = file;
    dispatch(
      setClickedFile({ filename: name, fileContent: content, activeTabId: id })
    );
  };

  const onRemove = (selectedId: string) => {
    const filtered = openedFiles.filter((file) => file.id !== selectedId);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(
        setClickedFile({
          activeTabId: null,
          fileContent: "",
          filename: "",
        })
      );
      dispatch(setOpenedFiles([]));

      return;
    }
    const { id, name, content } = filtered[filtered.length - 1];
    dispatch(setOpenedFiles(filtered));
    dispatch(
      setClickedFile({
        activeTabId: id,
        fileContent: content,
        filename: name,
      })
    );
  };

  return (
    <div
      className={`flex items-center p-2 border-t-2 ${
        file?.id === activeTabId ? "border-[#cf6ccf]" : "border-transparent"
      }`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setTabIdToRemoveAction(file.id));
      }}
    >
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mr-2 pl-1 rounded-md">
        {file.name}
      </span>
      <span
        className="cursor-pointer hover:bg-[#64646473] text-black duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
