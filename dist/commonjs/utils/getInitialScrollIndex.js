"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInitialScrollIndex = void 0;
const getInitialScrollIndex = variables => {
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
exports.getInitialScrollIndex = getInitialScrollIndex;
//# sourceMappingURL=getInitialScrollIndex.js.map