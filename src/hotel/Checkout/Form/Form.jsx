import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export { Form };

function Form(props) {
  const navigate = useNavigate();

  const [id, setId] = useState(props?.data?.id || "");
  const [name, setName] = useState("Deven Sitapara");
  const [email, setEmail] = useState("dev@test3.com");
  const [dateCheckIn, setDateCheckIn] = useState(new Date());
  const [dateCheckOut, setDateCheckOut] = useState(new Date());
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState("1");
  const [specialRequest, setSpecialRequest] = useState("");
  const [roomTypes, setRoomTypes] = useState(props?.data?.roomTypes);
  const [price, setPrice] = useState(123);

  // const [roomType, setRoomType] = useState(props?.data?.roomTypes[0].name);
  // const [price, setPrice] = useState(props?.data?.roomTypes[0].price);

  useEffect(() => {
    console.log("props.data --- ", props.data);
    // console.log("props.data?.roomTypes ", props.data?.roomTypes[0].name);
    console.log({ id });
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Property name is required"),
    email: Yup.string().email().required("Email is required"),
    // dateCheckIn: Yup.date().required("Checkin is required"),
    // dateCheckOut: Yup.date().required("Checkout is required"),
  });
  const formOptions = {
    defaultValues: {},
    // mode: "onChange",
    resolver: yupResolver(validationSchema),
  };
  // get functions to build form with useForm() hook
  const { register, control, handleSubmit, formState, setValue } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function beforeSubmit(data) {
    data.dateCheckIn = dateCheckIn;
    data.dateCheckOut = dateCheckOut;
    props.onSubmit(data);
  }
  return (
    <form
      form
      onSubmit={handleSubmit(beforeSubmit)}
      className="row  needs-validation"
      noValidate
    >
      <div className="wow fadeInUp" data-wow-delay="0.2s">
        <div className="mt-4 alert alert-info">
          Note: This form is prefilled for testing purpose.
        </div>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                {...register("name")}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                required
              />
              <div className="invalid-feedback">{errors.name?.message}</div>

              <label htmlFor="name">Your Name</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                {...register("email")}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                required
              />
              <div className="invalid-feedback">{errors.email?.message}</div>

              <label htmlFor="email">Your Email</label>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="form-floating date"
              id="date3"
              data-dateCheckIn-input="nearest"
            >
              <Calendar
                {...register("dateCheckIn")}
                value={dateCheckIn}
                onChange={(e) => {
                  setDateCheckIn(e.target.value);
                  setValue("dateCheckIn", e.target.value);
                }}
                showIcon
                placeholder="Check In"
              />
              <div className="invalid-feedback">
                {errors.dateCheckIn?.message}
              </div>

              {/* <label htmlFor="checkin">Check In</label> */}
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="form-floating date"
              id="date4"
              data-target-input="nearest"
            >
              <Calendar
                {...register("dateCheckOut")}
                value={dateCheckOut}
                onChange={(e) => {
                  setDateCheckOut(e.target.value);
                  setValue("dateCheckOut", e.target.value);
                }}
                showIcon
                placeholder="Check Out"
              />
              <div className="invalid-feedback">
                {errors.dateCheckOut?.message}
              </div>

              {/* <label htmlFor="checkout">Check Out</label> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select"
                id="adults"
                {...register("adults")}
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
              >
                <option value="1">Adult 1</option>
                <option value="2">Adult 2</option>
                <option value="3">Adult 3</option>
              </select>
              <div className="invalid-feedback">{errors.adults?.message}</div>

              <label htmlFor="adults">Select Adult</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select"
                id="children"
                {...register("children")}
                value={children}
                onChange={(e) => setChildren(e.target.value)}
              >
                <option value="0">Child 0</option>
                <option value="1">Child 1</option>
                <option value="2">Child 2</option>
                <option value="3">Child 3</option>
              </select>
              <div className="invalid-feedback">{errors.children?.message}</div>

              <label htmlFor="children">Select Child</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <select
                className="form-select"
                id="room"
                {...register("room")}
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              >
                <option value="1">Room 1</option>
                <option value="2">Room 2</option>
                <option value="3">Room 3</option>
              </select>
              <div className="invalid-feedback">{errors.room?.message}</div>

              <label htmlFor="room">Select A Room</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Special Request"
                id="message"
                style={{ height: "100px" }}
                {...register("specialRequest")}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              ></textarea>
              <div className="invalid-feedback">
                {errors.specialRequest?.message}
              </div>

              <label htmlFor="message">Special Request</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating">
              <h1>Price : ₹ {roomTypes[props.roomType].price}</h1>

              <label htmlFor="message"></label>
            </div>
          </div>
          <div className="col-12">
            {id && (
              <input type="hidden" {...register("propertyId")} value={id} />
            )}

            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary w-100 py-3"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Book Now
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
