import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchWrapper } from "../_helpers";

// create slice

const name = "bookings";
const initialState = createInitialState();
const extraActions = createExtraActions();
const extraReducers = createExtraReducers();
const slice = createSlice({ name, initialState, extraReducers });

// exports

export const bookingActions = { ...slice.actions, ...extraActions };
export const bookingsReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    bookings: { loading: true },
    booking: { loading: true },
    loading: true,
    success: null,
    error: null,
    message: null,
    showToaster: null,
  };
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/bookings`;

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
      createBooking: createAsyncThunk(
        `${name}/createBooking`,
        async (booking) => {
          const response = await fetchWrapper.post(baseUrl, booking);
          return response;
        }
      ),
    };
  }

  function update() {
    return {
      updateBooking: createAsyncThunk(
        `${name}/updateBooking`,
        async (booking) => {
          const response = await fetchWrapper.put(
            `${baseUrl}/${booking.id}`,
            booking
          );
          return response;
        }
      ),
    };
  }

  function remove() {
    return {
      deleteBooking: createAsyncThunk(`${name}/deleteBooking`, async (id) => {
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
        // state.bookings = { loading: true };
        // state.booking = { loading: true };
        // state.loading = true;
        // state.success = null;
        // state.error = null;
      },
      [fulfilled]: (state, action) => {
        // state.bookings = { loading: true };
        // state.booking = { loading: true };
        // state.success = null;
        // state.error = null;
        // state.message = null;

        state.showToaster = null;
        state.bookings = action.payload;
        state.loading = false;
      },
      [rejected]: (state, action) => {
        // state.bookings = { loading: true };
        state.booking = { loading: true };
        state.loading = true;
        state.success = null;
        state.error = null;
        state.message = null;

        state.bookings = { error: action.error };
      },
    };
  }
  function getById() {
    var { pending, fulfilled, rejected } = extraActions.getById;
    return {
      [pending]: (state) => {
        state.booking = {};
        state.loading = false;
      },
      [fulfilled]: (state, action) => {
        state.booking = action.payload;
        state.loading = false;
      },
      [rejected]: (state, action) => {
        state.booking = { error: action.error };
      },
    };
  }
  function getAllDummy() {
    var { pending, fulfilled, rejected } = extraActions.getAllDummy;
    return {
      [pending]: (state) => {
        // default state ...
        // state.bookings = {  loading : true };
      },
      [fulfilled]: (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      },
      [rejected]: (state, action) => {
        state.bookings = { error: action.error, loading: false };
      },
    };
  }

  function create() {
    var { fulfilled } = extraActions.createBooking;
    return {
      [fulfilled]: (state, action) => {
        state.booking = action.payload;
        state.showToaster = true;
        state.message = "Success";
        state.showToaster = true;
        state.success = true;
      },
    };
  }

  function update() {
    var { pending, fulfilled, rejected } = extraActions.updateBooking;
    return {
      [pending]: (state) => {
        state.bookings = { loading: true };
        state.booking = { loading: true };
        state.loading = true;
        state.success = null;
        state.error = null;
        state.message = null;
      },

      [fulfilled]: (state, action) => {
        state.bookings[action.payload.id] = action.payload;
        state.loading = false;
        state.success = true;
        state.error = false;
        state.message = "Success";
        state.showToaster = true;
      },
      [rejected]: (state, action) => {
        state.booking = action.payload;
        state.loading = false;
        state.error = true;
        state.message = "Opps, Something went wrong!";
      },
    };
  }

  function remove() {
    var { fulfilled } = extraActions.deleteBooking;
    return {
      [fulfilled]: (state, action) => {
        console.log("action.payload ", action.payload);
        // state.bookings = state.bookings.filter(
        //   (booking) => booking.id !== action.payload
        // );
        // delete state.bookings[action.payload];
        state.message = "Success";
        state.success = true;
        state.showToaster = true;
      },
    };
  }
}
