import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Account } from "../../types/Account.types"

const initialState: Account = {
	balance: 1337,
}

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit: (state, action: PayloadAction<number>) => {
			state.balance += action.payload
		},
		withdraw: (state, action: PayloadAction<number>) => {
			state.balance -= action.payload
		},
	},
})

export default accountSlice.reducer
