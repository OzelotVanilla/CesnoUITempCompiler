# EBNF

```typescript
component ComponentName(props, child)
{
    render (<div></div>)
}
```

```ebnf
Program  ::=  CompentDef;
CompentDef::=  "component" IDENT "(" "props" "," "child" ")"  Block
Block     ::=  "{" RenderStmt "}";
RenderStmt      ::=  "render" "(" JSX ")"

```

```typescript
state state_name = 0
```

```ebnf
Program  ::=  StateStmt;
StateStmt ::=  "state" IDENT "=" Expr
```
