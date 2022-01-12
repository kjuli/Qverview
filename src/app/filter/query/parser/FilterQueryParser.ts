// Generated from src/app/filter/query/parser/FilterQuery.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { FilterQueryListener } from "./FilterQueryListener";
import { FilterQueryVisitor } from "./FilterQueryVisitor";


export class FilterQueryParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly ID = 6;
	public static readonly STR = 7;
	public static readonly AND = 8;
	public static readonly OR = 9;
	public static readonly NOT = 10;
	public static readonly RULE_filter_query = 0;
	public static readonly RULE_filter = 1;
	public static readonly RULE_expression = 2;
	public static readonly RULE_unaryOp = 3;
	public static readonly RULE_reference = 4;
	public static readonly RULE_value = 5;
	public static readonly RULE_connector = 6;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"filter_query", "filter", "expression", "unaryOp", "reference", "value", 
		"connector",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "':'", "'('", "')'", "'.'", "'\"'", undefined, undefined, "'and'", 
		"'or'", "'not'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, "ID", 
		"STR", "AND", "OR", "NOT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(FilterQueryParser._LITERAL_NAMES, FilterQueryParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return FilterQueryParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "FilterQuery.g4"; }

	// @Override
	public get ruleNames(): string[] { return FilterQueryParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return FilterQueryParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(FilterQueryParser._ATN, this);
	}
	// @RuleVersion(0)
	public filter_query(): Filter_queryContext {
		let _localctx: Filter_queryContext = new Filter_queryContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, FilterQueryParser.RULE_filter_query);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 14;
			this.filter();
			this.state = 20;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FilterQueryParser.AND || _la === FilterQueryParser.OR) {
				{
				{
				this.state = 15;
				this.connector();
				this.state = 16;
				this.filter();
				}
				}
				this.state = 22;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public filter(): FilterContext {
		let _localctx: FilterContext = new FilterContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, FilterQueryParser.RULE_filter);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 23;
			this.reference();
			this.state = 24;
			this.match(FilterQueryParser.T__0);
			this.state = 25;
			this.value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expression(): ExpressionContext {
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, FilterQueryParser.RULE_expression);
		let _la: number;
		try {
			this.state = 35;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case FilterQueryParser.ID:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 27;
				this.filter();
				}
				break;
			case FilterQueryParser.T__1:
			case FilterQueryParser.NOT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === FilterQueryParser.NOT) {
					{
					this.state = 28;
					this.unaryOp();
					}
				}

				this.state = 31;
				this.match(FilterQueryParser.T__1);
				this.state = 32;
				this.filter();
				this.state = 33;
				this.match(FilterQueryParser.T__2);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unaryOp(): UnaryOpContext {
		let _localctx: UnaryOpContext = new UnaryOpContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, FilterQueryParser.RULE_unaryOp);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 37;
			this.match(FilterQueryParser.NOT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public reference(): ReferenceContext {
		let _localctx: ReferenceContext = new ReferenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, FilterQueryParser.RULE_reference);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 39;
			this.match(FilterQueryParser.ID);
			this.state = 44;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === FilterQueryParser.T__3) {
				{
				{
				this.state = 40;
				this.match(FilterQueryParser.T__3);
				this.state = 41;
				this.match(FilterQueryParser.ID);
				}
				}
				this.state = 46;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, FilterQueryParser.RULE_value);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 47;
			this.match(FilterQueryParser.T__4);
			this.state = 48;
			this.match(FilterQueryParser.STR);
			this.state = 49;
			this.match(FilterQueryParser.T__4);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public connector(): ConnectorContext {
		let _localctx: ConnectorContext = new ConnectorContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, FilterQueryParser.RULE_connector);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 51;
			_la = this._input.LA(1);
			if (!(_la === FilterQueryParser.AND || _la === FilterQueryParser.OR)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\f8\x04\x02\t" +
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t" +
		"\x07\x04\b\t\b\x03\x02\x03\x02\x03\x02\x03\x02\x07\x02\x15\n\x02\f\x02" +
		"\x0E\x02\x18\v\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x05" +
		"\x04 \n\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04&\n\x04\x03\x05\x03" +
		"\x05\x03\x06\x03\x06\x03\x06\x07\x06-\n\x06\f\x06\x0E\x060\v\x06\x03\x07" +
		"\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03\b\x02\x02\x02\t\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x02\x03\x03\x02\n\v\x024\x02\x10\x03" +
		"\x02\x02\x02\x04\x19\x03\x02\x02\x02\x06%\x03\x02\x02\x02\b\'\x03\x02" +
		"\x02\x02\n)\x03\x02\x02\x02\f1\x03\x02\x02\x02\x0E5\x03\x02\x02\x02\x10" +
		"\x16\x05\x04\x03\x02\x11\x12\x05\x0E\b\x02\x12\x13\x05\x04\x03\x02\x13" +
		"\x15\x03\x02\x02\x02\x14\x11\x03\x02\x02\x02\x15\x18\x03\x02\x02\x02\x16" +
		"\x14\x03\x02\x02\x02\x16\x17\x03\x02\x02\x02\x17\x03\x03\x02\x02\x02\x18" +
		"\x16\x03\x02\x02\x02\x19\x1A\x05\n\x06\x02\x1A\x1B\x07\x03\x02\x02\x1B" +
		"\x1C\x05\f\x07\x02\x1C\x05\x03\x02\x02\x02\x1D&\x05\x04\x03\x02\x1E \x05" +
		"\b\x05\x02\x1F\x1E\x03\x02\x02\x02\x1F \x03\x02\x02\x02 !\x03\x02\x02" +
		"\x02!\"\x07\x04\x02\x02\"#\x05\x04\x03\x02#$\x07\x05\x02\x02$&\x03\x02" +
		"\x02\x02%\x1D\x03\x02\x02\x02%\x1F\x03\x02\x02\x02&\x07\x03\x02\x02\x02" +
		"\'(\x07\f\x02\x02(\t\x03\x02\x02\x02).\x07\b\x02\x02*+\x07\x06\x02\x02" +
		"+-\x07\b\x02\x02,*\x03\x02\x02\x02-0\x03\x02\x02\x02.,\x03\x02\x02\x02" +
		"./\x03\x02\x02\x02/\v\x03\x02\x02\x020.\x03\x02\x02\x0212\x07\x07\x02" +
		"\x0223\x07\t\x02\x0234\x07\x07\x02\x024\r\x03\x02\x02\x0256\t\x02\x02" +
		"\x026\x0F\x03\x02\x02\x02\x06\x16\x1F%.";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FilterQueryParser.__ATN) {
			FilterQueryParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(FilterQueryParser._serializedATN));
		}

		return FilterQueryParser.__ATN;
	}

}

