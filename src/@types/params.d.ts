interface IParamsGetOneCourse {
  courseId: number | string;
}

interface IParamsInviteViaEmail {
  email: string;
  course_id?: number | string;
  teacher_invite?: boolean;
}

interface IParamsUpdateInfo {
  user_displayname?: string;
  user_phone?: string;
  user_email?: string;
  user_address?: string;
  user_studentid?: string;
  user_nameinroom?: string;
}

interface IParamsUpdateCourse {
  course_id: string;
  course_des?: string;
  course_topic?: string;
  course_code?: string;
  course_name: string;
}

interface IParamsAddCourse {
  nameclass: string;
  codeclass?: string;
  hostclass?: string;
}

interface IParamsDeleteCouse {
  idclass: string | number;
}

interface IParamsLeaveCourse {
  course_id?: string | number;
}
