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

interface ISliceScoreReview {
  isLoading: boolean;
  error: any;
  listReviewByAssign: any;
  listReviewOfCourse: Array<IScoreReviewItem>;
}

interface ISliceReviewComment {
  listComment: Array<IComment>;
  isLoading: boolean;
  error: any;
}

interface ISliceNotification {
  isLoading: boolean;
  error: any;
  listNotifications: Array<INotification>;
}

interface IComment {
  content: string;
  created_at: string;
  created_by: number;
  id: number;
  score_review_id: number;
  displayName: string;
}

interface INotification {
  content: string;
  created_at: string;
  id: number;
  isRead: number;
  user_id: number;
}

interface IScoreReviewItem {
  assignment_name: string;
  course_name: string;
  current_point: number;
  expected_point: number;
  id: number;
  isFinalized: number;
  reason: string;
  score_id: number;
  student_id: string;
}

interface ISliceAdmin {
  isLoading: boolean;
  error: any;
  listAdmin: Array<IAdminAdmin>;
  listUser: Array<IAdminUser>;
  listCourse: Array<IAdminCourse>;
}

interface IAdminAdmin {
  created_at: string;
  display_name: string;
  email: string;
  id: number;
  password: string;
  super_admin: 1;
  username: string;
}

interface IAdminUser {
  user_address: string;
  user_avatar: string;
  user_displayname: string;
  user_email: string;
  user_id: number;
  user_is_active: number;
  user_nameinroom: string;
  user_otp: null;
  user_password: string;
  user_phone: string;
  user_studentid: string;
  user_type: number;
  user_username: string;
}

interface IAdminCourse {
  course_code: string;
  course_createdate: string;
  course_des: string;
  course_hostid: number;
  course_id: number;
  course_name: string;
  course_thumbnail: string;
  course_topic: string;
}
