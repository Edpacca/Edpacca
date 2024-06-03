import { LANG_LOGO_COLORS } from "./data/codeLangData";
import { resolveCollisions, type Rect, resolveCollision } from "./mechanics/rect";
import { Vector2D, randomVector } from "./mechanics/vector";

export const DEFAULT_GRAVITY = new Vector2D(0, 0.2);
const DEFAULT_DAMPING_FACTOR = 0.3;
const DEFAULT_MIN_MAGNITUDE = 4.8
const DEFAULT_FONT_AREA = 1200;
const DEFAULT_MIN_FONT = 32;

const COLORS = [
    "blue",
    "red",
    "green",
    "purple",
    "orange",
    "magenta",
    "lime"
]

function getRects(wordBlocks: WordBlock[]): Rect[] {
    return wordBlocks.map(block => block.getRect());
}

function getColor(technology: string) {
    if (LANG_LOGO_COLORS[technology]) {
        return LANG_LOGO_COLORS[technology];
    } else {
        const randomIndex = Math.floor(Math.random() * COLORS.length);
        return COLORS[randomIndex]
    }

}

function getProportionalFontSize(fontArea: number | undefined, value: number, minFontSize?: number) {
    const result = ((fontArea ?? DEFAULT_FONT_AREA) * value);
    return Math.max(result, minFontSize ?? DEFAULT_MIN_FONT);
}

export class WordSoup {

    wordBlocks: WordBlock[] = [];
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    counter: number = 0;
    randomForces: boolean = false;
    gravity: Vector2D = DEFAULT_GRAVITY;
    dampingFactor: number = DEFAULT_DAMPING_FACTOR;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, words: Record<string, number>, fontArea?: number, minFontSize?: number) {
        this.canvas = canvas;
        this.ctx = context;
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";

        Object.keys(words).forEach(word => {
            this.wordBlocks.push(
                new WordBlock(
                    word,
                    getProportionalFontSize(fontArea, words[word], minFontSize),
                    getColor(word)));
        })

        let lastPlacedBlock: WordBlock;
        const nextPosition = new Vector2D(10, 10);
        const maxBlockHeight = Math.max(...this.wordBlocks.map(b => b.height));
        this.wordBlocks.forEach(block => {
            if (lastPlacedBlock) {
                nextPosition.x += lastPlacedBlock.width + (Math.random() * lastPlacedBlock.width);
                if (nextPosition.x + block.width > canvas.width) {
                    nextPosition.x = 10 + (Math.random() * 10);
                    nextPosition.y += (maxBlockHeight * 2) + 10 + (Math.random() * maxBlockHeight)
                }
            }

            block.position.x = nextPosition.x;
            block.position.y = nextPosition.y;
            lastPlacedBlock = block;
            block.draw(this.ctx);
        });
    }

    setForces(value: Vector2D, randomForces: boolean = false, dampingFactor?: number) {
        this.randomForces = randomForces;
        this.setGravity(value);
        if (dampingFactor) {
            this.dampingFactor = dampingFactor;
        }
    }

    setGravity(value: Vector2D) {
        this.gravity = value;
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const rects = getRects(this.wordBlocks);
        this.wordBlocks.forEach(block => {
            const force = this.randomForces ? randomVector(1, 2) : this.gravity;
            this.updateVelocity(block, rects, force);
            block.draw(this.ctx);
        });
        requestAnimationFrame(this.animate);
    }

    updateVelocity(word: WordBlock, collisionRects: Rect[], force: Vector2D) {
        word.velocity.add(force);

        const potentialPos = new Vector2D(word.position.x + word.velocity.x,
            word.position.y + word.velocity.y);

        const potentialRect: Rect = {
            x1: potentialPos.x,
            x2: potentialPos.x + word.width,
            y1: potentialPos.y,
            y2: potentialPos.y + word.height
        }

        const collision = resolveCollisions(potentialRect, word.getRect(), collisionRects, word.velocity);

        let rectangleCollision = false;
        let boundaryCollision = false;

        if (collision) {
            rectangleCollision = true;
            word.velocity.add(collision.response);
        }

        if (potentialPos.x < 0 || potentialPos.x >= this.canvas.width - word.width || collision && Math.abs(collision.response.x) > 0) {
            word.velocity.x = word.velocity.x * -1;
            boundaryCollision = true;
        }

        if (potentialPos.y < 0 || potentialPos.y >= this.canvas.height - word.height || collision && Math.abs(collision.response.y) > 0) {
            word.velocity.y = word.velocity.y * -1;
            boundaryCollision = true;
        }

        if (boundaryCollision) {
            word.velocity.attenuate(this.dampingFactor, DEFAULT_MIN_MAGNITUDE);
        }

        word.position.add(word.velocity);

        if (rectangleCollision && collision) {
            const response = resolveCollision(word.getRect(), collisionRects[collision.index], word.velocity)
            if (response) {
                word.position.add(response);
            }
        }

        if (word.position.x < 0) {
            word.position.x = 1;
        }

        if(word.position.x >= this.canvas.width - word.width) {
            word.position.x = this.canvas.width - word.width - 1;
        }

        if (word.position.y < 0) {
            word.position.y = 1;
        }
        if (word.position.y >= this.canvas.height - word.height) {
            word.position.y = this.canvas.height - word.height - 1;
        }
    }
}

class WordBlock {
    height: number
    width: number
    color: string
    word: string
    charSize: number;
    velocity: Vector2D;
    position: Vector2D = new Vector2D(0, 0);
    rotationMomentum: number = 0;

    constructor(word: string, charSize: number, color: string) {
        this.height = charSize + 8;
        this.width = (charSize * word.length * 0.6) + 16;
        this.color = color
        this.word = word;
        this.charSize = charSize;
        this.velocity = new Vector2D(0, 0);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.position.round();
        ctx.beginPath();
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.roundRect(this.position.x, this.position.y, this.width, this.height, 12);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.font = `bold ${this.charSize}px 'Fira Mono'`;
        ctx.fillStyle = "white";
        ctx.fillText(this.word, this.position.x + 4, this.position.y + 8, this.width);
        ctx.fill();
        ctx.closePath();
    }

    setRandomPosition(bounds: Vector2D) {
        this.position.x = Math.floor((Math.random() * (bounds.x - this.width)));
        this.position.y = Math.floor((Math.random() * (bounds.y - this.height)));
    }

    getRect(): Rect {
        return {
            x1: this.position.x,
            x2: this.position.x + this.width,
            y1: this.position.y,
            y2: this.position.y + this.height,
        }
    }
}

