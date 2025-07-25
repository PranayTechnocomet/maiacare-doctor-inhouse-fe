import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderValue {
  title: string;
  subtitle?: string;
}

interface HeaderState {
  value: HeaderValue;
}

const initialState: HeaderState = {
  value: {
    title: "",
    subtitle: "",
  },
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    // now PayloadAction uses HeaderValue
    setHeaderData: (state, action: PayloadAction<HeaderValue>) => {
      state.value = action.payload;
    },
  },
});

export const { setHeaderData } = headerSlice.actions;
export default headerSlice.reducer;
