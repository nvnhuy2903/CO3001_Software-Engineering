import { Provider } from "./components/ui/provider";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
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
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider>
      <div>
        <Routes> 
          {/* Public Routes */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>

          {/* Protected Routes */}
          <Route 
            path="/homepage" 
            element={
              <PrivateRoute>
                <UserInfo />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/homepage/report" 
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/homepage/logout" 
            element={
              <PrivateRoute>
                <Logout />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/service" 
            element={
              <PrivateRoute>
                <PrinterSearching />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/service/logPrinting" 
            element={
              <PrivateRoute>
                <LogPrinting />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/transaction" 
            element={
              <PrivateRoute>
                <AccountBalance />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/transaction/logTrans" 
            element={
              <PrivateRoute>
                <LogTransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/print" 
            element={
              <PrivateRoute>
                <Printing />
              </PrivateRoute>
            }
          ></Route>
          <Route 
            path="/aboutUs" 
            element={<AboutUs />}
          ></Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;