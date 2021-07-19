/**
 * It contains the possible types of shaders that can be used:
 * one shader with PBR(Physically based rendering), one shader with Phong and Lambert reflection,
 * one shader with Blinn and Lambert reflection, one shader with Oren-Nayar reflection,
 * one shader used to draw the sky map,
 * one shader used to draw the life indicator of the player.
 * Each type contains one identifier, one name and one program (which contains the shaders).
 */
const ShadersType = {"pbr": {id: 1, name: "pbrTex", program: null, locations: null},
	"phong": {id: 2, name: "phong", program: null, locations: null},
	"blinn": {id: 3, name: "blinn", program: null, locations: null},
	"orenNayar": {id: 4, name: "orenNayar", program: null, locations: null},
	"skyMap": {id: 5, name: "skyMap", program: null, locations: null},
	"life": {id: 6, name: "life", program: null, locations: null}};
Object.freeze(ShadersType);

/**
 * It contains the locations of the uniforms in the memory
 */
class Locations {
	/**
	 * Location of the uniform wvpMatrix
	 */
	_wvpMatrixLocation = null;
	/**
	 * Location of the uniform wvpMatrix
	 */
	_normalMatrixLocation = null;
	/**
	 * Location of the uniform mDiffColor
	 */
	_mDiffColorLoc = null;
	/**
	 * Location of the uniform lightDirection
	 */
	_lightDirectionLoc = null;
	/**
	 * Location of the uniform lightColor
	 */
	_lightColorLoc = null;
	/**
	 * Location of the uniform wvMatrix
	 */
	_wvMatrixLocation = null;
	/**
	 * Location of the uniform mu
	 */
	_muLocation = null;
	/**
	 * Location of the uniform alpha
	 */
	_alphaLocation = null;
	/**
	 * Location of the uniform invViewProjMatrix
	 */
	_invViewProjMatrixLoc = null;


	/**
	 * Location of the uniform albedoTexture
	 */
	_albedoTextureLoc = null;
	/**
	 * Location of the uniform normalTexture
	 */
	_normalTextureLoc = null;
	/**
	 * Location of the uniform muTexture
	 */
	_muTextureLoc = null;
	/**
	 * Location of the uniform alphaTexture
	 */
	_alphaTextureLoc = null;
	/**
	 * Location of the uniform hemiLightUpper
	 */
	_hemiLightUpperLoc = null;
	/**
	 * Location of the uniform hemiLightLower
	 */
	_hemiLightLowerLoc = null;
	/**
	 * Location of the uniform hemisphericD
	 */
	_hemisphericDLoc = null;

	/**
	 * Location of the uniform muPersonal
	 */
	_muPersonalLoc = null;
	/**
	 * Location of the uniform alphaPersonal
	 */
	_alphaPersonalLoc = null;
	/**
	 * Location of the uniform f0Personal
	 */
	_f0PersonalLoc = null;
	/**
	 * Location of the uniform useTexturesForMuAlpha
	 */
	_useTexturesForMuAlphaLoc = null;
	/**
	 * Location of the uniform useClassicF0Formula
	 */
	_useClassicF0FormulaLoc = null;
	/**
	 * Location of the uniform useNormalTexture
	 */
	_useNormalTextureLoc = null;



	/**
	 * Location of the uniform pl1Color
	 */
	_pl1ColorLoc = null;
	/**
	 * Location of the uniform pl1Pos
	 */
	_pl1PosLoc = null;
	/**
	 * Location of the uniform pl2Color
	 */
	_pl2ColorLoc = null;
	/**
	 * Location of the uniform pl2Pos
	 */
	_pl2PosLoc = null;
	/**
	 * Location of the uniform plTarget
	 */
	_plTargetLoc = null;
	/**
	 * Location of the uniform plDecay
	 */
	_plDecayLoc = null;
	/**
	 * Location of the uniform spotlColor
	 */
	_spotlColorLoc = null;
	/**
	 * Location of the uniform spotPos
	 */
	_spotPosLoc = null;
	/**
	 * Location of the uniform spotTarget
	 */
	_spotTargetLoc = null;
	/**
	 * Location of the uniform spotDecay
	 */
	_spotDecayLoc = null;
	/**
	 * Location of the uniform spotConeIn
	 */
	_spotConeInLoc = null;
	/**
	 * Location of the uniform spotConeOut
	 */
	_spotConeOutLoc = null;
	/**
	 * Location of the uniform spotDirection
	 */
	_spotDirectionLoc = null;
	/**
	 * Location of the uniform isNight
	 */
	_isNightLoc = false;

	/**
	 * Constructor of Locations. It creates an object with the default values as attributes
	 */
	constructor() {
	}
}

/**
 * It contains the variables that are used as static in the subclasses (except GenericNodeC)
 * of NodeC. For example the vertex array object.
 */
class Drawing {
	/**
	 * Vertex array object
	 */
	_vao = null;
	/**
	 * Number of indices of the object
	 * @type {number}
	 */
	_indicesLength = 0;

	/**
	 * It indicates the metalness of the object
	 * @type {number}
	 */
	_muPersonal = 0.5;
	/**
	 * It indicates the roughness of the object
	 * @type {number}
	 */
	_alphaPersonal = 0.2;
	/**
	 * F0 value used if the PBR(Physically based rendering) is used
	 * @type {number}
	 */
	_f0Personal = 0.5;

	/**
	 * Whether to use the textures for the metalness and the roughness of the object
	 * @type {boolean}
	 */
	_useTexturesForMuAlpha = false;
	/**
	 * Whether to use the classic F0 formula of PBR or to use a personalized F0
	 * @type {boolean}
	 */
	_useClassicF0Formula = false;
	/**
	 * Whether to use one texture for the normal vectors to the surface of the object
	 * @type {boolean}
	 */
	_useNormalTexture = false;

	/**
	 * Type of the shader
	 * @type {ShadersType}
	 */
	_shadersType = ShadersType.pbr;

	/**
	 * Constructor of Drawing. It creates an object with the default values as attributes
	 */
	constructor() {
	}

}

/**
 * This class represents a node/object in the scene graph. It contains the methods that
 * a node must have.
 */
class NodeC {
	/**
	 * Position of the object
	 * @type {number[]}
	 * @private
	 */
	_position = [0, 0, 0];
	/**
	 * Local matrix
	 */
	_localMatrix = utils.identityMatrix();
	/**
	 * World matrix
	 */
	_worldMatrix = utils.identityMatrix();
	/**
	 * Scaling
	 * @type {number[]}
	 * @private
	 */
	_scaling = [1.0, 1.0, 1.0];
	/**
	 * Collision object
	 * @type {Collision}
	 * @private
	 */
	_collisionObject = null;
	/**
	 * Child nodes in the scene graph
	 * @type {NodeC[]}
	 * @private
	 */
	_children = [];
	/**
	 * Parent node in the scene graph
	 * @type {NodeC}
	 * @private
	 */
	_parent = null;

	/**
	 * Constructor of NodeC. It creates an object with the default values as attributes
	 */
	constructor() {
	}

	/**
	 * It returns the position of this object
	 * @returns {number[]} position of this object
	 */
	getPosition() {
		return this._position;
	}

	/**
	 * It sets the position with the given one
	 * @param position new position
	 */
	setPosition(position) {
		this._position = otherUtils.copyArray(position);
	}

	/**
	 * It returns the local matrix
	 * @returns {*[]} local matrix
	 */
	getLocalMatrix() {
		return otherUtils.copyMatrix(this._localMatrix);
	}

	/**
	 * It sets the local matrix with the given one
	 * @param localMatrix new local matrix
	 */
	setLocalMatrix(localMatrix) {
		this._localMatrix = otherUtils.copyMatrix(localMatrix);
	}

	/**
	 * It returns the world matrix
	 * @returns {*[]} world matrix
	 */
	getWorldMatrix() {
		return otherUtils.copyMatrix(this._worldMatrix);
	}

	/**
	 * It sets the world matrix with the given one
	 * @param worldMatrix new world matrix
	 */
	setWorldMatrix(worldMatrix) {
		this._worldMatrix = otherUtils.copyMatrix(worldMatrix);
	}

	/**
	 * It returns the scaling
	 * @returns {number[]} scaling
	 */
	getScaling() {
		return this._scaling;
	}

	/**
	 * It sets the scaling with the given one
	 * @param scaling new scaling
	 */
	setScaling(scaling) {
		this._scaling = otherUtils.copyArray(scaling);
	}

	/**
	 * It returns the collision object
	 * @returns {Collision} collision object
	 */
	getCollisionObject() {
		return this._collisionObject;
	}

