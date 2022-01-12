grammar FilterQuery;

filter_query : filter (connector filter)* ;

filter : reference ':' value ;
expression : filter | unaryOp? '(' filter ')' ;
unaryOp: NOT;
reference : ID ('.' ID)* ;
value : '"' STR '"' ;

connector : AND | OR;

ID: [a-zA-Z][a-zA-Z0-9]*;
STR: [a-zA-Z0-9]+;

AND : 'and';
OR : 'or';
NOT : 'not';
