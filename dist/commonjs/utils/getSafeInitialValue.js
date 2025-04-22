"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSafeInitialValue = void 0;
const getSafeInitialValue = initialValue => ({
  days: typeof (initialValue === null || initialValue === void 0 ? void 0 : initialValue.days) === "number" && !isNaN(initialValue === null || initialValue === void 0 ? void 0 : initialValue.days) ? initialValue.days : 0,
  hours: typeof (initialValue === null || initialValue === void 0 ? void 0 : initialValue.hours) === "number" && !isNaN(initialValue === null || initialValue === void 0 ? void 0 : initialValue.hours) ? initialValue.hours : 0,
  minutes: typeof (initialValue === null || initialValue === void 0 ? void 0 : initialValue.minutes) === "number" && !isNaN(initialValue === null || initialValue === void 0 ? void 0 : initialValue.minutes) ? initialValue.minutes : 0,
  seconds: typeof (initialValue === null || initialValue === void 0 ? void 0 : initialValue.seconds) === "number" && !isNaN(initialValue === null || initialValue === void 0 ? void 0 : initialValue.seconds) ? initialValue.seconds : 0
});
exports.getSafeInitialValue = getSafeInitialValue;
//# sourceMappingURL=getSafeInitialValue.js.map