	/**
	 * It sets the collision object with the given one
	 * @param collisionObject new collision object
	 */
	setCollisionOject(collisionObject) {
		this._collisionObject = collisionObject;
	}




	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return null;
	}

	/**
	 * It returns the VAO(Vertex Array Object)
	 * @returns VAO(Vertex Array Object)
	 */
	getVao() {
		return classT(this)._drawing._vao;
	}

	/**
	 * It sets the vao with the given one
	 * @param vao new vao
	 */
	setVao(vao) {
		classT(this)._drawing._vao = vao;
	}

	/**
	 * It returns the number of indices
	 * @returns {number} number of indices
	 */
	getIndicesLength() {
		return classT(this)._drawing._indicesLength;
	}

	/**
	 * It sets the indices' length with the given one
	 * @param indicesLength new indices' length
	 */
	setIndicesLength(indicesLength) {
		classT(this)._drawing._indicesLength = indicesLength;
	}

	/**
	 * It returns the wvpMatrixLocation
	 * @returns wvpMatrixLocation
	 */
	getWvpMatrixLocation() {
		return this.getShadersType().locations._wvpMatrixLocation;
	}


	/**
	 * It sets the wvpMatrix' location with the given one
	 * @param wvpMatrixLocation new wvpMatrix' location
	 */
	setWvpMatrixLocation(wvpMatrixLocation) {
		this.getShadersType().locations._wvpMatrixLocation = wvpMatrixLocation;
	}

	/**
	 * It returns the normalMatrixLocation
	 * @returns normalMatrixLocation
	 */
	getNormalMatrixLocation() {
		return this.getShadersType().locations._normalMatrixLocation;
	}

	/**
	 * It sets the normalMatrix' location with the given one
	 * @param normalMatrixLocation new normalMatrix' location
	 */
	setNormalMatrixLocation(normalMatrixLocation) {
		this.getShadersType().locations._normalMatrixLocation = normalMatrixLocation;
	}

	/**
	 * It returns the mDiffColorLoc
	 * @returns mDiffColorLoc
	 */
	getMDiffColorLoc() {
		return this.getShadersType().locations._drawing._mDiffColorLoc;
	}

	/**
	 * It sets the location of the mDiff uniform with the given one
	 * @param mDiffColorLoc new location of the mDiff uniform
	 */
	setMDiffColorLoc(mDiffColorLoc) {
		this.getShadersType().locations._mDiffColorLoc = mDiffColorLoc;
	}

	/**
	 * It returns the lightDirectionLoc
	 * @returns lightDirectionLoc
	 */
	getLightDirectionLoc() {
		return this.getShadersType().locations._lightDirectionLoc;
	}

	/**
	 * It sets the lightDirection's location with the given one
	 * @param lightDirectionLoc new lightDirection's location
	 */
	setLightDirectionLoc(lightDirectionLoc) {
		this.getShadersType().locations._lightDirectionLoc = lightDirectionLoc;
	}

	/**
	 * It returns the lightColorLoc
	 * @returns lightColorLoc
	 */
	getLightColorLoc() {
		return this.getShadersType().locations._lightColorLoc;
	}

	/**
	 * It sets the lightColorLoc with the given one
	 * @param lightColorLoc new lightColorLoc
	 */
	setLightColorLoc(lightColorLoc) {
		this.getShadersType().locations._lightColorLoc = lightColorLoc;
	}

	/**
	 * It returns the wvMatrixLocation
	 * @returns wvMatrixLocation
	 */
	getWvMatrixLocation() {
		return this.getShadersType().locations._wvMatrixLocation;
	}

	/**
	 * It sets the wvMatrixLocation with the given one
	 * @param wvMatrixLocation new wvMatrixLocation
	 */
	setWvMatrixLocation(wvMatrixLocation) {
		this.getShadersType().locations._wvMatrixLocation = wvMatrixLocation;
	}

	/**
	 * It returns the muLocation
	 * @returns muLocation
	 */
	getMuLocation() {
		return this.getShadersType().locations._drawing._muLocation;
	}

	/**
	 * It sets the muLocation with the given one
	 * @param muLocation new muLocation
	 */
	setMuLocation(muLocation) {
		this.getShadersType().locations._muLocation = muLocation;
	}

	/**
	 * It returns the alphaLocation
	 * @returns alphaLocation
	 */
	getAlphaLocation() {
		return this.getShadersType().locations._alphaLocation;
	}

	/**
	 * It sets the alphaLocation with the given one
	 * @param alphaLocation new alphaLocation
	 */
	setAlphaLocation(alphaLocation) {
		this.getShadersType().locations._alphaLocation = alphaLocation;
	}

	/**
	 * It returns the invViewProjMatrixLoc
	 * @returns invViewProjMatrixLoc
	 */
	getInvViewProjMatrixLoc() {
		return this.getShadersType().locations._invViewProjMatrixLoc;
	}

	/**
	 * It sets the invViewProjMatrixLoc with the given one
	 * @param invViewProjMatrixLoc new invViewProjMatrixLoc
	 */
	setInvViewProjMatrixLoc(invViewProjMatrixLoc) {
		this.getShadersType().locations._invViewProjMatrixLoc = invViewProjMatrixLoc;
	}

	/**
	 * It returns the albedo texture
	 * @returns normal vectors
	 */
	getAlbedoTexture() {
		return null;
	}

	/**
	 * It sets the albedoTexture with the given one
	 * @param albedoTexture new albedoTexture
	 */
	setAlbedoTexture(albedoTexture) {
	}

	/**
	 * It returns the texture for the normal vectors
	 * @returns texture for the normal vectors
	 */
	getNormalTexture() {
		return null;
	}

	/**
	 * It sets the normalTexture with the given one
	 * @param normalTexture new normalTexture
	 */
	setNormalTexture(normalTexture) {
	}

	/**
	 * It returns the texture for the metalness
	 * @returns texture for the metalness
	 */
	getMuTexture() {
		return null;
	}

	/**
	 * It sets the muTexture with the given one
	 * @param muTexture new muTexture
	 */
	setMuTexture(muTexture) {
	}


	/**
	 * It returns the texture for the roughness
	 * @returns texture for the roughness
	 */
	getAlphaTexture() {
		return null;
	}

	/**
	 * It sets the alphaTexture with the given one
	 * @param alphaTexture new alphaTexture
	 */
	setAlphaTexture(alphaTexture) {
	}

	/**
	 * It returns the albedoTextureLoc
	 * @returns albedoTextureLoc
	 */
	getAlbedoTextureLoc() {
		return this.getShadersType().locations._albedoTextureLoc;
	}

	/**
	 * It sets the albedoTextureLoc with the given one
	 * @param albedoTextureLoc new albedoTextureLoc
	 */
	setAlbedoTextureLoc(albedoTextureLoc) {
		this.getShadersType().locations._albedoTextureLoc = albedoTextureLoc;
	}

	/**
	 * It returns the normalTextureLoc
	 * @returns normalTextureLoc
	 */
	getNormalTextureLoc() {
		return this.getShadersType().locations._normalTextureLoc;
	}

	/**
	 * It sets the normalTextureLoc with the given one
	 * @param normalTextureLoc new normalTextureLoc
	 */
	setNormalTextureLoc(normalTextureLoc) {
		this.getShadersType().locations._normalTextureLoc = normalTextureLoc;
	}

	/**
	 * It returns the muTextureLoc
	 * @returns muTextureLoc
	 */
	getMuTextureLoc() {
		return this.getShadersType().locations._muTextureLoc;
	}

	/**
	 * It sets the muTextureLoc with the given one
	 * @param muTextureLoc new muTextureLoc
	 */
	setMuTextureLoc(muTextureLoc) {
		this.getShadersType().locations._muTextureLoc = muTextureLoc;
	}

	/**
	 * It returns the alphaTextureLoc
	 * @returns alphaTextureLoc
	 */
	getAlphaTextureLoc() {
		return this.getShadersType().locations._alphaTextureLoc;
	}

	/**
	 * It sets the alphaTextureLoc with the given one
	 * @param alphaTextureLoc new alphaTextureLoc
	 */
	setAlphaTextureLoc(alphaTextureLoc) {
		this.getShadersType().locations._alphaTextureLoc = alphaTextureLoc;
	}

	/**
	 * It returns the hemiLightUpperLoc
	 * @returns hemiLightUpperLoc
	 */
	getHemiLightUpperLoc() {
		return this.getShadersType().locations._hemiLightUpperLoc;
	}

	/**
	 * It sets the hemiLightUpperLoc with the given one
	 * @param hemiLightUpperLoc new hemiLightUpperLoc
	 */
	setHemiLightUpperLoc(hemiLightUpperLoc) {
		this.getShadersType().locations._hemiLightUpperLoc = hemiLightUpperLoc;
	}

	/**
	 * It returns the hemiLightLowerLoc
	 * @returns hemiLightLowerLoc
	 */
	getHemiLightLowerLoc() {
		return this.getShadersType().locations._hemiLightLowerLoc;
	}

	/**
	 * It sets the hemiLightLowerLoc with the given one
	 * @param hemiLightLowerLoc new hemiLightLowerLoc
	 */
	setHemiLightLowerLoc(hemiLightLowerLoc) {
		this.getShadersType().locations._hemiLightLowerLoc = hemiLightLowerLoc;
	}

	/**
	 * It returns the hemisphericDLoc
	 * @returns hemisphericDLoc
	 */
	getHemisphericDLoc() {
		return this.getShadersType().locations._hemisphericDLoc;
	}

	/**
	 * It sets the hemisphericDLoc with the given one
	 * @param hemisphericDLoc new hemisphericDLoc
	 */
	setHemisphericDLoc(hemisphericDLoc) {
		this.getShadersType().locations._hemisphericDLoc = hemisphericDLoc;
	}

	/**
	 * It returns the muPersonalLoc
	 * @returns muPersonalLoc
	 */
	getMuPersonalLoc() {
		return this.getShadersType().locations._muPersonalLoc;
	}

	/**
	 * It sets the muPersonalLoc with the given one
	 * @param muPersonalLoc new muPersonalLoc
	 */
	setMuPersonalLoc(muPersonalLoc) {
		this.getShadersType().locations._muPersonalLoc = muPersonalLoc;
	}

	/**
	 * It returns the alphaPersonalLoc
	 * @returns alphaPersonalLoc
	 */
	getAlphaPersonalLoc() {
		return this.getShadersType().locations._alphaPersonalLoc;
	}

	/**
	 * It sets the alphaPersonalLoc with the given one
	 * @param alphaPersonalLoc new alphaPersonalLoc
	 */
	setAlphaPersonalLoc(alphaPersonalLoc) {
		this.getShadersType().locations._alphaPersonalLoc = alphaPersonalLoc;
	}

	/**
	 * It returns the f0PersonalLoc
	 * @returns f0PersonalLoc
	 */
	getF0PersonalLoc() {
		return this.getShadersType().locations._f0PersonalLoc;
	}

	/**
	 * It sets the f0PersonalLoc with the given one
	 * @param f0PersonalLoc new f0PersonalLoc
	 */
	setF0PersonalLoc(f0PersonalLoc) {
		this.getShadersType().locations._f0PersonalLoc = f0PersonalLoc;
	}

	/**
	 * It returns the personalized metalness
	 * @returns {number} personalized metalness
	 */
	getMuPersonal() {
		return classT(this)._drawing._muPersonal;
	}

	/**
	 * It sets the muPersonal with the given one
	 * @param muPersonal new muPersonal
	 */
	setMuPersonal(muPersonal) {
		classT(this)._drawing._muPersonal = muPersonal;
	}

	/**
	 * It returns the personalized roughness
	 * @returns {number} personalized roughness
	 */
	getAlphaPersonal() {
		return classT(this)._drawing._alphaPersonal;
	}

	/**
	 * It sets the alphaPersonal with the given one
	 * @param alphaPersonal new alphaPersonal
	 */
	setAlphaPersonal(alphaPersonal) {
		classT(this)._drawing._alphaPersonal = alphaPersonal;
	}

	/**
	 * It returns the personalized F0
	 * @returns {number} personalized F0
	 */
	getF0Personal() {
		return classT(this)._drawing._f0Personal;
	}

	/**
	 * It sets the f0Personal with the given one
	 * @param f0Personal new f0Personal
	 */
	setF0Personal(f0Personal) {
		classT(this)._drawing._f0Personal = f0Personal;
	}

	/**
	 * It returns the useTexturesForMuAlphaLoc
	 * @returns useTexturesForMuAlphaLoc
	 */
	getUseTexturesForMuAlphaLoc() {
		return this.getShadersType().locations._useTexturesForMuAlphaLoc;
	}

	/**
	 * It sets the useTexturesForMuAlphaLoc with the given one
	 * @param useTexturesForMuAlphaLoc new useTexturesForMuAlphaLoc
	 */
	setUseTexturesForMuAlphaLoc(useTexturesForMuAlphaLoc) {
		this.getShadersType().locations._useTexturesForMuAlphaLoc = useTexturesForMuAlphaLoc;
	}

	/**
	 * It says whether to use the textures for the metalness and the roughness
	 * @returns {boolean} whether to use the textures for the metalness and the roughness
	 */
	getUseTexturesForMuAlpha() {
		return classT(this)._drawing._useTexturesForMuAlpha;
	}

	/**
	 * It sets the useTexturesForMuAlpha with the given one
	 * @param useTexturesForMuAlpha new useTexturesForMuAlpha
	 */
	setUseTexturesForMuAlpha(useTexturesForMuAlpha) {
		classT(this)._drawing._useTexturesForMuAlpha = useTexturesForMuAlpha;
	}

	/**
	 * It returns the useClassicF0FormulaLoc
	 * @returns useClassicF0FormulaLoc
	 */
	getUseClassicF0FormulaLoc() {
		return this.getShadersType().locations._useClassicF0FormulaLoc;
	}

	/**
	 * It sets the useClassicF0FormulaLoc with the given one
	 * @param useClassicF0FormulaLoc new useClassicF0FormulaLoc
	 */
	setUseClassicF0FormulaLoc(useClassicF0FormulaLoc) {
		this.getShadersType().locations._useClassicF0FormulaLoc = useClassicF0FormulaLoc;
	}

	/**
	 * It says whether to use the classic F0 formula in PBR
	 * @returns {boolean} whether to use the classic F0 formula in PBR
	 */
	getUseClassicF0Formula() {
		return classT(this)._drawing._useClassicF0Formula;
	}

	/**
	 * It sets the useClassicF0Formula with the given one
	 * @param useClassicF0Formula new useClassicF0Formula
	 */
	setUseClassicF0Formula(useClassicF0Formula) {
		classT(this)._drawing._useClassicF0Formula = useClassicF0Formula;
	}

	/**
	 * It says whether to use the normal texture
	 * @returns {boolean} whether to use the normal texture
	 */
	getUseNormalTexture() {
		return classT(this)._drawing._useNormalTexture;
	}

	/**
	 * It sets the useNormalTexture with the given one
	 * @param useNormalTexture new useNormalTexture
	 */
	setUseNormalTexture(useNormalTexture) {
		classT(this)._drawing._useNormalTexture = useNormalTexture;
	}

	/**
	 * It returns the useNormalTextureLoc
	 * @returns useNormalTextureLoc
	 */
	getUseNormalTextureLoc() {
		return this.getShadersType().locations._useNormalTextureLoc;
	}

	/**
	 * It sets the useNormalTextureLoc with the given one
	 * @param useNormalTextureLoc new useNormalTextureLoc
	 */
	setUseNormalTextureLoc(useNormalTextureLoc) {
		this.getShadersType().locations._useNormalTextureLoc = useNormalTextureLoc;
	}

	/**
	 * It returns the pl1ColorLoc
	 * @returns pl1ColorLoc
	 */
	getPl1ColorLoc() {
		return this.getShadersType().locations._pl1ColorLoc;
	}

	/**
	 * It sets the pl1ColorLoc with the given one
	 * @param pl1ColorLoc new pl1ColorLoc
	 */
	setPl1ColorLoc(pl1ColorLoc) {
		this.getShadersType().locations._pl1ColorLoc = pl1ColorLoc;
	}

	/**
	 * It returns the pl1PosLoc
	 * @returns pl1PosLoc
	 */
	getPl1PosLoc() {
		return this.getShadersType().locations._pl1PosLoc;
	}

	/**
	 * It sets the pl1PosLoc with the given one
	 * @param pl1PosLoc new pl1PosLoc
	 */
	setPl1PosLoc(pl1PosLoc) {
		this.getShadersType().locations._pl1PosLoc = pl1PosLoc;
	}

	/**
	 * It returns the pl2ColorLoc
	 * @returns pl2ColorLoc
	 */
	getPl2ColorLoc() {
		return this.getShadersType().locations._pl2ColorLoc;
	}

	/**
	 * It sets the pl2ColorLoc with the given one
	 * @param pl2ColorLoc new pl2ColorLoc
	 */
	setPl2ColorLoc(pl2ColorLoc) {
		this.getShadersType().locations._pl2ColorLoc = pl2ColorLoc;
	}

	/**
	 * It returns the pl2PosLoc
	 * @returns pl2PosLoc
	 */
	getPl2PosLoc() {
		return this.getShadersType().locations._pl2PosLoc;
	}

	/**
	 * It sets the pl2PosLoc with the given one
	 * @param pl2PosLoc new pl2PosLoc
	 */
	setPl2PosLoc(pl2PosLoc) {
		this.getShadersType().locations._pl2PosLoc = pl2PosLoc;
	}

	/**
	 * It returns the plTargetLoc
	 * @returns plTargetLoc
	 */
	getPlTargetLoc() {
		return this.getShadersType().locations._plTargetLoc;
	}

	/**
	 * It sets the plTargetLoc with the given one
	 * @param plTargetLoc new plTargetLoc
	 */
	setPlTargetLoc(plTargetLoc) {
		this.getShadersType().locations._plTargetLoc = plTargetLoc;
	}

	/**
	 * It returns the plDecayLoc
	 * @returns plDecayLoc
	 */
	getPlDecayLoc() {
		return this.getShadersType().locations._plDecayLoc;
	}

	/**
	 * It sets the plDecayLoc with the given one
	 * @param plDecayLoc new plDecayLoc
	 */
	setPlDecayLoc(plDecayLoc) {
		this.getShadersType().locations._plDecayLoc = plDecayLoc;
	}

	/**
	 * It returns the spotlColorLoc
	 * @returns spotlColorLoc
	 */
	getSpotlColorLoc() {
		return this.getShadersType().locations._spotlColorLoc;
	}

	/**
	 * It sets the spotlColorLoc with the given one
	 * @param spotlColorLoc new spotlColorLoc
	 */
	setSpotlColorLoc(spotlColorLoc) {
		this.getShadersType().locations._spotlColorLoc = spotlColorLoc;
	}

	/**
	 * It returns the spotPosLoc
	 * @returns spotPosLoc
	 */
	getSpotPosLoc() {
		return this.getShadersType().locations._spotPosLoc;
	}

	/**
	 * It sets the spotPosLoc with the given one
	 * @param spotPosLoc new spotPosLoc
	 */
	setSpotPosLoc(spotPosLoc) {
		this.getShadersType().locations._spotPosLoc = spotPosLoc;
	}

	/**
	 * It returns the spotTargetLoc
	 * @returns spotTargetLoc
	 */
	getSpotTargetLoc() {
		return this.getShadersType().locations._spotTargetLoc;
	}

	/**
	 * It sets the spotTargetLoc with the given one
	 * @param spotTargetLoc new spotTargetLoc
	 */
	setSpotTargetLoc(spotTargetLoc) {
		this.getShadersType().locations._spotTargetLoc = spotTargetLoc;
	}

	/**
	 * It returns the spotDecayLoc
	 * @returns spotDecayLoc
	 */
	getSpotDecayLoc() {
		return this.getShadersType().locations._spotDecayLoc;
	}

	/**
	 * It sets the spotDecayLoc with the given one
	 * @param spotDecayLoc new spotDecayLoc
	 */
	setSpotDecayLoc(spotDecayLoc) {
		this.getShadersType().locations._spotDecayLoc = spotDecayLoc;
	}

	/**
	 * It returns the spotConeInLoc
	 * @returns spotConeInLoc
	 */
	getSpotConeInLoc() {
		return this.getShadersType().locations._spotConeInLoc;
	}

	/**
	 * It sets the spotConeInLoc with the given one
	 * @param spotConeInLoc new spotConeInLoc
	 */
	setSpotConeInLoc(spotConeInLoc) {
		this.getShadersType().locations._spotConeInLoc = spotConeInLoc;
	}

	/**
	 * It returns the spotConeOutLoc
	 * @returns spotConeOutLoc
	 */
	getSpotConeOutLoc() {
		return this.getShadersType().locations._spotConeOutLoc;
	}

	/**
	 * It sets the spotConeOutLoc with the given one
	 * @param spotConeOutLoc new spotConeOutLoc
	 */
	setSpotConeOutLoc(spotConeOutLoc) {
		this.getShadersType().locations._spotConeOutLoc = spotConeOutLoc;
	}

	/**
	 * It returns the isNightLoc
	 * @returns isNightLoc
	 */
	getIsNightLoc() {
		return this.getShadersType().locations._isNightLoc;
	}

	/**
	 * It sets the isNightLoc with the given one
	 * @param isNightLoc new isNightLoc
	 */
	setIsNightLoc(isNightLoc) {
		this.getShadersType().locations._isNightLoc = isNightLoc;
	}

	/**
	 * It returns the spotDirectionLoc
	 * @returns spotDirectionLoc
	 */
	getSpotDirectionLoc() {
		return this.getShadersType().locations._spotDirectionLoc;
	}

	/**
	 * It sets the spotDirectionLoc with the given one
	 * @param spotDirectionLoc new spotDirectionLoc
	 */
	setSpotDirectionLoc(spotDirectionLoc) {
		this.getShadersType().locations._spotDirectionLoc = spotDirectionLoc;
	}

	/**
	 * It returns the type of the shader
	 * @returns {ShadersType} type of the shader
	 */
	getShadersType() {
		return classT(this)._drawing._shadersType;
	}

	/**
	 * It sets the type of shader with the given one
	 * @param value new type of shader
	 */
	setShadersType(value) {
		classT(this)._drawing._shadersType = value;
	}

	/**
	 * It sets as parent the given node and it removes this object as child from the old parent
	 * and it adds this object as child to the new parent
	 * @param parent new parent of this node
	 */
	setParent(parent) {
		// remove us from our parent
		if (this._parent) {
		  var ndx = this._parent._children.indexOf(this);
		  if (ndx >= 0) {
			  this._parent._children.splice(ndx, 1);
		  }
		}
	  
		// Add us to our new parent
		if (parent) {
		  parent._children.push(this);
		}
		this._parent = parent;
	}

	/**
	 * It updates the world matrix of this object considering its local matrix and the given
	 * world matrix of the parent. Then it updates the world matrix of the children
	 * @param matrix world matrix of the parent
	 */
	updateWorldMatrix(matrix) {
		if (matrix) {
		  // a matrix was passed in so do the math
			this._worldMatrix = utils.multiplyMatrices(matrix, this._localMatrix);
		} else {
		  // no matrix was passed in so just copy.
			this._worldMatrix = otherUtils.copyMatrix(this._localMatrix);
		}
	  
		// now process all the children
		var worldMatrix = this._worldMatrix;
		this._children.forEach(function(child) {
		  child.updateWorldMatrix(worldMatrix);
		});
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * This method of NodeC is a prototype, it must overridden by the subclasses if it is needed.
	 * @param objFilename name of the obj file.
	 * @param node node of which the variables are set.
	 * @param localMatrix local matrix.
	 * @param muPersonal personalized metalness.
	 * @param alphaPersonal personalized roughness.
	 * @param f0Personal personalized F0.
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering).
	 * @param textureName name of the textures.
	 * @param textureFileExtension extension of the textures.
	 * @param useNormalTexture whether to use the texture for the normal vectors.
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {

	}

	/**
	 * It loads the obj file with the given file name
	 * @param objFilename name of the obj file.
	 */
	static async loadObjFile(objFilename) {
		const path = window.location.pathname;
		const page = path.split("/").pop();
		const baseDir = window.location.href.replace(page, '');
		const assetsDir = baseDir+"assets/";

		const objStr = await utils.get_objstr(assetsDir+objFilename);
		return new OBJ.Mesh(objStr);
	}

	/**
	 * It sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param node node of which the variables are set.
	 * @param vertices vertices of the object.
	 * @param uv uv coordinates of the object.
	 * @param normals normal vectors of the object.
	 * @param indices indices of the object.
	 * @param muPersonal personalized metalness.
	 * @param alphaPersonal personalized roughness.
	 * @param f0Personal personalized F0.
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness.
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering).
	 * @param textureName name of the textures.
	 * @param textureFileExtension file extension of the textures.
	 * @param useNormalTexture whether to use the texture for the normal vectors.
	 */
	static async createAndloadDataOnGPUForNode(node, vertices, uv, normals, indices, muPersonal, alphaPersonal,
											   f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName,
											   textureFileExtension, useNormalTexture) {
		NodeC.setVBAAndVBOs(node, vertices, uv, normals, indices);
		NodeC.setUniforms(node, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, useNormalTexture);
		await NodeC.setTextures(node, textureName, textureFileExtension, useTexturesForMuAlpha, useNormalTexture);
	}

	/**
	 * It sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates.
	 * These setting are done only if the corresponding variables were not set up before.
	 * @param node node of which the variables are set.
	 * @param vertices vertices of the object.
	 * @param uv uv coordinates of the object.
	 * @param normals normal vectors of the object.
	 * @param indices indices of the object.
	 */
	static setVBAAndVBOs(node, vertices, uv, normals, indices) {
		if(node.getVao()==null) {
			const vao = gl.createVertexArray();
			gl.bindVertexArray(vao);
			node.setVao(vao);

			//VBO for the vertices
			const verticesBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
			const verticesAttributeLocation = gl.getAttribLocation(node.getProgram(), "inPosition");
			gl.enableVertexAttribArray(verticesAttributeLocation);
			var nValuesPerVertex = 3;
			var normalize = false;
			var stride = 0;
			var offset = 0;
			gl.vertexAttribPointer(verticesAttributeLocation, nValuesPerVertex, gl.FLOAT, normalize, stride, offset);

			//VBO for the uv coordinates
			const uvBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
			const uvAttributeLocation = gl.getAttribLocation(node.getProgram(), "inUv");
			gl.enableVertexAttribArray(uvAttributeLocation);
			nValuesPerVertex = 2;
			normalize = false;
			stride = 0;
			offset = 0;
			gl.vertexAttribPointer(uvAttributeLocation, nValuesPerVertex, gl.FLOAT, normalize, stride, offset);

			//VBO for the normals
			const normalsBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
			const normalsAttributeLocation = gl.getAttribLocation(node.getProgram(), "inNormal");
			gl.enableVertexAttribArray(normalsAttributeLocation);
			nValuesPerVertex = 3;
			normalize = false;
			stride = 0;
			offset = 0;
			gl.vertexAttribPointer(normalsAttributeLocation, nValuesPerVertex, gl.FLOAT, normalize, stride, offset);

			//VBO for the indices
			const indicesBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
			node.setIndicesLength(indices.length);
		}
	}

	/**
	 * It sets the locations of the uniforms depending on the type of the shaders. PBR uses in addition with respecto to
	 * Phong and Blinn the metalness and the roughness, while the Oren-Nayar uses in addition the roughness
	 * These setting are done only if the corresponding variables were not set up before.
	 * @param node node of which the variables are set.
	 * @param muPersonal personalized metalness.
	 * @param alphaPersonal personalized roughness.
	 * @param f0Personal personalized F0.
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering).
	 * @param useNormalTexture whether to use the texture for the normal vectors.
	 */
	static setUniforms(node, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, useNormalTexture) {
		if(node.getWvpMatrixLocation()==null) {
			node.setWvpMatrixLocation(gl.getUniformLocation(node.getProgram(), "wvpMatrix"));
			node.setNormalMatrixLocation(gl.getUniformLocation(node.getProgram(), "normalMatrix"));
			node.setWvMatrixLocation(gl.getUniformLocation(node.getProgram(), "wvMatrix"));

			node.setLightDirectionLoc(gl.getUniformLocation(node.getProgram(), "lightDirection"));
			node.setLightColorLoc(gl.getUniformLocation(node.getProgram(), "lightColor"));

			node.setHemiLightUpperLoc(gl.getUniformLocation(node.getProgram(), "hemiLightUpper"));
			node.setHemiLightLowerLoc(gl.getUniformLocation(node.getProgram(), "hemiLightLower"));
			node.setHemisphericDLoc(gl.getUniformLocation(node.getProgram(), "hemisphericD"));

			node.setAlbedoTextureLoc(gl.getUniformLocation(node.getProgram(), "albedoTexture"));
			node.setNormalTextureLoc(gl.getUniformLocation(node.getProgram(), "normalTexture"));
			node.setMuTextureLoc(gl.getUniformLocation(node.getProgram(), "muTexture"));
			node.setAlphaTextureLoc(gl.getUniformLocation(node.getProgram(), "alphaTexture"));

			node.setPl1ColorLoc(gl.getUniformLocation(node.getProgram(), "pl1Color"));
			node.setPl1PosLoc(gl.getUniformLocation(node.getProgram(), "pl1Pos"));
			node.setPl2ColorLoc(gl.getUniformLocation(node.getProgram(), "pl2Color"));
			node.setPl2PosLoc(gl.getUniformLocation(node.getProgram(), "pl2Pos"));
			node.setPlTargetLoc(gl.getUniformLocation(node.getProgram(), "plTarget"));
			node.setPlDecayLoc(gl.getUniformLocation(node.getProgram(), "plDecay"));
			node.setSpotlColorLoc(gl.getUniformLocation(node.getProgram(), "spotlColor"));
			node.setSpotPosLoc(gl.getUniformLocation(node.getProgram(), "spotPos"));
			node.setSpotDirectionLoc(gl.getUniformLocation(node.getProgram(), "spotDirection"));
			node.setSpotTargetLoc(gl.getUniformLocation(node.getProgram(), "spotTarget"));
			node.setSpotDecayLoc(gl.getUniformLocation(node.getProgram(), "spotDecay"));
			node.setSpotConeInLoc(gl.getUniformLocation(node.getProgram(), "spotConeIn"));
			node.setSpotConeOutLoc(gl.getUniformLocation(node.getProgram(), "spotConeOut"));
			node.setIsNightLoc(gl.getUniformLocation(node.getProgram(), "isNight"));

			if (node.getShadersType() == ShadersType.pbr) {
				node.setMuPersonalLoc(gl.getUniformLocation(node.getProgram(), "muPersonal"));
				node.setAlphaPersonalLoc(gl.getUniformLocation(node.getProgram(), "alphaPersonal"));
				node.setF0PersonalLoc(gl.getUniformLocation(node.getProgram(), "f0Personal"));
				node.setMuPersonal(muPersonal);
				node.setAlphaPersonal(alphaPersonal);
				node.setF0Personal(f0Personal);
				node.setUseTexturesForMuAlphaLoc(gl.getUniformLocation(node.getProgram(), "useTexturesForMuAlpha"));
				node.setUseClassicF0FormulaLoc(gl.getUniformLocation(node.getProgram(), "useClassicF0Formula"));
				node.setUseTexturesForMuAlpha(useTexturesForMuAlpha);
				node.setUseClassicF0Formula(useClassicF0Formula);

			} else if (node.getShadersType() == ShadersType.orenNayar) {
				node.setAlphaPersonalLoc(gl.getUniformLocation(node.getProgram(), "alphaPersonal"));
				node.setAlphaPersonal(alphaPersonal);
				node.setUseTexturesForMuAlphaLoc(gl.getUniformLocation(node.getProgram(), "useTexturesForMuAlpha"));
				node.setUseTexturesForMuAlpha(useTexturesForMuAlpha);
			}


			node.setUseNormalTextureLoc(gl.getUniformLocation(node.getProgram(), "useNormalTexture"));
			node.setUseNormalTexture(useNormalTexture);
		}
	}

	/**
	 * It loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param node node of which the variables are set.
	 * @param textureName name of the textures.
	 * @param fileExtension file extension of the textures.
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness.
	 * @param useNormalTexture whether to use the texture for the normal vectors.
	 */
	static async setTextures(node, textureName, fileExtension, useTexturesForMuAlpha, useNormalTexture) {
		if(node.getAlbedoTexture()==null) {
			const path = window.location.pathname;
			const page = path.split("/").pop();
			const baseDir = window.location.href.replace(page, '');
			const texturesDir = baseDir + "textures/";

			//Load the textures
			var texture = await NodeC.loadTexture(texturesDir + textureName + "-bl/" + textureName + "_albedo" + fileExtension, 0);
			node.setAlbedoTexture(texture);

			if (useNormalTexture) {
				texture = await NodeC.loadTexture(texturesDir + textureName + "-bl/" + textureName + "_normal-ogl" + fileExtension, 1);
				node.setNormalTexture(texture);
			}

			if (useTexturesForMuAlpha) {
				texture = await NodeC.loadTexture(texturesDir + textureName + "-bl/" + textureName + "_metallic" + fileExtension, 2);
				node.setMuTexture(texture);

				texture = await NodeC.loadTexture(texturesDir + textureName + "-bl/" + textureName + "_roughness" + fileExtension, 3);
				node.setAlphaTexture(texture);
			}
		}
		
	}

	/**
	 * It loads the texture from the path specified in src, the texture is set in the slot
	 * gl.TEXTURE0+slot.
	 * @param src file path of the texture.
	 * @param slot slot in which the texture is put.
	 * @returns {WebGLTexture} texture that was loaded from the path specified in src.
	 */
	static async loadTexture(src, slot) {
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
		const textureImage = new Image();
		textureImage.src = src;
		await textureImage.decode();
		const texture = gl.createTexture();
		gl.activeTexture(gl.TEXTURE0+slot);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
		return texture;
	}

	/**
	 * It sets up the attributes of the type specified by this class (if it is a subclass of
	 * NodeC, because this method of NodeC is a prototype, so it must be overridden by the subclasses
	 * if it is needed).
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
	}

	/**
	 * It says whether the program was set up before.
	 * @returns {boolean} whether the program was set up before.
	 */
	isProgramPresent() {
		return false;
	}

}

