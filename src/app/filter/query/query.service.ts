import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ParseTree} from 'antlr4ts/tree';
import {ANTLRInputStream, CommonTokenStream} from 'antlr4ts';
import {FilterQueryLexer} from './parser/FilterQueryLexer';
import {FilterQueryParser} from './parser/FilterQueryParser';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private searchQuery: Observable<string>;
  private tree = new Subject<ParseTree>();

  constructor() { }

  public setSearchQuery(searchQuery: Observable<string>): void {
    this.searchQuery = searchQuery;

    this.searchQuery.subscribe(value => {
      const inputStream = new ANTLRInputStream(value);
      const lexer = new FilterQueryLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new FilterQueryParser(tokenStream);
      parser.buildParseTree = true;
      this.tree.next(parser.filter_query());
    });
  }

  
}
