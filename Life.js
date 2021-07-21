/**
 * This class represents the data used to draw the life indicator of the player
 */
class Life {

    /**
     * Vertex array object
     * @private
     */
    _vao = null;
    /**
     * Number of indices of the object
     * @type {number}
     * @private
     */
    _indicesLength=0;

    /**
     * Type of the shader
     * @type {ShadersType}
     */
    _shadersType = ShadersType.life;
    /**
     * Life of the player in percentage
     * @type {number}
     * @private
     */
    _life = 100;



    /**
     * Constructor of Life. It creates an object with the default values as attributes
     */
    constructor() {
    }

    /**
     * It returns the VAO(Vertex Array Object)
     * @returns VAO(Vertex Array Object)
     */
    getVao() {
        return this._vao;
    }

    /**
     * It sets the vao with the given one
     * @param vao new vao
     */
    setVao(vao) {
        this._vao = vao;
    }

    /**
     * It returns the shader program.
     * @returns shader program
     */
    getProgram() {
        return this.getShadersType().program;
    }


    /**
     * It returns the number of indices
     * @returns {number} number of indices
     */
    getIndicesLength() {
        return this._indicesLength;
    }

    /**
     * It sets the indices' length with the given one
     * @param indicesLength new indices' length
     */
    setIndicesLength(indicesLength) {
        this._indicesLength = indicesLength;
    }

    /**
     * It returns the lifeUniformLoc
     * @returns lifeUniformLoc
     */
    getLifeUniformLoc() {
        return this.getShadersType().locations._lifeUniformLoc;
    }

    /**
     * It sets the lifeUniformLoc with the given one
     * @param lifeUniformLoc new lifeUniformLoc
     */
    setLifeUniformLoc(lifeUniformLoc) {
        this.getShadersType().locations._lifeUniformLoc = lifeUniformLoc;
    }

    /**
     * It returns the type of the shader
     * @returns {ShadersType} type of the shader
     */
    getShadersType() {
        return this._shadersType;
    }

    /**
     * It sets the type of shader with the given one
     * @param value new type of shader
     */
    setShadersType(value) {
        this._shadersType = value;
    }

    /**
     * It returns the life of the player
     * @returns {number} life of the player
     */
    getLife() {
        return this._life;
    }

    /**
     * It sets the life of the player with the given one
     * @param life new life of the player
     */
    setLife(life) {
        this._life = life;
    }

    /**
     * It returns the canvasWidthLoc
     * @returns canvasWidthLoc
     */
    getCanvasWidthLoc() {
        return this.getShadersType().locations._canvasWidthLoc;
    }

    /**
     * It sets the canvasWidthLoc with the given one
     * @param canvasWidthLoc new canvasWidthLoc
     */
    setCanvasWidthLoc(canvasWidthLoc) {
        this.getShadersType().locations._canvasWidthLoc = canvasWidthLoc;
    }

    /**
     * It returns the canvasHeightLoc
     * @returns canvasHeightLoc
     */
    getCanvasHeightLoc() {
        return this.getShadersType().locations._canvasHeightLoc;
    }

    /**
     * It sets the canvasHeightLoc with the given one
     * @param canvasHeightLoc new canvasHeightLoc
     */
    setCanvasHeightLoc(canvasHeightLoc) {
        this.getShadersType().locations._canvasHeightLoc = canvasHeightLoc;
    }

    /**
     * It returns the startXLoc
     * @returns startXLoc
     */
    getStartXLoc() {
        return this.getShadersType().locations._startXLoc;
    }

    /**
     * It sets the startXLoc with the given one
     * @param startXLoc new startXLoc
     */
    setStartXLoc(startXLoc) {
        this.getShadersType().locations._startXLoc = startXLoc;
    }



    /**
     * It returns the widthLoc
     * @returns widthLoc
     */
    getWidthLoc() {
        return this.getShadersType().locations._widthLoc;
    }

    /**
     * It sets the widthLoc with the given one
     * @param widthLoc new widthLoc
     */
    setWidthLoc(widthLoc) {
        this.getShadersType().locations._widthLoc = widthLoc;
    }
}