/**
 * This class represents a generic node/object in the scene graph. It extends the class
 * NodeC. It can be used to create generic personalized nodes.
 */
class GenericNodeC extends NodeC {
	/**
	 * Albedo texture.
	 * @private
	 */
	_albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	_normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	_muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	_alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	_drawing = new Drawing();

	/**
	 * Constructor of GenericNodeC. It creates an object with the default values as attributes
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}

	/**
	 * It returns the albedo texture
	 * @returns normal vectors
	 */
	getAlbedoTexture() {
		return this._albedoTexture;
	}

	/**
	 * It sets the albedoTexture with the given one
	 * @param albedoTexture new albedoTexture
	 */
	setAlbedoTexture(albedoTexture) {
		this._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the texture for the normal vectors
	 * @returns texture for the normal vectors
	 */
	getNormalTexture() {
		return this._normalTexture;
	}

	/**
	 * It sets the normalTexture with the given one
	 * @param normalTexture new normalTexture
	 */
	setNormalTexture(normalTexture) {
		this._normalTexture = normalTexture;
	}

	/**
	 * It returns the texture for the metalness
	 * @returns texture for the metalness
	 */
	getMuTexture() {
		return this._muTexture;
	}

	/**
	 * It sets the muTexture with the given one
	 * @param muTexture new muTexture
	 */
	setMuTexture(muTexture) {
		this._muTexture = muTexture;
	}

	/**
	 * It returns the texture for the roughness
	 * @returns texture for the roughness
	 */
	getAlphaTexture() {
		return this._alphaTexture;
	}

	/**
	 * It sets the alphaTexture with the given one
	 * @param alphaTexture new alphaTexture
	 */
	setAlphaTexture(alphaTexture) {
		this._alphaTexture = alphaTexture;
	}




	/**
	 * It returns the VAO(Vertex Array Object)
	 * @returns VAO(Vertex Array Object)
	 */
	getVao() {
		return this._drawing._vao;
	}

	 /**
	 * It sets the vao with the given one
	 * @param vao new vao
	 */
	setVao(vao) {
		this._drawing._vao = vao;
	}

	/**
	 * It returns the number of indices
	 * @returns {number} number of indices
	 */
	getIndicesLength() {
		return this._drawing._indicesLength;
	}

	/**
	 * It sets the indices' length with the given one
	 * @param indicesLength new indices' length
	 */
	setIndicesLength(indicesLength) {
		this._drawing._indicesLength = indicesLength;
	}

	/**
	 * It returns the wvpMatrixLocation
	 * @returns wvpMatrixLocation
	 */
	getWvpMatrixLocation() {
		return this._drawing._wvpMatrixLocation;
	}


	/**
	 * It sets the wvpMatrix' location with the given one
	 * @param wvpMatrixLocation new wvpMatrix' location
	 */
	setWvpMatrixLocation(wvpMatrixLocation) {
		this._drawing._wvpMatrixLocation = wvpMatrixLocation;
	}

	/**
	 * It returns the normalMatrixLocation
	 * @returns normalMatrixLocation
	 */
	getNormalMatrixLocation() {
		return this._drawing._normalMatrixLocation;
	}

	/**
	 * It sets the normalMatrixLocation with the given one
	 * @param normalMatrixLocation new normalMatrixLocation
	 */
	setNormalMatrixLocation(normalMatrixLocation) {
		this._drawing._normalMatrixLocation = normalMatrixLocation;
	}

	/**
	 * It returns the mDiffColorLoc
	 * @returns mDiffColorLoc
	 */
	getMDiffColorLoc() {
		return this._drawing._mDiffColorLoc;
	}

	/**
	 * It sets the location of the mDiff uniform with the given one
	 * @param mDiffColorLoc new location of the mDiff uniform
	 */
	setMDiffColorLoc(mDiffColorLoc) {
		this._drawing._mDiffColorLoc = mDiffColorLoc;
	}

	/**
	 * It returns the lightDirectionLoc
	 * @returns lightDirectionLoc
	 */
	getLightDirectionLoc() {
		return this._drawing._lightDirectionLoc;
	}

	/**
	 * It sets the lightDirection's location with the given one
	 * @param lightDirectionLoc new lightDirection's location
	 */
	setLightDirectionLoc(lightDirectionLoc) {
		this._drawing._lightDirectionLoc = lightDirectionLoc;
	}

	/**
	 * It returns the lightColorLoc
	 * @returns lightColorLoc
	 */
	getLightColorLoc() {
		return this._drawing._lightColorLoc;
	}

	/**
	 * It sets the lightColorLoc with the given one
	 * @param lightColorLoc new lightColorLoc
	 */
	setLightColorLoc(lightColorLoc) {
		this._drawing._lightColorLoc = lightColorLoc;
	}

	/**
	 * It returns the wvMatrixLocation
	 * @returns wvMatrixLocation
	 */
	getWvMatrixLocation() {
		return this._drawing._wvMatrixLocation;
	}

	/**
	 * It sets the wvMatrixLocation with the given one
	 * @param wvMatrixLocation new wvMatrixLocation
	 */
	setWvMatrixLocation(wvMatrixLocation) {
		this._drawing._wvMatrixLocation = wvMatrixLocation;
	}

	/**
	 * It returns the muLocation
	 * @returns muLocation
	 */
	getMuLocation() {
		return this._drawing._muLocation;
	}

	/**
	 * It sets the muLocation with the given one
	 * @param muLocation new muLocation
	 */
	setMuLocation(muLocation) {
		this._drawing._muLocation = muLocation;
	}

	/**
	 * It returns the alphaLocation
	 * @returns alphaLocation
	 */
	getAlphaLocation() {
		return this._drawing._alphaLocation;
	}

	/**
	 * It sets the alphaLocation with the given one
	 * @param alphaLocation new alphaLocation
	 */
	setAlphaLocation(alphaLocation) {
		this._drawing._alphaLocation = alphaLocation;
	}

	/**
	 * It returns the invViewProjMatrixLoc
	 * @returns invViewProjMatrixLoc
	 */
	getInvViewProjMatrixLoc() {
		return this._drawing._invViewProjMatrixLoc;
	}

	/**
	 * It sets the invViewProjMatrixLoc with the given one
	 * @param invViewProjMatrixLoc new invViewProjMatrixLoc
	 */
	setInvViewProjMatrixLoc(invViewProjMatrixLoc) {
		this._drawing._invViewProjMatrixLoc = invViewProjMatrixLoc;
	}

	/**
	 * It returns the albedoTextureLoc
	 * @returns albedoTextureLoc
	 */
	getAlbedoTextureLoc() {
		return this._drawing._albedoTextureLoc;
	}

	/**
	 * It sets the albedoTextureLoc with the given one
	 * @param albedoTextureLoc new albedoTextureLoc
	 */
	setAlbedoTextureLoc(albedoTextureLoc) {
		this._drawing._albedoTextureLoc = albedoTextureLoc;
	}

	/**
	 * It returns the normalTextureLoc
	 * @returns normalTextureLoc
	 */
	getNormalTextureLoc() {
		return this._drawing._normalTextureLoc;
	}

	/**
	 * It sets the normalTextureLoc with the given one
	 * @param normalTextureLoc new normalTextureLoc
	 */
	setNormalTextureLoc(normalTextureLoc) {
		this._drawing._normalTextureLoc = normalTextureLoc;
	}

	/**
	 * It returns the muTextureLoc
	 * @returns muTextureLoc
	 */
	getMuTextureLoc() {
		return this._drawing._muTextureLoc;
	}

	/**
	 * It sets the muTextureLoc with the given one
	 * @param muTextureLoc new muTextureLoc
	 */
	setMuTextureLoc(muTextureLoc) {
		this._drawing._muTextureLoc = muTextureLoc;
	}

	/**
	 * It returns the alphaTextureLoc
	 * @returns alphaTextureLoc
	 */
	getAlphaTextureLoc() {
		return this._drawing._alphaTextureLoc;
	}

	/**
	 * It sets the alphaTextureLoc with the given one
	 * @param alphaTextureLoc new alphaTextureLoc
	 */
	setAlphaTextureLoc(alphaTextureLoc) {
		this._drawing._alphaTextureLoc = alphaTextureLoc;
	}

	/**
	 * It returns the hemiLightUpperLoc
	 * @returns hemiLightUpperLoc
	 */
	getHemiLightUpperLoc() {
		return this._drawing._hemiLightUpperLoc;
	}

	/**
	 * It sets the hemiLightUpperLoc with the given one
	 * @param hemiLightUpperLoc new hemiLightUpperLoc
	 */
	setHemiLightUpperLoc(hemiLightUpperLoc) {
		this._drawing._hemiLightUpperLoc = hemiLightUpperLoc;
	}

	/**
	 * It returns the hemiLightLowerLoc
	 * @returns hemiLightLowerLoc
	 */
	getHemiLightLowerLoc() {
		return this._drawing._hemiLightLowerLoc;
	}

	/**
	 * It sets the hemiLightLowerLoc with the given one
	 * @param hemiLightLowerLoc new hemiLightLowerLoc
	 */
	setHemiLightLowerLoc(hemiLightLowerLoc) {
		this._drawing._hemiLightLowerLoc = hemiLightLowerLoc;
	}

	/**
	 * It returns the hemisphericDLoc
	 * @returns hemisphericDLoc
	 */
	getHemisphericDLoc() {
		return this._drawing._hemisphericDLoc;
	}

	/**
	 * It sets the hemisphericDLoc with the given one
	 * @param hemisphericDLoc new hemisphericDLoc
	 */
	setHemisphericDLoc(hemisphericDLoc) {
		this._drawing._hemisphericDLoc = hemisphericDLoc;
	}

	/**
	 * It returns the muPersonalLoc
	 * @returns muPersonalLoc
	 */
	getMuPersonalLoc() {
		return this._drawing._muPersonalLoc;
	}

	/**
	 * It sets the muPersonalLoc with the given one
	 * @param muPersonalLoc new muPersonalLoc
	 */
	setMuPersonalLoc(muPersonalLoc) {
		this._drawing._muPersonalLoc = muPersonalLoc;
	}

	/**
	 * It returns the alphaPersonalLoc
	 * @returns alphaPersonalLoc
	 */
	getAlphaPersonalLoc() {
		return this._drawing._alphaPersonalLoc;
	}

	/**
	 * It sets the alphaPersonalLoc with the given one
	 * @param alphaPersonalLoc new alphaPersonalLoc
	 */
	setAlphaPersonalLoc(alphaPersonalLoc) {
		this._drawing._alphaPersonalLoc = alphaPersonalLoc;
	}

	/**
	 * It returns the f0PersonalLoc
	 * @returns f0PersonalLoc
	 */
	getF0PersonalLoc() {
		return this._drawing._f0PersonalLoc;
	}

	/**
	 * It sets the f0PersonalLoc with the given one
	 * @param f0PersonalLoc new f0PersonalLoc
	 */
	setF0PersonalLoc(f0PersonalLoc) {
		this._drawing._f0PersonalLoc = f0PersonalLoc;
	}

	/**
	 * It returns the personalized metalness
	 * @returns {number} personalized metalness
	 */
	getMuPersonal() {
		return this._drawing._muPersonal;
	}

	/**
	 * It sets the muPersonal with the given one
	 * @param muPersonal new muPersonal
	 */
	setMuPersonal(muPersonal) {
		this._drawing._muPersonal = muPersonal;
	}

	/**
	 * It returns the personalized roughness
	 * @returns {number} personalized roughness
	 */
	getAlphaPersonal() {
		return this._drawing._alphaPersonal;
	}

	/**
	 * It sets the alphaPersonal with the given one
	 * @param alphaPersonal new alphaPersonal
	 */
	setAlphaPersonal(alphaPersonal) {
		this._drawing._alphaPersonal = alphaPersonal;
	}

	/**
	 * It returns the personalized F0
	 * @returns {number} personalized F0
	 */
	getF0Personal() {
		return this._drawing._f0Personal;
	}

	/**
	 * It sets the f0Personal with the given one
	 * @param f0Personal new f0Personal
	 */
	setF0Personal(f0Personal) {
		this._drawing._f0Personal = f0Personal;
	}

	/**
	 * It returns the useTexturesForMuAlphaLoc
	 * @returns useTexturesForMuAlphaLoc
	 */
	getUseTexturesForMuAlphaLoc() {
		return this._drawing._useTexturesForMuAlphaLoc;
	}

	/**
	 * It sets the useTexturesForMuAlphaLoc with the given one
	 * @param useTexturesForMuAlphaLoc new useTexturesForMuAlphaLoc
	 */
	setUseTexturesForMuAlphaLoc(useTexturesForMuAlphaLoc) {
		this._drawing._useTexturesForMuAlphaLoc = useTexturesForMuAlphaLoc;
	}

	/**
	 * It says whether to use the textures for the metalness and the roughness
	 * @returns {boolean} whether to use the textures for the metalness and the roughness
	 */
	getUseTexturesForMuAlpha() {
		return this._drawing._useTexturesForMuAlpha;
	}

	/**
	 * It sets the useTexturesForMuAlpha with the given one
	 * @param useTexturesForMuAlpha new useTexturesForMuAlpha
	 */
	setUseTexturesForMuAlpha(useTexturesForMuAlpha) {
		this._drawing._useTexturesForMuAlpha = useTexturesForMuAlpha;
	}

	/**
	 * It returns the useClassicF0FormulaLoc
	 * @returns useClassicF0FormulaLoc
	 */
	getUseClassicF0FormulaLoc() {
		return this._drawing._useClassicF0FormulaLoc;
	}

	/**
	 * It sets the useClassicF0FormulaLoc with the given one
	 * @param useClassicF0FormulaLoc new useClassicF0FormulaLoc
	 */
	setUseClassicF0FormulaLoc(useClassicF0FormulaLoc) {
		this._drawing._useClassicF0FormulaLoc = useClassicF0FormulaLoc;
	}

	/**
	 * It says whether to use the classic F0 formula in PBR
	 * @returns {boolean} whether to use the classic F0 formula in PBR
	 */
	getUseClassicF0Formula() {
		return this._drawing._useClassicF0Formula;
	}

	/**
	 * It sets the useClassicF0Formula with the given one
	 * @param useClassicF0Formula new useClassicF0Formula
	 */
	setUseClassicF0Formula(useClassicF0Formula) {
		this._drawing._useClassicF0Formula = useClassicF0Formula;
	}

	/**
	 * It says whether to use the normal texture
	 * @returns {boolean} whether to use the normal texture
	 */
	getUseNormalTexture() {
		return this._drawing._useNormalTexture;
	}

	/**
	 * It sets the useNormalTexture with the given one
	 * @param useNormalTexture new useNormalTexture
	 */
	setUseNormalTexture(useNormalTexture) {
		this._drawing._useNormalTexture = useNormalTexture;
	}

	/**
	 * It returns the useNormalTextureLoc
	 * @returns useNormalTextureLoc
	 */
	getUseNormalTextureLoc() {
		return this._drawing._useNormalTextureLoc;
	}

	/**
	 * It sets the useNormalTextureLoc with the given one
	 * @param useNormalTextureLoc new useNormalTextureLoc
	 */
	setUseNormalTextureLoc(useNormalTextureLoc) {
		this._drawing._useNormalTextureLoc = useNormalTextureLoc;
	}

	/**
	 * It returns the pl1ColorLoc
	 * @returns pl1ColorLoc
	 */
	getPl1ColorLoc() {
		return this._drawing._pl1ColorLoc;
	}

	/**
	 * It sets the pl1ColorLoc with the given one
	 * @param pl1ColorLoc new pl1ColorLoc
	 */
	setPl1ColorLoc(pl1ColorLoc) {
		this._drawing._pl1ColorLoc = pl1ColorLoc;
	}

	/**
	 * It returns the pl1PosLoc
	 * @returns pl1PosLoc
	 */
	getPl1PosLoc() {
		return this._drawing._pl1PosLoc;
	}

	/**
	 * It sets the pl1PosLoc with the given one
	 * @param pl1PosLoc new pl1PosLoc
	 */
	setPl1PosLoc(pl1PosLoc) {
		this._drawing._pl1PosLoc = pl1PosLoc;
	}

	/**
	 * It returns the pl2ColorLoc
	 * @returns pl2ColorLoc
	 */
	getPl2ColorLoc() {
		return this._drawing._pl2ColorLoc;
	}

	/**
	 * It sets the pl2ColorLoc with the given one
	 * @param pl2ColorLoc new pl2ColorLoc
	 */
	setPl2ColorLoc(pl2ColorLoc) {
		this._drawing._pl2ColorLoc = pl2ColorLoc;
	}

	/**
	 * It returns the pl2PosLoc
	 * @returns pl2PosLoc
	 */
	getPl2PosLoc() {
		return this._drawing._pl2PosLoc;
	}

	/**
	 * It sets the pl2PosLoc with the given one
	 * @param pl2PosLoc new pl2PosLoc
	 */
	setPl2PosLoc(pl2PosLoc) {
		this._drawing._pl2PosLoc = pl2PosLoc;
	}

	/**
	 * It returns the plTargetLoc
	 * @returns plTargetLoc
	 */
	getPlTargetLoc() {
		return this._drawing._plTargetLoc;
	}

	/**
	 * It sets the plTargetLoc with the given one
	 * @param plTargetLoc new plTargetLoc
	 */
	setPlTargetLoc(plTargetLoc) {
		this._drawing._plTargetLoc = plTargetLoc;
	}

	/**
	 * It returns the plDecayLoc
	 * @returns plDecayLoc
	 */
	getPlDecayLoc() {
		return this._drawing._plDecayLoc;
	}

	/**
	 * It sets the plDecayLoc with the given one
	 * @param plDecayLoc new plDecayLoc
	 */
	setPlDecayLoc(plDecayLoc) {
		this._drawing._plDecayLoc = plDecayLoc;
	}

	/**
	 * It returns the spotlColorLoc
	 * @returns spotlColorLoc
	 */
	getSpotlColorLoc() {
		return this._drawing._spotlColorLoc;
	}

	/**
	 * It sets the spotlColorLoc with the given one
	 * @param spotlColorLoc new spotlColorLoc
	 */
	setSpotlColorLoc(spotlColorLoc) {
		this._drawing._spotlColorLoc = spotlColorLoc;
	}

	/**
	 * It returns the spotPosLoc
	 * @returns spotPosLoc
	 */
	getSpotPosLoc() {
		return this._drawing._spotPosLoc;
	}

	/**
	 * It sets the spotPosLoc with the given one
	 * @param spotPosLoc new spotPosLoc
	 */
	setSpotPosLoc(spotPosLoc) {
		this._drawing._spotPosLoc = spotPosLoc;
	}

	/**
	 * It returns the spotTargetLoc
	 * @returns spotTargetLoc
	 */
	getSpotTargetLoc() {
		return this._drawing._spotTargetLoc;
	}

	/**
	 * It sets the spotTargetLoc with the given one
	 * @param spotTargetLoc new spotTargetLoc
	 */
	setSpotTargetLoc(spotTargetLoc) {
		this._drawing._spotTargetLoc = spotTargetLoc;
	}

	/**
	 * It returns the spotDecayLoc
	 * @returns spotDecayLoc
	 */
	getSpotDecayLoc() {
		return this._drawing._spotDecayLoc;
	}

	/**
	 * It sets the spotDecayLoc with the given one
	 * @param spotDecayLoc new spotDecayLoc
	 */
	setSpotDecayLoc(spotDecayLoc) {
		this._drawing._spotDecayLoc = spotDecayLoc;
	}

	/**
	 * It returns the spotConeInLoc
	 * @returns spotConeInLoc
	 */
	getSpotConeInLoc() {
		return this._drawing._spotConeInLoc;
	}

	/**
	 * It sets the spotConeInLoc with the given one
	 * @param spotConeInLoc new spotConeInLoc
	 */
	setSpotConeInLoc(spotConeInLoc) {
		this._drawing._spotConeInLoc = spotConeInLoc;
	}

	/**
	 * It returns the spotConeOutLoc
	 * @returns spotConeOutLoc
	 */
	getSpotConeOutLoc() {
		return this._drawing._spotConeOutLoc;
	}

	/**
	 * It sets the spotConeOutLoc with the given one
	 * @param spotConeOutLoc new spotConeOutLoc
	 */
	setSpotConeOutLoc(spotConeOutLoc) {
		this._drawing._spotConeOutLoc = spotConeOutLoc;
	}

	/**
	 * It returns the isNightLoc
	 * @returns isNightLoc
	 */
	getIsNightLoc() {
		return this._drawing._isNightLoc;
	}

	/**
	 * It sets the isNightLoc with the given one
	 * @param isNightLoc new isNightLoc
	 */
	setIsNightLoc(isNightLoc) {
		this._drawing._isNightLoc = isNightLoc;
	}

	/**
	 * It returns the spotDirectionLoc
	 * @returns spotDirectionLoc
	 */
	getSpotDirectionLoc() {
		return this._drawing._spotDirectionLoc;
	}

	/**
	 * It sets the spotDirectionLoc with the given one
	 * @param spotDirectionLoc new spotDirectionLoc
	 */
	setSpotDirectionLoc(spotDirectionLoc) {
		this._drawing._spotDirectionLoc = spotDirectionLoc;
	}

	/**
	 * It returns the type of the shader
	 * @returns {ShadersType} type of the shader
	 */
	getShadersType() {
		return this._drawing._shadersType;
	}

	/**
	 * It sets the type of shader with the given one
	 * @param value new type of shader
	 */
	setShadersType(value) {
		this._drawing._shadersType = value;
	}

}

/**
 * This class represents a spruce in the scene graph. It extends the class
 * NodeC. All spruce nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class SpruceNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();

	/**
	 * Constructor of SpruceNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return SpruceNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		SpruceNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return SpruceNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		SpruceNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return SpruceNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		SpruceNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return SpruceNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		SpruceNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new CylinderCollision(this._position, 0.35, 4.38);
		this.setCollisionOject(collision);
	
		await SpruceNodeC.loadNodeFromObjFile("spruceSmooth.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal,
									 useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension,
									 useNormalTexture) {
		
		if(SpruceNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			SpruceNodeC._vertices = objModel.vertices;
			SpruceNodeC._normals = objModel.vertexNormals;
			SpruceNodeC._indices = objModel.indices;
			SpruceNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, SpruceNodeC._vertices, SpruceNodeC._uv, SpruceNodeC._normals,
			SpruceNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula,
			textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a dead tree in the scene graph. It extends the class
 * NodeC. All dead tree nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class DeadTreeNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();

	/**
	 * Constructor of DeadTreeNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return DeadTreeNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		DeadTreeNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return DeadTreeNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		DeadTreeNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return DeadTreeNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		DeadTreeNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return DeadTreeNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		DeadTreeNodeC._alphaTexture = alphaTexture;
	}

	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new CylinderCollision(this._position, 0.22, 4.41);
		this.setCollisionOject(collision);
	
		await DeadTreeNodeC.loadNodeFromObjFile("deadTree.obj", this, utils.MakeTranslateMatrix(this._position[0],
			this._position[1], this._position[2]),
		0.5, 0.2, 0.5, false, true,
			"Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal,
									 useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(DeadTreeNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			DeadTreeNodeC._vertices = objModel.vertices;
			DeadTreeNodeC._normals = objModel.vertexNormals;
			DeadTreeNodeC._indices = objModel.indices;
			DeadTreeNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, DeadTreeNodeC._vertices, DeadTreeNodeC._uv, DeadTreeNodeC._normals,
			DeadTreeNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula,
			textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a circular spruce in the scene graph. It extends the class
 * NodeC. All  circular spruce nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class CircularSpruceNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();

	/**
	 * Constructor of CircularSpruceNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return CircularSpruceNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		CircularSpruceNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return CircularSpruceNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		CircularSpruceNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return CircularSpruceNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		CircularSpruceNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return CircularSpruceNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		CircularSpruceNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new CylinderCollision(this._position, 0.2, 4.38);
		this.setCollisionOject(collision);
	
		await CircularSpruceNodeC.loadNodeFromObjFile("circularSpruce.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(CircularSpruceNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			CircularSpruceNodeC._vertices = objModel.vertices;
			CircularSpruceNodeC._normals = objModel.vertexNormals;
			CircularSpruceNodeC._indices = objModel.indices;
			CircularSpruceNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, CircularSpruceNodeC._vertices, CircularSpruceNodeC._uv, CircularSpruceNodeC._normals, CircularSpruceNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a maritime pine in the scene graph. It extends the class
 * NodeC. All maritime pine nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class MaritimePineNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();


	/**
	 * Constructor of MaritimePineNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return MaritimePineNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		MaritimePineNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return MaritimePineNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		MaritimePineNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return MaritimePineNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		MaritimePineNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return MaritimePineNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		MaritimePineNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new CylinderCollision(this._position, 0.32, 2);
		this.setCollisionOject(collision);
	
		await MaritimePineNodeC.loadNodeFromObjFile("maritimePine.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(MaritimePineNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			MaritimePineNodeC._vertices = objModel.vertices;
			MaritimePineNodeC._normals = objModel.vertexNormals;
			MaritimePineNodeC._indices = objModel.indices;
			MaritimePineNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, MaritimePineNodeC._vertices, MaritimePineNodeC._uv, MaritimePineNodeC._normals, MaritimePineNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a stump in the scene graph. It extends the class
 * NodeC. All stump nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class StumpNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();



	/**
	 * Constructor of StumpNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return StumpNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		StumpNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return StumpNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		StumpNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return StumpNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		StumpNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return StumpNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		StumpNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new CylinderCollision(this._position, 0.7, 0.896);
		this.setCollisionOject(collision);
	
		await StumpNodeC.loadNodeFromObjFile("stump.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(StumpNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			StumpNodeC._vertices = objModel.vertices;
			StumpNodeC._normals = objModel.vertexNormals;
			StumpNodeC._indices = objModel.indices;
			StumpNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, StumpNodeC._vertices, StumpNodeC._uv, StumpNodeC._normals, StumpNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}

}

/**
 * This class represents a flower in the scene graph. It extends the class
 * NodeC. All flower nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class FlowerNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();



	/**
	 * Constructor of FlowerNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return FlowerNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		FlowerNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return FlowerNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		FlowerNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return FlowerNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		FlowerNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return FlowerNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		FlowerNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new NoCollision();
		this.setCollisionOject(collision);
	
		await FlowerNodeC.loadNodeFromObjFile("flower.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(FlowerNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			FlowerNodeC._vertices = objModel.vertices;
			FlowerNodeC._normals = objModel.vertexNormals;
			FlowerNodeC._indices = objModel.indices;
			FlowerNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, FlowerNodeC._vertices, FlowerNodeC._uv, FlowerNodeC._normals, FlowerNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}

}

/**
 * This class represents a plant in the scene graph. It extends the class
 * NodeC. All plant nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class PlantNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();



	/**
	 * Constructor of PlantNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return PlantNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		PlantNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return PlantNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		PlantNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return PlantNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		PlantNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return PlantNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		PlantNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new NoCollision();
		this.setCollisionOject(collision);
	
		await PlantNodeC.loadNodeFromObjFile("plant.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(PlantNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			PlantNodeC._vertices = objModel.vertices;
			PlantNodeC._normals = objModel.vertexNormals;
			PlantNodeC._indices = objModel.indices;
			PlantNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, PlantNodeC._vertices, PlantNodeC._uv, PlantNodeC._normals, PlantNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a dead tree in the scene graph. It extends the class
 * NodeC. All dead tree nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class BirdNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();


	/**
	 * Constructor of BirdNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return BirdNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		BirdNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return BirdNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		BirdNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return BirdNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		BirdNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return BirdNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		BirdNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new SphereCollision(this._position, 0.5);
		this.setCollisionOject(collision);

		await BirdNodeC.loadNodeFromObjFile("bird.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "texture_birb", ".png", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(BirdNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			BirdNodeC._vertices = objModel.vertices;
			BirdNodeC._normals = objModel.vertexNormals;
			BirdNodeC._indices = objModel.indices;
			BirdNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, BirdNodeC._vertices, BirdNodeC._uv, BirdNodeC._normals, BirdNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


	/**
	 * It sets the position of this object with the given one
	 * @param position new position
	 */
	setPosition(position) {
		this._position = otherUtils.copyArray(position);
		if(this._collisionObject!=null)
			this._collisionObject.setPosition(position);
	}


}

