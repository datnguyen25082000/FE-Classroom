interface IIconTick {
  className?: string;
}

interface IHeader {
  handleAction1?: any;
  handleAction2?: any;
  handleAction3?: any;
  handleAction4?: any;
  classId?: number | string;
  className?: string;
  isAdminHeader?: boolean;
}

interface IModalAddCourse {
  show?: boolean;
  setShow?: any;
  handleClose?: any;
  handleAction?: any;
}

interface ICardClass {
  classInfo: IResCourse;
  handleAction?: any;
}

interface IAvatar {
  image?: string;
  onClick?: any;
  className?: string;
}

interface ITabs {
  titleTabs: Array<string | any>;
  bodyTabs: Array<JSX.Element>;
  classNameHeaderContainer?: string;
  classNameHeader?: string;
  initialNum?: number;
  contentBody?: any;
}

interface IInput extends IStyle {
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string | number | date;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  maxLength?: number | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onkeypress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onkeyup?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  type?: "text" | "password" | "date" | "email" | "tel";
  background?: Property.Background<string | number> | undefined;
  borderRadius?: string | undefined;
  width?: string | undefined;
  height?: string | undefined;
  className?: string | undefined;
  error?: any;
  colorText?: string;
  marginLabel?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  showPassword?: boolean;
  zIndex?: number;
  handleAction?: any;
  titleAction?: string;
  isDisable?: boolean;
}

interface IModalCenter {
  show: boolean;
  setShow?: any;
  onHide?: any;
  message?: string;
  handleClose?: any;
  top?: string | number;
  left?: string | number;
  className?: string;
}

interface ILoader {
  className?: string;
  isLoadMore?: boolean;
  colorLoader?: string;
  height?: string;
  width?: string;
}

interface IUpdateAvatar {
  avatarImg?: string;
  isEditProfile?: boolean;
  onClick?: (e) => void;
  className?: string;
  onClickAvatar?: (e) => void;
}

interface IModalAddStudent {
  show?: boolean;
  setShow?: any;
  handleClose?: any;
  handleAction?: any;
  isTeacherModal?: boolean;
  title?: string;
  buttonAction?: string;
}

interface ContainerState {
  cards: any[];
}

interface ICardInRoom {
  title?: string;
  popover?: any;
  handleClickMore?: any;
  isHost: boolean;
}

interface IRoomGradeCard {
  roomId: string;
  listAssign?: Array<IItemAssignCate>;
  isHost: boolean;
}

interface IDDContainer {
  ITEMS: Array<{
    id: number;
    text: string;
  }>;
}

interface ITable {
  columns: any;
  data: any;
  updateMyData?: any;
  skipPageReset?: any;
  updateStatusStudent?: any;
  handleImportColumn?: any;
  handleFinalizeColumn?: any;
  handleSaveData?: any;
  isStudentTable?: boolean;
  handleDetail?: any;
  handleReviewStudent?: any;
}

interface ICardReview {
  column?: any;
}

interface ICardReview2 {
  column: IScoreReviewItem;
  isTeacherView?: boolean;
  isShow?: boolean;
}
