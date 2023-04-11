import { useDispatch } from "react-redux";
import { history } from "_helpers";
import { DashboardLayout } from "_layouts/DashboardLayout";
import { bookingActions } from "_store/bookings.slice";
import { Form } from "../Form";

export { AddBooking };

function AddBooking() {
  const dispatch = useDispatch();

  function onSubmit(data) {
    console.log("onSubmit...");
    dispatch(bookingActions.createBooking(data)).then((res) =>
      history.navigate("/bookings")
    );
  }

  return (
    <DashboardLayout>
      <div className="pagetitle">
        <h1>Add Booking</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Bookings</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add New Booking</h5>

                {/* <!-- General Form Elements --> */}
                <Form onSubmit={onSubmit}></Form>

                {/* <!-- End General Form Elements --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
