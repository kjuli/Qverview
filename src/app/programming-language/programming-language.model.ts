import { Entity } from "../common/repository";
import { getEnumFromString } from "../filter/filter.service";

export interface ProgrammingLanguageDto {
  name: string;
  type: string;
  syntaxImplementation: string;
  standardization: string;
}

export const enum ProgrammingType {
  Workflow = 'Workflow Language',
  HighLevel = 'High-Level Programming Language',
  Assembly = 'Assembly Language'
}

/**
 * Collects all available enum types of ProgrammingType.
 */
const PROGRAMMING_TYPES = [
  ProgrammingType.Workflow, ProgrammingType.HighLevel, ProgrammingType.Assembly
];

export const enum SyntaxImplementation {
  Standalone = 'Standalone',
  Embedded = 'Embedded'
}

const SYNTAX_IMPLEMENTATIONS = [
  SyntaxImplementation.Standalone, SyntaxImplementation.Embedded
];

export const enum Standardization {
  None = 'None',
  Proprietary = 'Proprietary',
  OpenStandard = 'Open Standard'
}

const STANDARDIZATIONS = [
  Standardization.None, Standardization.Proprietary, Standardization.OpenStandard
];

export class ProgrammingLanguage extends Entity {
  type: ProgrammingType;
  syntaxImplementation: SyntaxImplementation;
  standardization: Standardization;

  static fromDto(dto: ProgrammingLanguageDto): ProgrammingLanguage {
    const result = new ProgrammingLanguage();

    result.name = dto.name;
    result.type = getEnumFromString(PROGRAMMING_TYPES, dto.type);
    result.syntaxImplementation = getEnumFromString(SYNTAX_IMPLEMENTATIONS, dto.syntaxImplementation);
    result.standardization = getEnumFromString(STANDARDIZATIONS, dto.standardization);

    return result;
  }
}

/**
 * This type further specifies a {@link ProgrammingLanguage} with
 * a certain {@link ProgrammingType} on the type-level. This means
 * that an instance of this type must have its {@link ProgrammingLanguage#type}
 * set to the {@code PT} type.
 *
 * @param <PT> The explicit programming type.
 */
export type SpecificLanguageType<PT extends ProgrammingType> = {
  [P in keyof ProgrammingLanguage]: ProgrammingLanguage[P] extends ProgrammingType ? PT : ProgrammingLanguage[P];
}

/**
 * A designated type for {@link ProgrammingLanguage}s whose programming types are
 * always {@link ProgrammingType#HighLevel}.
 */
export type HighLevelProgrammingLanguage = SpecificLanguageType<ProgrammingType.HighLevel>;

/**
 * A designated type for {@link ProgrammingLanguage}s whose programming types are
 * always {@link ProgrammingType#Assembly}.
 */
export type AssemblyProgrammingLanguage = SpecificLanguageType<ProgrammingType.Assembly>;

/**
 * Converts a language to HighLevelProgrammingType if its programming type is set to
 * {@link ProgrammingType#HighLevel}. If not, a {@link TypeError} is thrown.
 *
 * @param language The language to be converted.
 */
export function getAsHighlevelProgrammingLanguage(language: ProgrammingLanguage): HighLevelProgrammingLanguage {
  // Fallback: If undefined, simply return undefined.
  if (language === undefined) {
    return undefined;
  }
  if (language.type !== ProgrammingType.HighLevel) {
    throw new TypeError(`This is not a high level programming language: ${language}`);
  }
  return language as HighLevelProgrammingLanguage;
}

/**
 * Converts a language to AssemblyProgrammingLanguage if its programming type is set to
 * {@link ProgrammingType#Assembly}. If not, a {@link TypeError} is thrown.
 *
 * @param language The language to be converted.
 */
export function getAsAssemblyLanguage(language: ProgrammingLanguage): AssemblyProgrammingLanguage {
  if (language === undefined) {
    return undefined;
  }
  if (language.type !== ProgrammingType.Assembly) {
    throw new TypeError(`This is not an assembly language: ${language}`);
  }

  return language as AssemblyProgrammingLanguage;
}
