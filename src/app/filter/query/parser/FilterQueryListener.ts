// Generated from src/app/filter/query/parser/FilterQuery.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { Filter_queryContext } from "./FilterQueryParser";
import { FilterContext } from "./FilterQueryParser";
import { ExpressionContext } from "./FilterQueryParser";
import { UnaryOpContext } from "./FilterQueryParser";
import { ReferenceContext } from "./FilterQueryParser";
import { ValueContext } from "./FilterQueryParser";
import { ConnectorContext } from "./FilterQueryParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `FilterQueryParser`.
 */
export interface FilterQueryListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `FilterQueryParser.filter_query`.
	 * @param ctx the parse tree
	 */
	enterFilter_query?: (ctx: Filter_queryContext) => void;
	/**
	 * Exit a parse tree produced by `FilterQueryParser.filter_query`.
	 * @param ctx the parse tree
	 */
	exitFilter_query?: (ctx: Filter_queryContext) => void;

	/**
	 * Enter a parse tree produced by `FilterQueryParser.filter`.
	 * @param ctx the parse tree
	 */
	enterFilter?: (ctx: FilterContext) => void;
	/**
	 * Exit a parse tree produced by `FilterQueryParser.filter`.
	 * @param ctx the parse tree
	 */
	exitFilter?: (ctx: FilterContext) => void;

	/**
	 * Enter a parse tree produced by `FilterQueryParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `FilterQueryParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `FilterQueryParser.unaryOp`.
	 * @param ctx the parse tree
	 */
	enterUnaryOp?: (ctx: UnaryOpContext) => void;
	/**
	 * Exit a parse tree produced by `FilterQueryParser.unaryOp`.
	 * @param ctx the parse tree
	 */
	exitUnaryOp?: (ctx: UnaryOpContext) => void;

	/**
	 * Enter a parse tree produced by `FilterQueryParser.reference`.
	 * @param ctx the parse tree
	 */
	enterReference?: (ctx: ReferenceContext) => void;
	/**
	 * Exit a parse tree produced by `FilterQueryParser.reference`.
	 * @param ctx the parse tree
	 */
	exitReference?: (ctx: ReferenceContext) => void;

	/**
	 * Enter a parse tree produced by `FilterQueryParser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `FilterQueryParser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;

	/**
	 * Enter a parse tree produced by `FilterQueryParser.connector`.
	 * @param ctx the parse tree
	 */
	enterConnector?: (ctx: ConnectorContext) => void;
	/**
	 * Exit a parse tree produced by `FilterQueryParser.connector`.
	 * @param ctx the parse tree
	 */
	exitConnector?: (ctx: ConnectorContext) => void;
}

