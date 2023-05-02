import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "../../services/userService";
import { IUserData } from "../../type";

interface IAuthState {
  user: IUserData | undefined;
  login: {
    loading: boolean;
    error: string | undefined;
  };
  signup: {
    loading: boolean;
    error: string | undefined;
  };
}

const initialState: IAuthState = {
  user: undefined,
  login: {
    loading: false,
    error: undefined,
  },
  signup: {
    loading: false,
    error: undefined,
  },
};

export const initUser = createAsyncThunk(
  "auth/initUser",
  async (_, { rejectWithValue }) => {
    const res = await usersService.initUser();
    if (!res.success) return rejectWithValue(res.message);
    return res.data;
  }
);

export const saveUser = createAsyncThunk(
  "auth/saveUser",
  async (user: any, { rejectWithValue }) => {
    const res = await usersService.saveUser(user);
    if (!res.success) return rejectWithValue(res.message);
    return res.data;
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    const res = await usersService.removeUser();
    if (!res.success) return rejectWithValue('Error login out');
    return res.success;
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (value: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = value;

    const loginResult = usersService.login(email, password);
    if (!loginResult.success) {
      return rejectWithValue(loginResult.message);
    }
    if (loginResult.data) {
      await usersService.saveUser(loginResult.data);
    }
    return loginResult.data;
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initUser.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(initUser.fulfilled, (state, action) => {
        state.login.loading = false;
        state.user = action.payload;
      })
      .addCase(initUser.rejected, (state, action) => {
        state.user = undefined;
        state.login.loading = true;
        state.login.error = action.payload as string;
      });
    builder
      .addCase(login.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.login.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = undefined;
        state.login.loading = true;
        state.login.error = action.payload as string;
      });
    builder.addCase(saveUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.user = undefined;
    });
  },
});

export const { } = authSlice.actions;

export default authSlice.reducer;

// export const appLogin = createAsyncThunk(
//   "auth/appLogin",
//   async (values: IUserLoginType, thunkApi) => {
//     const loginResult = await AuthService.login(values.email, values.password);
//     if (!loginResult.success || !loginResult.data)
//       return thunkApi.rejectWithValue(loginResult.message);
//     const activeUserId = fireAuth.currentUser?.uid;
//     if (!activeUserId) return;
//     await userService.isItOnline(activeUserId, true);
//   }
// );
// export const appSignup = createAsyncThunk(
//   "auth/appSignup",
//   async (values: IUserSignupType, thunkApi) => {
//     const signupResult = await AuthService.signup(
//       values.email,
//       values.password
//     );
//     if (!signupResult.success) {
//       thunkApi.rejectWithValue(signupResult.message);
//     }
//     const user = await userService.initialUser(
//       values.firstName,
//       values.lastName,
//       fireAuth.currentUser?.uid
//     );
//     if (!user.success) {
//       thunkApi.rejectWithValue(signupResult.message);
//     }
//     const activeUserId = fireAuth.currentUser?.uid;
//     if (!activeUserId) return;
//     const res = await userService.isItOnline(activeUserId, true);
//     if (!res.success) {
//       thunkApi.rejectWithValue(res.message);
//     }
//   }
// );
// export const appLogout = createAsyncThunk(
//   "auth/appLogout",
//   async (_, { rejectWithValue }) => {
//     const activeUserId = fireAuth.currentUser?.uid;
//     if (!activeUserId) return;
//     await userService.isItOnline(activeUserId, false);
//     const res = await AuthService.logout();
//     if (!res.success) {
//       rejectWithValue(res.message);
//     }
//   }
// ); // extraReducers: (builder) => {
//   builder
//     .addCase(appLogin.pending, (state) => {
//       state.login.loading = true;
//       state.login.error = null;
//     })
//     .addCase(appLogin.fulfilled, (state, action) => {
//       state.login.loading = false;
//       state.login.error = null;
//       state.user = action.payload;
//     })
//     .addCase(appLogin.rejected, (state, action) => {
//       state.login.loading = false;
//       state.login.error = action.payload;
//     });
//   builder.addCase(appLogout.fulfilled, (state) => {
//     state.user = null;
//   });
//   builder
//     .addCase(appSignup.pending, (state) => {
//       state.signup.loading = true;
//       state.signup.error = null;
//     })
//     .addCase(appSignup.fulfilled, (state, action) => {
//       state.signup.loading = false;
//       state.signup.error = null;
//       state.user = action.payload;
//     })
//     .addCase(appSignup.rejected, (state, action) => {
//       state.signup.loading = false;
//       state.signup.error = action.payload;
//     });
// },