/**
 * This class represents a rock (rock1 in the obj file) in the scene graph. It extends the class
 * NodeC. All rock1 nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class Rock1NodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();



	/**
	 * Constructor of Rock1NodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return Rock1NodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		Rock1NodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return Rock1NodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		Rock1NodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return Rock1NodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		Rock1NodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return Rock1NodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		Rock1NodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new ParallelepipedCollision(this._position, 5.47/2, 6.24, 4.65/2);
		this.setCollisionOject(collision);
	
		await Rock1NodeC.loadNodeFromObjFile("rock1.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(Rock1NodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			Rock1NodeC._vertices = objModel.vertices;
			Rock1NodeC._normals = objModel.vertexNormals;
			Rock1NodeC._indices = objModel.indices;
			Rock1NodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, Rock1NodeC._vertices, Rock1NodeC._uv, Rock1NodeC._normals, Rock1NodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a rock (rock2 in the obj file) in the scene graph. It extends the class
 * NodeC. All rock2 nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class Rock2NodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();



	/**
	 * Constructor of Rock2NodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return Rock2NodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		Rock2NodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return Rock2NodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		Rock2NodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return Rock2NodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		Rock2NodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return Rock2NodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		Rock2NodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new ParallelepipedCollision(this._position, 4.67/2, 4.82, 4.25/2);
		this.setCollisionOject(collision);
	
		await Rock2NodeC.loadNodeFromObjFile("rock2.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), 
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(Rock2NodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			Rock2NodeC._vertices = objModel.vertices;
			Rock2NodeC._normals = objModel.vertexNormals;
			Rock2NodeC._indices = objModel.indices;
			Rock2NodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, Rock2NodeC._vertices, Rock2NodeC._uv, Rock2NodeC._normals, Rock2NodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a rock (rock3 in the obj file) in the scene graph. It extends the class
 * NodeC. All rock3 nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class Rock3NodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();


	/**
	 * Constructor of Rock3NodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return Rock3NodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		Rock3NodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return Rock3NodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		Rock3NodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return Rock3NodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		Rock3NodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return Rock3NodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		Rock3NodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new ParallelepipedCollision(this._position, 6.92/2*this._scaling[0], 5.2*this._scaling[1], 5.33/2*this._scaling[2]);
		this.setCollisionOject(collision);

		const tMatrix = utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]);
		const sMatrix = utils.MakeNUScaleMatrix(this._scaling[0], this._scaling[1], this._scaling[2]);

		const localMatrix = utils.multiplyMatrices(tMatrix, sMatrix);
		await Rock3NodeC.loadNodeFromObjFile("rock3.obj", this, localMatrix,
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(Rock3NodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			Rock3NodeC._vertices = objModel.vertices;
			Rock3NodeC._normals = objModel.vertexNormals;
			Rock3NodeC._indices = objModel.indices;
			Rock3NodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, Rock3NodeC._vertices, Rock3NodeC._uv, Rock3NodeC._normals, Rock3NodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a small rock in the scene graph. It extends the class
 * NodeC. All small rock nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class SmallrockNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();


	/**
	 * Constructor of SmallrockNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return SmallrockNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		SmallrockNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return SmallrockNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		SmallrockNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return SmallrockNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		SmallrockNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return SmallrockNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		SmallrockNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new ParallelepipedCollision(this._position, 1.64/2, 1.27, 1.34/2);
		this.setCollisionOject(collision);
	
		await SmallrockNodeC.loadNodeFromObjFile("smallrock.obj", this, utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]),
		0.5, 0.2, 0.5, false, true, "Texture_01", ".jpg", false);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {
		
		if(SmallrockNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			SmallrockNodeC._vertices = objModel.vertices;
			SmallrockNodeC._normals = objModel.vertexNormals;
			SmallrockNodeC._indices = objModel.indices;
			SmallrockNodeC._uv= objModel.textures;
		}
		
		node.setLocalMatrix(localMatrix);
		
		await NodeC.createAndloadDataOnGPUForNode(node, SmallrockNodeC._vertices, SmallrockNodeC._uv, SmallrockNodeC._normals, SmallrockNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a sign in the scene graph. It extends the class
 * NodeC. All sign nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class SignNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();


	/**
	 * Constructor of SignNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return SignNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		SignNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return SignNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		SignNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return SignNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		SignNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return SignNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		SignNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new ParallelepipedCollision(this._position, 0.7/2, 1.1844, 0.2/2);
		this.setCollisionOject(collision);

		var localMatrix = utils.multiplyMatrices(utils.MakeScaleMatrix(0.282), utils.MakeRotateYMatrix(90));

		localMatrix = utils.multiplyMatrices(utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]),
			localMatrix);

		await SignNodeC.loadNodeFromObjFile("sign.obj", this, localMatrix,
			0.5, 0.2, 0.5, false, true, "sign", ".png", true);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {

		if(SignNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			SignNodeC._vertices = objModel.vertices;
			SignNodeC._normals = objModel.vertexNormals;
			SignNodeC._indices = objModel.indices;
			SignNodeC._uv= objModel.textures;
		}

		node.setLocalMatrix(localMatrix);

		await NodeC.createAndloadDataOnGPUForNode(node, SignNodeC._vertices, SignNodeC._uv, SignNodeC._normals, SignNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * This class represents a blades object in the scene graph. It extends the class
 * NodeC. All sign nodes will have the same static attributes (for example
 * vertices, program, texture and Drawing object).
 */
