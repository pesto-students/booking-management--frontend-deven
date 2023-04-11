import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { destinations, parseBoolean, _defaultPrices } from "_helpers";
import { Calendar } from "primereact/calendar";
import { bookingActions } from "_store/bookings.slice";
import { useDispatch, useSelector } from "react-redux";
import { Property } from "property";
import { propertyActions } from "_store/properties.slice";

export { Form };

function Form(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log({_defaultPrices});
  console.log("props.data ", props.data);
  const [id] = useState(props?.data?.id || "");
  const [name, setName] = useState(props?.data?.name || "Your Name");
  const [email, setEmail] = useState(props?.data?.email || "your@email.com");
  const [dateCheckIn, setDateCheckIn] = useState(
    new Date(props?.data?.dateCheckIn) || new Date()
  );
  const [dateCheckOut, setDateCheckOut] = useState(
    new Date(props?.data?.dateCheckOut) || new Date()
  );
  const [adults, setAdults] = useState(props?.data?.adults || 1);
  const [children, setChildren] = useState(props?.data?.children || 0);
  const [room, setRoom] = useState(props?.data?.room || 1);
  const [specialRequest, setSpecialRequest] = useState(
    props?.data?.specialRequest || "Your special Request"
  );

  const [propertyId, setPropertyId] = useState(
    props?.data?.propertyId?._id || ""
  );
  const [status, setStatus] = useState(parseBoolean(props?.data?.status));

  const properties = useSelector((state) => state.properties.properties);

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("name is required"),
    email: Yup.string().required(" email is required"),
    dateCheckIn: Yup.string().required(" dateCheckIn is required"),
    dateCheckOut: Yup.string().required(" dateCheckOut is required"),
    adults: Yup.string().required(" adults is required"),
    children: Yup.string().required(" children is required"),
    room: Yup.string().required(" room is required"),
    specialRequest: Yup.string().required(" specialRequest is required"),
    status: Yup.string().required(" status is required"),
    propertyId: Yup.string().required(" propertyId is required"),
  });
  const formOptions = {
    defaultValues: {
      name: name,
      email: email,
      dateCheckIn: dateCheckIn,
      dateCheckOut: dateCheckOut,
      adults: adults,
      children: children,
      room: room,
      specialRequest: specialRequest,
      status: status,
      propertyId: propertyId,
      id: id,
    },
    // mode: "onChange",
    resolver: yupResolver(validationSchema),
  };
  // get functions to build form with useForm() hook
  const { register, control, handleSubmit, formState, setValue } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function beforeSubmit(data) {
    data.status = parseBoolean(data.status);
    props.onSubmit(data);
  }

  useEffect(() => {
    console.log({ properties });
    dispatch(propertyActions.getAll());
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit(beforeSubmit)}
      className="row g-3 needs-validation"
      noValidate
    >
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Hotel
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="propertyId"
            {...register("propertyId")}
            value={propertyId}
            onChange={(e) => setPropertyId(e.target.value)}
            defaultValue={propertyId}
          >
            {properties &&
              properties.properties &&
              properties.properties.map((ele) => {
                // const selected = ele.id == propertyId ? true : false;
                // selected={selected}
                return <option value={ele.id}>{ele.name}</option>;
              })}
          </select>
          <div className="invalid-feedback">{errors.propertyId?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Name
        </label>
        <div className="col-sm-10">
          <InputText
            {...register("name")}
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            required
          />
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <InputText
            {...register("email")}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            required
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Check-In Date
        </label>
        <div className="col-sm-10">
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
          <div className="invalid-feedback">{errors.dateCheckIn?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Check-Out Date
        </label>
        <div className="col-sm-10">
          <Calendar
            {...register("dateCheckOut")}
            value={dateCheckOut}
            onChange={(e) => {
              setDateCheckOut(e.target.value);
              setValue("dateCheckOut", e.target.value);
            }}
            showIcon
            placeholder="Check In"
          />
          <div className="invalid-feedback">{errors.dateCheckOut?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Adults
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="adults"
            {...register("adults")}
            defaultValue={adults}
            onChange={(e) => setAdults(e.target.value)}
          >
            <option value="1">Adult 1</option>
            <option value="2">Adult 2</option>
            <option value="3">Adult 3</option>
          </select>
          <div className="invalid-feedback">{errors.adults?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Children
        </label>
        <div className="col-sm-10">
          <select
            className="form-select"
            id="children"
            {...register("children")}
            defaultValue={children}
            onChange={(e) => setChildren(e.target.value)}
          >
            <option value="0">Child 0</option>
            <option value="1">Child 1</option>
            <option value="2">Child 2</option>
            <option value="3">Child 3</option>
          </select>
          <div className="invalid-feedback">{errors.children?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Rooms
        </label>
        <div className="col-sm-10">
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
            <option value="4">Room 4</option>
            <option value="5">Room 5</option>
          </select>
          <div className="invalid-feedback">{errors.room?.message}</div>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="name" className="col-sm-2 col-form-label">
          Special Request
        </label>
        <div className="col-sm-10">
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
        </div>
      </div>

      <div className="row mb-3">
        <label
          className="col-sm-2 col-form-label form-check-label"
          htmlFor="Status"
        >
          Status
        </label>
        <div className="col-sm-10">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              {...register("status")}
              id="Status"
              value={status}
              onChange={(e) => setStatus(!status)}
              checked={status}
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label"> </label>
        <div className="col-sm-10">
          {id && <input type="hidden" {...register("id")} value={id} />}
          {/* {propertyId && (
            <input
              type="hidden"
              {...register("propertyId")}
              value={propertyId}
            />
          )} */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary"
          >
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm mr-1"></span>
            )}
            Submit Form
          </button>
          <button
            type="reset"
            className="btn mx-2 btn-default"
            onClick={() => navigate("/bookings")}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
