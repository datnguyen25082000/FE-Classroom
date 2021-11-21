interface IParamsGetOneCourse {
  courseId: number | string;
}

interface IParamsInviteViaEmail {
  email: string;
  course_id?: number | string;
  teacher_invite?: boolean;
}
