import { drawCircle, drawLine } from "$lib/ts/canvas/canvasUtils"

const AMBER = "rgb(245, 167, 66)";
const DARK_ORANGE = "rgb(200, 100, 100)";
const WHITE = "white";
const BLACK = "black";
const GREY = "rgb(50, 50, 50)";
const ORANGE_BROWN = "rgb(210, 150, 100)";
const SHADOW_BROWN = "rgb(120, 80, 20)";
const DARK_SHADOW_BROWN = "rgb(41, 30, 24)";
const DARK_GREY = "rgb(50, 50, 50)";



export function drawCharacter(context: CanvasRenderingContext2D, x: number, y: number) {
    
    let startX: number, startY: number, endX: number, endY: number;
    startX = x;
    startY = y;

    const HEAD_POINTS: [number, number][] = [
        // top 
        [15, 0],
        // ear
        [15, -5],
        [20, 0],
        [10, 10],
        // side
        [5, 20],
        [0, 10],
        [-10, 40],
        [-25, 50],
        // chin
        [-10, 10],
        [-10, 5],
        [-10, 0]
    ]

    const HEAD_PATCH_POINTS: [number, number][] = [
        [10, 0],
        [15, -3],
        [10, 0],
        [10, 15]
    ]

    const RIGHT_EAR_POINTS: [number, number][] = [
        // top arc
        [5, -6],
        [4, -2],
        [10, -3],
        [15, -5],
        [12, 4],
        // down right
        [18, 10],
        [2, 10],
        [-5, 30],
        // up left
        [-15, 30],
        [-5, 5],
        [-3, 0],
        [-10, -5],
        [-5, -10],
        [-5, -10],
        [5, -20],
        [-5, -20]
    ]

    const LEFT_EAR_POINTS: [number, number][] = [
        // top arc
        [-5, -10],
        [-8, -3],
        [-15, -5],
        [-12, 4],
        // down right
        [-15, 10],
        [-5, 10],
        [-5, 15],
        [5, 25],
        // up left
        [10, 20],
        [10, 5],
        [5, -5],
        [15, -20],
        [0, -25],
        [5, -10],
    ]

    const NOSE:  [number, number][] = [
        [5, 0],
        [6, 5],
        [2, 9],
        [-2, 4],
        [-4, 2],
        [-3, 0],
        [-3, -1]
    ]

    const EYES: [number, number][] = [

    ]

    drawShape(HEAD_POINTS, true, 0, 0, 2, ORANGE_BROWN, ORANGE_BROWN);
    reset(0, 3);
    drawShape(HEAD_PATCH_POINTS, true, 0, 3, 2, DARK_SHADOW_BROWN, DARK_SHADOW_BROWN);
    reset(25, -2);
    drawShape(RIGHT_EAR_POINTS, false, 0, 0, 2, SHADOW_BROWN, SHADOW_BROWN);
    reset(-25, 0);
    drawShape(LEFT_EAR_POINTS, false, 0, 0, 2, SHADOW_BROWN, SHADOW_BROWN);
    reset(0, 80);
    drawShape(NOSE, true, 0, 80, 2, DARK_GREY, DARK_GREY);
    drawEyes(context, x, y);


    function drawNextLine(xOffset: number, yOffset: number) {
        endX = startX + xOffset;
        endY = startY + yOffset;
        drawLine(context, startX, startY, endX, endY);
        startX = endX;
        startY = endY;
    }

    function drawReflection(xOffset: number, yOffset: number) {
        drawNextLine(xOffset * -1, yOffset);
    }

    function drawShape(points: [number, number][], reflect: boolean,
        xOffset: number, yOffset: number,
        lineWidth: number, stroke: string, fill?: string) {
        context.beginPath();
        context.moveTo(startX, startY);
        points.forEach(p => drawNextLine(p[0], p[1]));
        if (reflect) {
            reset(xOffset, yOffset);
            points.forEach(p => drawReflection(p[0], p[1]));
        }
        context.closePath();

        context.lineCap = 'round';
        context.lineWidth = lineWidth;
        context.strokeStyle = stroke;
        if (fill) context.fillStyle = fill;
        context.fill();
        context.stroke();
    }

    function reset(xOffset: number, yOffset: number) {
        startX = x + xOffset;
        startY = y + yOffset;
    }
}   

function drawEyes(context: CanvasRenderingContext2D, x: number, y: number) {
    const eyeSize = 17;
    const eyePosX = 25;
    const eyeTopPosY = 50;
    const eyeBottomPosy = 34;

    // Right eye
    context.beginPath();
    context.arc(x + eyePosX, y + eyeTopPosY, eyeSize, Math.PI * 1.2, Math.PI * 1.9);
    context.fillStyle = DARK_GREY;
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(x + eyePosX + 2, y + eyeBottomPosy, eyeSize, Math.PI * 2.2, Math.PI * 0.9);
    context.fillStyle = DARK_GREY;
    context.fill();
    
    // Right pupil
    context.beginPath();
    context.arc(x + eyePosX + 2, y + eyeTopPosY - 10, 7, Math.PI * 2, Math.PI * 1.1);
    context.fillStyle = AMBER;
    context.fill();

    context.beginPath();
    context.arc(x + eyePosX + 2, y + eyeTopPosY - 8, 3, 0, Math.PI * 2);
    context.fillStyle = BLACK;
    context.fill();

    context.beginPath();
    context.arc(x + eyePosX + 1, y + eyeTopPosY - 9, 1, 0, Math.PI * 2);
    context.fillStyle = WHITE;
    context.fill();

    // Left eye
    context.beginPath();
    context.arc(x - eyePosX, y + eyeTopPosY, eyeSize, Math.PI * 1.1, Math.PI * 1.8);
    context.fillStyle = DARK_GREY;
    context.fill();
    context.closePath();
    context.beginPath();
    context.arc(x - eyePosX - 2, y + eyeBottomPosy, eyeSize, Math.PI * 2.1, Math.PI * 0.8);
    context.fillStyle = DARK_GREY;
    context.fill();

    // Left pupil
    context.beginPath();
    context.arc(x - eyePosX - 2, y + eyeTopPosY - 10, 7, Math.PI * 1.9, Math.PI * 1);
    context.fillStyle = AMBER;
    context.fill();

    context.beginPath();
    context.arc(x - eyePosX - 2, y + eyeTopPosY - 8, 3, 0, Math.PI * 2);
    context.fillStyle = BLACK;
    context.fill();

    context.beginPath();
    context.arc(x - eyePosX - 3, y + eyeTopPosY - 9, 1, 0, Math.PI * 2);
    context.fillStyle = WHITE;
    context.fill();
}