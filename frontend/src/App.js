import { Provider } from "./components/ui/provider"
import { Routes, Route, Link } from "react-router-dom";

import Report from "./components/Report";
import Logout from "./components/Logout";
import UserInfo from "./components/UserInfo";
import AboutUs from "./components/AboutUs";
import LogPrinting from "./components/LogPrinting";
import AccountBalance from "./components/AccountBalance";
import LogTransaction from "./components/LogTransaction";
import PrinterSearching from "./components/PrinterSearching";
import Printing from "./components/Printing";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Provider>
      <div>
        <Routes> 
          <Route path="/homepage/report" element={<Report />}></Route>
          <Route path="/homepage/logout" element={<Logout />}></Route>
          <Route path="/homepage" element={<UserInfo />}></Route>

          <Route path="/aboutUs" element={<AboutUs />}></Route>

          <Route path="/service/logPrinting" element={<LogPrinting />}></Route>
          <Route path="/service" element={<PrinterSearching />}></Route>

          <Route path="/transaction/logTrans" element={<LogTransaction />}></Route>
          <Route path="/transaction" element={<AccountBalance />}></Route>

          <Route path="/print" element={<Printing />}></Route>

          <Route path="/" element={<LandingPage />}></Route>

          <Route path="*" element={<h1>404 Not Founding</h1>}></Route>

        </Routes>
      </div>
    </Provider>
  );
}


export default App;