class BladesNodeC extends NodeC {
	/**
	 * Vertices of the object.
	 * @private
	 */
	static _vertices=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _normals=null;
	/**
	 * Normal vectors of the object.
	 * @private
	 */
	static _indices=null;
	/**
	 * Indices of the object.
	 * @private
	 */
	static _uv=null;
	/**
	 * Albedo texture of the object.
	 * @private
	 */
	static _albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 * @private
	 */
	static _normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 * @private
	 */
	static _muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 * @private
	 */
	static _alphaTexture = null;
	/**
	 * Drawing object.
	 * @type {Drawing}
	 */
	static _drawing = new Drawing();


	/**
	 * Constructor of BladesNodeC. It creates an object with the default values as attributes.
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return BladesNodeC._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		BladesNodeC._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return BladesNodeC._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		BladesNodeC._normalTexture = normalTexture;
	}

	/**
	 * It returns the metalness texture.
	 * @returns metalness texture.
	 */
	getMuTexture() {
		return BladesNodeC._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		BladesNodeC._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return BladesNodeC._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		BladesNodeC._alphaTexture = alphaTexture;
	}


	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collision = new ParallelepipedCollision(this._position, 1/2, 0.8, 1/2);
		this.setCollisionOject(collision);

		const localMatrix = utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]);

		await BladesNodeC.loadNodeFromObjFile("blades.obj", this, localMatrix,
			0.5, 0.2, 0.5, false, true, "sign", ".png", true);
	}

	/**
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix. Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * @param objFilename name of the obj file
	 * @param node node of which the variables are set
	 * @param localMatrix local matrix
	 * @param muPersonal personalized metalness
	 * @param alphaPersonal personalized roughness
	 * @param f0Personal personalized F0
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	static async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture) {

		if(BladesNodeC._vertices==null) {
			const objModel = await NodeC.loadObjFile(objFilename);

			BladesNodeC._vertices = objModel.vertices;
			BladesNodeC._normals = objModel.vertexNormals;
			BladesNodeC._indices = objModel.indices;
			BladesNodeC._uv= objModel.textures;
		}

		node.setLocalMatrix(localMatrix);

		await NodeC.createAndloadDataOnGPUForNode(node, BladesNodeC._vertices, BladesNodeC._uv, BladesNodeC._normals, BladesNodeC._indices, muPersonal, alphaPersonal, f0Personal, useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}


}

/**
 * It returns the class of the given node. The function searches from the possible
 * subclasses of NodeC.
 * @param node node for which its class is searched
 * @returns {NodeC} class of the given node
 */
