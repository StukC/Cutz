export const formatePhone = () => {
    let newText = "";
    let cleaned = ("", phoneNumberString).replace(/\D/g, "");
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 0) {
        newText = "(";
      } else if (i == 3) {
        newText = newText + ") ";
      } else if (i == 6) {
        newText = newText + "-";
      }
      newText = newText + cleaned[i];
    }
  };