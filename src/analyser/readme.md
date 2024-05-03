Analyser
====

It only analyse the correctness of the syntax here, and generate a symbol table which links symbol name to its definition.

Possible Syntax in this Compiler
----

All the statements should be ended by a semicolon.

### Component Definition Statement

A **component** is defined starting with a hard keyword `component`.
It is followed by a **name**, an **argument list**, and a **definition body**.

The argument list could be empty or contains the following members in a non-repeat manner:

| Name    | Usage                                                          |
| ------- | -------------------------------------------------------------- |
| `prop`  | The property of the component, provided by its caller.         |
| `child` | The child element(s) of the component, provided by its caller. |

If the component did not define the `prop` or `child`,
the caller cannot provide it to the component.

The definition body may contains these statements:

* State Definition
* Dependent Value Definition
* Render
* Conditional (Branching)

### State Definition Statement

A **state** is defined **inside the component**, starting with a hard keyword `state`.

It is followed by a **name** and an **initial value**.

The initial value could be **literal** or a **statement** (that finally evaluates to simple literal).

