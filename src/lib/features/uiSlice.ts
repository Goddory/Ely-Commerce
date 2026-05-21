import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  mobileMenuOpen: boolean;
  megaMenuOpen: boolean;
  activeExamTab: "thpt" | "dgnl";
}

const initialState: UiState = {
  mobileMenuOpen: false,
  megaMenuOpen: false,
  activeExamTab: "thpt",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    setMegaMenu(state, action: PayloadAction<boolean>) {
      state.megaMenuOpen = action.payload;
    },
    setActiveExamTab(state, action: PayloadAction<"thpt" | "dgnl">) {
      state.activeExamTab = action.payload;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, setMegaMenu, setActiveExamTab } = uiSlice.actions;
export default uiSlice.reducer;
