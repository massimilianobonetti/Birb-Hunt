/**
 * It contains the possible types of shaders that can be used:
 * one shader with PBR(Physically based rendering), one shader with Phong and Lambert reflection,
 * one shader with Blinn and Lambert reflection, one shader with Oren-Nayar reflection,
 * one shader used to draw the sky map,
 * one shader used to draw the life indicator of the player.
 * Each type contains one identifier, one name and one program.
 */
const ShadersType = {"pbr": {id: 1, name: "pbrTex", program: null, locations: null, createLocations() {ShadersType.pbr.locations=new PBRLocations();}},
	"phong": {id: 2, name: "phong", program: null, locations: null, createLocations() {ShadersType.phong.locations=new LightAndDrawLocations();}},
	"blinn": {id: 3, name: "blinn", program: null, locations: null, createLocations() {ShadersType.blinn.locations=new LightAndDrawLocations();}},
	"orenNayar": {id: 4, name: "orenNayar", program: null, locations: null, createLocations() {ShadersType.orenNayar.locations=new OrenNayarLocations();}},
	"skyMap": {id: 5, name: "skyMap", program: null, locations: null, createLocations() {ShadersType.skyMap.locations=new EssentialLocations();}},
	"life": {id: 6, name: "life", program: null, locations: null, createLocations() {ShadersType.life.locations=new IndicatorLocations();}}};
Object.freeze(ShadersType);

/**
 * Type of the texture, whether it is an albedo texture, normal texture, metalness texture or
 * roughness texture
 */
const TextureType = {"albedo": {id: 1, name:"albedo"},
	"normal": {id: 2, name:"normal-ogl"},
	"mu": {id: 3, name:"metallic"},
	"alpha": {id: 4, name:"roughness"}};
Object.freeze(TextureType);

/**
 * This class contains the data associated to the vertices of the objects: positions, normal vectors,
 * uv coordinates and indices. They are loaded usually from the obj file.
 */
class ObjData {
	/**
	 * Vertices of the object.
	 */
	_vertices=null;
	/**
	 * Normal vectors of the object.
	 */
	_normals=null;
	/**
	 * Normal vectors of the object.
	 */
	_indices=null;
	/**
	 * Indices of the object.
	 */
	_uv=null;
	/**
	 * Constructor of VertexData. It creates an object with the default values as attributes
	 */
	constructor() {
	}
}

/**
 * It contains the variables that are used to draw the objects. For example the vertex array object.
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
	 * @type {{name: string, locations: null, id: number, program: null}}
	 */
	_shadersType = ShadersType.pbr;

	/**
	 * Albedo texture of the object.
	 */
	_albedoTexture = null;
	/**
	 * Texture that contains the encoding of the normal vectors.
	 */
	_normalTexture = null;
	/**
	 * Texture that contains the encoding of the metalness.
	 */
	_muTexture = null;
	/**
	 * Texture that contains the encoding of the roughness.
	 */
	_alphaTexture = null;

	/**
	 * Constructor of Drawing. It creates an object with the default values as attributes
	 */
	constructor() {
	}

}

/**
 * This class represents the data loaded from the obj file, the data needed to draw one object, the name
 * of the texture to load, the file extension of the texture and the name of the obj file from which the vertex positions,
 * the normal vectors, the uv coordinates and the indices are taken.
 */
class SceneData {
	/**
	 * Data loaded from the obj file
	 * @type {ObjData}
	 */
	_objData = new ObjData();
	/**
	 * Drawing object, contains data used to draw the object, like the vertex array object
	 * @type {Drawing}
	 */
	_drawing = new Drawing();
	/**
	 * Name of the texture to load and use
	 */
	_textureName = null;
	/**
	 * File extension of the texture to load and use
	 */
	_textureFileExtension = null;
	/**
	 * File name of the obj file from which the vertex positions, the normal vectors, the uv coordinates
	 * and the indices are taken.
	 */
	_objFilename = null;

	/**
	 * Constructor of SceneData. It creates an object with the given attributes
	 */
	constructor(objFilename, muPersonal, alphaPersonal, f0Personal,
				useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension,
				useNormalTexture) {
		this._objFilename = objFilename;
		this._drawing._muPersonal = muPersonal;
		this._drawing._alphaPersonal = alphaPersonal;
		this._drawing._f0Personal = f0Personal;
		this._drawing._useTexturesForMuAlpha = useTexturesForMuAlpha;
		this._drawing._useClassicF0Formula = useClassicF0Formula;
		this._textureName = textureName;
		this._textureFileExtension = textureFileExtension;
		this._drawing._useNormalTexture = useNormalTexture;
	}
}

/**
 * It represents the types of the objects in the scene. It contains one identifier,
 * one SceneData object and one Collision object.
 */
