import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// --- ASYNC THUNKS --- //

export const userLogin = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://pfe2025-api.vercel.app/user/login",
        user
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userCurrent = createAsyncThunk("user/current", async () => {
  try {
    const response = await axios.get(
      "https://pfe2025-api.vercel.app/user/current",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data; // Retourne les données de l'API
  } catch (error) {
    console.error(error);
    throw error; // Lance l'erreur pour que Redux puisse la gérer
  }
});

// PUT : modifier utilisateur
export const userEdit = createAsyncThunk(
  "user/update",
  async ({ id, edituser }) => {
    try {
      const result = await axios.put(
        `https://pfe2025-api.vercel.app/user/${id}`,
        edituser,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return result.data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

//valider un utilisateur
export const validateUser = createAsyncThunk(
  "admin/validate",
  async ({ id, etat }) => {
    const res = await axios.put(
      `https://pfe2025-api.vercel.app/user/validate/${id}`,
      { etat }
    );
    return res.data.user;
  }
);

export const removeuser = createAsyncThunk("user/delete", async (id) => {
  try {
    const result = await axios.delete(
      `https://pfe2025-api.vercel.app/user/${id}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
});

// --- INITIAL STATE --- //

const initialState = {
  user: null,
  status: null,
};

// --- SLICE --- //

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user_connected");
    },
  },
  extraReducers: {
    // Login
    [userLogin.pending]: (state) => {
      state.status = "pending";
    },
    [userLogin.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user; // Assurez-vous que ça correspond
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user_connected", JSON.stringify(state.user));
    },
    [userLogin.rejected]: (state, action) => {
      state.status = "rejected";
      const message = action.payload?.msg || "Vérifiez vos données.";

      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: message,
      });
    },
    // Current
    [userCurrent.pending]: (state) => {
      state.status = "pending";
    },
    [userCurrent.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user;
      // localStorage.setItem("token", action.payload.token);
      // localStorage.setItem("user_connected", JSON.stringify(state.user));
    },
    [userCurrent.rejected]: (state) => {
      state.status = "rejected";
    },
    // Delete
    [removeuser.pending]: (state) => {
      state.status = "pending";
    },
    [removeuser.fulfilled]: (state) => {
      state.status = "fulfilled";
      Swal.fire({
        icon: "success",
        title: "C'est fait ",
        text: "utilisateur supprimé avec succès!",
      });
    },
    [removeuser.rejected]: (state) => {
      state.status = "rejected";
    },
    [userEdit.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload; // ✅ bien mettre à jour le user dans le store
      localStorage.setItem("user_connected", JSON.stringify(action.payload)); // facultatif
      window.location.reload();
    },
    [validateUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      Swal.fire({
        icon: "success",
        title: "Validé ",
        text: "utilisateur accepté!",
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
