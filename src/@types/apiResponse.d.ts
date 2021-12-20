interface IResLogin {
  result: number;
  message: string;
  content: {
    user: IResUser;
    token: string;
  };
}

interface IResGetAllCourse {
  result: number;
  message: string;
  content: {
    courses: Array<IResCourse>;
  };
}

interface IResGetOneCourse {
  result: number;
  message: string;
  content: {
    course: IResCourse;
  };
}

interface IResCourse {
  course_createdate?: string;
  course_hostid?: string;
  course_id?: number;
  course_name?: string;
  course_thumbnail?: string;
  course_topic?: string;
  course_des?: string;
  course_code?: string;
}

interface IResUser {
  user_username?: string;
  user_avatar?: string;
  user_displayname?: string;
  user_phone?: string;
  user_email?: string;
  user_id?: number;
  user_address?: string;
  user_studentid?: string;
  user_nameinroom?: string;
}

interface IResGetCurrentUser {
  result: number;
  message: string;
  content: {
    user: IResUser;
  };
}

interface IResMember {
  user_id: int;
  user_username?: string;
  user_avatar?: string;
  user_displayname?: string;
  user_phone?: string;
  user_email?: string;
  user_role: number;
  user_studentid?: string;
}

interface IResAddAssignCate {
  result: number;
  message: string;
  content: IItemAssignCate;
}

interface IResGetAllScore {
  result: number;
  message: string;
  content: Array<IResScore>;
}

interface IResAddScoreCate {
  result: number;
  message: string;
  content: Array<IResScoreOfStudent>;
}

interface IResScore {
  course_id: number;
  full_name: string;
  id: number;
  scoresOfStudent: Array<IResScoreOfStudent>;
  student_id: number | string;
}

interface IResScoreOfStudent {
  assignment_category_id: number;
  course_student_id: number;
  id: number;
  point: number;
}
