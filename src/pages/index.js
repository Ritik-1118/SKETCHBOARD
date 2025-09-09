// import Image from "next/image";
import { Inter } from "next/font/google";
import { Main } from "./main";

const inter = Inter({ subsets: ["latin"] });

/**
 * Home page component.
 * It renders the Main component.
 * @returns {React.ReactElement} The rendered Home page.
 */
export default function Home() {
    return <>
        <Main />
    </>
}
