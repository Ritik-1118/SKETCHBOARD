import styles from './index.module.css'
import cx from 'classnames';
import { FaPencilAlt,FaEraser,FaUndoAlt,FaRedoAlt,FaFileDownload } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from '@/constants';
import { menuItemClick, actionItemClick } from '@/slice/menuSlice'

/**
 * Menu component displays the main menu with tools like pencil, eraser, undo, redo, and download.
 * @component
 */
const Menu = () => {
    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state) => state.menu.activeMenuItem)

    /**
     * Handles the click event on a menu item.
     * Dispatches the menuItemClick action with the clicked item's name.
     * @param {string} itemName - The name of the menu item that was clicked.
     */
    const handleMenuClick = (itemName) => {
        dispatch(menuItemClick(itemName))
    }

    /**
     * Handles the click event on an action item.
     * Dispatches the actionItemClick action with the clicked item's name.
     * @param {string} itemName - The name of the action item that was clicked.
     */
    const handleActioItemClick = (itemName) => {
        dispatch(actionItemClick(itemName))
    }


    return <>
        <div className={styles.menuContainer}>
            <div className={cx(styles.iconWarpper,{[styles.active]: activeMenuItem === MENU_ITEMS.PENCIL})} onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}>
                <FaPencilAlt className={styles.icon}/>
            </div>
            <div className={cx(styles.iconWarpper,{[styles.active]: activeMenuItem === MENU_ITEMS.ERASER})} onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}>
                <FaEraser className={styles.icon}/>
            </div>
            <div className={styles.iconWarpper} onClick={() => handleActioItemClick(MENU_ITEMS.UNDO)}>
                <FaUndoAlt className={styles.icon}/>
            </div>
            <div className={styles.iconWarpper} onClick={() => handleActioItemClick(MENU_ITEMS.REDO)}>
                <FaRedoAlt className={styles.icon}/>
            </div>
            <div className={styles.iconWarpper} onClick={() => handleActioItemClick(MENU_ITEMS.DOWNLOAD)}>
                <FaFileDownload className={styles.icon}/>
            </div>
        </div>
    </>
};
export default Menu;