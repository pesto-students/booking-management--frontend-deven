import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { destinations, _defaultPrices } from "_helpers";

export { Form };

function Form(props) {
  const navigate = useNavigate();

  const defaultPrices = props?.data?.roomTypes
    ? props?.data?.roomTypes
    : _defaultPrices;

  // console.log({_defaultPrices});
  // console.log("props.data " , props.data);
  const [id] = useState(props?.data?.id || "");
  const [name, setName] = useState(props?.data?.name || "Your Hotel");
  const [status, setStatus] = useState(
    typeof props?.data?.status === "boolean" ? props?.data?.status : true
  );
  const [prices, setPrices] = useState(defaultPrices);
  const [selectedDestination, setSelectedDestination] = useState(
    props?.data?.destination || 1
  );

  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Property name is required"),
    destination: Yup.string().required("Destination is required"),
  });
  const formOptions = {
    defaultValues: {
      name: name,
      destination: selectedDestination,
      roomTypes: prices,
    },
    // mode: "onChange",
    resolver: yupResolver(validationSchema),
  };
  // get functions to build form with useForm() hook
  const { register, control, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  //price field
  const {
    fields,
    replace: replacePriceField,
    update: updatePriceField,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "roomTypes", // unique name for your Field Array
  });

  useEffect(() => {
    replacePriceField(prices);
    // console.log("fields", fields);
  }, [prices, replacePriceField]);

  return (
    <form
      onSubmit={handleSubmit(props.onSubmit)}
      className="row g-3 needs-validation"
      noValidate
    >
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
        <label htmlFor="destination" className="col-sm-2 col-form-label">
          Destination
        </label>
        <div className="col-sm-10">
          <div className={errors.destination && "is-invalid"}>
            {destinations.map(({ name, id }, index) => {
              return (
                <div key={id} className="flex align-items-center">
                  <div className="form-check">
                    <input
                      {...register("destination", { required: true })}
                      type="radio"
                      className="form-check-input"
                      value={id}
                      id={`destination_${id}`}
                      checked={selectedDestination == id}
                      onChange={(e) => setSelectedDestination(e.target.value)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`destination_${id}`}
                    >
                      {name}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="invalid-feedback">
            {errors.destination && errors.destination?.message}
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <legend className="col-form-label col-sm-2 pt-0" htmlFor="price_1">
          Room Types
        </legend>
        <div className="col-sm-10">
          <div className="  flex flex-wrap gap-3 p-fluid">
            <div className={errors.destination && "is-invalid"}>
              {fields.map((priceField, index) => (
                <div
                  key={priceField._id}
                  id={priceField._id}
                  className="flex-auto"
                >
                  <div class="container">
                    <div class="row">
                      <div class="col">
                        <label
                          className="font-bold block mb-2"
                          htmlFor={`roomTypes_${priceField._id}`}
                        >
                          {priceField.name}
                        </label>
                        <input
                          className="form-control"
                          id={`roomTypes_${priceField._id}`}
                          value={priceField.price}
                          {...register(`roomTypes.${index}.value`)}
                          onChange={(e) => {
                            // console.log("e.value + ", e.target.value);

                            const newPrice = e.target.value;
                            const newDefaultPrices = prices.map((item) => {
                              if (item._id === priceField._id) {
                                return { ...item, price: newPrice };
                                // item.price = newPrice
                              }
                              return item;
                            });
                            priceField.price = newPrice;
                            // console.log("newDefaultPrices");
                            // console.log({ newDefaultPrices });
                            setPrices(newDefaultPrices);
                            updatePriceField(index, priceField);
                          }}
                        />
                      </div>
                      <div class="col mt-5">
                        <a
                          href={`/hotel/booking/${index}/${id}  `}
                          className="btn btn-primary"
                          target="_blank"
                        >
                          Book Now Link
                        </a>

                        <input
                          type="hidden"
                          value={priceField.name}
                          {...register(`roomTypes.${index}.name`)}
                        />
                        <input
                          type="hidden"
                          value={`${priceField.id}`}
                          {...register(`roomTypes.${index}._id`)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="invalid-feedback">
              {errors.price && errors.price?.message}
            </div>
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
            onClick={() => navigate("/properties")}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
