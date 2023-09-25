const getTotalHeight = (element: HTMLElement | null) => {
  if (element == null) return 0;

  const styles = window.getComputedStyle(element);

  const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  const border =
    parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
  const padding =
    parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);

  const totalHeight = element.clientHeight + margin + border + padding;

  return totalHeight;
};

export default getTotalHeight;
