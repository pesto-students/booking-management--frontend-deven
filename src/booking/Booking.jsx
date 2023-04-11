import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DashboardLayout } from "_layouts/DashboardLayout";

import DataGrid from "./DataGrid";

export { Booking };

function Booking() {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="pagetitle">
        <h1>Bookings</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li className="breadcrumb-item active">Bookings </li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title d-flex flex-row-reverse"></h5>
                <div className="action"></div>
                <div>
                  <DataGrid></DataGrid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
