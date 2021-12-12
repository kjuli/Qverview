import {
  ComputationModel,
  ExecutionType,
  QuantumExecutionResource, Vendor
} from "../quantum-execution-resource/quantum-execution-resource.model";

export interface QerFilterModel {
  names: QuantumExecutionResource[];
  executionType: ExecutionType[];
  computationModels: ComputationModel[];
  vendors: Vendor[];
}
