export { BlankLayout };
const BlankLayout = (props) => {
  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">{props.children}</div>
                  </div>

                  <div className="credits">
                    Powered by <a href="#">Pesto Booking System</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};