function classT(node) {
	const classes = [BirdNodeC, BladesNodeC, CircularSpruceNodeC, DeadTreeNodeC, Drawing, FlowerNodeC,
		GenericNodeC, MaritimePineNodeC, PlantNodeC, Rock1NodeC, Rock2NodeC, Rock3NodeC,
		SignNodeC, SmallrockNodeC, SpruceNodeC, StumpNodeC];

	return searchClass(node, classes, 0, classes.length-1);
}

/**
 * It searches the class of the given node from the classes in the given array
 * classes, considering only the elements from firstIndex to lastIndex (both indices included).
 * The search is done in a recursive way using binary search.
 * It returns null if firstIndex<lastIndex or if the searched class is not present.
 * @param node node for which its class is searched
 * @param classes
 * @param firstIndex
 * @param lastIndex
 * @returns {null|*} class of the given node or null if lastIndex<firstIndex or if the searched class is not present.
 */
function searchClass(node, classes, firstIndex, lastIndex) {
	const middleIndex = Math.floor((lastIndex+firstIndex)/2);
	const middleClass = classes[middleIndex];
	const compare = middleClass.name.localeCompare(node.constructor.name);
	if(lastIndex<firstIndex) {
		return null;
	}

	if (compare===0) {
		return middleClass;
	}

	if (compare===-1) {
		return searchClass(node, classes, middleIndex+1, lastIndex);
	}

	return searchClass(node, classes, firstIndex, middleIndex-1);
}