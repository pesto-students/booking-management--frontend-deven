import { useDispatch } from "react-redux";
import { history } from "_helpers";
import { DashboardLayout } from "_layouts/DashboardLayout";
import { propertyActions } from "_store/properties.slice";
import { Form } from "../Form";

export { AddProperty };

function AddProperty() {
  const dispatch = useDispatch();

  function onSubmit(data) {
    console.log("onSubmit...");
    dispatch(propertyActions.createProperty(data)).then((res) =>
      history.navigate("/properties")
    );
  }

  return (
    <DashboardLayout>
      <div className="pagetitle">
        <h1>Add Property</h1>
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
                <h5 className="card-title">Add New Property</h5>

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
