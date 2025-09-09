import { configureStore } from '@reduxjs/toolkit'
import MenuReducer from '@/slice/menuSlice'
import ToolboxReducer from '@/slice/toolBoxSlice'

/**
 * The Redux store for the application.
 * It combines the menu and toolbox reducers.
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
export const store = configureStore({
    reducer: {
        menu: MenuReducer,
        toolbox: ToolboxReducer
    }
})