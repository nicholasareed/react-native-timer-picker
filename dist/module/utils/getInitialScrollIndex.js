export const getInitialScrollIndex = variables => {
  const {
    disableInfiniteScroll,
    interval,
    numberOfItems,
    padWithNItems,
    repeatNumbersNTimes,
    value
  } = variables;
  return Math.max(numberOfItems * Math.floor(repeatNumbersNTimes / 2) + (value / interval + numberOfItems) % numberOfItems - (!disableInfiniteScroll ? padWithNItems : 0), 0);
};
//# sourceMappingURL=getInitialScrollIndex.js.map