export class Filter_queryContext extends ParserRuleContext {
	public filter(): FilterContext[];
	public filter(i: number): FilterContext;
	public filter(i?: number): FilterContext | FilterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FilterContext);
		} else {
			return this.getRuleContext(i, FilterContext);
		}
	}
	public connector(): ConnectorContext[];
	public connector(i: number): ConnectorContext;
	public connector(i?: number): ConnectorContext | ConnectorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConnectorContext);
		} else {
			return this.getRuleContext(i, ConnectorContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterQueryParser.RULE_filter_query; }
	// @Override
	public enterRule(listener: FilterQueryListener): void {
		if (listener.enterFilter_query) {
			listener.enterFilter_query(this);
		}
	}
	// @Override
	public exitRule(listener: FilterQueryListener): void {
		if (listener.exitFilter_query) {
			listener.exitFilter_query(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FilterQueryVisitor<Result>): Result {
		if (visitor.visitFilter_query) {
			return visitor.visitFilter_query(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FilterContext extends ParserRuleContext {
	public reference(): ReferenceContext {
		return this.getRuleContext(0, ReferenceContext);
	}
	public value(): ValueContext {
		return this.getRuleContext(0, ValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterQueryParser.RULE_filter; }
	// @Override
	public enterRule(listener: FilterQueryListener): void {
		if (listener.enterFilter) {
			listener.enterFilter(this);
		}
	}
	// @Override
	public exitRule(listener: FilterQueryListener): void {
		if (listener.exitFilter) {
			listener.exitFilter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FilterQueryVisitor<Result>): Result {
		if (visitor.visitFilter) {
			return visitor.visitFilter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public filter(): FilterContext {
		return this.getRuleContext(0, FilterContext);
	}
	public unaryOp(): UnaryOpContext | undefined {
		return this.tryGetRuleContext(0, UnaryOpContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterQueryParser.RULE_expression; }
	// @Override
	public enterRule(listener: FilterQueryListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: FilterQueryListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FilterQueryVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnaryOpContext extends ParserRuleContext {
	public NOT(): TerminalNode { return this.getToken(FilterQueryParser.NOT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterQueryParser.RULE_unaryOp; }
	// @Override
	public enterRule(listener: FilterQueryListener): void {
		if (listener.enterUnaryOp) {
			listener.enterUnaryOp(this);
		}
	}
	// @Override
	public exitRule(listener: FilterQueryListener): void {
		if (listener.exitUnaryOp) {
			listener.exitUnaryOp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FilterQueryVisitor<Result>): Result {
		if (visitor.visitUnaryOp) {
			return visitor.visitUnaryOp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReferenceContext extends ParserRuleContext {
	public ID(): TerminalNode[];
	public ID(i: number): TerminalNode;
	public ID(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(FilterQueryParser.ID);
		} else {
			return this.getToken(FilterQueryParser.ID, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterQueryParser.RULE_reference; }
	// @Override
	public enterRule(listener: FilterQueryListener): void {
		if (listener.enterReference) {
			listener.enterReference(this);
		}
	}
	// @Override
	public exitRule(listener: FilterQueryListener): void {
		if (listener.exitReference) {
			listener.exitReference(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FilterQueryVisitor<Result>): Result {
		if (visitor.visitReference) {
			return visitor.visitReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public STR(): TerminalNode { return this.getToken(FilterQueryParser.STR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterQueryParser.RULE_value; }
	// @Override
	public enterRule(listener: FilterQueryListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: FilterQueryListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FilterQueryVisitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConnectorContext extends ParserRuleContext {
	public AND(): TerminalNode | undefined { return this.tryGetToken(FilterQueryParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(FilterQueryParser.OR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return FilterQueryParser.RULE_connector; }
	// @Override
	public enterRule(listener: FilterQueryListener): void {
		if (listener.enterConnector) {
			listener.enterConnector(this);
		}
	}
	// @Override
	public exitRule(listener: FilterQueryListener): void {
		if (listener.exitConnector) {
			listener.exitConnector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FilterQueryVisitor<Result>): Result {
		if (visitor.visitConnector) {
			return visitor.visitConnector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


