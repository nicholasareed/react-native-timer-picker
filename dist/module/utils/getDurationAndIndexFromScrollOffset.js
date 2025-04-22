export const getDurationAndIndexFromScrollOffset = variables => {
  const {
    disableInfiniteScroll,
    interval,
    itemHeight,
    numberOfItems,
    padWithNItems,
    yContentOffset
  } = variables;
  const index = Math.round(yContentOffset / itemHeight);
  const duration = (disableInfiniteScroll ? index : index + padWithNItems) % numberOfItems * interval;
  return {
    duration,
    index
  };
};
//# sourceMappingURL=getDurationAndIndexFromScrollOffset.js.map