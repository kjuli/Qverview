import {Entity} from "../common/repository";
import {addLicense, License} from "../sdk/sdk.model";
import {ProgrammingLanguage} from "../programming-language/programming-language.model";
import {ProgrammingLanguageService} from "../programming-language/programming-language.service";

export interface OrchestratorDto {
    name: string;
    licenses: string[];
    programmingLanguages: string[];
    activeDevelopment: boolean;
    productionReady: boolean;
}

export class Orchestrator extends Entity {
    licenses: License[];
    programmingLanguages: ProgrammingLanguage[];
    activeDevelopment: boolean;
    productionReady: boolean;

    static fromDto(dto: OrchestratorDto, languageService: ProgrammingLanguageService): Orchestrator {
        const result = new Orchestrator();

        result.name = dto.name;
        result.programmingLanguages = dto.programmingLanguages.map(value => languageService.findByName(value));
        result.activeDevelopment = dto.activeDevelopment;
        result.productionReady = dto.productionReady;
        result.licenses = dto.licenses.map(value => addLicense(value));

        return result;
    }
}
