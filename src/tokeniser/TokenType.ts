

/**
 * Each OBJECT of TokenType defines a type of token.
 * Creating subclasses of TokenType directly is not allowed, because there isn't a common method to match all different instances of TokenType.
 * If you need a new subclass of TokenType, make it subclass of DelimiterTokenType or RemainderTokenType or contect with the developers.
 * An instance of DelimiterTokenType defines a delimiter token. An instance of RemainderTokenType defines a remainder token.
 * A delimiter token can define its own contour which means it can DELIMIT the code makes a Tokeniser able to match and separate it from the code.
 * Tokeniser always first tries to match and separate all delimiter tokens from the code and the REMAININGs are remainder tokens.
 * For example in the code:
 * a = 2;
 * The spaces and the equal sign and the semicolon are delimiter tokens and "a" and "2" are remainder tokens.
 */
export abstract class TokenType {

    /**
     * Name of a TokenType human readable. Should be unique.
     */
    public readonly name: string;

    /**
     * True if tokens of this type should be removed after tokenising. If true, Tokeniser will remove tokens of this type after tokenising.
     */
    public readonly auto_remove: boolean

    protected constructor(name: string, auto_remove: boolean)
    {
        this.name = name;
        this.auto_remove = auto_remove;
    }
    
}