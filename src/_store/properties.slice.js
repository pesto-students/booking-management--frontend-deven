// properties.slice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWrapper } from "../_helpers";

const name = "properties";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();

const slice = createSlice({ name, initialState, extraReducers });

function createInitialState() {
  return {
    properties: { loading: true },
    property: { loading: true },
    loading: true,
    success: null,
    error: null,
    message: null,
    showToaster: null,
  };
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/properties`;

  return {
    ...getAll(),
    ...getById(),
    ...getAllDummy(),
    ...create(),
    ...update(),
    ...remove(),
  };

  function getAll() {
    return {
      getAll: createAsyncThunk(`${name}/getAll`, async (params) => {
        // console.log({ params });
        const query = new URLSearchParams(params).toString();
        // console.log("baseUrl  " + query);
        const response = await fetchWrapper.get(baseUrl + "?" + query);
        console.log({ response });
        return response;
      }),
    };
  }

  function getById() {
    return {
      getById: createAsyncThunk(`${name}/getById`, async (id) => {
        const response = await fetchWrapper.get(`${baseUrl}/${id}`);
        return response;
      }),
    };
  }

  function getAllDummy() {
    // dummy data
    const data = [
      {
        id: 1,
        destination: "Los Angeles",
        name: "Luxury Villa",
        roomTypes: ["Delux", "SuperDelux", "Luxury"],
        status: true,
        createdAt: "2022-03-01T08:00:00Z",
        modifiedAt: "2022-03-10T08:00:00Z",
      },
      {
        id: 2,
        destination: "New York City",
        name: "Penthouse Suite",
        roomTypes: ["Delux", "Luxury"],
        status: true,
        createdAt: "2022-02-01T08:00:00Z",
        modifiedAt: "2022-02-28T08:00:00Z",
      },
      // more data here...
    ];

    return {
      getAllDummy: createAsyncThunk(`${name}/getAllDummy`, async () => {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(data);
          }, 1000);
        });
      }),
    };
  }

  function create() {
    return {
      createProperty: createAsyncThunk(
        `${name}/createProperty`,
        async (property) => {
          const response = await fetchWrapper.post(baseUrl, property);
          return response;
        }
      ),
    };
  }

  function update() {
    return {
      updateProperty: createAsyncThunk(
        `${name}/updateProperty`,
        async (property) => {
          const response = await fetchWrapper.put(
            `${baseUrl}/${property.id}`,
            property
          );
          return response;
        }
      ),
    };
  }

  function remove() {
    return {
      deleteProperty: createAsyncThunk(`${name}/deleteProperty`, async (id) => {
        await fetchWrapper.delete(`${baseUrl}/${id}`);
        return id;
      }),
    };
  }
}

function createExtraReducers() {
  return {
    ...getAll(),
    ...getById(),
    ...getAllDummy(),
    ...create(),
    ...update(),
    ...remove(),
  };

  function getAll() {
    var { pending, fulfilled, rejected } = extraActions.getAll;
    return {
      [pending]: (state) => {
        // state.properties = { loading: true };
        // state.property = { loading: true };
        // state.loading = true;
        // state.success = null;
        // state.error = null;
        console.log("pending", { state });
      },
      [fulfilled]: (state, action) => {
        // state.properties = { loading: true };
        // state.property = { loading: true };
        // state.success = null;
        // state.error = null;
        // state.message = null;

        state.showToaster = null;
        state.properties = action.payload;
        state.loading = false;
        console.log("fulfilled", { state, action });
      },
      [rejected]: (state, action) => {
        // state.properties = { loading: true };
        state.property = { loading: true };
        state.loading = true;
        state.success = null;
        state.error = null;
        state.message = null;

        state.properties = { error: action.error };
        console.log("rejected", { state, action });
      },
    };
  }
  function getById() {
    var { pending, fulfilled, rejected } = extraActions.getById;
    return {
      [pending]: (state) => {
        state.property = {};
        state.loading = true;
      },
      [fulfilled]: (state, action) => {
        console.log("payload ", action.payload);
        state.property = action.payload;
        state.loading = false;
      },
      [rejected]: (state, action) => {
        state.property = { error: action.error };
        state.loading = false;
      },
    };
  }
  function getAllDummy() {
    var { pending, fulfilled, rejected } = extraActions.getAllDummy;
    return {
      [pending]: (state) => {
        // default state ...
        // state.properties = {  loading : true };
        console.log("pending", { state });
      },
      [fulfilled]: (state, action) => {
        state.properties = action.payload;
        state.loading = false;
        console.log("fulfilled", { state, action });
      },
      [rejected]: (state, action) => {
        state.properties = { error: action.error, loading: false };
        console.log("rejected", { state, action });
      },
    };
  }

  function create() {
    var { fulfilled } = extraActions.createProperty;
    return {
      [fulfilled]: (state, action) => {
        state.properties[action.payload.id] = action.payload;
        state.showToaster = true;
        state.message = "Success";
        state.showToaster = true;
        state.success = true;
      },
    };
  }

  function update() {
    var { pending, fulfilled, rejected } = extraActions.updateProperty;
    return {
      [pending]: (state) => {
        state.properties = { loading: true };
        state.property = { loading: true };
        state.loading = true;
        state.success = null;
        state.error = null;
        state.message = null;
      },

      [fulfilled]: (state, action) => {
        state.properties[action.payload.id] = action.payload;
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = "Success";
        state.showToaster = true;
      },
      [rejected]: (state, action) => {
        state.property = action.payload;
        state.loading = false;
        state.error = true;
        state.message = "Opps, Something went wrong!";
      },
    };
  }

  function remove() {
    var { fulfilled } = extraActions.deleteProperty;
    return {
      [fulfilled]: (state, action) => {
        console.log("action.payload ", action.payload);
        // state.properties = state.properties.filter(
        //   (property) => property.id !== action.payload
        // );
        // delete state.properties[action.payload];
        state.message = "Success";
        state.success = true;
        state.showToaster = true;
      },
    };
  }
}

export const propertyActions = { ...slice.actions, ...extraActions };
export const propertiesReducer = slice.reducer;
