import { createSlice } from '@reduxjs/toolkit'
import { MENU_ITEMS, COLORS } from '@/constants'

/**
 * Initial state for the toolbox slice.
 * @type {object}
 */
const initialState = {
    [MENU_ITEMS.PENCIL]: {
        color: COLORS.BLACK,
        size: 3
    },
    [MENU_ITEMS.ERASER]: {
        color: COLORS.WHITE,
        size: 3
    },
    [MENU_ITEMS.UNDO]: {},
    [MENU_ITEMS.REDO]: {},
    [MENU_ITEMS.DOWNLOAD]: {},
}

/**
 * Redux slice for managing toolbox state.
 * It handles the color and brush size for different tools.
 */
export const toolboxSlice = createSlice({
    name: 'toolbox',
    initialState,
    reducers: {
        /**
         * Reducer for changing the color of a tool.
         * @param {object} state - The current state.
         * @param {object} action - The action object.
         * @param {object} action.payload - The payload containing the item and color.
         * @param {string} action.payload.item - The tool item to change.
         * @param {string} action.payload.color - The new color.
         */
        changeColor: (state, action) => {
            state[action.payload.item].color = action.payload.color
        },
        /**
         * Reducer for changing the brush size of a tool.
         * @param {object} state - The current state.
         * @param {object} action - The action object.
         * @param {object} action.payload - The payload containing the item and size.
         * @param {string} action.payload.item - The tool item to change.
         * @param {number} action.payload.size - The new brush size.
         */
        changeBrushSize: (state, action) => {
            state[action.payload.item].size = action.payload.size
        }
    }
})

export const {changeColor, changeBrushSize} = toolboxSlice.actions

export default toolboxSlice.reducer