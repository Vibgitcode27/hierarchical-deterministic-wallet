import { createSlice } from "@reduxjs/toolkit";

export interface SeedState {
  seedPhrase: string;
}

const initialState: SeedState = {
  seedPhrase: localStorage.getItem('mnemonic') || '',
};

export const seedSlice = createSlice({
  name: "key",
  initialState,
  reducers: {
    setSeedPhraseInSession: (state, action) => {
      state.seedPhrase = action.payload;
    },
  },
});

export const { setSeedPhraseInSession } = seedSlice.actions;

export default seedSlice.reducer;