const SceneNodeType = {"spruce": {id: 1, sceneData: new SceneData("spruceSmooth.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new CylinderCollision(null,0.35, 4.38)},
	"deadTree": {id: 2, sceneData: new SceneData("deadTree.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new CylinderCollision(null,0.22, 4.41)},
	"circularSpruce": {id: 3, sceneData: new SceneData("circularSpruce.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new CylinderCollision(null,0.2, 4.38)},
	"maritimePine": {id: 4, sceneData: new SceneData("maritimePine.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new CylinderCollision(null,0.32, 2)},
	"stump": {id: 5, sceneData: new SceneData("stump.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new CylinderCollision(null,0.7, 0.896)},
	"flower": {id: 6, sceneData: new SceneData("flower.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new NoCollision()},
	"plant": {id: 7, sceneData: new SceneData("plant.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new NoCollision()},
	"bird": {id: 8, sceneData: new SceneData("bird.obj",
			0.5,0.2,0.5, false,
			true, "texture_birb",".png",
			false), collisionObject: new SphereCollision(null,0.5)},
	"rock1": {id: 9, sceneData: new SceneData("rock1.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new ParallelepipedCollision(null,5.47/2, 6.24, 4.65/2)},
	"rock2": {id: 10, sceneData: new SceneData("rock2.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new ParallelepipedCollision(null,4.67/2, 4.82, 4.25/2)},
	"rock3": {id: 11, sceneData: new SceneData("rock3.obj",
			0.5,0.2,0.5, false,
			true, "Texture_01",".jpg",
			false), collisionObject: new ParallelepipedCollision(null,6.92/2, 5.2, 5.33/2)},
	"smallrock": {id: 12, sceneData: new SceneData("smallrock.obj",
			0.5,0.2,0.8, false,
			false, "Texture_01",".jpg",
			false), collisionObject: new ParallelepipedCollision(null,1.64/2, 1.27, 1.34/2)},
	"sign": {id: 13, sceneData: new SceneData("sign.obj",
			0.2,0.1,0.5, false,
			true, "sign",".png",
			true), collisionObject: new ParallelepipedCollision(null,0.7/0.282/2, 1.1844/0.282, 0.2/0.282/2)},
	"blades": {id: 14, sceneData: new SceneData("blades.obj",
			1.0,1.0,0.5, true,
			true, "sign",".png",
			true), collisionObject: new ParallelepipedCollision(null,1/2, 0.8, 1/2)}
};


/**
 * It contains the loaded textures
 * @type {[Texture]}
 */
var textures=[];

/**
 * Class that contains the texture and its name
 */
class Texture {
	/**
	 * Name of the texture
	 */
	_name;
	/**
	 * Albedo texture of the object.
	 */
	_texture = null;
	/**
	 * Constructor of Texture. It creates an object with the default values as attributes
	 */
	constructor() {
	}

	/**
	 * It returns the texture with the given name from the already loaded textures. If the required
	 * textures is not present, then null is returned.
	 * @param name name of the texture to retrieve from the already loaded textures
	 * @returns {Texture|null} found texture if present, otherwise null
	 */
	static findTexture(name) {
		for(var textureObject of textures) {
			if(textureObject._name.localeCompare(name)===0) {
				return textureObject;
			}
		}
		return null
	}
}

/**
 * It contains just a few locations of the uniforms in the memory for the shaders
 */
class EssentialLocations {
	/**
	 * Location of the uniform invViewProjMatrix
	 */
	_invViewProjMatrixLoc = null;
	/**
	 * Location of the uniform albedoTexture
	 */
	_albedoTextureLoc = null;
	/**
	 * Location of the uniform isNight
	 */
	_isNightLoc = null;

	/**
	 * Constructor of SkyMapLocations. It creates an object with the default values as attributes
	 */
	constructor() {
	}
}

/**
 * It contains the locations of the uniforms in the memory for the shaders that manage the light and
 * need to draw objects
 */
class LightAndDrawLocations extends EssentialLocations {
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
	 * Location of the uniform normalTexture
	 */
	_normalTextureLoc = null;
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
	 * Constructor of Locations. It creates an object with the default values as attributes
	 */
	constructor() {
		super();
	}
}

/**
 * It contains the locations of the uniforms in the memory for the shader pbr
 */
class OrenNayarLocations extends LightAndDrawLocations{
	/**
	 * Location of the uniform alpha
	 */
	_alphaLocation = null;

	/**
	 * Location of the uniform alphaTexture
	 */
	_alphaTextureLoc = null;

	/**
	 * Location of the uniform alphaPersonal
	 */
	_alphaPersonalLoc = null;

	/**
	 * Location of the uniform useTexturesForMuAlpha
	 */
	_useTexturesForMuAlphaLoc = null;

	/**
	 * Constructor of Locations. It creates an object with the default values as attributes
	 */
	constructor() {
		super();
	}
}

/**
 * It contains the locations of the uniforms in the memory for the shader orenNayar
 * shader
 */
class PBRLocations extends OrenNayarLocations {
	/**
	 * Location of the uniform muTexture
	 */
	_muTextureLoc = null;

	/**
	 * Location of the uniform muPersonal
	 */
	_muPersonalLoc = null;
	/**
	 * Location of the uniform f0Personal
	 */
	_f0PersonalLoc = null;
	/**
	 * Location of the uniform useClassicF0Formula
	 */
	_useClassicF0FormulaLoc = null;

	/**
	 * Constructor of Locations. It creates an object with the default values as attributes
	 */
	constructor() {
		super();
	}
}

/**
 * It contains the locations of the uniforms in the memory for the shaders that represent an indicator
 * in the graphical user interface
 */
class IndicatorLocations {
	/**
	 * Location of the uniform life
	 * @private
	 */
	_lifeUniformLoc=null;
	/**
	 * Location of the uniform canvasWidthLoc
	 * @private
	 */
	_canvasWidthLoc = null;
	/**
	 * Location of the uniform canvasHeightLoc
	 * @private
	 */
	_canvasHeightLoc = null;

	/**
	 * Location of the uniform startXLoc
	 * @private
	 */
	_startXLoc = null;

	/**
	 * Location of the uniform widthLoc
	 * @private
	 */
	_widthLoc = null;

	/**
	 * Constructor of Locations. It creates an object with the default values as attributes
	 */
	constructor() {
	}
}


/**
 * Type of node with base features. It contains only the necessary data and methods to be used to be a node
 * of the scene graph.
 */
class BaseNodeC {
	/**
	 * Local matrix
	 */
	_localMatrix = utils.identityMatrix();
	/**
	 * World matrix
	 */
	_worldMatrix = utils.identityMatrix();
	/**
	 * Child nodes in the scene graph
	 * @type {BaseNodeC[]}
	 * @private
	 */
	_children = [];
	/**
	 * Parent node in the scene graph
	 * @type {BaseNodeC}
	 * @private
	 */
	_parent = null;

	/**
	 * Constructor of BaseNodeC. It creates an object with the default values as attributes
	 */
	constructor() {
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
}

/**
 * This class represents a node/object in the scene graph, completed with the position, scaling and collision object.
 */
class NodeC extends BaseNodeC {
	/**
	 * Position of the object in x, y, z coordinates
	 * @type {number[]}
	 */
	_position = [0.0, 0.0, 0.0];
	/**
	 * Scaling along the x, y, z coordinates
	 * @type {number[]}
	 */
	_scaling = [1.0, 1.0, 1.0];
	/**
	 * Rotation of the object around the x, y, z, axes
	 * @type {number[]}
	 */
	_rotation = [0.0, 0.0, 0.0];
	/**
	 * Collision object
	 * @type {Collision}
	 * @private
	 */
	_collisionObject = null;


	/**
	 * Constructor of NodeC. It creates an object with the default values as attributes
	 */
	constructor() {
		super();
	}

	/**
	 * It returns the position of this object
	 * @returns {number[]} position of this object
	 */
	getPosition() {
		return this._position;
	}


	/**
	 * It sets the position of this object with the given one. It sets also the position of the collisionObject if the
	 * collisionObject is not null.
	 * @param position new position
	 */
	setPosition(position) {
		this._position = otherUtils.copyArray(position);
		if(this._collisionObject!=null)
			this._collisionObject.setPosition(position);
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
	 * It sets the rotation with the given one
	 * @param rotation new rotation
	 */
	setRotation(rotation) {
		this._rotation = otherUtils.copyArray(rotation);
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
	setCollisionObject(collisionObject) {
		this._collisionObject = collisionObject;
	}






	/**
	 * It returns the VAO(Vertex Array Object)
	 * @returns VAO(Vertex Array Object)
	 */
	getVao() {
	}

	/**
	 * It sets the vao with the given one
	 * @param vao new vao
	 */
	setVao(vao) {
	}

	/**
	 * It returns the number of indices
	 * @returns {number} number of indices
	 */
	getIndicesLength() {
	}

	/**
	 * It sets the indices' length with the given one
	 * @param indicesLength new indices' length
	 */
	setIndicesLength(indicesLength) {
	}

	/**
	 * It returns the wvpMatrixLocation
	 * @returns wvpMatrixLocation
	 */
	getWvpMatrixLocation() {
	}


	/**
	 * It sets the wvpMatrix' location with the given one
	 * @param wvpMatrixLocation new wvpMatrix' location
	 */
	setWvpMatrixLocation(wvpMatrixLocation) {
	}

	/**
	 * It returns the normalMatrixLocation
	 * @returns normalMatrixLocation
	 */
	getNormalMatrixLocation() {
	}

	/**
	 * It sets the normalMatrix' location with the given one
	 * @param normalMatrixLocation new normalMatrix' location
	 */
	setNormalMatrixLocation(normalMatrixLocation) {
	}

	/**
	 * It returns the mDiffColorLoc
	 * @returns mDiffColorLoc
	 */
	getMDiffColorLoc() {
	}

	/**
	 * It sets the location of the mDiff uniform with the given one
	 * @param mDiffColorLoc new location of the mDiff uniform
	 */
	setMDiffColorLoc(mDiffColorLoc) {
	}

	/**
	 * It returns the lightDirectionLoc
	 * @returns lightDirectionLoc
	 */
	getLightDirectionLoc() {
	}

	/**
	 * It sets the lightDirection's location with the given one
	 * @param lightDirectionLoc new lightDirection's location
	 */
	setLightDirectionLoc(lightDirectionLoc) {
	}

	/**
	 * It returns the lightColorLoc
	 * @returns lightColorLoc
	 */
	getLightColorLoc() {
	}

	/**
	 * It sets the lightColorLoc with the given one
	 * @param lightColorLoc new lightColorLoc
	 */
	setLightColorLoc(lightColorLoc) {
	}

	/**
	 * It returns the wvMatrixLocation
	 * @returns wvMatrixLocation
	 */
	getWvMatrixLocation() {
	}

	/**
	 * It sets the wvMatrixLocation with the given one
	 * @param wvMatrixLocation new wvMatrixLocation
	 */
	setWvMatrixLocation(wvMatrixLocation) {
	}

	/**
	 * It returns the alphaLocation
	 * @returns alphaLocation
	 */
	getAlphaLocation() {
	}

	/**
	 * It sets the alphaLocation with the given one
	 * @param alphaLocation new alphaLocation
	 */
	setAlphaLocation(alphaLocation) {
	}

	/**
	 * It returns the invViewProjMatrixLoc
	 * @returns invViewProjMatrixLoc
	 */
	getInvViewProjMatrixLoc() {
	}

	/**
	 * It sets the invViewProjMatrixLoc with the given one
	 * @param invViewProjMatrixLoc new invViewProjMatrixLoc
	 */
	setInvViewProjMatrixLoc(invViewProjMatrixLoc) {
	}

	/**
	 * It returns the albedoTextureLoc
	 * @returns albedoTextureLoc
	 */
	getAlbedoTextureLoc() {
	}

	/**
	 * It sets the albedoTextureLoc with the given one
	 * @param albedoTextureLoc new albedoTextureLoc
	 */
	setAlbedoTextureLoc(albedoTextureLoc) {
	}

	/**
	 * It returns the normalTextureLoc
	 * @returns normalTextureLoc
	 */
	getNormalTextureLoc() {
	}

	/**
	 * It sets the normalTextureLoc with the given one
	 * @param normalTextureLoc new normalTextureLoc
	 */
	setNormalTextureLoc(normalTextureLoc) {
	}

	/**
	 * It returns the muTextureLoc
	 * @returns muTextureLoc
	 */
	getMuTextureLoc() {
	}

	/**
	 * It sets the muTextureLoc with the given one
	 * @param muTextureLoc new muTextureLoc
	 */
	setMuTextureLoc(muTextureLoc) {
	}

	/**
	 * It returns the alphaTextureLoc
	 * @returns alphaTextureLoc
	 */
	getAlphaTextureLoc() {
	}

	/**
	 * It sets the alphaTextureLoc with the given one
	 * @param alphaTextureLoc new alphaTextureLoc
	 */
	setAlphaTextureLoc(alphaTextureLoc) {
	}

	/**
	 * It returns the hemiLightUpperLoc
	 * @returns hemiLightUpperLoc
	 */
	getHemiLightUpperLoc() {
	}

	/**
	 * It sets the hemiLightUpperLoc with the given one
	 * @param hemiLightUpperLoc new hemiLightUpperLoc
	 */
	setHemiLightUpperLoc(hemiLightUpperLoc) {
	}

	/**
	 * It returns the hemiLightLowerLoc
	 * @returns hemiLightLowerLoc
	 */
	getHemiLightLowerLoc() {
	}

	/**
	 * It sets the hemiLightLowerLoc with the given one
	 * @param hemiLightLowerLoc new hemiLightLowerLoc
	 */
	setHemiLightLowerLoc(hemiLightLowerLoc) {
	}

	/**
	 * It returns the hemisphericDLoc
	 * @returns hemisphericDLoc
	 */
	getHemisphericDLoc() {
	}

	/**
	 * It sets the hemisphericDLoc with the given one
	 * @param hemisphericDLoc new hemisphericDLoc
	 */
	setHemisphericDLoc(hemisphericDLoc) {
	}

	/**
	 * It returns the muPersonalLoc
	 * @returns muPersonalLoc
	 */
	getMuPersonalLoc() {
	}

	/**
	 * It sets the muPersonalLoc with the given one
	 * @param muPersonalLoc new muPersonalLoc
	 */
	setMuPersonalLoc(muPersonalLoc) {
	}

	/**
	 * It returns the alphaPersonalLoc
	 * @returns alphaPersonalLoc
	 */
	getAlphaPersonalLoc() {
	}

	/**
	 * It sets the alphaPersonalLoc with the given one
	 * @param alphaPersonalLoc new alphaPersonalLoc
	 */
	setAlphaPersonalLoc(alphaPersonalLoc) {
	}

	/**
	 * It returns the f0PersonalLoc
	 * @returns f0PersonalLoc
	 */
	getF0PersonalLoc() {
	}

	/**
	 * It sets the f0PersonalLoc with the given one
	 * @param f0PersonalLoc new f0PersonalLoc
	 */
	setF0PersonalLoc(f0PersonalLoc) {
	}

	/**
	 * It returns the personalized metalness
	 * @returns {number} personalized metalness
	 */
	getMuPersonal() {
	}

	/**
	 * It sets the muPersonal with the given one
	 * @param muPersonal new muPersonal
	 */
	setMuPersonal(muPersonal) {
	}

	/**
	 * It returns the personalized roughness
	 * @returns {number} personalized roughness
	 */
	getAlphaPersonal() {
	}

	/**
	 * It sets the alphaPersonal with the given one
	 * @param alphaPersonal new alphaPersonal
	 */
	setAlphaPersonal(alphaPersonal) {
	}

	/**
	 * It returns the personalized F0
	 * @returns {number} personalized F0
	 */
	getF0Personal() {
	}

	/**
	 * It sets the f0Personal with the given one
	 * @param f0Personal new f0Personal
	 */
	setF0Personal(f0Personal) {
	}

	/**
	 * It returns the useTexturesForMuAlphaLoc
	 * @returns useTexturesForMuAlphaLoc
	 */
	getUseTexturesForMuAlphaLoc() {
	}

	/**
	 * It sets the useTexturesForMuAlphaLoc with the given one
	 * @param useTexturesForMuAlphaLoc new useTexturesForMuAlphaLoc
	 */
	setUseTexturesForMuAlphaLoc(useTexturesForMuAlphaLoc) {
	}

	/**
	 * It says whether to use the textures for the metalness and the roughness
	 * @returns {boolean} whether to use the textures for the metalness and the roughness
	 */
	getUseTexturesForMuAlpha() {
	}

	/**
	 * It sets the useTexturesForMuAlpha with the given one
	 * @param useTexturesForMuAlpha new useTexturesForMuAlpha
	 */
	setUseTexturesForMuAlpha(useTexturesForMuAlpha) {
	}

	/**
	 * It returns the useClassicF0FormulaLoc
	 * @returns useClassicF0FormulaLoc
	 */
	getUseClassicF0FormulaLoc() {
	}

	/**
	 * It sets the useClassicF0FormulaLoc with the given one
	 * @param useClassicF0FormulaLoc new useClassicF0FormulaLoc
	 */
	setUseClassicF0FormulaLoc(useClassicF0FormulaLoc) {
	}

	/**
	 * It says whether to use the classic F0 formula in PBR
	 * @returns {boolean} whether to use the classic F0 formula in PBR
	 */
	getUseClassicF0Formula() {
	}

	/**
	 * It sets the useClassicF0Formula with the given one
	 * @param useClassicF0Formula new useClassicF0Formula
	 */
	setUseClassicF0Formula(useClassicF0Formula) {
	}

	/**
	 * It says whether to use the normal texture
	 * @returns {boolean} whether to use the normal texture
	 */
	getUseNormalTexture() {
	}

	/**
	 * It sets the useNormalTexture with the given one
	 * @param useNormalTexture new useNormalTexture
	 */
	setUseNormalTexture(useNormalTexture) {
	}

	/**
	 * It returns the useNormalTextureLoc
	 * @returns useNormalTextureLoc
	 */
	getUseNormalTextureLoc() {
	}

	/**
	 * It sets the useNormalTextureLoc with the given one
	 * @param useNormalTextureLoc new useNormalTextureLoc
	 */
	setUseNormalTextureLoc(useNormalTextureLoc) {
	}

	/**
	 * It returns the pl1ColorLoc
	 * @returns pl1ColorLoc
	 */
	getPl1ColorLoc() {
	}

	/**
	 * It sets the pl1ColorLoc with the given one
	 * @param pl1ColorLoc new pl1ColorLoc
	 */
	setPl1ColorLoc(pl1ColorLoc) {
	}

	/**
	 * It returns the pl1PosLoc
	 * @returns pl1PosLoc
	 */
	getPl1PosLoc() {
	}

	/**
	 * It sets the pl1PosLoc with the given one
	 * @param pl1PosLoc new pl1PosLoc
	 */
	setPl1PosLoc(pl1PosLoc) {
	}

	/**
	 * It returns the pl2ColorLoc
	 * @returns pl2ColorLoc
	 */
	getPl2ColorLoc() {
	}

	/**
	 * It sets the pl2ColorLoc with the given one
	 * @param pl2ColorLoc new pl2ColorLoc
	 */
	setPl2ColorLoc(pl2ColorLoc) {
	}

	/**
	 * It returns the pl2PosLoc
	 * @returns pl2PosLoc
	 */
	getPl2PosLoc() {
	}

	/**
	 * It sets the pl2PosLoc with the given one
	 * @param pl2PosLoc new pl2PosLoc
	 */
	setPl2PosLoc(pl2PosLoc) {
	}

	/**
	 * It returns the plTargetLoc
	 * @returns plTargetLoc
	 */
	getPlTargetLoc() {
	}

	/**
	 * It sets the plTargetLoc with the given one
	 * @param plTargetLoc new plTargetLoc
	 */
	setPlTargetLoc(plTargetLoc) {
	}

	/**
	 * It returns the plDecayLoc
	 * @returns plDecayLoc
	 */
	getPlDecayLoc() {
	}

	/**
	 * It sets the plDecayLoc with the given one
	 * @param plDecayLoc new plDecayLoc
	 */
	setPlDecayLoc(plDecayLoc) {
	}

	/**
	 * It returns the spotlColorLoc
	 * @returns spotlColorLoc
	 */
	getSpotlColorLoc() {
	}

	/**
	 * It sets the spotlColorLoc with the given one
	 * @param spotlColorLoc new spotlColorLoc
	 */
	setSpotlColorLoc(spotlColorLoc) {
	}

	/**
	 * It returns the spotPosLoc
	 * @returns spotPosLoc
	 */
	getSpotPosLoc() {
	}

	/**
	 * It sets the spotPosLoc with the given one
	 * @param spotPosLoc new spotPosLoc
	 */
	setSpotPosLoc(spotPosLoc) {
	}

	/**
	 * It returns the spotTargetLoc
	 * @returns spotTargetLoc
	 */
	getSpotTargetLoc() {
	}

	/**
	 * It sets the spotTargetLoc with the given one
	 * @param spotTargetLoc new spotTargetLoc
	 */
	setSpotTargetLoc(spotTargetLoc) {
	}

	/**
	 * It returns the spotDecayLoc
	 * @returns spotDecayLoc
	 */
	getSpotDecayLoc() {
	}

	/**
	 * It sets the spotDecayLoc with the given one
	 * @param spotDecayLoc new spotDecayLoc
	 */
	setSpotDecayLoc(spotDecayLoc) {
	}

	/**
	 * It returns the spotConeInLoc
	 * @returns spotConeInLoc
	 */
	getSpotConeInLoc() {
	}

	/**
	 * It sets the spotConeInLoc with the given one
	 * @param spotConeInLoc new spotConeInLoc
	 */
	setSpotConeInLoc(spotConeInLoc) {
	}

	/**
	 * It returns the spotConeOutLoc
	 * @returns spotConeOutLoc
	 */
	getSpotConeOutLoc() {
	}

	/**
	 * It sets the spotConeOutLoc with the given one
	 * @param spotConeOutLoc new spotConeOutLoc
	 */
	setSpotConeOutLoc(spotConeOutLoc) {
	}

	/**
	 * It returns the isNightLoc
	 * @returns isNightLoc
	 */
	getIsNightLoc() {
	}

	/**
	 * It sets the isNightLoc with the given one
	 * @param isNightLoc new isNightLoc
	 */
	setIsNightLoc(isNightLoc) {
	}

	/**
	 * It returns the spotDirectionLoc
	 * @returns spotDirectionLoc
	 */
	getSpotDirectionLoc() {
	}

	/**
	 * It sets the spotDirectionLoc with the given one
	 * @param spotDirectionLoc new spotDirectionLoc
	 */
	setSpotDirectionLoc(spotDirectionLoc) {
	}

	/**
	 * It returns the type of the shader
	 * @returns {ShadersType} type of the shader
	 */
	getShadersType() {
	}

	/**
	 * It sets the type of shader with the given one
	 * @param value new type of shader
	 */
	setShadersType(value) {
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
	}

	/**
	 * It returns the texture for the metalness
	 * @returns texture for the metalness
	 */
	getMuTexture() {
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
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
	static async createAndLoadDataForNode(node, vertices, uv, normals, indices, muPersonal, alphaPersonal,
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

			if (node.getShadersType().id === ShadersType.pbr.id) {
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
				node.setMuTextureLoc(gl.getUniformLocation(node.getProgram(), "muTexture"));
				node.setAlphaTextureLoc(gl.getUniformLocation(node.getProgram(), "alphaTexture"));

			} else if (node.getShadersType().id === ShadersType.orenNayar.id) {
				node.setAlphaPersonalLoc(gl.getUniformLocation(node.getProgram(), "alphaPersonal"));
				node.setAlphaPersonal(alphaPersonal);
				node.setUseTexturesForMuAlphaLoc(gl.getUniformLocation(node.getProgram(), "useTexturesForMuAlpha"));
				node.setUseTexturesForMuAlpha(useTexturesForMuAlpha);
				node.setMuTextureLoc(gl.getUniformLocation(node.getProgram(), "muTexture"));
				node.setAlphaTextureLoc(gl.getUniformLocation(node.getProgram(), "alphaTexture"));
			}


			node.setUseNormalTextureLoc(gl.getUniformLocation(node.getProgram(), "useNormalTexture"));
			node.setUseNormalTexture(useNormalTexture);
		}
	}

	/**
	 * It loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 * If the texture was already loaded in the past then it is retrieved from the saved textures.
	 * @param node node of which the variables are set.
	 * @param textureName name of the textures.
	 * @param fileExtension file extension of the textures.
	 * @param useTexturesForMuAlpha whether to use the textures for the metalness and the roughness.
	 * @param useNormalTexture whether to use the texture for the normal vectors.
	 */
	static async setTextures(node, textureName, fileExtension, useTexturesForMuAlpha, useNormalTexture) {
		if(node.getAlbedoTexture()==null) {

			node.setAlbedoTexture(await NodeC.getTexture(textureName, fileExtension,0, TextureType.albedo));

			if (useNormalTexture) {
				node.setNormalTexture(await NodeC.getTexture(textureName, fileExtension,1, TextureType.normal));
			}

			if (useTexturesForMuAlpha) {
				node.setMuTexture(await NodeC.getTexture(textureName, fileExtension,2, TextureType.mu));

				node.setAlphaTexture(await NodeC.getTexture(textureName, fileExtension,3, TextureType.alpha));

			}

		}
		
	}

	/**
	 * It finds the texture	from the already loaded textures. If it is present then it is returned, otherwise it
	 * loads the texture with with name textureName, type textureType and with the file extension fileExtension.
	 * The texture is put in the slot gl.TEXTURE0+slot.
	 * If the texture is loaded from the server, then it is saved in the array textures for future usages.
	 * @param textureName name of the texture.
	 * @param fileExtension file extension of the textures.
	 * @param slot slot in which the texture is put.
	 * @param textureType type of the texture.
	 */
	static async getTexture(textureName, fileExtension, slot, textureType) {
		var textureObject = Texture.findTexture(textureName+"_"+textureType.name);
		var texture;
		if(textureObject!=null) {
			texture =  textureObject._texture;
		} else {
			texture = await NodeC.loadTexture(textureName, fileExtension, slot, textureType);
			textureObject = new Texture();
			textureObject._name = textureName+"_"+textureType.name;
			textureObject._texture = texture;
			textures.push(textureObject);
		}
		return texture;
	}

	/**
	 * It loads the texture with with name textureName, type textureType and with the file extension fileExtension.
	 * The texture is put in the slot gl.TEXTURE0+slot.
	 * @param textureName name of the texture.
	 * @param fileExtension file extension of the textures.
	 * @param slot slot in which the texture is put.
	 * @param textureType type of the texture.
	 * @returns {WebGLTexture} texture that was loaded from the path specified in src.
	 */
	static async loadTexture(textureName, fileExtension, slot, textureType) {
		const path = window.location.pathname;
		const page = path.split("/").pop();
		const baseDir = window.location.href.replace(page, '');
		const texturesDir = baseDir + "textures/";

		const src = texturesDir + textureName + "-bl/" + textureName + "_" + textureType.name + fileExtension;

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

}

/**
 * This class represents a generic node/object in the scene graph. It extends the class
 * NodeC. It can be used to create generic personalized nodes, for example it is used to create the field
 * in the game.
 */
class GenericNodeC extends NodeC {
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
	 * It returns the albedo texture
	 * @returns normal vectors
	 */
	getAlbedoTexture() {
		return this._drawing._albedoTexture;
	}

	/**
	 * It sets the albedoTexture with the given one
	 * @param albedoTexture new albedoTexture
	 */
	setAlbedoTexture(albedoTexture) {
		this._drawing._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the texture for the normal vectors
	 * @returns texture for the normal vectors
	 */
	getNormalTexture() {
		return this._drawing._normalTexture;
	}

	/**
	 * It sets the normalTexture with the given one
	 * @param normalTexture new normalTexture
	 */
	setNormalTexture(normalTexture) {
		this._drawing._normalTexture = normalTexture;
	}

	/**
	 * It returns the texture for the metalness
	 * @returns texture for the metalness
	 */
	getMuTexture() {
		return this._drawing._muTexture;
	}

	/**
	 * It sets the muTexture with the given one
	 * @param muTexture new muTexture
	 */
	setMuTexture(muTexture) {
		this._drawing._muTexture = muTexture;
	}

	/**
	 * It returns the texture for the roughness
	 * @returns texture for the roughness
	 */
	getAlphaTexture() {
		return this._drawing._alphaTexture;
	}

	/**
	 * It sets the alphaTexture with the given one
	 * @param alphaTexture new alphaTexture
	 */
	setAlphaTexture(alphaTexture) {
		this._drawing._alphaTexture = alphaTexture;
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
	 * It sets the normalMatrixLocation with the given one
	 * @param normalMatrixLocation new normalMatrixLocation
	 */
	setNormalMatrixLocation(normalMatrixLocation) {
		this.getShadersType().locations._normalMatrixLocation = normalMatrixLocation;
	}

	/**
	 * It returns the mDiffColorLoc
	 * @returns mDiffColorLoc
	 */
	getMDiffColorLoc() {
		return this.getShadersType().locations._mDiffColorLoc;
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
		return this._drawing._shadersType;
	}

	/**
	 * It sets the type of shader with the given one
	 * @param value new type of shader
	 */
	setShadersType(value) {
		this._drawing._shadersType = value;
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
 * This class represents a specific node in the scene graph, for example a spruce or a flower.
 * It must have a type SceneNodeType in order to use the data in the SceneNodeType.
 */
class SceneNodeC extends NodeC {
	/**
	 * Type of the object in the scene, whether it is a spruce, a flower or something else.
	 * @type {{sceneData: SceneData, id: number, collisionObject: Collision}}
	 * @private
	 */
	_sceneNodeType=SceneNodeType.deadTree;

	/**
	 * Constructor of SceneNodeC. It creates an object with the given type of SceneNode
	 */
	constructor(sceneNodeType) {
		super();
		this._sceneNodeType = sceneNodeType;
	}

	/**
	 * It sets up the attributes of this object.
	 * In particular it sets up the collision object.
	 * It loads the vertices, the normal vectors, the indices and the uv coordinates if they were not loaded before.
	 * It sets the local matrix, created by considering the rotation, the scaling and the position of the object.
	 * Then it sets the VAO (Vertex Array Object) with the VBOs (Vertex buffer Objects) for the
	 * vertices, the normal vectors, the indices and the uv coordinates. It sets the locations of the uniforms and it
	 * loads the textures for the albedo, the normal (if needed), the metalness (if needed) and the roughness (if needed).
	 * All these setting are done only if the corresponding variables were not set up before.
	 */
	async createObject() {
		const collisionObject = this._sceneNodeType.collisionObject.copy();
		collisionObject.setPosition(this._position);
		collisionObject.setScaling(this._scaling);
		this.setCollisionObject(collisionObject);

		var localMatrix = utils.multiplyMatrices(utils.MakeRotateXMatrix(this._rotation[0]), utils.MakeRotateZMatrix(this._rotation[2]));
		localMatrix = utils.multiplyMatrices(utils.MakeRotateYMatrix(this._rotation[1]), localMatrix);
		localMatrix = utils.multiplyMatrices(utils.MakeNUScaleMatrix(this._scaling[0], this._scaling[1], this._scaling[2]), localMatrix);
		localMatrix = utils.multiplyMatrices(utils.MakeTranslateMatrix(this._position[0], this._position[1], this._position[2]), localMatrix);

		await this.loadNodeFromObjFile(this._sceneNodeType.sceneData._objFilename, this, localMatrix,
			this._sceneNodeType.sceneData._drawing._muPersonal, this._sceneNodeType.sceneData._drawing._alphaPersonal,
			this._sceneNodeType.sceneData._drawing._f0Personal, this._sceneNodeType.sceneData._drawing._useTexturesForMuAlpha,
			this._sceneNodeType.sceneData._drawing._useClassicF0Formula, this._sceneNodeType.sceneData._textureName,
			this._sceneNodeType.sceneData._textureFileExtension, this._sceneNodeType.sceneData._drawing._useNormalTexture);
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
	 * @param useClassicF0Formula whether to use the classic formula to calculate the F0 in PBR
	 * (Physically based rendering)
	 * @param textureName name of the textures
	 * @param textureFileExtension extension of the textures
	 * @param useNormalTexture whether to use the texture for the normal vectors
	 */
	async loadNodeFromObjFile(objFilename, node, localMatrix, muPersonal, alphaPersonal, f0Personal,
							  useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension,
							  useNormalTexture) {
		const classType = this._sceneNodeType.sceneData;
		if(classType._objData._vertices==null) {
			const objModel = await SceneNodeC.loadObjFile(objFilename);

			classType._objData._vertices = objModel.vertices;
			classType._objData._normals = objModel.vertexNormals;
			classType._objData._indices = objModel.indices;
			classType._objData._uv= objModel.textures;
		}

		node.setLocalMatrix(localMatrix);

		await NodeC.createAndLoadDataForNode(node, classType._objData._vertices, classType._objData._uv,
			classType._objData._normals, classType._objData._indices, muPersonal, alphaPersonal, f0Personal,
			useTexturesForMuAlpha, useClassicF0Formula, textureName, textureFileExtension, useNormalTexture);
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
	 * It returns the VAO(Vertex Array Object)
	 * @returns VAO(Vertex Array Object)
	 */
	getVao() {
		return this._sceneNodeType.sceneData._drawing._vao;
	}

	/**
	 * It sets the vao with the given one
	 * @param vao new vao
	 */
	setVao(vao) {
		this._sceneNodeType.sceneData._drawing._vao = vao;
	}

	/**
	 * It returns the number of indices
	 * @returns {number} number of indices
	 */
	getIndicesLength() {
		return this._sceneNodeType.sceneData._drawing._indicesLength;
	}

	/**
	 * It sets the indices' length with the given one
	 * @param indicesLength new indices' length
	 */
	setIndicesLength(indicesLength) {
		this._sceneNodeType.sceneData._drawing._indicesLength = indicesLength;
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
		return this._sceneNodeType.sceneData._drawing._muPersonal;
	}

	/**
	 * It sets the muPersonal with the given one
	 * @param muPersonal new muPersonal
	 */
	setMuPersonal(muPersonal) {
		this._sceneNodeType.sceneData._drawing._muPersonal = muPersonal;
	}

	/**
	 * It returns the personalized roughness
	 * @returns {number} personalized roughness
	 */
	getAlphaPersonal() {
		return this._sceneNodeType.sceneData._drawing._alphaPersonal;
	}

	/**
	 * It sets the alphaPersonal with the given one
	 * @param alphaPersonal new alphaPersonal
	 */
	setAlphaPersonal(alphaPersonal) {
		this._sceneNodeType.sceneData._drawing._alphaPersonal = alphaPersonal;
	}

	/**
	 * It returns the personalized F0
	 * @returns {number} personalized F0
	 */
	getF0Personal() {
		return this._sceneNodeType.sceneData._drawing._f0Personal;
	}

	/**
	 * It sets the f0Personal with the given one
	 * @param f0Personal new f0Personal
	 */
	setF0Personal(f0Personal) {
		this._sceneNodeType.sceneData._drawing._f0Personal = f0Personal;
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
		return this._sceneNodeType.sceneData._drawing._useTexturesForMuAlpha;
	}

	/**
	 * It sets the useTexturesForMuAlpha with the given one
	 * @param useTexturesForMuAlpha new useTexturesForMuAlpha
	 */
	setUseTexturesForMuAlpha(useTexturesForMuAlpha) {
		this._sceneNodeType.sceneData._drawing._useTexturesForMuAlpha = useTexturesForMuAlpha;
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
		return this._sceneNodeType.sceneData._drawing._useClassicF0Formula;
	}

	/**
	 * It sets the useClassicF0Formula with the given one
	 * @param useClassicF0Formula new useClassicF0Formula
	 */
	setUseClassicF0Formula(useClassicF0Formula) {
		this._sceneNodeType.sceneData._drawing._useClassicF0Formula = useClassicF0Formula;
	}

	/**
	 * It says whether to use the normal texture
	 * @returns {boolean} whether to use the normal texture
	 */
	getUseNormalTexture() {
		return this._sceneNodeType.sceneData._drawing._useNormalTexture;
	}

	/**
	 * It sets the useNormalTexture with the given one
	 * @param useNormalTexture new useNormalTexture
	 */
	setUseNormalTexture(useNormalTexture) {
		this._sceneNodeType.sceneData._drawing._useNormalTexture = useNormalTexture;
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
		return this._sceneNodeType.sceneData._drawing._shadersType;
	}

	/**
	 * It sets the type of shader with the given one
	 * @param value new type of shader
	 */
	setShadersType(value) {
		this._sceneNodeType.sceneData._drawing._shadersType = value;
	}

	/**
	 * It returns the shader program.
	 * @returns shader program
	 */
	getProgram() {
		return this.getShadersType().program;
	}

	/**
	 * It returns the albedo texture.
	 * @returns albedo texture.
	 */
	getAlbedoTexture() {
		return this._sceneNodeType.sceneData._drawing._albedoTexture;
	}

	/**
	 * It sets the albedo texture with the given one.
	 * @param albedoTexture albedo texture.
	 */
	setAlbedoTexture(albedoTexture) {
		this._sceneNodeType.sceneData._drawing._albedoTexture = albedoTexture;
	}

	/**
	 * It returns the normal texture.
	 * @returns normal texture.
	 */
	getNormalTexture() {
		return this._sceneNodeType.sceneData._drawing._normalTexture;
	}

	/**
	 * It sets the normal texture with the given one.
	 * @param normalTexture normal texture.
	 */
	setNormalTexture(normalTexture) {
		this._sceneNodeType.sceneData._drawing._normalTexture = normalTexture;
	}

	/**
	 * It returns the texture for the metalness
	 * @returns texture for the metalness
	 */
	getMuTexture() {
		return this._sceneNodeType.sceneData._drawing._muTexture;
	}

	/**
	 * It sets the metalness texture with the given one.
	 * @param muTexture metalness texture.
	 */
	setMuTexture(muTexture) {
		this._sceneNodeType.sceneData._drawing._muTexture = muTexture;
	}

	/**
	 * It returns the roughness texture.
	 * @returns roughness texture.
	 */
	getAlphaTexture() {
		return this._sceneNodeType.sceneData._drawing._alphaTexture;
	}

	/**
	 * It sets the roughness texture with the given one.
	 * @param alphaTexture roughness texture.
	 */
	setAlphaTexture(alphaTexture) {
		this._sceneNodeType.sceneData._drawing._alphaTexture = alphaTexture;
	}


}