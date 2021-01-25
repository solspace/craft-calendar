export const countChildren = (children) => {
  let length = 0;
  if (children) {
    if (Array.isArray(children)) {
      children.map((item) => {
        if (item) {
          length++;
        }
      });
    } else {
      length = 1;
    }
  }

  return length;
};

export default countChildren;
