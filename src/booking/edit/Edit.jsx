import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "_layouts/DashboardLayout";
import { bookingActions } from "_store/bookings.slice";
import { history } from "../../_helpers";
import { Form } from "../Form";

export { EditBooking };

function EditBooking() {
  const dispatch = useDispatch();
  const { id } = useParams(); // id will be "6417711c0e5b94bb44acfe29"

  const booking = useSelector((state) => state.bookings.booking);
  const message = useSelector((state) => state.bookings.message);
  const error = useSelector((state) => state.bookings.error);
  const success = useSelector((state) => state.bookings.success);

  const data = booking ? booking : {};

  useEffect(() => {
    dispatch(bookingActions.getById(id));
  }, [dispatch]);

  function onSubmit(data) {
    // console.log({ data });
    console.log("edit onSubmit...");

    dispatch(bookingActions.updateBooking(data)).then((res) => {
      console.log({ res });
      history.navigate("/bookings");
    });
  }

  return (
    <DashboardLayout>
      <div className="pagetitle">
        <h1>Edit Booking</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Bookings</li>
          </ol>
        </nav>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Edit Booking: {data.propertyId?.name}
                </h5>

                {data && data.id && (
                  <Form onSubmit={onSubmit} data={data}></Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
