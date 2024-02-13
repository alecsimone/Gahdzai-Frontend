// * Clears the contents of a canvas
type Signature = (canvasEl: HTMLCanvasElement | null | undefined) => void;

const clearCanvas: Signature = (el) => {
  if (el) {
    const { width, height } = el;

    const ctx = el.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
    }
  }
};

export default clearCanvas;
