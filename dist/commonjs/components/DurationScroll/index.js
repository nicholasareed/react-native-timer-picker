"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _colorToRgba = require("../../utils/colorToRgba");
var _generateNumbers = require("../../utils/generateNumbers");
var _getAdjustedLimit = require("../../utils/getAdjustedLimit");
var _getDurationAndIndexFromScrollOffset = require("../../utils/getDurationAndIndexFromScrollOffset");
var _getInitialScrollIndex = require("../../utils/getInitialScrollIndex");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DurationScroll = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
  const {
    aggressivelyGetLatestDuration,
    allowFontScaling = false,
    amLabel,
    Audio,
    clickSoundAsset,
    disableInfiniteScroll = false,
    FlatList = _reactNative.FlatList,
    Haptics,
    initialValue = 0,
    interval,
    is12HourPicker,
    isDisabled,
    label,
    limit,
    LinearGradient,
    MaskedView,
    maximumValue,
    onDurationChange,
    padNumbersWithZero = false,
    padWithNItems,
    pickerFeedback,
    pickerGradientOverlayProps,
    pmLabel,
    repeatNumbersNTimes = 3,
    repeatNumbersNTimesNotExplicitlySet,
    styles,
    testID
  } = props;
  const numberOfItems = (0, _react.useMemo)(() => {
    // guard against negative maximum values
    if (maximumValue < 0) {
      return 1;
    }
    return Math.floor(maximumValue / interval) + 1;
  }, [interval, maximumValue]);
  const safeRepeatNumbersNTimes = (0, _react.useMemo)(() => {
    // do not repeat numbers if there is only one option
    if (numberOfItems === 1) {
      return 1;
    }
    if (!disableInfiniteScroll && repeatNumbersNTimes < 2) {
      return 2;
    } else if (repeatNumbersNTimes < 1 || isNaN(repeatNumbersNTimes)) {
      return 1;
    }

    // if this variable is not explicitly set, we calculate a reasonable value based on
    // the number of items in the picker, avoiding regular jumps up/down the list
    // whilst avoiding rendering too many items in the picker
    if (repeatNumbersNTimesNotExplicitlySet) {
      return Math.max(Math.round(180 / numberOfItems), 1);
    }
    return Math.round(repeatNumbersNTimes);
  }, [disableInfiniteScroll, numberOfItems, repeatNumbersNTimes, repeatNumbersNTimesNotExplicitlySet]);
  const numbersForFlatList = (0, _react.useMemo)(() => {
    if (is12HourPicker) {
      return (0, _generateNumbers.generate12HourNumbers)({
        padNumbersWithZero,
        repeatNTimes: safeRepeatNumbersNTimes,
        disableInfiniteScroll,
        padWithNItems,
        interval
      });
    }
    return (0, _generateNumbers.generateNumbers)(numberOfItems, {
      padNumbersWithZero,
      repeatNTimes: safeRepeatNumbersNTimes,
      disableInfiniteScroll,
      padWithNItems,
      interval
    });
  }, [disableInfiniteScroll, is12HourPicker, interval, numberOfItems, padNumbersWithZero, padWithNItems, safeRepeatNumbersNTimes]);
  const initialScrollIndex = (0, _react.useMemo)(() => (0, _getInitialScrollIndex.getInitialScrollIndex)({
    disableInfiniteScroll,
    interval,
    numberOfItems,
    padWithNItems,
    repeatNumbersNTimes: safeRepeatNumbersNTimes,
    value: initialValue
  }), [disableInfiniteScroll, initialValue, interval, numberOfItems, padWithNItems, safeRepeatNumbersNTimes]);
  const adjustedLimited = (0, _react.useMemo)(() => (0, _getAdjustedLimit.getAdjustedLimit)(limit, numberOfItems, interval), [interval, limit, numberOfItems]);
  const numberOfItemsToShow = 1 + padWithNItems * 2;

  // keep track of the latest duration as it scrolls
  const latestDuration = (0, _react.useRef)(0);
  // keep track of the last index scrolled past for haptic/audio feedback
  const lastFeedbackIndex = (0, _react.useRef)(0);
  const flatListRef = (0, _react.useRef)(null);
  const [clickSound, setClickSound] = (0, _react.useState)();

  // Preload the sound when the component mounts
  (0, _react.useEffect)(() => {
    const loadSound = async () => {
      if (Audio) {
        const {
          sound
        } = await Audio.Sound.createAsync(clickSoundAsset ?? {
          // use a hosted sound as a fallback (do not use local asset due to loader issues
          // in some environments when including mp3 in library)
          uri: "https://drive.google.com/uc?export=download&id=10e1YkbNsRh-vGx1jmS1Nntz8xzkBp4_I"
        }, {
          shouldPlay: false
        });
        setClickSound(sound);
      }
    };
    loadSound();

    // Unload sound when component unmounts
    return () => {
      clickSound === null || clickSound === void 0 || clickSound.unloadAsync();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Audio]);
  const renderItem = (0, _react.useCallback)(({
    item
  }) => {
    let stringItem = item;
    let intItem;
    let isAm;
    if (!is12HourPicker) {
      intItem = parseInt(item);
    } else {
      isAm = item.includes("AM");
      stringItem = item.replace(/\s[AP]M/g, "");
      intItem = parseInt(stringItem);
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      key: item,
      style: styles.pickerItemContainer,
      testID: "picker-item"
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      allowFontScaling: allowFontScaling,
      style: [styles.pickerItem, intItem > adjustedLimited.max || intItem < adjustedLimited.min ? styles.disabledPickerItem : {}]
    }, stringItem), is12HourPicker ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      pointerEvents: "none",
      style: styles.pickerAmPmContainer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      allowFontScaling: allowFontScaling,
      style: [styles.pickerAmPmLabel]
    }, isAm ? amLabel : pmLabel)) : null);
  }, [adjustedLimited.max, adjustedLimited.min, allowFontScaling, amLabel, is12HourPicker, pmLabel, styles.disabledPickerItem, styles.pickerAmPmContainer, styles.pickerAmPmLabel, styles.pickerItem, styles.pickerItemContainer]);
  const onScroll = (0, _react.useCallback)(e => {
    // this function is only used when the picker is in a modal and/or has Haptic/Audio feedback
    // it is used to ensure that the modal gets the latest duration on clicking
    // the confirm button, even if the scrollview is still scrolling
    if (!aggressivelyGetLatestDuration && !Haptics && !Audio && !pickerFeedback) {
      return;
    }
    if (aggressivelyGetLatestDuration) {
      const newValues = (0, _getDurationAndIndexFromScrollOffset.getDurationAndIndexFromScrollOffset)({
        disableInfiniteScroll,
        interval,
        itemHeight: styles.pickerItemContainer.height,
        numberOfItems,
        padWithNItems,
        yContentOffset: e.nativeEvent.contentOffset.y
      });
      if (newValues.duration !== latestDuration.current) {
        // check limits
        if (newValues.duration > adjustedLimited.max) {
          newValues.duration = adjustedLimited.max;
        } else if (newValues.duration < adjustedLimited.min) {
          newValues.duration = adjustedLimited.min;
        }
        latestDuration.current = newValues.duration;
      }
    }
    if (Haptics || Audio || pickerFeedback) {
      const feedbackIndex = Math.round((e.nativeEvent.contentOffset.y + styles.pickerItemContainer.height / 2) / styles.pickerItemContainer.height);
      if (feedbackIndex !== lastFeedbackIndex.current) {
        // this check stops the feedback firing when the component mounts
        if (lastFeedbackIndex.current) {
          // fire haptic feedback if available
          try {
            Haptics === null || Haptics === void 0 || Haptics.selectionAsync();
          } catch {
            // do nothing
          }

          // play click sound if available
          try {
            clickSound === null || clickSound === void 0 || clickSound.replayAsync();
          } catch {
            // do nothing
          }

          // fire custom feedback if available
          try {
            pickerFeedback === null || pickerFeedback === void 0 || pickerFeedback();
          } catch {
            // do nothing
          }
        }
        lastFeedbackIndex.current = feedbackIndex;
      }
    }
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [adjustedLimited.max, adjustedLimited.min, aggressivelyGetLatestDuration, clickSound, disableInfiniteScroll, interval, numberOfItems, padWithNItems, styles.pickerItemContainer.height]);
  const onMomentumScrollEnd = (0, _react.useCallback)(e => {
    const newValues = (0, _getDurationAndIndexFromScrollOffset.getDurationAndIndexFromScrollOffset)({
      disableInfiniteScroll,
      interval,
      itemHeight: styles.pickerItemContainer.height,
      numberOfItems,
      padWithNItems,
      yContentOffset: e.nativeEvent.contentOffset.y
    });

    // check limits
    if (newValues.duration > adjustedLimited.max) {
      var _flatListRef$current;
      const targetScrollIndex = newValues.index - (newValues.duration - adjustedLimited.max);
      (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 || _flatListRef$current.scrollToIndex({
        animated: true,
        index:
        // guard against scrolling beyond end of list
        targetScrollIndex >= 0 ? targetScrollIndex : adjustedLimited.max - 1
      }); // scroll down to max
      newValues.duration = adjustedLimited.max;
    } else if (newValues.duration < adjustedLimited.min) {
      var _flatListRef$current2;
      const targetScrollIndex = newValues.index + (adjustedLimited.min - newValues.duration);
      (_flatListRef$current2 = flatListRef.current) === null || _flatListRef$current2 === void 0 || _flatListRef$current2.scrollToIndex({
        animated: true,
        index:
        // guard against scrolling beyond end of list
        targetScrollIndex <= numbersForFlatList.length - 1 ? targetScrollIndex : adjustedLimited.min
      }); // scroll up to min
      newValues.duration = adjustedLimited.min;
    }
    onDurationChange(newValues.duration);
  }, [disableInfiniteScroll, interval, styles.pickerItemContainer.height, numberOfItems, padWithNItems, adjustedLimited.max, adjustedLimited.min, onDurationChange, numbersForFlatList.length]);
  const onViewableItemsChanged = (0, _react.useCallback)(({
    viewableItems
  }) => {
    var _viewableItems$, _viewableItems$2;
    if (numberOfItems === 1) {
      return;
    }
    if ((_viewableItems$ = viewableItems[0]) !== null && _viewableItems$ !== void 0 && _viewableItems$.index && viewableItems[0].index < numberOfItems * 0.5) {
      var _flatListRef$current3;
      (_flatListRef$current3 = flatListRef.current) === null || _flatListRef$current3 === void 0 || _flatListRef$current3.scrollToIndex({
        animated: false,
        index: viewableItems[0].index + numberOfItems
      });
    } else if ((_viewableItems$2 = viewableItems[0]) !== null && _viewableItems$2 !== void 0 && _viewableItems$2.index && viewableItems[0].index >= numberOfItems * (safeRepeatNumbersNTimes - 0.5)) {
      var _flatListRef$current4;
      (_flatListRef$current4 = flatListRef.current) === null || _flatListRef$current4 === void 0 || _flatListRef$current4.scrollToIndex({
        animated: false,
        index: viewableItems[0].index - numberOfItems
      });
    }
  }, [numberOfItems, safeRepeatNumbersNTimes]);
  const [viewabilityConfigCallbackPairs, setViewabilityConfigCallbackPairs] = (0, _react.useState)(!disableInfiniteScroll ? [{
    viewabilityConfig: {
      viewAreaCoveragePercentThreshold: 0
    },
    onViewableItemsChanged: onViewableItemsChanged
  }] : undefined);
  const [flatListRenderKey, setFlatListRenderKey] = (0, _react.useState)(0);
  const initialRender = (0, _react.useRef)(true);
  (0, _react.useEffect)(() => {
    // don't run on first render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // if the onViewableItemsChanged callback changes, we need to update viewabilityConfigCallbackPairs
    // which requires the FlatList to be remounted, hence the increase of the FlatList key
    setFlatListRenderKey(prev => prev + 1);
    setViewabilityConfigCallbackPairs(!disableInfiniteScroll ? [{
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: 0
      },
      onViewableItemsChanged: onViewableItemsChanged
    }] : undefined);
  }, [disableInfiniteScroll, onViewableItemsChanged]);
  const getItemLayout = (0, _react.useCallback)((_, index) => ({
    length: styles.pickerItemContainer.height,
    offset: styles.pickerItemContainer.height * index,
    index
  }), [styles.pickerItemContainer.height]);
  (0, _react.useImperativeHandle)(ref, () => ({
    reset: options => {
      var _flatListRef$current5;
      (_flatListRef$current5 = flatListRef.current) === null || _flatListRef$current5 === void 0 || _flatListRef$current5.scrollToIndex({
        animated: (options === null || options === void 0 ? void 0 : options.animated) ?? false,
        index: initialScrollIndex
      });
    },
    setValue: (value, options) => {
      var _flatListRef$current6;
      (_flatListRef$current6 = flatListRef.current) === null || _flatListRef$current6 === void 0 || _flatListRef$current6.scrollToIndex({
        animated: (options === null || options === void 0 ? void 0 : options.animated) ?? false,
        index: (0, _getInitialScrollIndex.getInitialScrollIndex)({
          disableInfiniteScroll,
          interval,
          numberOfItems,
          padWithNItems,
          repeatNumbersNTimes: safeRepeatNumbersNTimes,
          value: value
        })
      });
    },
    latestDuration: latestDuration
  }));
  const renderContent = (0, _react.useMemo)(() => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(FlatList, {
      key: flatListRenderKey,
      ref: flatListRef,
      contentContainerStyle: styles.durationScrollFlatListContentContainer,
      data: numbersForFlatList,
      decelerationRate: 0.88,
      getItemLayout: getItemLayout,
      initialScrollIndex: initialScrollIndex,
      keyExtractor: (_, index) => index.toString(),
      nestedScrollEnabled: true,
      onMomentumScrollEnd: onMomentumScrollEnd,
      onScroll: onScroll,
      renderItem: renderItem,
      scrollEnabled: !isDisabled,
      scrollEventThrottle: 16,
      showsVerticalScrollIndicator: false,
      snapToAlignment: "start"
      // used in place of snapToInterval due to bug on Android
      ,
      snapToOffsets: [...Array(numbersForFlatList.length)].map((_, i) => i * styles.pickerItemContainer.height),
      style: styles.durationScrollFlatList,
      testID: "duration-scroll-flatlist",
      viewabilityConfigCallbackPairs: viewabilityConfigCallbackPairs,
      windowSize: numberOfItemsToShow
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      pointerEvents: "none",
      style: styles.pickerLabelContainer
    }, typeof label === "string" ? /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      allowFontScaling: allowFontScaling,
      style: styles.pickerLabel
    }, label) : label ?? null));
  }, [FlatList, allowFontScaling, flatListRenderKey, getItemLayout, initialScrollIndex, isDisabled, label, numberOfItemsToShow, numbersForFlatList, onMomentumScrollEnd, onScroll, renderItem, styles.durationScrollFlatList, styles.durationScrollFlatListContentContainer, styles.pickerItemContainer.height, styles.pickerLabel, styles.pickerLabelContainer, viewabilityConfigCallbackPairs]);
  const renderLinearGradient = (0, _react.useMemo)(() => {
    if (!LinearGradient) {
      return null;
    }
    let colors;
    if (MaskedView) {
      // if using masked view, we only care about the opacity
      colors = ["rgba(0,0,0,0)", "rgba(0,0,0,1)", "rgba(0,0,0,1)", "rgba(0,0,0,0)"];
    } else {
      const backgroundColor = styles.pickerContainer.backgroundColor ?? "white";
      const transparentBackgroundColor = (0, _colorToRgba.colorToRgba)({
        color: backgroundColor,
        opacity: 0
      });
      colors = [backgroundColor, transparentBackgroundColor, transparentBackgroundColor, backgroundColor];
    }

    // calculate the gradient height to cover the top item and bottom item
    const gradientHeight = padWithNItems > 0 ? 1 / (padWithNItems * 2 + 1) : 0.3;
    return /*#__PURE__*/_react.default.createElement(LinearGradient, _extends({
      colors: colors,
      locations: [0, gradientHeight, 1 - gradientHeight, 1],
      pointerEvents: "none",
      style: styles.pickerGradientOverlay
    }, pickerGradientOverlayProps));
  }, [LinearGradient, MaskedView, padWithNItems, pickerGradientOverlayProps, styles.pickerContainer.backgroundColor, styles.pickerGradientOverlay]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    pointerEvents: isDisabled ? "none" : undefined,
    style: [styles.durationScrollFlatListContainer, {
      height: styles.pickerItemContainer.height * numberOfItemsToShow
    }, isDisabled && styles.disabledPickerContainer],
    testID: testID
  }, MaskedView ? /*#__PURE__*/_react.default.createElement(MaskedView, {
    maskElement: renderLinearGradient,
    style: [styles.maskedView]
  }, renderContent) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderContent, renderLinearGradient));
});
var _default = exports.default = /*#__PURE__*/_react.default.memo(DurationScroll);
//# sourceMappingURL=index.js.map