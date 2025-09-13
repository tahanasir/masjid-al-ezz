import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Router";

function App() {
  return (
    <BrowserRouter basename="/">
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
