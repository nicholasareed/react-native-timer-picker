"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDurationAndIndexFromScrollOffset = void 0;
const getDurationAndIndexFromScrollOffset = variables => {
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
exports.getDurationAndIndexFromScrollOffset = getDurationAndIndexFromScrollOffset;
//# sourceMappingURL=getDurationAndIndexFromScrollOffset.js.map