import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('forms')) || [];

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action) => {
        // const newForm = {
        //     id: Date.now(),
        //   };
      state.push(action.payload)
    },
    addQuestion: (state, action) => {
      const { formId, question } = action.payload;
      const form = state.find((form) => form.id === formId);
      if (form) {
        form.questions.push(question);
      }
    },
    deleteForm: (state, action) => {
      const formIdToDelete = action.payload;
      return state.filter((form) => form.id !== formIdToDelete);
    },
    editForm: (state, action) => {
      const { formId, newName } = action.payload;
      const formToEdit = state.find((form) => form.id === formId);
      if (formToEdit) {
        formToEdit.name = newName;
      }
    },
  },
});

export const { addForm, addQuestion, deleteForm, editForm } = formSlice.actions;
export default formSlice.reducer;
