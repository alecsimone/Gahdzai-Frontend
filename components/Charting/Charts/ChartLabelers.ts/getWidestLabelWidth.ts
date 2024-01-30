// * Loops through our y-axis labels and figures out which of them is the widest so we can make sure they all fit in our right side gutter
type Signature = (
  ctx: CanvasRenderingContext2D | null | undefined,
  labels: string[],
  decorator?: string
) => number;

const getWidestLabelWidth: Signature = (ctx, labels, decorator) => {
  if (ctx == null) return 0;

  let widestLabelWidth: number = 0;
  labels.forEach((label) => {
    const fullLabel = `${label}${decorator}`;

    const labelWidth = ctx.measureText(fullLabel).width;
    if (labelWidth > widestLabelWidth) {
      widestLabelWidth = labelWidth;
    }
  });

  return widestLabelWidth;
};

export default getWidestLabelWidth;
