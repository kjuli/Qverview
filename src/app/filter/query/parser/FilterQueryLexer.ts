// Generated from src/app/filter/query/parser/FilterQuery.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class FilterQueryLexer extends Lexer {
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

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "ID", "STR", "AND", "OR", "NOT",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "':'", "'('", "')'", "'.'", "'\"'", undefined, undefined, "'and'", 
		"'or'", "'not'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, "ID", 
		"STR", "AND", "OR", "NOT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(FilterQueryLexer._LITERAL_NAMES, FilterQueryLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return FilterQueryLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(FilterQueryLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "FilterQuery.g4"; }

	// @Override
	public get ruleNames(): string[] { return FilterQueryLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return FilterQueryLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return FilterQueryLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return FilterQueryLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\f8\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x03\x02\x03" +
		"\x03\x03\x03\x03\x04\x03\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03" +
		"\x07\x07\x07$\n\x07\f\x07\x0E\x07\'\v\x07\x03\b\x06\b*\n\b\r\b\x0E\b+" +
		"\x03\t\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x02" +
		"\x02\x02\f\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02\x06\v\x02\x07\r\x02" +
		"\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\f\x03\x02\x04\x04\x02C\\c|\x05" +
		"\x022;C\\c|\x029\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02\x07" +
		"\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r\x03" +
		"\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13\x03" +
		"\x02\x02\x02\x02\x15\x03\x02\x02\x02\x03\x17\x03\x02\x02\x02\x05\x19\x03" +
		"\x02\x02\x02\x07\x1B\x03\x02\x02\x02\t\x1D\x03\x02\x02\x02\v\x1F\x03\x02" +
		"\x02\x02\r!\x03\x02\x02\x02\x0F)\x03\x02\x02\x02\x11-\x03\x02\x02\x02" +
		"\x131\x03\x02\x02\x02\x154\x03\x02\x02\x02\x17\x18\x07<\x02\x02\x18\x04" +
		"\x03\x02\x02\x02\x19\x1A\x07*\x02\x02\x1A\x06\x03\x02\x02\x02\x1B\x1C" +
		"\x07+\x02\x02\x1C\b\x03\x02\x02\x02\x1D\x1E\x070\x02\x02\x1E\n\x03\x02" +
		"\x02\x02\x1F \x07$\x02\x02 \f\x03\x02\x02\x02!%\t\x02\x02\x02\"$\t\x03" +
		"\x02\x02#\"\x03\x02\x02\x02$\'\x03\x02\x02\x02%#\x03\x02\x02\x02%&\x03" +
		"\x02\x02\x02&\x0E\x03\x02\x02\x02\'%\x03\x02\x02\x02(*\t\x03\x02\x02)" +
		"(\x03\x02\x02\x02*+\x03\x02\x02\x02+)\x03\x02\x02\x02+,\x03\x02\x02\x02" +
		",\x10\x03\x02\x02\x02-.\x07c\x02\x02./\x07p\x02\x02/0\x07f\x02\x020\x12" +
		"\x03\x02\x02\x0212\x07q\x02\x0223\x07t\x02\x023\x14\x03\x02\x02\x0245" +
		"\x07p\x02\x0256\x07q\x02\x0267\x07v\x02\x027\x16\x03\x02\x02\x02\x05\x02" +
		"%+\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FilterQueryLexer.__ATN) {
			FilterQueryLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(FilterQueryLexer._serializedATN));
		}

		return FilterQueryLexer.__ATN;
	}

}

