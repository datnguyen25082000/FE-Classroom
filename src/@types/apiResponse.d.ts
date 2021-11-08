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

interface IResCourse {
  course_createdate: string;
  course_hostid: string;
  course_id: number;
  course_name: string;
  course_thumbnail: string;
  course_topic: string;
}

interface IResUser {
  user_username?: string;
  user_thumbnail?: string;
  user_displayname?: string;
  user_phone?: string;
  user_email?: string;
}

interface IResGetCurrentUser {
  result: number;
  message: string;
  content: {
    user: IResUser;
  };
}
