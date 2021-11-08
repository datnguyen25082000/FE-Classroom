interface IIconTick {
  className?: string;
}

interface IHeader {
  handleAction1?: any;
  handleAction2?: any;
  handleAction3?: any;
  handleAction4?: any;
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
  type?: 'text' | 'password' | 'date';
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
