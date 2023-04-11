import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLayout } from "_layouts/DashboardLayout";
import { bookingActions } from "_store/bookings.slice";
import { propertyActions } from "_store/properties.slice";
import faker from "faker";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { format, startOfMonth, subMonths } from "date-fns";
// import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bookings by Last 6 month",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const _data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

// // console.log({ _data });
export { Home };

function Home() {
  const { user: authUser } = useSelector((x) => x.auth);
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.properties);
  const bookings = useSelector((state) => state.bookings.bookings);
  const [data, setData] = useState(_data);
  useEffect(() => {
    dispatch(bookingActions.getAll());
    dispatch(propertyActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    const data = getBookingsByMonth();
    setData(data);
    console.log({ data });
  }, [bookings]);

  function getLastSixMonths() {
    const lastSixMonths = [];
    for (let i = 5; i >= 0; i--) {
      lastSixMonths.push(startOfMonth(subMonths(new Date(), i)));
    }
    return lastSixMonths;
  }

  function getBookingsByMonth() {
    // Initialize bookingsByMonth object with empty arrays for each month
    const bookingsByMonth = {};
    const lastSixMonths = getLastSixMonths();
    lastSixMonths.forEach((month) => {
      bookingsByMonth[`${month.getMonth() + 1}-${month.getFullYear()}`] = [];
    });

    // Add bookings to respective months in bookingsByMonth object
    bookings?.bookings?.forEach((booking) => {
      const bookingDate = new Date(booking.dateCheckIn);
      if (bookingDate >= lastSixMonths[0]) {
        const monthKey = `${
          bookingDate.getMonth() + 1
        }-${bookingDate.getFullYear()}`;
        bookingsByMonth[monthKey]?.push(booking);
      }
    });

    console.log({ bookingsByMonth });
    console.log("bookingsByMonth['2-2023']", bookingsByMonth["2-2023"]);
    console.log("bookingsByMonth['3-2023']", bookingsByMonth["3-2023"]);
    // console.log({ bookingsByMonth[] });
    // Return an array of objects containing data for each month
    const dataArray = Object.keys(bookingsByMonth).map((monthKey) => {
      // console.log({ monthKey });
      return bookingsByMonth[monthKey].length;

      // return {
      //   label: "Bookings",
      //   data: bookingsByMonth[monthKey].length],
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // };
    });
    // console.log({ dataArray });
    return {
      labels: Object.keys(bookingsByMonth),
      datasets: [
        {
          label: "Bookings",
          data: dataArray,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
  }

  const todaysOccupancy = () => {
    const totalBookings = bookings?.bookings?.filter((booking) => {
      const checkIn = new Date(booking.dateCheckIn);
      const checkOut = new Date(booking.dateCheckOut);
      return checkIn <= new Date() && checkOut >= new Date();
    });

    return totalBookings?.length;
  };

  const activeBookings = () => {
    const totalBookings = bookings?.bookings?.filter(
      (booking) => booking.status
    );
    return totalBookings?.length;
  };

  const currentMonthsBookings = () => {
    const totalBookings = bookings?.bookings?.filter((booking) => {
      const checkInDate = new Date(booking.dateCheckIn);
      return (
        checkInDate.getMonth() === new Date().getMonth() &&
        checkInDate.getFullYear() === new Date().getFullYear()
      );
    });
    return totalBookings?.length;
  };

  function lastMonthsBookings() {
    // Get the current date and subtract one month
    const currentDate = new Date();
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const lastMonthEndDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    // Filter bookings made in the last month
    const lastMonthBookings = bookings?.bookings?.filter((booking) => {
      const bookingDate = new Date(booking.dateCheckIn);
      return bookingDate >= lastMonthDate && bookingDate < lastMonthEndDate;
    });

    // Return the total number of bookings made in the last month
    return lastMonthBookings?.length;
  }

  const activeProperties = () => {
    const totalProperties = properties?.properties?.filter(
      (property) => property.status
    );
    return totalProperties?.length;
  };

  return (
    <DashboardLayout>
      <div className="pagetitle">
        <h1>Dashboard</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li className="breadcrumb-item">Dashboard</li>
          </ol>
        </nav>
      </div>
      {/* <!-- End Page Title --> */}

      <section className="section">
        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total active bookings</h5>
                <div>
                  <h1>{bookings && activeBookings()}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Active Hotels</h5>
                <h1>{properties && activeProperties()}</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Todays bookings</h5>
                <div>
                  <h1>{bookings && todaysOccupancy()}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Current Vs Last Months booking</h5>
                <h1>
                  {bookings && currentMonthsBookings()} /{" "}
                  {bookings && lastMonthsBookings()}{" "}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bookings by Month</h5>
                <div>
                  {bookings && data.datasets && (
                    <Bar height={250} options={options} data={data} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}
