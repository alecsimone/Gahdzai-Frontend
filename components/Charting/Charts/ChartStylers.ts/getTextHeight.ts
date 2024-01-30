// * Gets the height in pixels of text on the canvas given current styling
type Signature = (ctx: CanvasRenderingContext2D, text: string) => number;

const getTextHeight: Signature = (ctx, text) => {
  const textMeasurement = ctx.measureText(text);
  const textHeight =
    textMeasurement.fontBoundingBoxAscent +
    textMeasurement.fontBoundingBoxDescent;

  return textHeight;
};

export default getTextHeight;
