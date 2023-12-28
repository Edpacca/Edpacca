

export function runFetch(
    ctx: CanvasRenderingContext2D,
    alaCanvas: HTMLCanvasElement,
    alaCtx: CanvasRenderingContext2D,
    ala: HTMLImageElement,
    koraCanvas: HTMLCanvasElement,
    koraCtx: CanvasRenderingContext2D,
    kora: HTMLImageElement
    ) {
    const aWidth = 64;
    const aHeight = 128;
    const kSize = 64;
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;  
    const cenX = canvasWidth / 2 - (aWidth / 2);
    const cenY = canvasHeight / 2 - (aHeight / 2);
    const aVelocity = 10;
    const kVelocity = 8;

    let aPosX = cenX;
    let aPosY = cenY;
    
    let kPosX = 10;
    let kPosY = 10;
    let chasing = false;

    alaCtx.drawImage(ala, 0, 0, aWidth, aHeight);
    koraCtx.drawImage(kora, 0, 0, kSize, kSize);
    ctx.drawImage(alaCanvas, 0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(koraCanvas, 0, 0, canvasWidth, canvasHeight);
    
    document.addEventListener("keydown", handleKeyboardEvent, false);

    function handleKeyboardEvent(event: KeyboardEvent) {
        switch(event.key) {
            case " " || "Space":
                chasing = !chasing;
                break;
            case "ArrowDown":
                aPosY += aVelocity;
                break;
            case "ArrowUp":
                aPosY -= aVelocity;
                break;
            case "ArrowLeft":
                aPosX -= aVelocity;
                break;
            case "ArrowRight":
                aPosX += aVelocity;
                break;
            default:
                break;
        }
    }

    function update() {
        if (calculateKoraTrajectory()) {
            if (!kora.src.includes("hearts")) {
                kora.src = "game/kora/kora_hearts.webp";
                koraCtx.clearRect(0, 0, kSize, kSize);  
                koraCtx.drawImage(kora, 0, 0, kSize, kSize);
            }
        } else {
            if (kora.src.includes("hearts")) {
                kora.src = "game/kora/kora_main.webp";
                koraCtx.clearRect(0, 0, kSize, kSize);
                koraCtx.drawImage(kora, 0, 0, kSize, kSize);
            }
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(alaCanvas, aPosX, aPosY, canvasWidth, canvasHeight)
        ctx.drawImage(koraCanvas, kPosX, kPosY, canvasWidth, canvasHeight)
        requestAnimationFrame(update)
    }

    update();
    

    function calculateKoraTrajectory() {
        const diffX = aPosX - kPosX;
        const diffY = aPosY + 86 - kPosY;

        if (chasing) {
            if (Math.abs(diffX) > 20) {
                kPosX += (diffX > 0 ? 1 : -1) * kVelocity;
            } 
            if (Math.abs(diffY) > 20) {
                kPosY += (diffY > 0 ? 1 : -1) * kVelocity;
            }
        }

        return (Math.abs(diffX) <= 40 && Math.abs(diffY) <= 40);
    }

}
