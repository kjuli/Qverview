import {AbstractParseTreeVisitor} from 'antlr4ts/tree';
import {FilterModel} from './query.model';
import {FilterQueryVisitor} from './parser/FilterQueryVisitor';
import {
  ConnectorContext,
  ExpressionContext,
  Filter_queryContext,
  FilterContext,
  ReferenceContext,
  UnaryOpContext, ValueContext
} from './parser/FilterQueryParser';

export default class ConcreteQueryBuilder extends AbstractParseTreeVisitor<FilterModel> implements FilterQueryVisitor<FilterModel> {

  protected defaultResult(): FilterModel {
    return {
      compilerInputLanguages: [],
      compilerNames: [],
      compilerOptimizationStrategies: [],
      compilerOutputLanguages: [],
      qcsAccessMethods: [],
      qcsAssemblyLanguages: [],
      qcsNames: [],
      qcsResources: [],
      qcsServiceModels: [],
      qerComputationModels: [],
      qerExecutionType: [],
      qerNames: [],
      qerVendors: [],
      qplNames: [],
      qplStandardizations: [],
      qplSyntaxImplementations: [],
      qplTypes: [],
      sdkActiveDevelopment: [],
      sdkCompilerInputLanguages: [],
      sdkCompilerOptimizationStrategies: [],
      sdkCompilerOutputLanguages: [],
      sdkLicenses: [],
      sdkLocalSimulator: [],
      sdkNames: [],
      sdkProgrammingLanguages: [],
      sdkSupportedQuantumCloudServices: []
    };
  }

  visitConnector(ctx: ConnectorContext): FilterModel {
    return undefined;
  }

  visitExpression(ctx: ExpressionContext): FilterModel {
    return undefined;
  }

  visitFilter(ctx: FilterContext): FilterModel {
    return undefined;
  }

  visitFilter_query(ctx: Filter_queryContext): FilterModel {
    return undefined;
  }

  visitReference(ctx: ReferenceContext): FilterModel {
    return undefined;
  }

  visitUnaryOp(ctx: UnaryOpContext): FilterModel {
    return undefined;
  }

  visitValue(ctx: ValueContext): FilterModel {
    return undefined;
  }


}
