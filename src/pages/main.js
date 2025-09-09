import Board from "@/components/Board";
import Menu from "@/components/Menu";
import ToolBox from "@/components/ToolBox";

/**
 * Main component that assembles the Menu, ToolBox, and Board components.
 * @returns {React.ReactElement} The rendered main application layout.
 */
export const Main = () => {
    return <>
        <Menu />
        <ToolBox />
        <Board />
    </>
};