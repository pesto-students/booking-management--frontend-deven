import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { history } from "./_helpers";
import { Nav, PrivateRoute } from "./_components";
import { Home } from "./home";
import { Login } from "./login";
import { Register } from "register";
import { Property } from "property";
import { AddProperty } from "property/add";
import { EditProperty } from "property/edit";
import { Checkout } from "hotel/Checkout";
import { Booking } from "booking";
import { EditBooking } from "booking/edit";
import { AddBooking } from "booking/add";

export { App };

function App() {
  // init custom history object to allow navigation from
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/properties"
          element={
            <PrivateRoute>
              <Property />
            </PrivateRoute>
          }
        />
        <Route
          path="/property/add"
          element={
            <PrivateRoute>
              <AddProperty />
            </PrivateRoute>
          }
        />
        <Route
          path="/property/edit/:id"
          element={
            <PrivateRoute>
              <EditProperty />
            </PrivateRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        />
        <Route
          path="/booking/add"
          element={
            <PrivateRoute>
              <AddBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/booking/edit/:id"
          element={
            <PrivateRoute>
              <EditBooking />
            </PrivateRoute>
          }
        />

        {/*  Guest routes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hotel/booking/:roomType/:id" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
