import { Entity } from '../common/repository';
import { getEnumFromString } from '../filter/filter.service';

/**
 * The data transfer interface definition of a Quantum Execution Resource.
 * This is used to directly represent a JSON object.
 */
export interface QuantumExecutionResourceDto {
    name: string;
    executionType: string;
    computationModel: string;
    vendor: string;
}

export const enum ExecutionType {
    QPU = 'QPU',
    SIMULATOR = 'Simulator'
}

const EXECUTION_TYPES = [
    ExecutionType.QPU, ExecutionType.SIMULATOR
]

export const enum ComputationModel {
    CircuitModel = 'Circuit-Model',
    Annealing = 'Annealing'
}

const COMPUTATION_MODELS = [
    ComputationModel.CircuitModel, ComputationModel.Annealing
]

/**
 * The Vendor type is a simple name of a vendor. In that way, a
 * class instance does not have to be created.
 */
export type Vendor = string;

const vendors = new Set<Vendor>();

function getVendor(raw: string): Vendor {
    if (!vendors.has(raw)) {
        vendors.add(raw);
    }

    return raw as Vendor;
}

export class QuantumExecutionResource extends Entity {
    executionType: ExecutionType;
    computationModel: ComputationModel;
    vendor: Vendor;

    /**
     * Converts the DTO to this class instance.
     * 
     * @param dto The data transfer object to be transformed.
     * @returns The actual representation of the typed data.
     */
    static fromDto(dto: QuantumExecutionResourceDto): QuantumExecutionResource {
        const result = new QuantumExecutionResource();

        result.name = dto.name;
        result.executionType = getEnumFromString(EXECUTION_TYPES, dto.executionType);
        result.computationModel = getEnumFromString(COMPUTATION_MODELS, dto.computationModel);
        result.vendor = getVendor(dto.vendor);

        return result;
    }
}