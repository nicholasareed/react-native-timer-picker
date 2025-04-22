import { StyleSheet } from "react-native";
const DARK_MODE_BACKGROUND_COLOR = "#232323";
const DARK_MODE_TEXT_COLOR = "#E9E9E9";
const LIGHT_MODE_BACKGROUND_COLOR = "#F1F1F1";
const LIGHT_MODE_TEXT_COLOR = "#1B1B1B";
export const generateStyles = (customStyles, variables) => {
  const {
    button: customButtonStyle,
    buttonContainer: customButtonContainerStyle,
    cancelButton: customCancelButtonStyle,
    confirmButton: customConfirmButtonStyle,
    container: customContainerStyle,
    contentContainer: customContentContainerStyle,
    modalTitle: customModalTitleStyle,
    ...customTimerPickerStyles
  } = customStyles ?? {};
  return StyleSheet.create({
    container: {
      justifyContent: "center",
      overflow: "hidden",
      ...customContainerStyle,
      // disable setting alignItems here because it can affect
      // the FlatList's ability to calculate its layout, which can
      // stop snapToOffsets working properly
      alignItems: undefined
    },
    contentContainer: {
      backgroundColor: (customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.backgroundColor) ?? ((customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.theme) === "dark" ? DARK_MODE_BACKGROUND_COLOR : LIGHT_MODE_BACKGROUND_COLOR),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      overflow: "hidden",
      ...customContentContainerStyle,
      // disable setting padding here because it can affect
      // the FlatList's ability to calculate its layout, which can
      // stop snapToOffsets working properly
      paddingHorizontal: 0,
      paddingVertical: 0
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 25,
      marginBottom: 20,
      ...customButtonContainerStyle
    },
    button: {
      marginHorizontal: 12,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderRadius: 10,
      fontSize: 16,
      overflow: "hidden",
      ...(customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.text),
      ...customButtonStyle
    },
    cancelButton: {
      borderColor: "gray",
      color: (customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.theme) === "dark" ? DARK_MODE_TEXT_COLOR : "gray",
      backgroundColor: (customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.theme) === "dark" ? "gray" : undefined,
      ...(customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.text),
      ...customCancelButtonStyle
    },
    confirmButton: {
      borderColor: "green",
      color: (customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.theme) === "dark" ? DARK_MODE_TEXT_COLOR : "green",
      backgroundColor: (customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.theme) === "dark" ? "green" : undefined,
      ...(customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.text),
      ...customConfirmButtonStyle
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: "600",
      marginTop: 20,
      marginBottom: 15,
      color: (customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.theme) === "dark" ? DARK_MODE_TEXT_COLOR : LIGHT_MODE_TEXT_COLOR,
      ...(customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.text),
      ...customModalTitleStyle
    },
    timerPickerStyles: {
      ...customTimerPickerStyles,
      pickerContainer: {
        // set padding here instead of on modal content container because it can affect
        // the FlatList's ability to calculate its layout, which can
        // stop snapToOffsets working properly
        paddingHorizontal: 20,
        paddingTop: !(variables !== null && variables !== void 0 && variables.hasModalTitle) ? 20 : 0,
        ...((customTimerPickerStyles === null || customTimerPickerStyles === void 0 ? void 0 : customTimerPickerStyles.pickerContainer) ?? {})
      }
    }
  });
};
//# sourceMappingURL=styles.js.map