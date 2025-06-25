import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const fetchOffres = createAsyncThunk("offre/all", async () => {
  try {
    let result = axios.get("https://pfe2025-api.vercel.app/offre/all");
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const fetchOffresByOwner = createAsyncThunk(
  "offre/byOwner",
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(
        `https://pfe2025-api.vercel.app/offre/${id}`
      );
      return result.data.offers;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addOffre = createAsyncThunk(
  "offre/add",
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        "https://pfe2025-api.vercel.app/offre/add",
        formData
      );
      Swal.fire("Succès", "Offre ajoutée", "success");
      return result.data.offer;
    } catch (error) {
      Swal.fire("Erreur", error.response?.data?.msg || "Erreur ajout", "error");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteoffre = createAsyncThunk(
  "offre/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://pfe2025-api.vercel.app/offre/${id}`);
      Swal.fire("Succès", "Offre supprimée", "success").then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 1500); // délai de 1,5 seconde
      });
      return id; // On retourne l'ID pour filtrer l’offre supprimée dans le slice
    } catch (error) {
      Swal.fire("Erreur", "Impossible de supprimer l'offre", "error");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const editoffre = createAsyncThunk(
  "offre/update",
  async ({ id, editedoffre }) => {
    try {
      let result = axios.put(
        `https://pfe2025-api.vercel.app/offre/${id}`,
        editedoffre
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
);
const initialState = {
  offrelist: null,
  status: null,
};

export const offreSlice = createSlice({
  name: "offre",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOffres.pending]: (state) => {
      state.status = "pending";
    },
    [fetchOffres.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.offrelist = action.payload.data.offre; // ✅ directement depuis payload
    },
    [fetchOffres.rejected]: (state) => {
      state.status = "rejected";
    },
    [fetchOffresByOwner.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.offrelist = action.payload;
    },

    [addOffre.pending]: (state) => {
      state.status = "pending";
    },
    [addOffre.fulfilled]: (state) => {
      state.status = "fullfilled";
    },
    [addOffre.rejected]: (state) => {
      state.status = "rejected";
    },

    [deleteoffre.pending]: (state) => {
      state.status = "pending";
    },
    [deleteoffre.fulfilled]: (state) => {
      state.status = "fullfilled";
    },
    [deleteoffre.rejected]: (state) => {
      state.status = "rejected";
    },

    [editoffre.pending]: (state) => {
      state.status = "pending";
    },
    [editoffre.fulfilled]: (state) => {
      state.status = "fullfilled";
    },
    [editoffre.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = offreSlice.actions;

export default offreSlice.reducer;
