import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCatsAPI, createCatAPI, updateCatAPI, getCatRecommendationsAPI } from '../../services/api';

interface Cat {
  id: string;
  food_bowls?: number;
  treats?: number;
  playtime?: number;
  goals?: string;
  issues_faced?: string;
  required_progress?: string;
}

interface CatsState {
  cats: Cat[];
  isLoading: boolean;
  error: string | null;
}

const loadInitialState = (): CatsState => {
  try {
    const savedCats = localStorage.getItem('cats');
    if (savedCats) {
      const parsedCats = JSON.parse(savedCats);
      if (Array.isArray(parsedCats)) {
        return {
          cats: parsedCats,
          isLoading: false,
          error: null,
        };
      }
    }
  } catch (error) {
    console.error('Error loading cats from localStorage:', error);
    localStorage.removeItem('cats');
  }
  
  return {
    cats: [],
    isLoading: false,
    error: null,
  };
};

const initialState: CatsState = loadInitialState();

export const fetchCatsAsync = createAsyncThunk(
  'cats/fetchCats',
  async (token: string | undefined, { rejectWithValue }) => {
    try {
      const response = await getCatsAPI(token || '');

      if (Array.isArray(response)) {
        const highestIdCat = response.reduce((maxCat, cat) => 
          (cat.id > maxCat.id ? cat : maxCat), response[0]);

        if (highestIdCat) {
          localStorage.setItem('catId', highestIdCat.id);
          if (highestIdCat.food_bowls) localStorage.setItem('food_bowls', highestIdCat.food_bowls.toString());
          if(highestIdCat.breed) localStorage.setItem('breed', highestIdCat.breed);
          if(highestIdCat.gender) localStorage.setItem('gender', highestIdCat.gender);
          if(highestIdCat.target_weight) localStorage.setItem('target_weight', highestIdCat.target_weight);
          if(highestIdCat.medical_history) localStorage.setItem('medical_history', highestIdCat.medical_history);
          if(highestIdCat.dietary_restrictions) localStorage.setItem('dietary_restrictions', highestIdCat.dietary_restrictions);
          if(highestIdCat.name) localStorage.setItem('cat_name', highestIdCat.name);
          if (highestIdCat.treats) localStorage.setItem('treats', highestIdCat.treats.toString());
          if (highestIdCat.playtime) localStorage.setItem('playtime', highestIdCat.playtime.toString());
          if (highestIdCat.goals) localStorage.setItem('goals', highestIdCat.goals);
          if (highestIdCat.issues_faced) localStorage.setItem('issues_faced', highestIdCat.issues_faced);
          if (highestIdCat.required_progress) localStorage.setItem('required_progress', highestIdCat.required_progress);
        }

        return response;
      }
      throw new Error('Invalid response format');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCatAsync = createAsyncThunk(
  'cats/createCat',
  async (catDetails: any, { rejectWithValue }) => {
    try {
      const response = await createCatAPI(catDetails);

      const catId = response.id;
      localStorage.setItem(`catId`, JSON.stringify(catId));

      localStorage.setItem(`food_bowls`, JSON.stringify(response.food_bowls));
      localStorage.setItem(`treats`, JSON.stringify(response.treats));
      localStorage.setItem(`playtime`, JSON.stringify(response.playtime));
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCatAsync = createAsyncThunk(
  'cats/updateCat',
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const catId = localStorage.getItem('catId');
      const response = await updateCatAPI(data, catId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCatRecommendationsAsync = createAsyncThunk(
  'cats/getCatRecommendations',
  async (catDetails: any, { rejectWithValue }) => {
    try {
      const response = await getCatRecommendationsAPI(catDetails);

      localStorage.setItem(`catId`, JSON.stringify(0));

      localStorage.setItem(`food_bowls`, JSON.stringify(response.food_bowls));
      localStorage.setItem(`treats`, JSON.stringify(response.treats));
      localStorage.setItem(`playtime`, JSON.stringify(response.playtime));
      
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    clearCats: (state) => {
      state.cats = [];
      state.error = null;
      localStorage.removeItem('cats');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCatsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cats = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(fetchCatsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCatAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cats = [...state.cats, action.payload];
      })
      .addCase(updateCatAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCatAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedCat = action.payload;
        state.cats = state.cats.map(cat => 
          cat.id === updatedCat.id ? updatedCat : cat
        );
      })
      .addCase(updateCatAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCats } = catsSlice.actions;
export default catsSlice.reducer; 