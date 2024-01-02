export { default as i18n } from 'i18next';
export { default as LanguageDetector } from 'i18next-browser-languagedetector';
export { Trans, initReactI18next } from 'react-i18next';

export { configureStore, createSlice } from '@reduxjs/toolkit';
export { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export { combineReducers } from 'redux';

export { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

export { AxiosInterceptor } from './api/interceptor/AxiosInterceptor';
export { ApiService } from './api/service/ApiService';
export { ApiCrudService } from './api/service/crud/ApiCrudService';
export type { IApiDto, ID, JSON, JSONObject, JSONValue, Primitif } from './dto/api/ApiDto';
export type { IAuthUserDto, ICurrentUserDto } from './dto/current-user/CurrentUserDto';
export type { IMenuDto } from './dto/menu/MenuDto';
export type { IPageableDto } from './dto/pageable/PageableDto';
export type { IPathDto } from './dto/path/PathDto';
export { useClickOutside } from './hook/click/useClickOutside';
export { useHandleKey } from './hook/handle/useHandleKey';
export { useLocationHistory } from './hook/location/useLocationHistory';
export { useMessage } from './hook/message/useMessage';
export { useModal } from './hook/modal/useModal';
export type { IModalReturnProps } from './hook/modal/useModal';
export { useMdNavigate, useMdParams } from './hook/navigate/useMdNavigate';
export { useThemeSelector } from './hook/theme/useThemeSelector';
export { default as Mdtrans, useMdTrans } from './hook/trans/useMdTrans';
export { useUserAuth } from './hook/user/useUserAuth';

export { default as AdminRouter } from './module/admin/AdminRouter';
export type { IAdminTabConfDto, IAdminTabDto } from './module/admin/dto/AdminConfDto.ts';
export type {
  IAdminFilterDto,
  IAdminReducerDto,
  IAdminStateDto,
  IAdminTableDto,
} from './module/admin/dto/AdminReducerDto.ts';
export { AdminAction, AdminReducers } from './module/admin/reducer/AdminReducer';

export { default as AuthRouter } from './module/auth/AuthRouter';
export { default as AuthFooter } from './module/auth/component/auth.footer/AuthFooter';
export { AuthFooterEnum } from './module/auth/component/auth.footer/enum/AuthFooterEnum';
export { default as ActivationPage } from './module/auth/page/activation/ActivationPage';
export { default as CheckIdentityPage } from './module/auth/page/check-identity/CheckIdentityPage';
export type { ICheckIdentityDto } from './module/auth/page/check-identity/dto/CheckIdentityDto';
export { default as ForgetPasswordPage } from './module/auth/page/forget-password/ForgetPasswordPage';
export { default as LoginPage } from './module/auth/page/login/LoginPage';
export type { ILoginDto } from './module/auth/page/login/dto/LoginDto';
export { default as LoginFacebook } from './module/auth/page/login/facebook/LoginFacebook';
export { default as LoginGoogle } from './module/auth/page/login/google/LoginGoogle';
export { default as ProfilePage } from './module/auth/page/profile/ProfilePage';
export { default as RegisterPage } from './module/auth/page/register/RegisterPage';
export type { IRegisterDto } from './module/auth/page/register/dto/RegisterDto';
export { AuthReducer, default as AuthReducers, LoginAction } from './module/auth/reducer/AuthReducers';
export type { AuthReducerState } from './module/auth/reducer/AuthReducers';
export { default as AuthService } from './module/auth/service/AuthService';

export { default as CustomForm } from './module/custom/form/component/CustomForm';
export type { ICustomFormProps } from './module/custom/form/component/CustomForm';
export { default as CustomIcon } from './module/custom/icon/component/CustomIcon';
export type { ICustomIconProps } from './module/custom/icon/component/CustomIcon';
export { default as CustomList } from './module/custom/list/component/CustomList';
export type { ICustomListDto, ICustomListProps } from './module/custom/list/component/CustomList';
export { default as CustomModaleConfirm } from './module/custom/modale/component/CustomModaleConfirm';
export type { ICustomModaleConfirmProps } from './module/custom/modale/component/CustomModaleConfirm';

export { default as NewsRouter } from './module/news/NewsRouter';
export { default as NewsCard } from './module/news/component/card/NewsCard';
export type { INewsCardProps } from './module/news/component/card/NewsCard';
export { default as NewsCardSmall } from './module/news/component/card/NewsCardSmall';
export { default as NewsForm } from './module/news/component/form/NewsForm';
export { default as NewsList } from './module/news/component/list/NewsList';
export type { INewsDto } from './module/news/dto/NewsDto';
export { useFetchNews } from './module/news/hook/useFetchNews';
export { default as NewsFormPage } from './module/news/page/update/NewsUpdatePage';
export { NewsAction, NewsReducer, default as NewsReducers } from './module/news/reducer/NewsReducers';
export type { NewsReducerState } from './module/news/reducer/NewsReducers';
export { default as NewsService } from './module/news/service/NewsService';
export type { IProfileDto } from './module/user/dto/ProfileDto';
export type { IUserDto } from './module/user/dto/UserDto';
export { default as ProfileService } from './module/user/service/ProfileService';
export { default as UserService } from './module/user/service/UserService';

export { default as MdAvatar } from './mui/component/avatar/MdAvatar';
export type { IMdAvatarProps } from './mui/component/avatar/MdAvatar';
export { default as MdBox } from './mui/component/box/MdBox';
export type { IMdBoxProps } from './mui/component/box/MdBox';
export { default as MdButton } from './mui/component/button/MdButton';
export type { IMdButtonProps } from './mui/component/button/MdButton';
export { default as MdBouttonGroup } from './mui/component/button/group/MdBouttonGroup';
export type { IMdBouttonGroupProps } from './mui/component/button/group/MdBouttonGroup';
export { default as MdCard } from './mui/component/card/MdCard';
export type { IMdCardProps } from './mui/component/card/MdCard';
export { default as MdChip } from './mui/component/chip/MdChip';
export type { IMdChipProps } from './mui/component/chip/MdChip';
export { default as MdContainer } from './mui/component/container/MdContainer';
export type { IMdContainerProps } from './mui/component/container/MdContainer';
export { default as MdContent } from './mui/component/content/MdContent';
export type { IMdContentProps } from './mui/component/content/MdContent';
export { default as MdFab } from './mui/component/fab/MdFab';
export type { IMdFabProps } from './mui/component/fab/MdFab';
export { default as MdFabAdd } from './mui/component/fab/add/MdFabAdd';
export type { IMdFabAddProps } from './mui/component/fab/add/MdFabAdd';

export { default as MdForm } from './mui/component/form/MdForm';
export type { IMdFormProps, IMdFormPropsReturnDto } from './mui/component/form/MdForm';
export { default as MdFormSwitch } from './mui/component/form/MdFormSwitch';
export type { IMdFormSwitchProps } from './mui/component/form/MdFormSwitch';
export { default as MdInputText } from './mui/component/form/MdInputText';
export type { IMdInputTextProps } from './mui/component/form/MdInputText';
export { default as MdInputTextSimple } from './mui/component/form/MdInputTextSimple';
export type { IMdInputTextSimpleProps } from './mui/component/form/MdInputTextSimple';
export { default as MdFormAutocomplete } from './mui/component/form/autocomplete/MdFormAutocomplete';
export type { IMdFormAutocompleteProps } from './mui/component/form/autocomplete/MdFormAutocomplete';
export { default as MdFormCheckbox } from './mui/component/form/checkbox/MdFormCheckbox';
export type { IMdFormCheckboxProps } from './mui/component/form/checkbox/MdFormCheckbox';
export { default as MdFormSelect } from './mui/component/form/select/MdFormSelect';
export type { IMdFormSelectProps } from './mui/component/form/select/MdFormSelect';

export { default as MdGrid } from './mui/component/grid/MdGrid';
export type { IMdGridProps } from './mui/component/grid/MdGrid';
export { default as MdInfiniteScrool } from './mui/component/infinite-scroll/MdInfiniteScrool';
export type { IMdInfiniteScroolProps } from './mui/component/infinite-scroll/MdInfiniteScrool';
export { default as MdLinearProgress } from './mui/component/linear-progress/MdLinearProgress';
export type { IMdLinearProgressProps } from './mui/component/linear-progress/MdLinearProgress';
export { default as MdLink } from './mui/component/link/MdLink';
export type { IMdLinkProps } from './mui/component/link/MdLink';

export { default as MdListItemText } from './mui/component/list/MdListItemText';
export type { IMdListItemTextProps } from './mui/component/list/MdListItemText';
export { default as Mdlist } from './mui/component/list/Mdlist';
export type { IMdlistProps } from './mui/component/list/Mdlist';
export { default as MdlistItem } from './mui/component/list/MdlistItem';
export type { IMdlistItemProps } from './mui/component/list/MdlistItem';
export { default as MdlistItemButton } from './mui/component/list/MdlistItemButton';
export type { IMdlistItemButtonProps } from './mui/component/list/MdlistItemButton';

export { default as MdMenuItem } from './mui/component/menu/MdMenuItem';
export type { IMdMenuItemProps } from './mui/component/menu/MdMenuItem';

export { default as MdCommonModal } from './mui/component/modal/MdCommonModal';

export { default as CrudPage } from './mui/page/CrudPage';
export type { CrudPageProps } from './mui/page/CrudPage';
export { default as InfiniteScrollPage } from './mui/page/InfiniteScrollPage';
export type { InfiniteScroolPageProps } from './mui/page/InfiniteScrollPage';
export { default as ShowPage } from './mui/page/ShowPage';
export type { ShowPageProps } from './mui/page/ShowPage';

export { default as HasRole } from './mui/component/role/HasRole';
export type { HasRoleProps } from './mui/component/role/HasRole';
export { useRole } from './mui/component/role/useRole';

export { default as MdSearchBar } from './mui/component/searchbar/MdSearchBar';
export type { IMdSearchBarProps } from './mui/component/searchbar/MdSearchBar';
export { default as ShowMessage } from './mui/component/snackbar/ShowMessage';

export { default as MdTableWithPagination } from './mui/component/table/MdTableWithPagination';
export type { IMdTableWithPaginationProps } from './mui/component/table/MdTableWithPagination';

export { default as MdTabs } from './mui/component/tabs/MdTabs';
export type { IMdTabsProps, TabsType } from './mui/component/tabs/MdTabs';

export { default as MdThemeProvider } from './mui/component/theme/MdThemeProvider';
export { useTheme } from './mui/component/theme/useTheme';
export type { ITheme } from './mui/component/theme/useTheme';

export { default as MdToolbar } from './mui/component/toolbar/MdToolbar';
export type { IMdToolbarProps } from './mui/component/toolbar/MdToolbar';
export { default as MdTypo } from './mui/component/typo/MdTypo';
export type { IMdTypoProps } from './mui/component/typo/MdTypo';

export { DefaultState, ReducersActions } from './reducer/BaseReducer';
export type { ActionReturn, ReducerCrudState } from './reducer/BaseReducer';
export { CommonAction, CommonReducer, default as CommonReducers } from './reducer/common/CommonReducer';
export type { MessageType } from './reducer/common/CommonReducer';

export { SuspenceLoader } from './suspence/SuspenceLoader';

export { DateUtils } from './utils/date/DateUtils';
export { I18nUtils } from './utils/i18n/I18nUtils';
export type { I18nTranslate } from './utils/i18n/I18nUtils';
export { ListUtils } from './utils/list/ListUtils';
export type { IListDto, ListType } from './utils/list/ListUtils';
export { ObjectUtils } from './utils/object/ObjectUtils';
export { default as RoleUtils } from './utils/role/RoleUtils';
export { StorageUtils } from './utils/storage/StorageUtils';
export { UuidUtils } from './utils/uuid/UuidUtils';
export { WindowUtils } from './utils/window/WindowUtils';
export { YupUtils } from './utils/yup/YupUtils';
export type { IYupValidator, IYupValidators } from './utils/yup/YupUtils';
