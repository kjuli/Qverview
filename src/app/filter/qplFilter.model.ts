import {
  ProgrammingLanguage,
  ProgrammingType, Standardization,
  SyntaxImplementation
} from "../programming-language/programming-language.model";

export interface QplFilterModel {
  names: ProgrammingLanguage[];
  types: ProgrammingType[];
  syntaxImplementations: SyntaxImplementation[];
  standardizations: Standardization[];
}
