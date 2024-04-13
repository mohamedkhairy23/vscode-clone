import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import { useState } from "react";
import DropMenu from "./ui/ContextMenu";

const OpenedFilesBar = () => {
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="w-fit">
      <div
        className="flex items-center border-b-[1px] border-[#ffffff1f]"
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuPosition({ x: e.clientX, y: e.clientY });
          setShowMenu(true);
        }}
      >
        {openedFiles.map((file) => (
          <OpenedFilesBarTab key={file.id} file={file} />
        ))}
      </div>{" "}
      {showMenu && (
        <DropMenu positions={menuPosition} setShowMenu={setShowMenu} />
      )}
    </div>
  );
};

export default OpenedFilesBar;
