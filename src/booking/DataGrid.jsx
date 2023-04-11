//Datagrid.jsx

import { Add, Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Toaster from "_components/Toaster";
import { bookingActions } from "_store/bookings.slice";
import { destinations, parseDate } from "_helpers";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";

function DataGrid() {
  console.log("realoading data grid ");
  const message = useSelector((state) => state.bookings.message);
  const error = useSelector((state) => state.bookings.error);
  const success = useSelector((state) => state.bookings.success);
  const showToaster = useSelector((state) => state.bookings.showToaster);

  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  // const __properties = useSelector((state) => state.bookings);
  console.log({
    // __properties,
    showToaster,
    bookings,
    message,
    error,
    success,
  });

  const [limit, setLimit] = useState(10);
  const loading = useSelector((state) => state.bookings.bookings.loading);
  const dt = useRef(null);
  const [getAllQ, setGetAllQ] = useState({ page: 1, limit: 20 });
  useEffect(() => {
    console.log({ bookings, loading });
    // const data = {};
    // dispatch(bookingActions.getAllDummy(data));
    dispatch(bookingActions.getAll(getAllQ));
  }, [dispatch]);

  const actionTemplate = (rowData) => {
    return (
      <>
        <Link to={`/booking/edit/${rowData.id}`}>
          {" "}
          <Button startIcon={<Edit />}></Button>
        </Link>
        <Button
          onClick={() => {
            const confirm = window.confirm("Are you sure to delete?");
            if (confirm) {
              dispatch(bookingActions.deleteProperty(rowData.id));
              setTimeout(dispatch(bookingActions.getAll(getAllQ)), 3000);
            }
          }}
          startIcon={<Delete />}
        ></Button>
      </>
    );
  };

  const roomTypesTemplate = (rowData) => {
    // console.log({ rowData });
    return rowData.roomTypes.map((roomType) => roomType.name).join(", ");
    // return rowData?.roomTypes?.join(', ');
  };

  const parseCreatedAtTemplate = (rowData) => {
    // console.log({ rowData });
    return parseDate(rowData.createdAt);
    // return rowData?.roomTypes?.join(', ');
  };
  const parseModifiedAtTemplate = (rowData) => {
    // console.log({ rowData });
    return parseDate(rowData.modifiedAt);
    // return rowData?.roomTypes?.join(', ');
  };

  const dateCheckInTemplate = (rowData) => {
    // console.log({ rowData });
    return parseDate(rowData.dateCheckIn, false);
    // return rowData?.roomTypes?.join(', ');
  };
  const dateCheckOutTemplate = (rowData) => {
    // console.log({ rowData });
    return parseDate(rowData.dateCheckOut, false);
    // return rowData?.roomTypes?.join(', ');
  };

  const propertyTemplate = (rowData) => {
    return rowData.propertyId.name;
  };
  const destinationTemplate = (rowData) => {
    let selectedDesti = destinations.filter(
      (dest) => parseInt(dest.id) == parseInt(rowData.destination)
    );
    // console.log({ destinations });
    // console.log({ rowData });
    // console.log({ selectedDesti });
    selectedDesti = selectedDesti.pop();
    return selectedDesti?.name;
  };

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;
    console.log({ _filters });

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <NavLink to={"/booking/add"}>
          <Button variant="contained" startIcon={<Add />} className="mr-3">
            Add booking
          </Button>
        </NavLink>

        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="p-inputtext-sm  "
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  return (
    <div>
      {showToaster && (
        <Toaster message={message} success={success} error={error} />
      )}

      <div className="card">
        {console.log(bookings)}
        {/* <DataTable
          value={bookings.bookings}
          paginator
          showGridlines
          rows={limit}
          rowsPerPageOptions={[10, 20, 30, 50, 80, 100]}
          loading={bookings.loading}
          dataKey="id"
          emptyMessage="No bookings found."
          globalFilterFields={["name", "destination", "roomTypes", "status"]}
          totalRecords={bookings.totalRecords}
          onPage={bookings.currentPage}
          pageLinkSize={bookings.totalPages}
        > */}

        <DataTable
          ref={dt}
          value={bookings.bookings}
          loading={loading}
          paginator
          // header={header}
          rows={limit}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          // rowsPerPageOptions={[10, 25, 50]}
          rowsPerPageOptions={[10, 20, 30, 50, 80, 100]}
          dataKey="id"
          selectionMode="checkbox"
          globalFilterFields={["name", "destination", "roomTypes", "status"]}
          header={renderHeader()}
          // selection={selectedCustomers}
          // onSelectionChange={(e) => setSelectedCustomers(e.value)}
          // filters={filters}
          // filterDisplay="menu"
          // globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
          emptyMessage="No customers found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          filters={filters}
        >
          <Column body={propertyTemplate} header="Property" />
          <Column field="name" header="Guest Name" />
          <Column body={dateCheckInTemplate} header="Check In" />
          <Column body={dateCheckOutTemplate} header="Check Out" />
          <Column field="adults" header="Adults" />
          <Column field="children" header="Children" />
          <Column field="room" header="Rooms" />
          <Column body={parseCreatedAtTemplate} header="Created At" />
          <Column body={parseModifiedAtTemplate} header="Modified At" />
          <Column body={actionTemplate} header="Action" />
        </DataTable>
      </div>
    </div>
  );
}

export default DataGrid;
