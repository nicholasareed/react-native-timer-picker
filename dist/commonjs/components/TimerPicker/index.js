"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _getSafeInitialValue = require("../../utils/getSafeInitialValue");
var _DurationScroll = _interopRequireDefault(require("../DurationScroll"));
var _styles = require("./styles");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TimerPicker = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    aggressivelyGetLatestDuration = false,
    allowFontScaling = false,
    amLabel = "am",
    dayInterval = 1,
    dayLabel,
    dayLimit,
    daysPickerIsDisabled = false,
    disableInfiniteScroll = false,
    hideDays = false,
    hideHours = false,
    hideMinutes = false,
    hideSeconds = false,
    hourInterval = 1,
    hourLabel,
    hourLimit,
    hoursPickerIsDisabled = false,
    initialValue,
    maximumDays = 30,
    maximumHours = 23,
    maximumMinutes = 59,
    maximumSeconds = 59,
    minuteInterval = 1,
    minuteLabel,
    minuteLimit,
    minutesPickerIsDisabled = false,
    onDurationChange,
    padDaysWithZero = false,
    padHoursWithZero = false,
    padMinutesWithZero = true,
    padSecondsWithZero = true,
    padWithNItems = 1,
    pickerContainerProps,
    pmLabel = "pm",
    repeatDayNumbersNTimes = 3,
    repeatHourNumbersNTimes = 8,
    repeatMinuteNumbersNTimes = 3,
    repeatSecondNumbersNTimes = 3,
    secondInterval = 1,
    secondLabel,
    secondLimit,
    secondsPickerIsDisabled = false,
    styles: customStyles,
    use12HourPicker = false,
    ...otherProps
  } = props;
  const safePadWithNItems = (0, _react.useMemo)(() => {
    if (padWithNItems < 0 || isNaN(padWithNItems)) {
      return 0;
    }
    const maxPadWithNItems = hideHours ? 15 : 6;
    if (padWithNItems > maxPadWithNItems) {
      return maxPadWithNItems;
    }
    return Math.round(padWithNItems);
  }, [hideHours, padWithNItems]);
  const safeInitialValue = (0, _react.useMemo)(() => (0, _getSafeInitialValue.getSafeInitialValue)({
    days: initialValue === null || initialValue === void 0 ? void 0 : initialValue.days,
    hours: initialValue === null || initialValue === void 0 ? void 0 : initialValue.hours,
    minutes: initialValue === null || initialValue === void 0 ? void 0 : initialValue.minutes,
    seconds: initialValue === null || initialValue === void 0 ? void 0 : initialValue.seconds
  }), [initialValue === null || initialValue === void 0 ? void 0 : initialValue.days, initialValue === null || initialValue === void 0 ? void 0 : initialValue.hours, initialValue === null || initialValue === void 0 ? void 0 : initialValue.minutes, initialValue === null || initialValue === void 0 ? void 0 : initialValue.seconds]);
  const styles = (0, _react.useMemo)(() => (0, _styles.generateStyles)(customStyles), [customStyles]);
  const [selectedDays, setSelectedDays] = (0, _react.useState)(safeInitialValue.days);
  const [selectedHours, setSelectedHours] = (0, _react.useState)(safeInitialValue.hours);
  const [selectedMinutes, setSelectedMinutes] = (0, _react.useState)(safeInitialValue.minutes);
  const [selectedSeconds, setSelectedSeconds] = (0, _react.useState)(safeInitialValue.seconds);
  (0, _react.useEffect)(() => {
    onDurationChange === null || onDurationChange === void 0 || onDurationChange({
      days: selectedDays,
      hours: selectedHours,
      minutes: selectedMinutes,
      seconds: selectedSeconds
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDays, selectedHours, selectedMinutes, selectedSeconds]);
  const daysDurationScrollRef = (0, _react.useRef)(null);
  const hoursDurationScrollRef = (0, _react.useRef)(null);
  const minutesDurationScrollRef = (0, _react.useRef)(null);
  const secondsDurationScrollRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => {
    var _daysDurationScrollRe3, _hoursDurationScrollR3, _minutesDurationScrol3, _secondsDurationScrol3;
    return {
      reset: options => {
        var _daysDurationScrollRe, _hoursDurationScrollR, _minutesDurationScrol, _secondsDurationScrol;
        setSelectedDays(safeInitialValue.days);
        setSelectedHours(safeInitialValue.hours);
        setSelectedMinutes(safeInitialValue.minutes);
        setSelectedSeconds(safeInitialValue.seconds);
        (_daysDurationScrollRe = daysDurationScrollRef.current) === null || _daysDurationScrollRe === void 0 || _daysDurationScrollRe.reset(options);
        (_hoursDurationScrollR = hoursDurationScrollRef.current) === null || _hoursDurationScrollR === void 0 || _hoursDurationScrollR.reset(options);
        (_minutesDurationScrol = minutesDurationScrollRef.current) === null || _minutesDurationScrol === void 0 || _minutesDurationScrol.reset(options);
        (_secondsDurationScrol = secondsDurationScrollRef.current) === null || _secondsDurationScrol === void 0 || _secondsDurationScrol.reset(options);
      },
      setValue: (value, options) => {
        var _daysDurationScrollRe2, _hoursDurationScrollR2, _minutesDurationScrol2, _secondsDurationScrol2;
        setSelectedDays(value.days);
        setSelectedHours(value.hours);
        setSelectedMinutes(value.minutes);
        setSelectedSeconds(value.seconds);
        (_daysDurationScrollRe2 = daysDurationScrollRef.current) === null || _daysDurationScrollRe2 === void 0 || _daysDurationScrollRe2.setValue(value.days, options);
        (_hoursDurationScrollR2 = hoursDurationScrollRef.current) === null || _hoursDurationScrollR2 === void 0 || _hoursDurationScrollR2.setValue(value.hours, options);
        (_minutesDurationScrol2 = minutesDurationScrollRef.current) === null || _minutesDurationScrol2 === void 0 || _minutesDurationScrol2.setValue(value.minutes, options);
        (_secondsDurationScrol2 = secondsDurationScrollRef.current) === null || _secondsDurationScrol2 === void 0 || _secondsDurationScrol2.setValue(value.seconds, options);
      },
      latestDuration: {
        days: (_daysDurationScrollRe3 = daysDurationScrollRef.current) === null || _daysDurationScrollRe3 === void 0 ? void 0 : _daysDurationScrollRe3.latestDuration,
        hours: (_hoursDurationScrollR3 = hoursDurationScrollRef.current) === null || _hoursDurationScrollR3 === void 0 ? void 0 : _hoursDurationScrollR3.latestDuration,
        minutes: (_minutesDurationScrol3 = minutesDurationScrollRef.current) === null || _minutesDurationScrol3 === void 0 ? void 0 : _minutesDurationScrol3.latestDuration,
        seconds: (_secondsDurationScrol3 = secondsDurationScrollRef.current) === null || _secondsDurationScrol3 === void 0 ? void 0 : _secondsDurationScrol3.latestDuration
      }
    };
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({}, pickerContainerProps, {
    style: styles.pickerContainer,
    testID: "timer-picker"
  }), !hideDays ? /*#__PURE__*/_react.default.createElement(_DurationScroll.default, _extends({
    ref: daysDurationScrollRef,
    aggressivelyGetLatestDuration: aggressivelyGetLatestDuration,
    allowFontScaling: allowFontScaling,
    disableInfiniteScroll: disableInfiniteScroll,
    initialValue: safeInitialValue.days,
    interval: dayInterval,
    isDisabled: daysPickerIsDisabled,
    label: dayLabel ?? "d",
    limit: dayLimit,
    maximumValue: maximumDays,
    onDurationChange: setSelectedDays,
    padNumbersWithZero: padDaysWithZero,
    padWithNItems: safePadWithNItems,
    repeatNumbersNTimes: repeatDayNumbersNTimes,
    repeatNumbersNTimesNotExplicitlySet: (props === null || props === void 0 ? void 0 : props.repeatDayNumbersNTimes) === undefined,
    styles: styles,
    testID: "duration-scroll-day"
  }, otherProps)) : null, !hideHours ? /*#__PURE__*/_react.default.createElement(_DurationScroll.default, _extends({
    ref: hoursDurationScrollRef,
    aggressivelyGetLatestDuration: aggressivelyGetLatestDuration,
    allowFontScaling: allowFontScaling,
    amLabel: amLabel,
    disableInfiniteScroll: disableInfiniteScroll,
    initialValue: safeInitialValue.hours,
    interval: hourInterval,
    is12HourPicker: use12HourPicker,
    isDisabled: hoursPickerIsDisabled,
    label: hourLabel ?? (!use12HourPicker ? "h" : undefined),
    limit: hourLimit,
    maximumValue: maximumHours,
    onDurationChange: setSelectedHours,
    padNumbersWithZero: padHoursWithZero,
    padWithNItems: safePadWithNItems,
    pmLabel: pmLabel,
    repeatNumbersNTimes: repeatHourNumbersNTimes,
    repeatNumbersNTimesNotExplicitlySet: (props === null || props === void 0 ? void 0 : props.repeatHourNumbersNTimes) === undefined,
    styles: styles,
    testID: "duration-scroll-hour"
  }, otherProps)) : null, !hideMinutes ? /*#__PURE__*/_react.default.createElement(_DurationScroll.default, _extends({
    ref: minutesDurationScrollRef,
    aggressivelyGetLatestDuration: aggressivelyGetLatestDuration,
    allowFontScaling: allowFontScaling,
    disableInfiniteScroll: disableInfiniteScroll,
    initialValue: safeInitialValue.minutes,
    interval: minuteInterval,
    isDisabled: minutesPickerIsDisabled,
    label: minuteLabel ?? "m",
    limit: minuteLimit,
    maximumValue: maximumMinutes,
    onDurationChange: setSelectedMinutes,
    padNumbersWithZero: padMinutesWithZero,
    padWithNItems: safePadWithNItems,
    repeatNumbersNTimes: repeatMinuteNumbersNTimes,
    repeatNumbersNTimesNotExplicitlySet: (props === null || props === void 0 ? void 0 : props.repeatMinuteNumbersNTimes) === undefined,
    styles: styles,
    testID: "duration-scroll-minute"
  }, otherProps)) : null, !hideSeconds ? /*#__PURE__*/_react.default.createElement(_DurationScroll.default, _extends({
    ref: secondsDurationScrollRef,
    aggressivelyGetLatestDuration: aggressivelyGetLatestDuration,
    allowFontScaling: allowFontScaling,
    disableInfiniteScroll: disableInfiniteScroll,
    initialValue: safeInitialValue.seconds,
    interval: secondInterval,
    isDisabled: secondsPickerIsDisabled,
    label: secondLabel ?? "s",
    limit: secondLimit,
    maximumValue: maximumSeconds,
    onDurationChange: setSelectedSeconds,
    padNumbersWithZero: padSecondsWithZero,
    padWithNItems: safePadWithNItems,
    repeatNumbersNTimes: repeatSecondNumbersNTimes,
    repeatNumbersNTimesNotExplicitlySet: (props === null || props === void 0 ? void 0 : props.repeatSecondNumbersNTimes) === undefined,
    styles: styles,
    testID: "duration-scroll-second"
  }, otherProps)) : null);
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(TimerPicker);
//# sourceMappingURL=index.js.map