import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Account } from "../../types/Account.types"

const initialState: Account = {
	balance: 4,
}

export const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit: (state, action: PayloadAction<number>) => {
			state.balance += action.payload
		},
		withdraw: (state, action: PayloadAction<number>) => {
			if (state.balance - action.payload < 0) {
				return
			}
			state.balance -= action.payload
		},
	},
})

// Action creators are generated for each reducer function
export const { deposit, withdraw } = accountSlice.actions

export default accountSlice.reducer
