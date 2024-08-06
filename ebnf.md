# EBNF
Component Def
```typescript
component ComponentName(props, child)
{
    render (<div></div>)
}
```

```ebnf
Program    ::=  CompentDef;
CompentDef ::=  "component" IDENT "(" "props" "," "child" ")"  Block
Block      ::=  "{" RenderStmt "}";
RenderStmt ::=  "render" "(" JSX ")"

```
State Stmt
```typescript
state state_name = 0
```

```ebnf
Program  ::=  StateStmt;
StateStmt ::=  "state" IDENT "=" EXPR
```

Example

```typescript
component timer(props, child)
{
    // This is a comment line.
    state start = 0

    let timer = timer + 1
    
    whenLoadFinished
    {
        print("This is a timer!")
    }

    render (<div>{timer}</div>)
}
```

```ebnf
Program       :=  { StatmentDef };
StatementDef  :=  { ComponentDef 
                    | ExternDef
                    | FunctionDef
                    | NameDef
                    | Render}
```