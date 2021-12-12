import {Orchestrator} from "../orchestrator/orchestrator.model";
import {License} from "../sdk/sdk.model";
import {ProgrammingLanguage} from "../programming-language/programming-language.model";

export interface OrchestratorFilterModel {
  names: Orchestrator[];
  licenses: License[];
  programmingLanguages: ProgrammingLanguage[];
  activeDevelopment: boolean[];
  productionReady: boolean[];
}
