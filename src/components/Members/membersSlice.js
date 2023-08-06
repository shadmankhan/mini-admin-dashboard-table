import { createSlice } from '@reduxjs/toolkit';

export const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: []
  },
  reducers: {
    dumpMembers: (state, action) => {
      state.members = action.payload;
    },
    updateMember: (state, action) => {
      state.members.forEach(member => {
        if (member.id === action.payload.id) {
          member = action.payload;
        }
      });
    },
    addMembers: (state, action) => {
      state.members = [...state.members, action.payload];
    },
    deleteMember: (state, action) => {
      const index = state.members.findIndex(i => i.id === action.payload);
      state.members.splice(index, 1);
    }
  }
});

// Action creators are generated for each case reducer function
export const { dumpMembers, addMembers, deleteMember, updateMember } = membersSlice.actions;

export default membersSlice.reducer;
