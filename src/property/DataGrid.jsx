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
import { propertyActions } from "_store/properties.slice";
import { destinations } from "_helpers";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";

function DataGrid() {
  console.log("realoading data grid ");
  const message = useSelector((state) => state.properties.message);
  const error = useSelector((state) => state.properties.error);
  const success = useSelector((state) => state.properties.success);
  const showToaster = useSelector((state) => state.properties.showToaster);

  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.properties);
  const __properties = useSelector((state) => state.properties);
  console.log({
    __properties,
    showToaster,
    properties,
    message,
    error,
    success,
  });

  const [limit, setLimit] = useState(10);
  const loading = useSelector((state) => state.properties.properties.loading);
  const dt = useRef(null);
  const [getAllQ, setGetAllQ] = useState({ page: 1, limit: 20 });
  useEffect(() => {
    console.log({ properties, loading });
    // const data = {};
    // dispatch(propertyActions.getAllDummy(data));
    dispatch(propertyActions.getAll(getAllQ));
    // initFilters();
  }, []);

  const actionTemplate = (rowData) => {
    return (
      <>
        <Link to={`/property/edit/${rowData.id}`}>
          {" "}
          <Button startIcon={<Edit />}></Button>
        </Link>
        <Button
          onClick={() => {
            const confirm = window.confirm("Are you sure to delete?");
            if (confirm) {
              dispatch(propertyActions.deleteProperty(rowData.id));
              setTimeout(dispatch(propertyActions.getAll(getAllQ)), 3000);
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

  const statusTemplate = (rowData) => {
    return rowData.status ? "Active" : "Inactive";
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

  // const initFilters = () => {
  //   setFilters({
  //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  //     name: {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //     },
  //     "destination.name": {
  //       operator: FilterOperator.AND,
  //       constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  //     },
  //   });
  //   setGlobalFilterValue("");
  // };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <NavLink to={"/property/add"}>
          <Button variant="contained" startIcon={<Add />} className="mr-3">
            Add Property
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
        {console.log(properties)}
        {/* <DataTable
          value={properties.properties}
          paginator
          showGridlines
          rows={limit}
          rowsPerPageOptions={[10, 20, 30, 50, 80, 100]}
          loading={properties.loading}
          dataKey="id"
          emptyMessage="No properties found."
          globalFilterFields={["name", "destination", "roomTypes", "status"]}
          totalRecords={properties.totalRecords}
          onPage={properties.currentPage}
          pageLinkSize={properties.totalPages}
        > */}

        <DataTable
          ref={dt}
          value={properties.properties}
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
          <Column body={destinationTemplate} header="Destination" />
          <Column field="name" header="Property Name" />
          <Column body={roomTypesTemplate} header="Room Types" />
          <Column body={statusTemplate} header="Status" />
          <Column field="createdAt" header="Created At" />
          <Column field="modifiedAt" header="Modified At" />
          <Column body={actionTemplate} header="Action" />
        </DataTable>
      </div>
    </div>
  );
}

export default DataGrid;
