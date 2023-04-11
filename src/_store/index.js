import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';
import { propertiesReducer } from './properties.slice';
import { bookingsReducer } from './bookings.slice';

export * from './auth.slice';
export * from './users.slice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        properties: propertiesReducer,
        bookings: bookingsReducer,

    },
});