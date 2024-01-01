import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
export const colors = {
  buttons: "#F9629F",
  grey1: "#43484d",
  grey2: "#5e6977",

  grey3: "#86939e",

  grey4: "#bdc6ef",

  grey5: "#e1e8ee",

  CardCommet: "#86939e",

  text: "#FF69B4",

  darkColor: "#E11584",

  cardbackground: "white",

  statusbar: "#F9629F",

  headerText: "white",
};

export const parameters = {
  headerHeight: 50,

  styledButton: {
    backgroundColor: "#f9629f",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f9629f",
    height: 55,
    paddingHorizontal: 10,
    width: "100%",
  },

  buttonTitle: {
    color: "white",
    fontSize: 18,

    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
};

export const title = {
  color: "#F9629F",
  fontSize: 18,

  fontWeight: "bold",

  marginLeft: 20,

  marginTop: 10,

  marginRight: 20,
};

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.darkColor }}
      contentContainerStyle={{ paddingHorizontal: 20 }}
      text1Style={{
        fontSize: 14,
        fontWeight: "bold",
        color: colors.darkColor,
        marginLeft: 20,
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 14,
        fontWeight: "bold",
        color: "red",
        marginLeft: 30,
      }}
    />
  ),
};
