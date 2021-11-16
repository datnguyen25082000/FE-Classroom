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
  isLoading: boolean;
  error: any;
}
