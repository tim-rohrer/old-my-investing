import { createSlice } from '@reduxjs/toolkit'
import { SecuritySymbol } from '../portfolio/types'

interface SecuritiesState {
    [id: string] : {
        securitySymbol: SecuritySymbol,
        name: string,
        website?: string
    }
}

const initialState: SecuritiesState = {
    '' : {
        securitySymbol: '',
        name: '',
    }
}

export const securitiesSlice = createSlice({
    name: 'securities',
    initialState,
    reducers: {
        securityAdded: (state, action) => {
            let securitySymbol = action.payload.securitySymbol.toUpperCase()
            return {
                ...state,
                [securitySymbol] : {
                    securitySymbol: securitySymbol,
                    name: action.payload.name
                }
            }
        },
        securityUpdated: (state, action) => {
            let securitySymbol = action.payload.securitySymbol.toUpperCase()
            return {
                ...state,
                [securitySymbol] : {
                    securitySymbol: securitySymbol,
                    name: action.payload.name
                }
            }
        },
        securitySymbolChanged: (state, action) => {
            let {currentSymbol, newSymbol} = action.payload
            let securityDetails: Object = state[currentSymbol]
            securityDetails = {
                ...securityDetails,
                securitySymbol: newSymbol
            }
            let securities = {...state}
            delete securities[currentSymbol]
            return {
                ...securities,
                [newSymbol] : securityDetails
            }
        },
        securityRemoved: (state, action) => {
            let securitySymbol = action.payload.toUpperCase()
            let securities = {...state}
            delete securities[securitySymbol]
            return {
                ...securities
            }
        }
    }
})

// Actions
export const { securityAdded, securityUpdated, securitySymbolChanged, securityRemoved} = securitiesSlice.actions

// Thunks

// Selectors

// Default export
export default securitiesSlice.reducer