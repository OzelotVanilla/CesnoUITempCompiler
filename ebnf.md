# EBNF

```typescript
component ComponentName(props, child)
{
    render (<div></div>)
}
```

```ebnf
CompUnit  ::= CompentDef;
CompentDef::= IDENT "(" ARGUM "," ARGUM )" Block;"
Block     ::= "{" Stmt "}";
Stmt      ::= "render" "(" "<div></div> ")";

```

