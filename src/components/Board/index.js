import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from '@/slice/menuSlice'

import { socket } from "@/socket";

/**
 * Board component represents the canvas for drawing.
 * It handles drawing, undo/redo, download, and real-time collaboration via sockets.
 * @component
 */
const Board = () => {
    const canvasRef = useRef(null);
    const dispatch = useDispatch()
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);
    const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem]);

    /**
     * useEffect hook to handle canvas configuration changes.
     * It sets the stroke style and line width of the canvas context.
     * It also listens for 'changeConfig' socket events to update the config in real-time.
     */
    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        /**
         * Changes the canvas context configuration.
         * @param {string} color - The color of the stroke.
         * @param {number} size - The width of the stroke.
         */
        const changeConfig = (color, size) => {
            context.strokeStyle = color
            context.lineWidth = size
        }

        /**
         * Handles the 'changeConfig' socket event.
         * @param {object} config - The configuration object.
         * @param {string} config.color - The color of the stroke.
         * @param {number} config.size - The width of the stroke.
         */
        const handleChangeConfig = (config) => {
            console.log("config", config)
            changeConfig(config.color, config.size)
        }
        changeConfig(color, size)
        socket.on('changeConfig', handleChangeConfig)

        return () => {
            socket.off('changeConfig', handleChangeConfig)
        }
    }, [color, size]);

    /**
     * useEffect hook to handle action menu item clicks (DOWNLOAD, UNDO, REDO).
     */
    useEffect(() => {
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
            const URL = canvas.toDataURL()
            const anchor = document.createElement('a')
            anchor.href = URL
            anchor.download = 'sketch.jpg'
            anchor.click()
        } else  if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
            if(historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1
            if(historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO) historyPointer.current += 1
            const imageData = drawHistory.current[historyPointer.current]
            context.putImageData(imageData, 0, 0);
        }
        dispatch(actionItemClick(null));
    }, [actionMenuItem, dispatch]);

    /**
     * useLayoutEffect hook to set up the canvas and event listeners for drawing.
     */
    useLayoutEffect(()=>{
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        /**
         * Begins a new path at the specified coordinates.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         */
        const beginPath = (x, y) => {
            context.beginPath()
            context.moveTo(x, y)
        }

        /**
         * Draws a line to the specified coordinates.
         * @param {number} x - The x-coordinate.
         * @param {number} y - The y-coordinate.
         */
        const drawLine = (x, y) => {
            context.lineTo(x, y)
            context.stroke()
        }

        /**
         * Handles the 'beginPath' socket event.
         * @param {object} path - The path object.
         * @param {number} path.x - The x-coordinate.
         * @param {number} path.y - The y-coordinate.
         */
        const handleBeginPath = (path) => {
            beginPath(path.x, path.y)
        }

        /**
         * Handles the 'drawLine' socket event.
         * @param {object} path - The path object.
         * @param {number} path.x - The x-coordinate.
         * @param {number} path.y - The y-coordinate.
         */
        const handleDrawLine = (path) => {
            drawLine(path.x, path.y)
        }

        /**
         * Handles the mouse down event to start drawing.
         * @param {MouseEvent} e - The mouse event.
         */
        const handleMouseDown = (e) => {
            shouldDraw.current = true
            beginPath(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
            socket.emit('beginPath', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
        }

        /**
         * Handles the mouse move event to draw on the canvas.
         * @param {MouseEvent} e - The mouse event.
         */
        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return
            drawLine(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY)
            socket.emit('drawLine', {x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY})
        }

        /**
         * Handles the mouse up event to stop drawing and save the state.
         * @param {MouseEvent} e - The mouse event.
         */
        const handleMouseUp = (e) => {
            shouldDraw.current = false
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
            drawHistory.current.push(imageData)
            historyPointer.current = drawHistory.current.length - 1
        }

        canvas.addEventListener('mousedown', handleMouseDown)
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseup', handleMouseUp)

        canvas.addEventListener('touchstart', handleMouseDown)
        canvas.addEventListener('touchmove', handleMouseMove)
        canvas.addEventListener('touchend', handleMouseUp)

        socket.on('beginPath', handleBeginPath)
        socket.on('drawLine', handleDrawLine)

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown)
            canvas.removeEventListener('mousemove', handleMouseMove)
            canvas.removeEventListener('mouseup', handleMouseUp)

            canvas.removeEventListener('touchstart', handleMouseDown)
            canvas.removeEventListener('touchmove', handleMouseMove)
            canvas.removeEventListener('touchend', handleMouseUp)

            socket.off('beginPath', handleBeginPath)
            socket.off('drawLine', handleDrawLine)
        }
    },[]);

    return <> 
        <canvas ref={canvasRef}></canvas> 
    </>
};
export default Board;