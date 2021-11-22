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