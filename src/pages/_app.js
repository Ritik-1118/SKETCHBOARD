import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";

/**
 * Custom App component to initialize pages.
 * It wraps the application with the Redux Provider.
 * @param {object} props - The props for the component.
 * @param {React.ComponentType} props.Component - The active page component.
 * @param {object} props.pageProps - The props for the active page.
 * @returns {React.ReactElement} The rendered application.
 */
export default function App({ Component, pageProps }) {
    return <Provider store={store}>
        <Component {...pageProps} />;
    </Provider>
}
