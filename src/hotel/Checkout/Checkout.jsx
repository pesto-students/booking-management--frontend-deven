import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { history } from "_helpers";
import { BlankLayout } from "_layouts/BlankLayout";
import { LoginLayout } from "_layouts/LoginLayout";
import { bookingActions } from "_store/bookings.slice";
import { propertyActions } from "_store/properties.slice";
import { Form } from "./Form";

export { Checkout };

function Checkout() {
  const dispatch = useDispatch();
  const { roomType, id } = useParams(); // hotel/checkout:id   , id will be "6417711c0e5b94bb44acfe29"

  //  const property = useSelector((state) => state.properties.properties.property);
  const booking = useSelector((state) => state.bookings.booking);
  const property = useSelector((state) => state.properties.property);
  const loading = useSelector((state) => state.properties.loading);

  //   const message = useSelector((state) => state.properties.message);
  const [message, setMessage] = useState(null);
  const error = useSelector((state) => state.properties.error);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    dispatch(propertyActions.getById(id));
    //    console.log({ property,loading});

    //    console.log({ property,loading});
  }, [dispatch]);

  useEffect(() => {
    console.log({ property });
  }, []);

  const data = property ? property : false;

  function onSubmit(data) {
    console.log("bookings onSubmit...");
    // console.log({propertyActions});
    console.log({ data });

    dispatch(bookingActions.createBooking(data)).then((res) => {
      console.log({ res });
      //   setTimeout(dispatch(propertyActions.getAll(getAllQ)), 3000);

      //   res?.error?.message && setError(true) && setMessage(res.error.message);
      //   res.id && setSuccess(true) && setMessage("Success");
      // history.navigate("/properties");
    });
  }

  useEffect(() => {
    console.log({ booking, error, success, message });
    if (booking && booking.id) {
      setSuccess(true);
    }
  }, [booking]);

  return (
    <BlankLayout>
      <div className="pt-4 pb-2">
        <h4 className="card-title text-center pb-0 fs-3">{property.name}</h4>

        {!success && (
          <>
            <h5 className="card-title text-center pb-0 fs-4">
              Booking [{property?.name && property?.roomTypes[roomType].name}]
            </h5>
            <p className="text-center small">
              Please enter your bookings information
            </p>
          </>
        )}
      </div>

      {property?.name && roomType && !success && (
        <Form onSubmit={onSubmit} data={property} roomType={roomType}></Form>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          <ul>
            <li>Your booking is successfully done!</li>
            <li>A confirmation mail is sent to your email address!</li>
            <li>You will get confirmation call shortely!</li>
            <li>Have a nice stay!</li>
          </ul>
        </div>
      )}
    </BlankLayout>
  );
}
