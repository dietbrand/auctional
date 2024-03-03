import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type State = {
  pageNumber: number;
  pageSize: number;
  pageCount: number;
  searchTerm: string;
  orderBy: string;
  filterBy: string;
};

type Actions = {
  setParams: (params: Partial<State>) => void;
  reset: () => void;
};

const initialState: State = {
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  searchTerm: '',
  orderBy: 'make',
  filterBy: 'live',
};

export const useParamsStore = createWithEqualityFn<State & Actions>()(
  set => ({
    ...initialState,
    setParams: (newParams: Partial<State>) => {
      set(state => {
        if (newParams.pageNumber) {
          return { ...state, pageNumber: newParams.pageNumber };
        } else {
          return { ...state, ...newParams, pageNumber: 1 };
        }
      });
    },
    reset: () => set(initialState),
  }),
  shallow
);