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

### Class Structure

* Statement Types
  * `StmtNode`: The abstract base class.
  * `NameDefStmt`: The abstract base class for the statement that defines a name.
    * `ComponentDefStmt`, `FunctionDefStmt`
    * `ConstDefStmt`, `VarDefStmt`, `StateDefStmt`.
    * `ExternDefStmt`: declare a name that has separate definition outside of the current scope.
  * `RenderStmt`.
  * TODO: `ControlFlowStmt`: Describe a control flow, such as `while`.
* Expression Types
  * `Expression`: The abstract base class. Extends `StmtNode`.
  * `CesMLExpression`: For the UI representing structure, such as `<a>123</a>`.
  * `IdentifierExpression`: Refering to a name.
  * `OperandfulExpression`: For statements containing operand. Note: `[]` subscription or `.` access is also operand.
  * `ValueExpression`: For the literals.