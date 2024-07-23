/* wdd131/7s4e/assets/js/utils.js */

export const makeClassStyle = (name) => {
  return name
    .replace(/\s+/g, "-")
    .replace(/([^-])(?=[A-Z])/g, "$1-")
    .toLowerCase();
}
