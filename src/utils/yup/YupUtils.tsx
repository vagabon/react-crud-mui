import * as Yup from 'yup';
import { I18nUtils, I18nTranslate } from '../i18n/I18nUtils';

export interface IYupValidator {
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;
  regexp?: string;
  regexpError?: string;
  email?: boolean;
  min?: number;
  max?: number;
  same?: string;
  sameLabel?: string;
  listId?: boolean;
}

export interface IYupValidators {
  [x: string]: IYupValidator;
}

type IYupShape = { [x: string]: Yup.StringSchema | Yup.AnySchema };

export const YupUtils = {
  convertToYup: (datas: IYupValidators, t: I18nTranslate): Yup.Schema => {
    let shape: IYupShape = {};

    Object.entries(datas).forEach((data: [string, IYupValidator]) => {
      const [key, value] = data;

      if (value.listId) {
        shape = YupUtils.getObjectSchema(shape, value, key, t);
      } else {
        shape = YupUtils.getStringSchema(shape, value, key, t);
      }
    });
    return Yup.object().shape(shape);
  },
  getObjectSchema(shape: IYupShape, value: IYupValidator, key: string, t: I18nTranslate): IYupShape {
    if (value.required) {
      shape = {
        ...shape,
        [key]: YupUtils.getObjectSchemaRequired(t),
      };
    }
    return shape;
  },
  getObjectSchemaRequired(t: I18nTranslate): Yup.Schema {
    return Yup.object().shape({
      id: Yup.string().required(I18nUtils.translate(t, 'ERRORS:REQUIRED')),
    });
  },
  getStringSchema(shape: IYupShape, value: IYupValidator, key: string, t: I18nTranslate): IYupShape {
    shape = {
      ...shape,
      [key]: YupUtils.getStringSchemaYup(value, t),
    };
    return shape;
  },
  getStringSchemaYup(value: IYupValidator, t: I18nTranslate): Yup.Schema {
    let yup: Yup.StringSchema = Yup.string();

    if (value.required) {
      yup = yup.required(I18nUtils.translate(t, 'ERRORS:REQUIRED'));
    }
    if (value.regexp) {
      yup = yup
        .trim()
        .matches(
          new RegExp(value.regexp),
          I18nUtils.translate(t, value.regexpError ? value.regexpError : 'ERRORS:REGEXP'),
        );
    }
    if (value.email) {
      yup = yup.email(I18nUtils.translate(t, 'ERRORS:FORMAT_MAIL'));
    }
    if (value.min) {
      yup = yup.min(value.min, t('ERRORS:MIN').replace('$1', value.min.toString()));
    }
    if (value.max) {
      yup = yup.max(value.max, t('ERRORS:MAX').replace('$1', value.max.toString()));
    }
    if (value.same) {
      const translate: string = value.sameLabel
        ? I18nUtils.translate(t, value.sameLabel)
        : I18nUtils.translate(t, 'ERRORS:SAME');
      yup = yup.oneOf([Yup.ref(value.same)], translate);
    }
    return yup;
  },
};
