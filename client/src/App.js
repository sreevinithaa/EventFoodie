import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./pages/Login";
import Dashboard from "./component/Dashboard";
import Register from "./component/Register";
import Menu from "./component/Menu";
import ProgramDetail from "./component/ProgramDetail";
import VendorDetail from "./component/VendorDetail";
import Profile from "./component/Profile";
import Order from "./pages/Order";
import MenuPage from "./pages/MenuPage";
import Vendor from "./pages/Vendor";
import MyOrderDetail from "./component/MyOrderDetail";
import Success from "./pages/Success";
import Cart from "./component/Cart/index";
import { StoreProvider } from "./utils/GlobalState";
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Header />
          <div className="flex flex-col min-h-[82vh]">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Register />} />
              <Route exact path="/program/:id" element={<ProgramDetail />} />
              <Route exact path="/vendors/:id" element={<VendorDetail />} />
              <Route exact path="/orders" element={<Order />} />
              <Route exact path="/order/:id" element={<Menu />} />
              <Route exact path="/vendor" element={<Vendor />} />
              <Route exact path="/menu" element={<MenuPage />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/MyOrderDetail" element={<MyOrderDetail />} />
              <Route 
                path="/success" 
                element={<Success />} 
              />
            </Routes>
          </div>
          <Footer />
          <Cart />
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
