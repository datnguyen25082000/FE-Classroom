const range = (len: any) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  return {
    fullname: "Nguyen Tan Dat Nguyen",
    studentid: "18120308",
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status: Math.floor(Math.random() * 100),
  };
};

export const makeData = (lens: any) => {
  const makeDataLevel: any = (depth = 0) => {
    return range(lens).map((d, i) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
};
