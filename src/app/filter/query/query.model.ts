import {CompilerFilterModel} from '../compilerFilter.model';
import {QcsFilterModel} from '../qcsFilter.model';
import {QerFilterModel} from '../qerFilter.model';
import {QplFilterModel} from '../qplFilter.model';
import {SdkFilterModel} from '../sdkFilter.model';

type Adjusted<Type, Name extends string> = {
  [Property in keyof Type as `${Name}${Capitalize<Property & string>}`]: Type[Property];
};

export type FilterModel = Adjusted<CompilerFilterModel, "compiler">
  & Adjusted<QcsFilterModel, "qcs">
  & Adjusted<QerFilterModel, "qer">
  & Adjusted<QplFilterModel, "qpl">
  & Adjusted<SdkFilterModel, "sdk">;
