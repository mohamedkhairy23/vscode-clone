import RecursiveComponent from "./components/RecursiveComponent";
import { fileTree } from "./data/fileTree";

function App() {
  return (
    <div className="m-7">
      <RecursiveComponent fileTree={fileTree} />
    </div>
  );
}

export default App;