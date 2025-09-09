import { createSlice } from "@reduxjs/toolkit";
import { MENU_ITEMS } from "@/constants";

/**
 * Initial state for the menu slice.
 * @type {{activeMenuItem: string, actionMenuItem: string|null}}
 */
const initialState = {
    activeMenuItem:MENU_ITEMS.PENCIL,
    actionMenuItem: null,
}

/**
 * Redux slice for managing menu state.
 * It handles the active menu item and action menu items.
 */
export const menuSlice = createSlice({
    name:'menu',
    initialState,
    reducers:{
        /**
         * Reducer for handling menu item clicks.
         * Sets the active menu item.
         * @param {object} state - The current state.
         * @param {object} action - The action object.
         * @param {string} action.payload - The name of the clicked menu item.
         */
        menuItemClick: (state,action) => {
            state.activeMenuItem = action.payload
        },
        /**
         * Reducer for handling action item clicks.
         * Sets the action menu item.
         * @param {object} state - The current state.
         * @param {object} action - The action object.
         * @param {string|null} action.payload - The name of the clicked action item.
         */
        actionItemClick: (state,action) => {
            state.actionMenuItem = action.payload
        }
    }
});

export const {menuItemClick,actionItemClick} = menuSlice.actions;
export default menuSlice.reducer;