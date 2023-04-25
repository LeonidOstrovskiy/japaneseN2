import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: localStorage.getItem('username')
    ? JSON.parse(localStorage.getItem('username'))
    : '',
  lessons: localStorage.getItem('lessons')
    ? JSON.parse(localStorage.getItem('lessons'))
    : 1,
  score: localStorage.getItem('score')
    ? JSON.parse(localStorage.getItem('score'))
    : 0,
  _id: localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : '',
  questions: [],
  textNumber: 1,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.score = action.payload.score;
      state.lessons = action.payload.lessons;
      state._id = action.payload._id;
    },
    logout: (state) => {
      state.name = '';
      state.lessons = 1;
      state.score = 0;
      localStorage.clear();
    },
    setLesson: (state, action) => {
      state.lessons = action.payload;
    },
    setScore: (state, action) => {
      state.score = action.payload;
    },

    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setTextNumber: (state, action) => {
      state.textNumber = action.payload;
    },
  },
});
export const {
  login,
  logout,
  setLesson,
  setScore,
  setQuestions,
  setTextNumber,
} = globalSlice.actions;

export default globalSlice.reducer;
