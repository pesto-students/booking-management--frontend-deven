import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "_layouts/DashboardLayout";
import { propertyActions } from "_store/properties.slice";
import { history } from "../../_helpers";
import { Form } from "../Form";

export { EditProperty };

function EditProperty() {
  const dispatch = useDispatch();
  const { id } = useParams(); // id will be "6417711c0e5b94bb44acfe29"

  //  const property = useSelector((state) => state.properties.properties.property);
  const property = useSelector((state) => state.properties.property);

  const message = useSelector((state) => state.properties.message);
  const error = useSelector((state) => state.properties.error);
  const success = useSelector((state) => state.properties.success);

  const data = property ? property : {};

  useEffect(() => {
    dispatch(propertyActions.getById(id));
    //    console.log({ property,loading});

    //    console.log({ property,loading});
  }, [dispatch]);

  useEffect(() => {
    console.log({ property });
  }, []);

  function onSubmit(data) {
    console.log("edit onSubmit...");
    // console.log({propertyActions});
    console.log({ data });
    dispatch(propertyActions.updateProperty(data)).then((res) => {
      console.log({ res });
      //   res?.error?.message && setError(true) && setMessage(res.error.message);
      //   res.id && setSuccess(true) && setMessage("Success");
      history.navigate("/properties");
    });
  }

  useEffect(() => {
    console.log({ error, success, message });
  }, [message]);

  return (
    <DashboardLayout>
      <div className="pagetitle">
        <h1>Edit Property</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item active">Properties</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Edit Property: {data.name} ( id: {data.id})
                  
                </h5>

                {/* <!-- General Form Elements --> */}

                {data && data.id && (
                  <Form onSubmit={onSubmit} data={data}></Form>
                )}

                {/* <!-- End General Form Elements --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
