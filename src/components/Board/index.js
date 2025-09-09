import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { MENU_ITEMS } from "@/constants";
import { actionItemClick } from '@/slice/menuSlice'

import { socket } from "@/socket";

const Board = () => {
    const canvasRef = useRef(null);
    const dispatch = useDispatch()
    const shouldDraw = useRef(false);
    const drawHistory = useRef([]);
    const historyPointer = useRef(0);
    const {activeMenuItem, actionMenuItem} = useSelector((state) => state.menu);
    const {color, size} = useSelector((state) => state.toolbox[activeMenuItem]);


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
            // console.log(drawHistory,historyPointer)
            context.putImageData(imageData, 0, 0);
        }
        dispatch(actionItemClick(null));
    }, [actionMenuItem, dispatch]);

    useLayoutEffect(()=>{
        if (!canvasRef.current) return
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const beginPath = (x, y) => {
            context.beginPath();
            context.moveTo(x, y);
        };

        const drawLine = (x, y) => {
            context.lineTo(x, y);
            context.stroke();
        };

        const handleDrawLine = (path) => {
            drawLine(path.x, path.y);
        };

        const setLocalUserContext = () => {
            context.strokeStyle = color;
            context.lineWidth = size;
            if (activeMenuItem === MENU_ITEMS.ERASER) {
                context.globalCompositeOperation = 'destination-out';
            } else {
                context.globalCompositeOperation = 'source-over';
            }
        }

        const handleMouseDown = (e) => {
            shouldDraw.current = true;
            setLocalUserContext();
            beginPath(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
            socket.emit('beginPath', { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY, color, size, tool: activeMenuItem });
        };

        const handleMouseMove = (e) => {
            if (!shouldDraw.current) return;
            setLocalUserContext();
            drawLine(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
            socket.emit('drawLine', { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY });
        };

        const handleMouseUp = (e) => {
            shouldDraw.current = false;
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            drawHistory.current.push(imageData);
            historyPointer.current = drawHistory.current.length - 1;
            socket.emit('endPath');
        };

        const handleRemoteBeginPath = (path) => {
            context.save();
            context.strokeStyle = path.color;
            context.lineWidth = path.size;
            if (path.tool === MENU_ITEMS.ERASER) {
                context.globalCompositeOperation = 'destination-out';
            } else {
                context.globalCompositeOperation = 'source-over';
            }
            beginPath(path.x, path.y);
        };

        const handleRemoteEndPath = () => {
            context.restore();
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        canvas.addEventListener('touchstart', handleMouseDown);
        canvas.addEventListener('touchmove', handleMouseMove);
        canvas.addEventListener('touchend', handleMouseUp);

        socket.on('beginPath', handleRemoteBeginPath);
        socket.on('drawLine', handleDrawLine);
        socket.on('endPath', handleRemoteEndPath);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);

            canvas.removeEventListener('touchstart', handleMouseDown);
            canvas.removeEventListener('touchmove', handleMouseMove);
            canvas.removeEventListener('touchend', handleMouseUp);

            socket.off('beginPath', handleRemoteBeginPath);
            socket.off('drawLine', handleDrawLine);
            socket.off('endPath', handleRemoteEndPath);
        };
    },[]);

    // console.log(color,size);
    return <> 
        <canvas ref={canvasRef} role="graphics-document"></canvas>
    </>
};
export default Board;