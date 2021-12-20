interface ISliceClass {
  listClass: Array<IResCourse>;
  oneCourse: IResCourse;
  isLoading: boolean;
  error: any;
}

interface ISliceAuth {
  isLoading: boolean;
  error: any;
}

interface ISliceUser {
  dataUser: IResUser;
  userInfo: IResUser;
  isLoading: boolean;
  error: any;
}

interface ISliceCourseJoin {
  allMembers: Array<IResMember>;
  studentInvitationCode: string;
  teacherInvitationCode: string;
  courseId: number;
  isLoading: boolean;
  error: any;
}

interface ISliceAssignCate {
  listAssign: Array<IItemAssignCate>;
  isLoading: boolean;
  error: any;
}

interface IItemAssignCate {
  id: number;
  point: number;
  name: string;
  position: number;
  course_id: number;
  isFinalized: number;
}

interface ISliceScore {
  listScore: Array<IResScore>;
  studentScore?: IItemStudentScore;
  userInfo: IResUser;
  isLoading: boolean;
  error: any;
}
