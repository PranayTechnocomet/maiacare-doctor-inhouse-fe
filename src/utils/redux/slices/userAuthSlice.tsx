import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserAuthState = {
  value: Record<string, unknown>;
};

const initialState: UserAuthState = {
  value: {},
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUserAuthData: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserAuthData } = userAuthSlice.actions;
export default userAuthSlice.reducer;
