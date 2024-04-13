import { useEffect, useRef } from "react";
import {
  setClickedFile,
  setOpenedFiles,
} from "../../app/features/fileTreeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IProps {
  setShowMenu: (val: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
}

const ContextMenu = ({ positions: { x, y }, setShowMenu }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { openedFiles, tabIdToRemove } = useSelector(
    (state: RootState) => state.tree
  );

  const closeAll = () => {
    dispatch(setOpenedFiles([]));
    setShowMenu(false);
  };

  const onCloseSingleTab = () => {
    const filtered = openedFiles.filter((file) => file.id !== tabIdToRemove);

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
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setShowMenu(false);
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div ref={menuRef}>
      <ul
        className="bg-white text-black w-fit px-7 py-2 rounded-md"
        style={{ position: "absolute", left: x, top: y }}
      >
        <li
          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300 duration-300 rounded-sm"
          onClick={onCloseSingleTab}
        >
          Close
        </li>
        <li
          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-300 duration-300 rounded-sm"
          onClick={closeAll}
        >
          Close All
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
