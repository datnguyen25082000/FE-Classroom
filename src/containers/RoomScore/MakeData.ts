const range = (len: any) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (item: IResScore, listAssign: Array<IItemAssignCate>) => {
  let row: any = {
    fullname: item.full_name,
    studentid: item.student_id,
  };

  let totalScore = 0;
  let totalPoint = 0;
  console.log("item", item);

  if (listAssign && listAssign.length) {
    listAssign.forEach((element) => {
      totalPoint += element.point;
      if (item.scoresOfStudent && item.scoresOfStudent.length) {
        const index = item.scoresOfStudent.findIndex(
          (item) => item.assignment_category_id === element.id
        );

        if (index >= 0) {
          {
            row[element.name.replace(/ /g, "_")] =
              item.scoresOfStudent[index].point;

            totalScore +=
              (item.scoresOfStudent[index].point / 100) * element.point;
          }
        }
      } else row[element.name.replace(/ /g, "_")] = "";
    });
  }

  if (totalPoint > 0 && totalScore > 0) {
    row["total"] = ((totalScore / totalPoint) * 100).toFixed(2);
  }

  return row;
};

export const makeData = (
  lens: Array<IResScore>,
  listAssign: Array<IItemAssignCate>
) => {
  if (!lens || !lens.length) return [];

  console.log(lens);

  const makeDataLevel: any = (depth = 0) => {
    return lens.map((item, i) => {
      return {
        ...newPerson(item, listAssign),
      };
    });
  };

  return makeDataLevel();
};
