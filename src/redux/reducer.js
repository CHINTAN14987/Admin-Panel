import { createSlice } from "@reduxjs/toolkit";
import data from "../util/data.json";
const img =
  "https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1956&q=80";
const appReducer = createSlice({
  name: "app",
  initialState: {
    details: [...data],
    isValidated: false,
    bgColor: false,
  },
  reducers: {
    addDetails: (state, action) => {
      return {
        ...state,
        details: [{ ...action.payload.data, Image: img }, ...state.details],
      };
    },
    deleteFormItem: (state, action) => {
      return {
        ...state,
        details: state.details.filter((item) => item.id !== action.payload),
      };
    },
    editFormItem: (state, action) => {
      const { data } = action.payload;
      const index = state.details.findIndex((item) => item.id === data.id);
      const newState = [...state.details];
      newState.splice(index, 1);
      newState.splice(index, 0, data);
      return { ...state, details: newState };
    },
    isFormValidated: (state, action) => {
      return { ...state, isValidated: action.payload };
    },
    backGround: (state, action) => {
      return { ...state, bgColor: action.payload };
    },
    sortTable: (state, action) => {
      const newData = [...state.details];
      const sorted = newData.sort((a, b) => {
        let fa = a?.[action.payload]?.toLowerCase() || "";
        let fb = b?.[action.payload]?.toLowerCase() || "";
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        details: sorted,
      };
    },
  },
});
export const {
  addDetails,
  deleteFormItem,
  sortTable,
  editFormItem,
  isFormValidated,
  backGround,
} = appReducer.actions;
export default appReducer.reducer;
