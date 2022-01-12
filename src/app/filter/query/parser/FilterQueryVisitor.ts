// Generated from src/app/filter/query/parser/FilterQuery.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { Filter_queryContext } from "./FilterQueryParser";
import { FilterContext } from "./FilterQueryParser";
import { ExpressionContext } from "./FilterQueryParser";
import { UnaryOpContext } from "./FilterQueryParser";
import { ReferenceContext } from "./FilterQueryParser";
import { ValueContext } from "./FilterQueryParser";
import { ConnectorContext } from "./FilterQueryParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FilterQueryParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface FilterQueryVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `FilterQueryParser.filter_query`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilter_query?: (ctx: Filter_queryContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterQueryParser.filter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilter?: (ctx: FilterContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterQueryParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterQueryParser.unaryOp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryOp?: (ctx: UnaryOpContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterQueryParser.reference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReference?: (ctx: ReferenceContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterQueryParser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;

	/**
	 * Visit a parse tree produced by `FilterQueryParser.connector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConnector?: (ctx: ConnectorContext) => Result;
}

