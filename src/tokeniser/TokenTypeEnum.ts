export enum TokenType
{
    /**
     * The keyword that starts a definition, such as `component` or `state`.
     */
    definition_word = "definition_word",

    /**
     * A name that could be a state, component, dependent value, etc.
     */
    identifier = "identifier",

    /**
     * A string of content like `"abc"`.
     */
    string = "string",

    /**
     * A numerical value
     */
    numerical = "numerical",

    /**
     * Literally left angle bracket `<`.
     */
    left_ang_bracket = "left_ang_bracket",

    /**
     * Literally right angle bracket `>`.
     */
    right_ang_bracket = "right_ang_bracket",

    /**
     * Literally left parenthesis `(`.
     */
    left_paren = "left_paren",

    /**
     * Literally right parenthesis `)`.
     */
    right_paren = "right_paren",

    /**
     * Literally left bracket `[`.
     */
    left_bracket = "left_bracket",

    /**
     * Literally right bracket `]`.
     */
    right_bracket = "right_bracket",

    /**
     * Literally left brace `{`.
     */
    left_brace = "left_brace",

    /**
     * Literally right brace `}`.
     */
    right_brace = "right_brace",

    /**
     * Literally plus sign `+`.
     */
    plus = "plus",

    /**
     * Literally minus sign `-`.
     */
    minus = "minus",

    /**
     * Literally multiply sign `*`.
     */
    multiply = "multiply",

    /**
     * Literally divide sign `/`.
     */
    divide = "divide",

    /**
     * Literally divide sign `=`.
     */
    equal = "equal",

    /**
     * Literally comma `,`.
     */
    comma = "comma",

    /**
     * Literally dot `.`.
     */
    dot = "dot",

    /**
     * Literally double-quotation-mark `"`.
     */
    double_quote = "double_quote",

    /**
     * Literally single-quotation-mark `'`.
     */
    single_quote = "single_quote",

    /**
     * Literally a colon `:`.
     */
    colon = "colon",

    /**
     * Literally a semicolon `;`.
     */
    semicolon = "semicolon",

    /**
     * Line break, exactly be `\r`, `\n`, or `\r\n`.
     */
    new_line = "new_line"
}