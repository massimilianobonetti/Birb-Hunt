/**
 * html canvas
 */
var canvas;
/**
 * WebGL context
 */
var gl;
/**
 * Node at the root of the scene graph
 */
var rootNode;
/**
 * Node that represents the bird
 */
var birdNode;

/**
 * Set of objects that have a collision object
 * @type {*[]}
 */
var objectsWithCollision=[];
/**
 * Set of general objects (so excluding particular objects like the sky map and the field) to draw
 * @type {*[]}
 */
var generalObjectsToDraw=[];
/**
 * Set of objects with a shader
 * @type {*[]}
 */
var objectsWithShaders=[];
/**
 * Set of objects that can hurt the player
 * @type {*[]}
 */
var objectsThatHurts=[];
/**
 * Data structures that contains the life of the player and the data to draw the life indicator
 * @type {Life}
 */
var lifeObject;
/**
 * Width of the life indicator
 * @type {number}
 */
const LIFE_INDICATOR_WIDTH = 200;
/**
 * Starting x coordinate of the life indicator
 * @type {number}
 */
const LIFE_INDICATOR_START_X = 50;

/**
 * Node that represents the field in the scene of the game
 */
var fieldNode;
/**
 * Node that represents the sky, which is implemented with a sky map
 */
var skyMapNode;

/**
 * Aspect ratio of the canvas
 */
var aspectRatio;


/**
 * Position of the camera in 3D coordinates
 */
var cameraPosition;
/**
 * Velocity of the camera
 */
var cameraVelocity;
/**
 * Acceleration of the camera
 */
var cameraAcceleration;
/**
 * Force applied to the camera in the direction of the view
 */
var cameraFrontForce;
/**
 * Force applied to the camera in the direction trasversal to the view (so front direction minus 90 degrees, or right direction)
 */
var cameraRightForce;
/**
 * Compass direction of the camera
 */
var cameraCompassDirection;
/**
 * Velocity of compass direction of the camera
 */
var cameraCompassDirectionVelocity;
/**
 * Elevation of the camera
 */
var cameraElevation;
/**
 * Velocity of elevation of the camera
 */
var cameraElevationVelocity;
/**
 * Roll of the camera
 */
var cameraRoll;
/**
 * Velocity of rolling of the camera
 */
var cameraRollVelocity;
/**
 * View matrix
 */
var viewMatrix;
/**
 * Projection matrix
 */
var projectionMatrix;
/**
 * View-Projection matrix
 */
var vpMatrix;

/**
 * Height of the person/player, whose eyes are assumed to correspond to the camera
 * @type {number}
 */
const PERSON_HEIGHT = 1.7;
/**
 * Starting position of the camera
 * @type {number[]}
 */
const CAMERA_FIRST_POSITION=[-10, PERSON_HEIGHT+0.2, 25];
/**
 * Maximum force that can be applied to the camera in one direction (front or right)
 * @type {number}
 */
const MAX_CAMERA_FORCE = 400;
/**
 * Maximum speed of the camera on the plane x-z
 * @type {number}
 */
const MAX_CAMERA_SPEED = 5;
/**
 * Maximum speed of rolling of the camera
 * @type {number}
 */
const CAMERA_ROLL_SPEED = 80;
/**
 * Maximum offset degrees of roll of the camera, so the maximum roll is [-MAX_CAMERA_ROLL, MAX_CAMERA_ROLL]
 * @type {number}
 */
const MAX_CAMERA_ROLL = 10;
/**
 * Maximum speed of elevation of the camera
 * @type {number}
 */
const CAMERA_ELEVATION_SPEED = 80;
/**
 * Maximum offset degrees of elevation of the camera, so the maximum roll is [-MAX_CAMERA_ELEVATION, MAX_CAMERA_ELEVATION]
 * @type {number}
 */
const MAX_CAMERA_ELEVATION = 75;

/**
 * Whether the key w has been pressed
 * @type {boolean}
 */
var isWPressed = false;
/**
 * Whether the key s has been pressed
 * @type {boolean}
 */
var isSPressed = false;
/**
 * Whether the key a has been pressed
 * @type {boolean}
 */
var isAPressed = false;
/**
 * Whether the key d has been pressed
 * @type {boolean}
 */
var isDPressed = false;
/**
 * Whether the key q has been pressed
 * @type {boolean}
 */
var isQPressed = false;
/**
 * Whether the key e has been pressed
 * @type {boolean}
 */
var isEPressed = false;
/**
 * Whether the key up-arrow has been pressed
 * @type {boolean}
 */
var isUpArrowPressed = false;
/**
 * Whether the key down-arrow has been pressed
 * @type {boolean}
 */
var isDownArrowPressed = false;

/**
 * Whether to use the personalized metalness and roughness given by the user
 * @type {boolean}
 */
var isChangeLight = false;

/**
 * Direction of the directional light
 * @type {number[]}
 */
var directionalLight;
/**
 * Color of the directional light
 * @type {number[]}
 */
var directionalLightColor = [255.0/255.0, 255.0/255.0, 200.0/255.0];

/**
 * Intensity scaling of the hemispheric light
 * @type {number}
 */
const HEMISPHERIC_L_INTENS_SCALE = 0.5;
/**
 * Upper color of the hemispheric light
 * @type {number[]}
 */
const HEMISPHERIC_L_UPPER_COLOR = [118.0/255.0*HEMISPHERIC_L_INTENS_SCALE, 214.0/255.0*HEMISPHERIC_L_INTENS_SCALE, 255.0/255.0*HEMISPHERIC_L_INTENS_SCALE];
/**
 * Lower color of the hemispheric light
 * @type {number[]}
 */
const HEMISPHERIC_L_LOWER_COLOR = [0.0/255.0*HEMISPHERIC_L_INTENS_SCALE, 144.0/255.0*HEMISPHERIC_L_INTENS_SCALE, 81.0/255.0*HEMISPHERIC_L_INTENS_SCALE];
/**
 * Direction vector of the hemispheric light
 * @type {number[]}
 */
const HEMISPHERIC_L_D = [0.0, 1.0, 0.0];


/**
 * Current time
 * @type {number}
 */
var currentTime;


/**
 * Personalized metalness defined by the user
 * @type {number}
 */
var globalMuPersonal = 0.5;
/**
 * Personalized roughness defined by the user
 * @type {number}
 */
var globalAlphaPersonal = 0.5;
/**
 * Personalized F0 defined by the user
 * @type {number}
 */
var globalF0Personal = 0.5;

/**
 * Whether it is night in the game
 * @type {boolean}
 */
var isNight = false;
/**
 * Position of the first point light
 * @type {number[]}
 */
var pl1Pos;
/**
 * Position of the second point light
 * @type {number[]}
 */
var pl2Pos;
/**
 * Position of the spot light
 * @type {number[]}
 */
var spotPos;
/**
 *  Firection of the spot light
 * @type {number[]}
 */
var spotDirection;

/**
 * Whether the double jump has been done since the last touched to the ground
 * @type {boolean}
 */
var isDoubleJumpDone=false;

/**
 * Starting time of the game
 * @type {number}
 */
var firstTime = (new Date).getTime();
/**
 * Last time the variable currentTime was updated
 * @type {number}
 */
var lastUpdateTime = firstTime;
/**
 * Passed time since the starting of the game
 * @type {number}
 */
var passedTime=0;
/**
 * Whether the game is over/finished
 * @type {boolean}
 */
var isGameOver=false;

/**
 * In order to capture the bird the player must be to a distance from the bird that is at maximum MAX_DISTANCE_FROM_BIRD_TO_CAPTURE
 * @type {number}
 */
const MAX_DISTANCE_FROM_BIRD_TO_CAPTURE = 3;
/**
 * Whether the bird is singing
 * @type {boolean}
 */
var isBirdPlaying=false;
/**
 * When the player is at a distance greater than MIN_DISTANCE_FROM_BIRD_TO_RESET_PLAY than the bird can sing another time
 * whenever the player comes closer to the bird
 * @type {number}
 */
const MIN_DISTANCE_FROM_BIRD_TO_RESET_PLAY = MAX_DISTANCE_FROM_BIRD_TO_CAPTURE+2;

/**
 * Whether the game has finished the loading
 * @type {boolean}
 */
var hasFinishedLoading=false;


/**
 * x and z of the field will go from -RANGE to RANGE
 * @type {number}
 */
const FIELD_RANGE = 40.0;


/**
 * Main function that defines the application "Birb hunt". First it prints the introductory text,
 * then it takes the WebGL contexs, it creates the nodes of the scene, it creates the GLSL programs,
 * it loads the data for the scene and the sky map. Finally it draws the first scene and it starts
 * the game
 */
async function main() {
	printIntroductoryText();

	getCanvasAndWebgl();
	if (!gl) {
		document.write("GL context not opened");
		return;
	}

	createNodes();

	lifeObject = new Life();
	lifeObject.setShadersType(ShadersType.life);
	objectsWithShaders.push(lifeObject);

	await initializePrograms();

	await loadDataForTheScene();

	await createSkyMap();

	createLife();

	drawSceneFirstTime();

	startGame();

	hasFinishedLoading=true;
	
}

/**
 * It prints the introductory text that will be immediately visible
 */
function printIntroductoryText() {
	document.getElementById("firstText").innerHTML = "Welcome to Birb hunt!<br>" +
		"Your objective is to find and click the hidden birb!<br><br>" +
		"Use w, s, a, d to move<br>" +
		"Use up-, down-, left-, right-arrow to rotate the view<br>" +
		"Use q, e to roll<br>" +
		"Use space to jump<br><br>" +
		"Have fun!!";
	window.setTimeout(fadeIntroductoryText, 10000);
}

/**
 * It removes the introductory text
 */
function fadeIntroductoryText() {
	document.getElementById("firstText").innerHTML = "";
}

/**
 * It removes the text in birbText html element
 */
function fadeBirdText() {
	document.getElementById("birbText").innerHTML = "";
}

/**
 * Get the canvas and the WebGL context, enable also the automatic resize of the canvas
 */
function getCanvasAndWebgl() {
	canvas = document.getElementById("birbCanvas");
	gl = canvas.getContext("webgl2");
	autoResizeCanvas();
}

/**
 * Resize the canvas to full screen, furthermore when the browser has triggered the resize event 
 * the resize is executed
 */
function autoResizeCanvas() {
	const expandFullScreen = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	};
	

	expandFullScreen();

	window.addEventListener('resize', expandFullScreen);
}

/**
 * It sets the position of the bird in a random way from some possible positions and it sets also
 * the yaw angle of the bird in a random way
 */
function setBirdPosition() {
	const positions = [[0.7, 0.5, 4.5], [-24, 0.5, 5], [-3, 0.5, 11], [27.3, 2.75, 32.2], [-30, 0.5, -32], [-2, 0.5, -21]];

	const index = Math.floor(Math.random()*positions.length);

	const position = positions[index];
	const angle = Math.random()*360;
	var localMatrix = utils.multiplyMatrices(utils.MakeTranslateMatrix(position[0], position[1], position[2]),
		utils.MakeRotateYMatrix(angle));

	birdNode.setPosition(position);
	birdNode.setLocalMatrix(localMatrix);
}

/**
 * It creates the nodes of the scene
 */
function createNodes() {
	rootNode = new GenericNodeC();

	fieldNode = new GenericNodeC();
	fieldNode.setShadersType(ShadersType.pbr);
	fieldNode.setParent(rootNode);
	objectsWithShaders.push(fieldNode);
	objectsWithCollision.push(fieldNode);

	skyMapNode = new GenericNodeC();
	skyMapNode.setShadersType(ShadersType.skyMap);
	skyMapNode.setParent(rootNode);
	objectsWithShaders.push(skyMapNode);

	birdNode = new BirdNodeC();
	birdNode.setShadersType(ShadersType.pbr);
	birdNode.setParent(rootNode);
	setBirdPosition();
	objectsWithCollision.push(birdNode);
	generalObjectsToDraw.push(birdNode);
	objectsWithShaders.push(birdNode);

	createStumpNode([-1, 0, 9]);

	createSpruceNode([-5, 0, 9]);
	createSpruceNode([-15, 0, 12]);
	createSpruceNode([-11, 0, 7]);
	createMaritimePineNode([0, 0, 5]);
	createMaritimePineNode([-3, 0, 4.5]);

	createFlowerNode([-2, 0, 13]);
	createFlowerNode([-1.5, 0, 11]);

	createDeadTreeNode([-12, 0, 26]);
	createDeadTreeNode([-8, 0, 24]);
	createDeadTreeNode([-11, 0, 21]);

	createRock2([-10+6.80, 0, 30-4.6-4-4]);
	createRock2([-10-6.80, 0, 30-4.6-4-4]);
	createRock1([-10+6.80, 0, 30-4.6-4]);
	createRock1([-10-6.80, 0, 30-4.6-4]);
	createRock1([-10+6.80, 0, 30-4.6]);
	createRock1([-10-6.80, 0, 30-4.6]);
	createRock3([-10, 0, 30]);
	createRock3([-10+6.80, 0, 30]);
	createRock3([-10-6.80, 0, 30]);


	createRock3Scaled([-21, 0, 14], [1.0, 0.4, 1.0]);
	createRock3Scaled([-24, 0, 10], [1.0, 0.4, 1.0]);
	createRock3Scaled([-29, 0, 7], [1.0, 0.4, 1.0]);
	createRock3Scaled([-16, 0, 2], [1.0, 0.4, 1.0]);
	createRock3Scaled([-20, 0, -2], [1.0, 0.4, 1.0]);
	createRock3Scaled([-25, 0, -2], [1.0, 0.4, 1.0]);
	createRock3Scaled([-29, 0, 2], [1.0, 0.4, 1.0]);

	createCircularSpruceNode([-19, 0, 9]);
	createCircularSpruceNode([-15, 0, 6]);
	createCircularSpruceNode([-17, 0, 7]);

	createPlantNode([-22, 0, 5]);
	createFlowerNode([-23, 0, 3]);

	createRock3Scaled([-10, 0, 2], [1.0, 0.4, 1.0]);
	createRock3Scaled([-10, 0, 11], [1.0, 0.4, 1.0]);
	createRock3Scaled([-6, 0, 14], [1.0, 0.4, 1.0]);
	createRock3Scaled([2, 0, 14], [1.0, 0.4, 1.0]);

	createRock3Scaled([-4, 0, 1], [1.0, 0.4, 1.0]);
	createRock3Scaled([2, 0, 1.5], [1.0, 0.4, 1.0]);
	createRock3Scaled([4, 0, 10.5], [1.0, 0.4, 1.0]);
	createBladesObject([4, 0, 5]);
	createBladesObject([4, 0, 6]);
	createBladesObject([4, 0, 7]);

	createSmallrock([-7, 0, 20]);

	const N_OF_ROCKS=8;

	for(var i=1; i<=N_OF_ROCKS; i++) {
		const step = (FIELD_RANGE/N_OF_ROCKS-FIELD_RANGE)+(i-1)*2*FIELD_RANGE/N_OF_ROCKS;
		createRock3Scaled([step, 0, -(FIELD_RANGE-2)], [13/N_OF_ROCKS, 0.6, 1.0]);
		createRock3Scaled([step, 0, (FIELD_RANGE-2)], [13/N_OF_ROCKS, 1.5, 1.0]);
		createRock3Scaled([-(FIELD_RANGE-2), 0, step], [1.0, 1.2, 16/N_OF_ROCKS]);
		createRock3Scaled([(FIELD_RANGE-2), 0, step], [1.0, 0.9, 16/N_OF_ROCKS]);
	}

	createSign([-13, 0, 5.5]);




	createMaritimePineNode([15, 0, 5]);
	createMaritimePineNode([25, 0, 5]);
	createMaritimePineNode([20, 0, 20]);
	createMaritimePineNode([30, 0, 20]);
	createRock3Scaled([20, 0, 15], [0.7, 0.3, 0.7]);
	createRock3Scaled([20, 0, 5], [0.7, 0.4, 0.7]);
	createMaritimePineNode([26, 0, 15]);
	createMaritimePineNode([27, 0, 32]);
	createMaritimePineNode([15, 0, 32]);
	createMaritimePineNode([5, 0, 30]);
	createMaritimePineNode([10, 0, 25]);
	createPlantNode([20, 0, 30]);


	createBladesObject([13, 0, -11]);
	createBladesObject([14, 0, -12]);
	createBladesObject([15, 0, -12]);
	createBladesObject([16, 0, -13]);
	createBladesObject([17, 0, -14]);
	createRock3Scaled([10, 0, -10], [0.7, 0.5, 0.7]);
	createRock3Scaled([9, 0, -7], [0.7, 0.5, 0.7]);
	createRock3Scaled([8, 0, -4], [0.7, 0.5, 0.7]);
	createRock3Scaled([6, 0, -1], [0.7, 0.5, 0.7]);

	createRock3Scaled([20, 0, -15], [0.7, 0.5, 0.7]);
	createRock3Scaled([24, 0, -16], [0.7, 0.5, 0.7]);
	createRock3Scaled([28, 0, -17], [0.7, 0.5, 0.7]);
	createRock3Scaled([32, 0, -18], [0.7, 0.5, 0.7]);
	createRock3Scaled([35, 0, -15], [0.7, 0.5, 0.7]);
	createSpruceNode([30, 0, -5]);
	createSpruceNode([29, 0, -33]);
	createSpruceNode([5, 0, -31]);
	createFlowerNode([25, 0, -23]);
	createSpruceNode([26, 0, -24]);
	createSpruceNode([20, 0, -20]);

	createRock3Scaled([15, 0, -20], [0.7, 0.25, 0.7]);
	createRock3Scaled([11, 0, -20], [0.7, 0.5, 0.7]);
	createRock3Scaled([4, 0, -20], [0.7, 0.55, 0.7]);
	createRock3Scaled([0, 2, -20], [0.7, 0.3, 0.7]);
	createRock3Scaled([-4, 2, -22], [0.7, 0.3, 0.7]);
	createRock3Scaled([-2, 3, -24], [0.7, 0.3, 0.7]);
	createSpruceNode([-2, 4.5, -24]);
	createRock3Scaled([-8, 0, -24], [0.7, 0.55, 0.7]);
	createBladesObject([7, 0, -21]);
	createBladesObject([7, 0, -20]);
	createBladesObject([7, 0, -19]);
	createBladesObject([8, 0, -21]);
	createBladesObject([8, 0, -20]);
	createBladesObject([8, 0, -19]);


	createRock3Scaled([-15, 0, -15], [0.7, 0.7, 0.7]);
	createRock3Scaled([-16, 0, -12], [0.7, 0.55, 0.7]);
	createRock3Scaled([-17, 0, -9], [0.7, 0.55, 0.7]);
	createRock3Scaled([-17, 0, -6], [0.7, 0.55, 0.7]);
	createCircularSpruceNode([0, 0, -8]);
	createCircularSpruceNode([2, 0, -16]);
	createCircularSpruceNode([-12, 0, -7]);
	createCircularSpruceNode([-5, 0, -29]);
	createCircularSpruceNode([-30, 0, -6]);
	createCircularSpruceNode([-28, 0, -31]);
	createStumpNode([-25, 0, -23]);
	createStumpNode([-24, 0, -18]);
	createStumpNode([-26, 0, -15]);
	createStumpNode([-20, 0, -20]);
	createStumpNode([-21, 0, -16]);

}

/**
 * It sets in the given node the name, the position and the shaders' name using the given
 * parameters. It adds also the node to objectsWithCollision, generalObjectsToDraw and
 * objectsWithShaders
 * @param node node to set up
 * @param position position of the node
 * @param name name of the node
 * @param shaderType type of the shaders of the node
 * @returns the created node
 */
function setNode(node, position, name, shaderType) {
	node.setShadersType(shaderType);
	node.setParent(rootNode);
	node.setPosition(position);

	objectsWithCollision.push(node);
	generalObjectsToDraw.push(node);
	objectsWithShaders.push(node);

	return node;
}

/**
 * It creates one node that represents a spruce
 * @param position position of the node
 */
function createSpruceNode(position) {
	setNode(new SpruceNodeC(), position, "spruce", ShadersType.pbr);
}

/**
 * It creates one node that represents a deadTree
 * @param position position of the node
 */
function createDeadTreeNode(position) {
	setNode(new DeadTreeNodeC(), position, "deadTree", ShadersType.pbr);
}

/**
 * It creates one node that represents a circularSpruce
 * @param position position of the node
 */
function createCircularSpruceNode(position) {
	setNode(new CircularSpruceNodeC(), position, "circularSpruce", ShadersType.phong);
}

/**
 * It creates one node that represents a maritimePine
 * @param position position of the node
 */
function createMaritimePineNode(position) {
	setNode(new MaritimePineNodeC(), position, "maritimePine", ShadersType.blinn);
}

/**
 * It creates one node that represents a stump
 * @param position position of the node
 */
function createStumpNode(position) {
	setNode(new StumpNodeC(), position, "stump", ShadersType.orenNayar);
}

/**
 * It creates one node that represents a flower
 * @param position position of the node
 */
function createFlowerNode(position) {
	setNode(new FlowerNodeC(), position, "flower", ShadersType.pbr);
}

/**
 * It creates one node that represents a plant
 * @param position position of the node
 */
function createPlantNode(position) {
	setNode(new PlantNodeC(), position, "plant", ShadersType.pbr);
}

/**
 * It creates one node that represents a rock, in particular the rock1 in the asset
 * @param position position of the node
 */
function createRock1(position) {
	setNode(new Rock1NodeC(), position, "rock1", ShadersType.pbr);
}

/**
 * It creates one node that represents a rock, in particular the rock2 in the asset
 * @param position position of the node
 */
function createRock2(position) {
	setNode(new Rock2NodeC(), position, "rock2", ShadersType.pbr);
}

/**
 * It creates one node that represents a rock, in particular the rock3 in the asset
 * @param position position of the node
 */
function createRock3(position) {
	setNode(new Rock3NodeC(), position, "rock3", ShadersType.pbr);
}

/**
 * It creates one node that represents a small rock
 * @param position position of the node
 */
function createSmallrock(position) {
	setNode(new SmallrockNodeC(), position, "smallrock", ShadersType.pbr);
}

/**
 * It creates one node that represents a rock scaled with the given parameter, in particular the rock3 in the asset
 * @param position position of the node
 * @param scaling scaling of the node
 */
function createRock3Scaled(position, scaling) {
	const node = new Rock3NodeC();
	node.setScaling(scaling);
	setNode(node, position, "rock3scaled", ShadersType.pbr);
}

/**
 * It creates one node that represents a sign
 * @param position position of the node
 */
function createSign(position) {
	setNode(new SignNodeC(), position, "sign", ShadersType.pbr);
}

/**
 * It creates one node that represents a blades object
 * @param position position of the node
 */
function createBladesObject(position) {
	const node = setNode(new BladesNodeC(), position, "blades", ShadersType.pbr);
	objectsThatHurts.push(node);
}

/**
 * It creates the GLSL programs of the objects in objectsWithShaders if the program were
 * not set up before.
 */
async function initializePrograms() {
	const path = window.location.pathname;
	const page = path.split("/").pop();
	const baseDir = window.location.href.replace(page, '');
	const shaderDir = baseDir+"shaders/";
	
	for(var object of objectsWithShaders) {
		if(object.getShadersType().program==null) {
			const shadersFileName = object.getShadersType().name;

			await utils.loadFiles([shaderDir + shadersFileName + '_vs.glsl', shaderDir + shadersFileName + '_fs.glsl'], function (shaderText) {
				var vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, shaderText[0]);
				var fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, shaderText[1]);

				object.getShadersType().program = utils.createProgram(gl, vertexShader, fragmentShader);
				object.getShadersType().locations = new Locations();
			});
		}
	}

}

/**
 * It loads the data necessary to draw all the objects in the scene, so it creates the VAO, the VBO,
 * it sets the uniform locations and the vertex coordinates, the uv coordinates, the normal vectors,
 * and the textures. It sets also the coordinates of the camera
 */
async function loadDataForTheScene() {

	clearBuffers();
	enableBuffers();

	setCameraCoordinates();

	await createField();

	for(var object of generalObjectsToDraw) {
		await object.createObject();
	}

}

/**
 * It enables the depth testing and the back-face culling
 */
function enableBuffers() {
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
}

/**
 * It clears the color buffer and the depth buffer
 */
function clearBuffers() {
	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

/**
 * It sets the initial position of the camera, the velocity, the acceleration, the front force,
 * the right force (that is transverse with respect to the front direction), the compass direction,
 * the elevation and the roll
 */
function setCameraCoordinates() {
 	cameraPosition=[];
	cameraPosition[0] = CAMERA_FIRST_POSITION[0];
	cameraPosition[1] = CAMERA_FIRST_POSITION[1];
	cameraPosition[2] = CAMERA_FIRST_POSITION[2];
	cameraVelocity = [0.0, 0.0, 0.0];
	cameraAcceleration = [0.0, 0.0, 0.0];
	cameraFrontForce = [0.0, 0.0, 0.0];
	cameraRightForce = [0.0, 0.0, 0.0];
	cameraCompassDirection = 0;
	cameraCompassDirectionVelocity = 0;
	cameraElevation = 0;
	cameraElevationVelocity = 0;
	cameraRoll = 0;
	cameraRollVelocity = 0;
	lifeObject.setLife(100.1);
}

/**
 * It creates the field of the scene using squares, it sets also the VAO, the VBO, the textures and
 * the uniforms' locations
 */
async function createField() {

	///// Creates vertices
	const SQUARES_NUMBER = 40; //along an axis

	var vertices = [];

	for(var i=0; i<SQUARES_NUMBER; i++) {
		for(var j=0; j<SQUARES_NUMBER; j++) {
			const x = 2*FIELD_RANGE*(i/(SQUARES_NUMBER))-FIELD_RANGE;
			const z = 2*FIELD_RANGE*(j/(SQUARES_NUMBER))-FIELD_RANGE;
			const x1 = 2*FIELD_RANGE*((i+1)/(SQUARES_NUMBER))-FIELD_RANGE; //x at the next step (like x+1)
			const z1 = 2*FIELD_RANGE*((j+1)/(SQUARES_NUMBER))-FIELD_RANGE; //z at the next step (like z+1)
			const y = 0.0;
			const NUM_OF_VALUES_PER_V = 3; //number of values per vertex
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)] = x;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+1] = y;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+2] = z;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*1] = x1;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*1+1] = y;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*1+2] = z;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*2] = x;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*2+1] = y;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*2+2] = z1;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*3] = x1;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*3+1] = y;
			vertices[NUM_OF_VALUES_PER_V*4*(i*SQUARES_NUMBER+j)+NUM_OF_VALUES_PER_V*3+2] = z1;
		}
	}
	
	////// Creates indices
	var indices = [];
	for(var i=0; i<SQUARES_NUMBER; i++) {
		for(var j=0; j<SQUARES_NUMBER; j++) {
			indices[6*(i*(SQUARES_NUMBER)+j)  ] = 4*(SQUARES_NUMBER*i+j);
			indices[6*(i*(SQUARES_NUMBER)+j)+1] = 4*(SQUARES_NUMBER*i+j)+2;
			indices[6*(i*(SQUARES_NUMBER)+j)+2] = 4*(SQUARES_NUMBER*i+j)+1;
			indices[6*(i*(SQUARES_NUMBER)+j)+3] = 4*(SQUARES_NUMBER*i+j)+1;
			indices[6*(i*(SQUARES_NUMBER)+j)+4] = 4*(SQUARES_NUMBER*i+j)+2;
			indices[6*(i*(SQUARES_NUMBER)+j)+5] = 4*(SQUARES_NUMBER*i+j)+3;
		}
	}

	////// Creates uv coordinates
	var uv = [];
	for(var i=0; i<SQUARES_NUMBER; i++) {
		for(var j=0; j<SQUARES_NUMBER; j++) {
			uv[2*4*(i*SQUARES_NUMBER+j)] = 0.0;
			uv[2*4*(i*SQUARES_NUMBER+j)+1] = 1.0;
			uv[2*4*(i*SQUARES_NUMBER+j)+2*1] = 1.0;
			uv[2*4*(i*SQUARES_NUMBER+j)+2*1+1] = 1.0;
			uv[2*4*(i*SQUARES_NUMBER+j)+2*2] = 0.0;
			uv[2*4*(i*SQUARES_NUMBER+j)+2*2+1] = 0.0;
			uv[2*4*(i*SQUARES_NUMBER+j)+2*3] = 1.0;
			uv[2*4*(i*SQUARES_NUMBER+j)+2*3+1] = 0.0;
		}
	}

	////// Creates normals
	var normals = [];
	for(var i=0; i<SQUARES_NUMBER; i++) {
		for(var j=0; j<SQUARES_NUMBER; j++) {
			normals[3*4*(i*SQUARES_NUMBER+j)] = 0.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+1] = 1.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+2] = 0.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*1] = 0.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*1+1] = 1.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*1+2] = 0.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*2] = 0.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*2+1] = 1.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*2+2] = 0.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*3] = 0.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*3+1] = 1.0;
			normals[3*4*(i*SQUARES_NUMBER+j)+3*3+2] = 0.0;
		}
	}



	fieldNode.setLocalMatrix(utils.identityMatrix());

	const COLLISION_HEIGHT = 1;
	fieldNode.setCollisionOject(new ParallelepipedCollision([0, -COLLISION_HEIGHT, 0], FIELD_RANGE, COLLISION_HEIGHT, FIELD_RANGE));
	
	await NodeC.createAndloadDataOnGPUForNode(fieldNode, vertices, uv, normals, indices,
		0.55, 0.3, 0.5, false, true, "stylized-grass1", ".png", true);
}



/**
 * It creates the life of the player using a rectangle, it sets also the VAO, the VBO and
 * the uniforms' locations
 */
function createLife() {
	const HEIGHT = 20;
	const START_Y = 50;

	///// Creates vertices
	var vertices = [LIFE_INDICATOR_START_X, (START_Y+HEIGHT), -1,
		LIFE_INDICATOR_START_X+LIFE_INDICATOR_WIDTH, (START_Y+HEIGHT), -1,
		LIFE_INDICATOR_START_X+LIFE_INDICATOR_WIDTH, START_Y, -1,
		LIFE_INDICATOR_START_X, START_Y, -1];

	////// Creates indices
	var indices = [0, 1, 2,
		0, 2, 3];


	lifeObject.setLife(100.1);

	const vao = gl.createVertexArray();
	gl.bindVertexArray(vao);
	lifeObject.setVao(vao);

	//VBO for the vertices
	const verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	const verticesAttributeLocation = gl.getAttribLocation(lifeObject.getProgram(), "inPosition");
	gl.enableVertexAttribArray(verticesAttributeLocation);
	var nValuesPerVertex = 3;
	var normalize = false;
	var stride = 0;
	var offset = 0;
	gl.vertexAttribPointer(verticesAttributeLocation, nValuesPerVertex, gl.FLOAT, normalize, stride, offset);

	//VBO for the indices
	const indicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	lifeObject.setIndicesLength(indices.length);

	lifeObject.setLifeUniformLoc(gl.getUniformLocation(lifeObject.getProgram(), "life"));
	lifeObject.setCanvasWidthLoc(gl.getUniformLocation(lifeObject.getProgram(), "canvasWidth"));
	lifeObject.setCanvasHeightLoc(gl.getUniformLocation(lifeObject.getProgram(), "canvasHeight"));
	lifeObject.setStartXLoc(gl.getUniformLocation(lifeObject.getProgram(), "startX"));
	lifeObject.setWidthLoc(gl.getUniformLocation(lifeObject.getProgram(), "width"));
}

/**
 * It creates the sky box by setting up the VAO, the VBO, the textures and the vertices and the
 * uniforms' locations
 */
async function createSkyMap() {

	const VERTICES = new Float32Array(
	[
		-1, -1, 1.0,
		1, -1, 1.0,
		-1,  1, 1.0,
		-1,  1, 1.0,
		1, -1, 1.0,
		1,  1, 1.0,
	]);

	skyMapNode.setLocalMatrix(utils.identityMatrix());

	const skyMapVAO = gl.createVertexArray();
	gl.bindVertexArray(skyMapVAO);
	skyMapNode.setVao(skyMapVAO);


	//VBO for the vertices
	const verticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, VERTICES, gl.STATIC_DRAW);
	const verticesAttributeLocation = gl.getAttribLocation(skyMapNode.getProgram(), "inPosition");
	gl.enableVertexAttribArray(verticesAttributeLocation);
	var nValuesPerVertex=3;
	var normalize = false;
	var stride = 0;
	var offset = 0;
	gl.vertexAttribPointer(verticesAttributeLocation, nValuesPerVertex, gl.FLOAT, normalize, stride, offset);


	

	const PATH = window.location.pathname;
	const PAGE = PATH.split("/").pop();
	const BASE_DIR = window.location.href.replace(PAGE, '');
	const TEXTURES_DIR = BASE_DIR+"textures/";

	const SKY_MAP_NAME = "sh";
	const FILE_EXTENSION = ".png";
	const SKY_DIR = TEXTURES_DIR+"sky/";

	const FACES = [
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_X, 
            url: SKY_DIR+SKY_MAP_NAME+"_"+"rt"+FILE_EXTENSION,
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 
            url: SKY_DIR+SKY_MAP_NAME+"_"+"lf"+FILE_EXTENSION,
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 
            url: SKY_DIR+SKY_MAP_NAME+"_"+"up"+FILE_EXTENSION,
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
            url: SKY_DIR+SKY_MAP_NAME+"_"+"dn"+FILE_EXTENSION,
        },
        {
            target: gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 
            url: SKY_DIR+SKY_MAP_NAME+"_"+"bk"+FILE_EXTENSION,
        },
        {
            target: gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 
            url: SKY_DIR+SKY_MAP_NAME+"_"+"ft"+FILE_EXTENSION,
        },
    ];

	const skyboxTexture = gl.createTexture();
	gl.activeTexture(gl.TEXTURE0+3);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
	skyMapNode.setAlbedoTexture(skyboxTexture);

	for(var face of FACES) {
		const {target, url} = face;
        
        // Upload the canvas to the cubemap face.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1024;
        const height = 1024;
        const format = gl.RGBA;
        const type = gl.UNSIGNED_BYTE;
        
        // setup each face so it's immediately renderable
        gl.texImage2D(target, level, internalFormat, width, height, 0, format, type, null);
        
        // Asynchronously load an image
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
		const image = new Image();
        image.src = url;
		await image.decode();
		// Now that the image has loaded upload it to the texture.
		gl.activeTexture(gl.TEXTURE0+3);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyboxTexture);
		gl.texImage2D(target, level, internalFormat, format, type, image);
	}
	
    gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);



	skyMapNode.setInvViewProjMatrixLoc(gl.getUniformLocation(skyMapNode.getProgram(), "inverseViewProjMatrix"));
	skyMapNode.setAlbedoTextureLoc(gl.getUniformLocation(skyMapNode.getProgram(), "textureSampler"));
	skyMapNode.setIsNightLoc(gl.getUniformLocation(skyMapNode.getProgram(), "isNight"));

}

/**
 * First, it runs the animations, for example the camera movement and the movement of the directional
 * light. Then it draws for the first time the scene, so it draws the field, the sky map and the other
 * objects, by setting up all the uniforms.
 * Finally, it requests another frame of the scene.
 */
function drawSceneFirstTime() {
	sceneAnimationAndUpdateMatrices();

	drawNodeFirstTime(fieldNode);

	for(var object of generalObjectsToDraw) {
		drawNodeFirstTime(object);
	}

	drawSkyMap();
	drawLifeIndicator();

	if(!isGameOver) {
		window.requestAnimationFrame(drawScene);
	}

}

/**
 * It updates the current time and it animates the movement of the camera and of the directional
 * light. It plays the bird's sound if the camera is near the bird.
 * Then it clears the buffers and it updates the view matrix, the projection matrix and the world
 * matrices of the objects.
 */
function sceneAnimationAndUpdateMatrices() {
	aspectRatio = gl.canvas.width / gl.canvas.height;
	animate();

	clearBuffers();

	createViewMatrix();
	createProjectionMatrix();
	vpMatrix = utils.multiplyMatrices(projectionMatrix, viewMatrix);

	rootNode.updateWorldMatrix();
}

/**
 * First, it runs the animations, for example the camera movement and the movement of the directional
 * light. Then it draws the scene, so it draws the field, the sky map and the other
 * objects, by setting up the uniforms that could have been changed.
 * Finally, it requests another frame of the scene.
 */
function drawScene() {
	sceneAnimationAndUpdateMatrices();

	drawNode(fieldNode);
	
	for(var object of generalObjectsToDraw) {
		drawNode(object);
	}

	drawSkyMap();
	drawLifeIndicator();


	if(!isGameOver) {
		window.requestAnimationFrame(drawScene);
	}

}

/**
 * It updates the current time and it animates the movement of the camera and of the directional
 * light. It plays the bird's sound if the camera is near the bird.
 * If the life goes to zero, the player restarts from the initial position and a sound is played.
 */
function animate() {
	currentTime = (new Date).getTime();

	updateTime();

	animateCameraMovement();
	if(lifeObject.getLife()<=0) {
		playFailedSound();
		setCameraCoordinates();
	}
	animateLight();
	makeBirdPlay();

	lastUpdateTime = currentTime;
}

/**
 * It updates the passed time since the beginning of the game and it displays it.
 */
function updateTime() {
 	passedTime = (currentTime-firstTime)/1000;

	document.getElementById("time").innerHTML = "Time: "+Math.floor(passedTime);

}

/**
 * It animates the movement of the camera. It applies a force to the camera if w, s, a or d were
 * pressed. If there is a positive absolute planar velocity then a friction to the camera movement
 * is applied. It applies the gravity force to the camera. Then the resulting force is calculated.
 * Then it checks whether there is a collision of the player (that is assumed to have the eyes in
 * the camera position) with the other objects. The check is done only if the objects are not
 * too far from the camera. If there is a collision, the resulting force and the velocity of the
 * camera are updated to remove the component that has the direction of the inside normal vector
 * of the surface with which the player is touching. Then the acceleration, the velocity and the position
 * of the camera are updated.
 * Also, it updates the compass direction, the elevation and the roll of the camera, using the
 * corresponding velocities.
 */
function animateCameraMovement() {
	const deltaTimeC = deltaTime()/1000.0;
	const FRICTION = MAX_CAMERA_FORCE*0.7;
	const FRICTION_EPS = FRICTION*0.2;
	const HUMAN_MASS = 70;
	var friction=[0, 0, 0];

	if(isWPressed) {
		if(cameraFrontVelocity()<MAX_CAMERA_SPEED) {
			cameraFrontForce[0] = -MAX_CAMERA_FORCE*Math.sin(otherUtils.degToRad(cameraCompassDirection));
			cameraFrontForce[2] = -MAX_CAMERA_FORCE*Math.cos(otherUtils.degToRad(cameraCompassDirection));
		} else {
			cameraFrontForce[0] = 0;
			cameraFrontForce[2] = 0;
		}
	}

	if(isSPressed) {
		if(cameraFrontVelocity()>-MAX_CAMERA_SPEED) {
			cameraFrontForce[0] = MAX_CAMERA_FORCE*Math.sin(otherUtils.degToRad(cameraCompassDirection));
			cameraFrontForce[2] = MAX_CAMERA_FORCE*Math.cos(otherUtils.degToRad(cameraCompassDirection));
		} else {
			cameraFrontForce[0] = 0;
			cameraFrontForce[2] = 0;
		}
	}

	if(isAPressed) {
		if(cameraRightVelocity()>-MAX_CAMERA_SPEED) {
			cameraRightForce[0] = -MAX_CAMERA_FORCE*Math.cos(otherUtils.degToRad(cameraCompassDirection));
			cameraRightForce[2] = MAX_CAMERA_FORCE*Math.sin(otherUtils.degToRad(cameraCompassDirection));
		} else {
			cameraRightForce[0] = 0;
			cameraRightForce[2] = 0;
		}
	}

	if(isDPressed) {
		if(cameraRightVelocity()<MAX_CAMERA_SPEED) {
			cameraRightForce[0] = MAX_CAMERA_FORCE*Math.cos(otherUtils.degToRad(cameraCompassDirection));
			cameraRightForce[2] = -MAX_CAMERA_FORCE*Math.sin(otherUtils.degToRad(cameraCompassDirection));
		} else {
			cameraRightForce[0] = 0;
			cameraRightForce[2] = 0;
		}
	}
	
	if(cameraAbsoluteVelocity()>(FRICTION+FRICTION_EPS)/HUMAN_MASS*deltaTimeC) {
		friction[0] = -FRICTION*cameraVelocity[0]/cameraAbsoluteVelocity();
		friction[2] = -FRICTION*cameraVelocity[2]/cameraAbsoluteVelocity();
	} else {
		friction[0] = 0;
		friction[2] = 0;

		if(!isWPressed && !isSPressed && !isAPressed && !isDPressed) {
			cameraVelocity[0] = 0;
			cameraVelocity[2] = 0;
		}
	}

	const GRAVITY_ACC = -9.81;
	const gravityForce = [0, GRAVITY_ACC*HUMAN_MASS, 0];

	var resultingForce = [0, 0, 0];

	resultingForce[0] = cameraFrontForce[0]+cameraRightForce[0]+friction[0];
	resultingForce[1] = gravityForce[1];
	resultingForce[2] = cameraFrontForce[2]+cameraRightForce[2]+friction[2];

	const LIFE_DAMAGE = 30;

	var collidedObjects=[];
	var collidedPoints=[];
	var arrayOfPointTypes=[];

	for(var i=0; i<objectsWithCollision.length; i++) {
		var collidedPoint=[0, 0, 0];
		const ALLOWANCE = 3;
		if(!objectsWithCollision[i].getCollisionObject().isFarAway(cameraPosition, PERSON_HEIGHT, ALLOWANCE)) {
			var pointType = [PointType.feet];
			if (objectsWithCollision[i].getCollisionObject().checkCollision(cameraPosition, PERSON_HEIGHT, collidedPoint, pointType)) {
				collidedObjects.push(objectsWithCollision[i]);
				collidedPoints.push(collidedPoint);
				arrayOfPointTypes.push(pointType[0]);
				if(objectsThatHurts.indexOf(objectsWithCollision[i])!=-1) {
					lifeObject.setLife(lifeObject.getLife()-deltaTimeC*LIFE_DAMAGE);
				}
			}
		}
	}


	for(var i=0; i<collidedObjects.length; i++) {
		resultingForce = collidedObjects[i].getCollisionObject().getCollisionForce(resultingForce, collidedPoints[i], arrayOfPointTypes[i]);
		cameraVelocity = collidedObjects[i].getCollisionObject().getCollisionVelocity(cameraVelocity, collidedPoints[i], arrayOfPointTypes[i]);
	}

	

	cameraAcceleration[0] = resultingForce[0]/HUMAN_MASS;
	cameraAcceleration[1] = resultingForce[1]/HUMAN_MASS;
	cameraAcceleration[2] = resultingForce[2]/HUMAN_MASS;

	cameraVelocity[0] = cameraVelocity[0]+cameraAcceleration[0]*deltaTimeC;
	cameraVelocity[1] = cameraVelocity[1]+cameraAcceleration[1]*deltaTimeC;
	cameraVelocity[2] = cameraVelocity[2]+cameraAcceleration[2]*deltaTimeC;

	cameraPosition[0] = cameraPosition[0]+cameraVelocity[0]*deltaTimeC;
	cameraPosition[1] = cameraPosition[1]+cameraVelocity[1]*deltaTimeC;
	cameraPosition[2] = cameraPosition[2]+cameraVelocity[2]*deltaTimeC;


	cameraCompassDirection = cameraCompassDirection+cameraCompassDirectionVelocity*deltaTimeC;
	//In this way cameraCompassDirection doesn't overflow
	if(cameraCompassDirection>360)
		cameraCompassDirection = cameraCompassDirection-360;
	else if(cameraCompassDirection<-360)
		cameraCompassDirection = cameraCompassDirection+360;


	if(cameraElevation<=MAX_CAMERA_ELEVATION && cameraElevation>=-MAX_CAMERA_ELEVATION)
		cameraElevation = cameraElevation+cameraElevationVelocity*deltaTimeC;
	
	if(cameraElevation>MAX_CAMERA_ELEVATION)
		cameraElevation = MAX_CAMERA_ELEVATION;

	if(cameraElevation<-MAX_CAMERA_ELEVATION)
		cameraElevation = -MAX_CAMERA_ELEVATION;

	

	const CAMERA_ROLL_SPEED_EPS = CAMERA_ROLL_SPEED*0.1;
	if(!isQPressed && !isEPressed) {
		if(cameraRoll>(CAMERA_ROLL_SPEED+CAMERA_ROLL_SPEED_EPS)*deltaTimeC) {
			cameraRollVelocity = -CAMERA_ROLL_SPEED;
		} else if(cameraRoll<-(CAMERA_ROLL_SPEED+CAMERA_ROLL_SPEED_EPS)*deltaTimeC) {
			cameraRollVelocity = CAMERA_ROLL_SPEED;
		} else {
			cameraRollVelocity = 0;
			cameraRoll = 0;
		}
	}

	if(cameraRoll<=MAX_CAMERA_ROLL && cameraRoll>=-MAX_CAMERA_ROLL)
		cameraRoll = cameraRoll+cameraRollVelocity*deltaTimeC;
	
	if(cameraRoll>MAX_CAMERA_ROLL)
		cameraRoll = MAX_CAMERA_ROLL;

	if(cameraRoll<-MAX_CAMERA_ROLL)
		cameraRoll = -MAX_CAMERA_ROLL;

}

/**
 * As time passes, we have the day and the night. If it is day the directional light illuminates
 * the scene and it rotates as time passes. If it is night the directional light is off. If it is night,
 * or evening or morning two point lights and one spot light are turned on, otherwise they are off.
 */
function animateLight() {

	if(lastUpdateTime) {
		const time = (currentTime-firstTime);
		const millisecondsPerSecond = 1000;
		const secondsPerPiece = 15; //60
		const piecesPerRound = 4;
		const angle = 2*Math.PI*(time/millisecondsPerSecond)/secondsPerPiece/piecesPerRound;

		const ANGLE_SHIFT = otherUtils.degToRad(0);
		directionalLight = [-Math.sin(angle+ANGLE_SHIFT), -Math.cos(angle+ANGLE_SHIFT), 0];
		const COSINE_OF_THE_HORIZON=0;
		if(Math.cos(angle+ANGLE_SHIFT)>=COSINE_OF_THE_HORIZON) {
			const redIntensityScale = 1.0;
			const greenIntensityScale = 1.0;
			const blueIntensityScale = 1.0;
			directionalLightColor = [255.0/255.0*redIntensityScale, 255.0/255.0*greenIntensityScale, 200.0/255.0*blueIntensityScale];
		} else {
			directionalLightColor = [0, 0, 0];
		}

		const NIGHT_ANGLE = otherUtils.degToRad(70);
		if(Math.cos(angle+ANGLE_SHIFT)<Math.cos(NIGHT_ANGLE)) {
			isNight = true;
		} else {
			isNight = false;
		}

	}

	
}

/**
 * If the bird is nearby the camera then it makes a sound.
 */
function makeBirdPlay() {
 	const birdDistance = birdNode.getCollisionObject().getDistance(cameraPosition);
 	if(birdDistance<MAX_DISTANCE_FROM_BIRD_TO_CAPTURE) {
 		if(!isBirdPlaying) {
 			isBirdPlaying=true;
			playBirdSound();
		}
	} else if(birdDistance>MIN_DISTANCE_FROM_BIRD_TO_RESET_PLAY) {
 		isBirdPlaying=false;
	}

}

/**
 * It returns the time passed between now and the last updated time, but if the difference
 * is too large then it is clipped to avoid too large movements of the animations.
 * @returns {number} time passed between now and the last updated time, but if the difference
 * is too large then it is clipped to avoid too large movements of the animations.
 */
function deltaTime() {
	const deltaTimeVariable = (currentTime-lastUpdateTime);
	const maxDeltaTime = 100;
	
	if(deltaTimeVariable>=maxDeltaTime)
		return maxDeltaTime;
	
	return deltaTimeVariable;
}

/**
 * It creates the view matrix of the first-person game using the camera roll, elevation, compass
 * direction and position.
 */
function createViewMatrix() {
	const cameraRz = utils.MakeRotateZMatrix(cameraRoll);
	const cameraRx = utils.MakeRotateXMatrix(cameraElevation);
	const cameraRy = utils.MakeRotateYMatrix(cameraCompassDirection);
	const cameraT = utils.MakeTranslateMatrix(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
	var cameraMatrix = utils.multiplyMatrices(cameraRx, cameraRz);
	cameraMatrix = utils.multiplyMatrices(cameraRy, cameraMatrix);
	cameraMatrix = utils.multiplyMatrices(cameraT, cameraMatrix);
    viewMatrix = utils.invertMatrix(cameraMatrix);
}

/**
 * It creates the perspective projection matrix
 */
function createProjectionMatrix() {
	const FOV_Y = 90;
	const NEAR_PLANE = 0.1;
	const FAR_PLANE = 200;
	projectionMatrix = utils.MakePerspective(FOV_Y, aspectRatio, NEAR_PLANE, FAR_PLANE);
}

/**
 * It sets the positions of the two point lights and of the spot light and it sets the direction of
 * the spot light
 */
function setLightPositionsAndDirections() {
	pl1Pos = utils.multiplyMatrixVector(viewMatrix, [-10, 2.5, 24, 1.0]).slice(0,3);
	pl2Pos = utils.multiplyMatrixVector(viewMatrix, [-22.5, 2.7, 4.5, 1.0]).slice(0,3);
	spotPos = utils.multiplyMatrixVector(viewMatrix, [-1.2, 3.0, 11, 1.0]).slice(0,3);
	const invTranspViewMatrix = otherUtils.invTransp(viewMatrix);
	spotDirection = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(invTranspViewMatrix), [0.0, -1.0, 0.0]);
}

/**
 * It draws the given node by setting all the needed uniforms, so the uniforms that could change and
 * also the uniforms that are constant
 * @param node to draw
 */
function drawNodeFirstTime(node) {
	gl.useProgram(node.getProgram());

	setLightPositionsAndDirections();
	sendTheMutableUniforms(node);
	sendTheImmutableUniforms(node);

	gl.bindVertexArray(node.getVao());

	const primitiveType = gl.TRIANGLES;
	const indicesLength = node.getIndicesLength();
	const indexType = gl.UNSIGNED_SHORT;
	const offset = 0;
	gl.drawElements(primitiveType, indicesLength, indexType, offset);
}

/**
 * It sets the uniforms that could have been changed for the given node
 * @param node for which the uniforms are set
 */
function sendTheMutableUniforms(node) {
	const wvpMatrix = utils.multiplyMatrices(vpMatrix, node.getWorldMatrix());
	gl.uniformMatrix4fv(node.getWvpMatrixLocation(), gl.FALSE, utils.transposeMatrix(wvpMatrix));

	const wvMatrix = utils.multiplyMatrices(viewMatrix, node.getWorldMatrix());
	const normalMatrix = otherUtils.invTransp(wvMatrix);
	gl.uniformMatrix4fv(node.getNormalMatrixLocation(), gl.FALSE, utils.transposeMatrix(normalMatrix));
	gl.uniformMatrix4fv(node.getWvMatrixLocation(), gl.FALSE, utils.transposeMatrix(wvMatrix));

	const invTranspViewMatrix = otherUtils.invTransp(viewMatrix);
	const dirLightTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(invTranspViewMatrix), directionalLight);
	gl.uniform3fv(node.getLightDirectionLoc(), dirLightTransformed);
	gl.uniform3fv(node.getLightColorLoc(), directionalLightColor);


	const hemisphericDTransformed = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(invTranspViewMatrix), HEMISPHERIC_L_D);
	gl.uniform3fv(node.getHemisphericDLoc(), hemisphericDTransformed);


	gl.uniform3fv(node.getPl1PosLoc(), pl1Pos);
	gl.uniform3fv(node.getPl2PosLoc(), pl2Pos);
	gl.uniform3fv(node.getSpotPosLoc(), spotPos);
	gl.uniform3fv(node.getSpotDirectionLoc(), spotDirection);
	gl.uniform1i(node.getIsNightLoc(), isNight);

	if(node.getShadersType().id==ShadersType.pbr.id) {
		gl.uniform1i(node.getUseTexturesForMuAlphaLoc(), node.getUseTexturesForMuAlpha());
		gl.uniform1i(node.getUseClassicF0FormulaLoc(), node.getUseClassicF0Formula());

		if(isChangeLight) {
			gl.uniform1f(node.getMuPersonalLoc(), globalMuPersonal);
			gl.uniform1f(node.getAlphaPersonalLoc(), globalAlphaPersonal);
			gl.uniform1f(node.getF0PersonalLoc(), globalF0Personal);
		} else {
			gl.uniform1f(node.getMuPersonalLoc(), node.getMuPersonal());
			gl.uniform1f(node.getAlphaPersonalLoc(), node.getAlphaPersonal());
			gl.uniform1f(node.getF0PersonalLoc(), node.getF0Personal());
		}

		if(node.getUseTexturesForMuAlpha()) {
			gl.activeTexture(gl.TEXTURE2);
			gl.bindTexture(gl.TEXTURE_2D, node.getMuTexture());
			gl.uniform1i(node.getMuTextureLoc(), 2);

			gl.activeTexture(gl.TEXTURE3);
			gl.bindTexture(gl.TEXTURE_2D, node.getAlphaTexture());
			gl.uniform1i(node.getAlphaTextureLoc(), 3);
		}


	} else if(node.getShadersType().id==ShadersType.orenNayar.id) {
		gl.uniform1i(node.getUseTexturesForMuAlphaLoc(), node.getUseTexturesForMuAlpha());
		if(isChangeLight) {
			gl.uniform1f(node.getAlphaPersonalLoc(), globalAlphaPersonal);
		} else {
			gl.uniform1f(node.getAlphaPersonalLoc(), node.getAlphaPersonal());
		}

		if(node.getUseTexturesForMuAlpha()) {
			gl.activeTexture(gl.TEXTURE2);
			gl.bindTexture(gl.TEXTURE_2D, node.getMuTexture());
			gl.uniform1i(node.getMuTextureLoc(), 2);
		}

	}

	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, node.getAlbedoTexture());
	gl.uniform1i(node.getAlbedoTextureLoc(), 0);

	gl.uniform1i(node.getUseNormalTextureLoc(), node.getUseNormalTexture());

	if(node.getUseNormalTexture()) {
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, node.getNormalTexture());
		gl.uniform1i(node.getNormalTextureLoc(), 1);
	}
}

/**
 * It sets the uniforms that are constant for the given node
 * @param node for which the uniforms are set
 */
function sendTheImmutableUniforms(node) {
	gl.uniform3fv(node.getHemiLightUpperLoc(), HEMISPHERIC_L_UPPER_COLOR);
	gl.uniform3fv(node.getHemiLightLowerLoc(), HEMISPHERIC_L_LOWER_COLOR);

	gl.uniform3fv(node.getPl1ColorLoc(), [200.0/255.0, 75.0/255.0, 75.0/255.0]);
	gl.uniform3fv(node.getPl2ColorLoc(), [100.0/255.0, 200.0/255.0, 100.0/255.0]);
	gl.uniform1f(node.getPlTargetLoc(), 10);
	gl.uniform1f(node.getPlDecayLoc(), 2);
	gl.uniform3fv(node.getSpotlColorLoc(), [100.0/255.0, 50.0/255.0, 100.0/255.0]);
	gl.uniform1f(node.getSpotTargetLoc(), 15);
	gl.uniform1f(node.getSpotDecayLoc(), 2);
	gl.uniform1f(node.getSpotConeInLoc(), 70.0);
	gl.uniform1f(node.getSpotConeOutLoc(), 100.0);
}

/**
 * It draws the given node by setting the uniforms that are constant
 * @param node to draw
 */
function drawNode(node) {
	gl.useProgram(node.getProgram());

	setLightPositionsAndDirections();
	sendTheMutableUniforms(node);

	gl.bindVertexArray(node.getVao());

	const primitiveType = gl.TRIANGLES;
	const indicesLength = node.getIndicesLength();
	const indexType = gl.UNSIGNED_SHORT;
	const offset = 0;
	gl.drawElements(primitiveType, indicesLength, indexType, offset);
}

/**
 * It draws the sky map and sets all the needed uniforms
 */
function drawSkyMap() {
	gl.useProgram(skyMapNode.getProgram());

	gl.activeTexture(gl.TEXTURE0+3);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, skyMapNode.getAlbedoTexture());
	gl.uniform1i(skyMapNode.getAlbedoTextureLoc(), 3);

	const invViewProjMatrix = utils.invertMatrix(vpMatrix);
	gl.uniformMatrix4fv(skyMapNode.getInvViewProjMatrixLoc(), gl.FALSE, utils.transposeMatrix(invViewProjMatrix));

	gl.uniform1i(skyMapNode.getIsNightLoc(), isNight);

	gl.bindVertexArray(skyMapNode.getVao());
	gl.depthFunc(gl.LEQUAL);
	const PRIMITIVE_TYPE = gl.TRIANGLES;
	const OFFSET = 0;
	const COUNT = 6;
	gl.drawArrays(PRIMITIVE_TYPE, OFFSET, COUNT);

}

/**
 * It draws the life indicator of the player
 */
function drawLifeIndicator() {
	gl.useProgram(lifeObject.getProgram());

	gl.uniform1f(lifeObject.getLifeUniformLoc(), lifeObject.getLife());

	gl.uniform1f(lifeObject.getCanvasWidthLoc(), gl.canvas.width);
	gl.uniform1f(lifeObject.getCanvasHeightLoc(), gl.canvas.height);
	gl.uniform1f(lifeObject.getStartXLoc(), LIFE_INDICATOR_START_X);
	gl.uniform1f(lifeObject.getWidthLoc(), LIFE_INDICATOR_WIDTH);

	gl.bindVertexArray(lifeObject.getVao());

	const primitiveType = gl.TRIANGLES;
	const indicesLength = lifeObject.getIndicesLength();
	const indexType = gl.UNSIGNED_SHORT;
	const offset = 0;
	gl.drawElements(primitiveType, indicesLength, indexType, offset);

}

/**
 * If a key is pressed, this function is called.
 * If the loading of the scene is not finished, then the function returns without doing anything.
 * Otherwise, if the game is over and enter has been pressed then the game restarts and the scene
 * is rendered again.
 * If w, s, a or d i pressed then the corresponding boolean variable (that says whether the button is pressed) is set to true.
 * If q or e is pressed then the roll velocity of the camera is set to negative or positive respectively and
 * the corresponding boolean variable (that says whether the button is pressed) is set to true.
 * If left-arrow or right-arrow is pressed then the compass direction velocity of the camera is set to negative
 * or positive respectively.
 * If up-arrow or down-arrow is pressed then the elevation velocity of the camera is set to positive
 * or negative respectively and the corresponding boolean variable (that says whether the button is pressed) is set to true.
 * If space is pressed then the jump can happen if only if the vertical velocity and acceleration
 * are zero or it is a double jump.
 * @param e event that has happened
 */
function keyDown(e) {
	if(!hasFinishedLoading) {
		return;
	}

	if(isGameOver) {
		if(e.keyCode==13) { //enter
			startGame();
			window.requestAnimationFrame(drawScene);
		}
		return;
	}

	const COMPASS_SPEED = 80;
	const JUMP_VELOCITY = 5;

	switch(e.keyCode) {
		case 87: //w
			isWPressed = true;
			break;
		case 83: //s
			isSPressed = true;
			break;
		case 65: //a
			isAPressed = true;
			break;
		case 68: //d
			isDPressed = true;
			break;
		case 81: //q
			isQPressed = true;
			cameraRollVelocity = CAMERA_ROLL_SPEED;
			break;
		case 69: //e
			isEPressed = true;
			cameraRollVelocity = -CAMERA_ROLL_SPEED;
			break;
		case 38: //up arrow
			isUpArrowPressed = true;
			cameraElevationVelocity = CAMERA_ELEVATION_SPEED;
			break;
		case 40: //down arrow
			isDownArrowPressed = true;
			cameraElevationVelocity = -CAMERA_ELEVATION_SPEED;
			break;
		case 37: //left arrow
			cameraCompassDirectionVelocity = COMPASS_SPEED;
			break;
		case 39: //right arrow
			cameraCompassDirectionVelocity = -COMPASS_SPEED;
			break;
		case 32: //space
			if(cameraVelocity[1]==0 && cameraAcceleration[1]==0) {
				isDoubleJumpDone=false;
				cameraVelocity[1] = JUMP_VELOCITY;
			} else if(!isDoubleJumpDone){
				isDoubleJumpDone=true;
				cameraVelocity[1] = JUMP_VELOCITY;
			}
			break;
	}

}

/**
 * It resets the camera position, velocity and direction. It sets the bird position. It updates
 * the beginning time of the game and it updates the text in the front with the new time and the
 * text that says to find the bird.
 */
function startGame() {
	isGameOver=false;
	document.getElementById("controller").style.visibility='visible';
	document.getElementById("birbText").innerHTML = "Find the hidden birb!";
	document.getElementById("life").innerHTML = "Life";
	window.setTimeout(fadeBirdText, 4000);
	document.getElementById("hitFailed").innerHTML = "";
	firstTime = (new Date).getTime();
	lastUpdateTime = firstTime;
	passedTime=0;
	document.getElementById("time").innerHTML = "Time: "+Math.floor(passedTime);
	setCameraCoordinates();
	setBirdPosition();
}

/**
 * It returns the module of the planar (on the plane x, z) velocity of the camera
 * @returns {number} module of the planar (on the plane x, z) velocity of the camera
 */
function cameraAbsoluteVelocity() {
	return Math.sqrt(Math.pow(cameraVelocity[0], 2)+Math.pow(cameraVelocity[2], 2));
}

/**
 * It returns the absolute planar velocity (on the plane x, z) if the projection of the planar velocity to
 * the camera direction is positive. Otherwise it returns the negative of the absolute planar velocity
 * @returns {number} absolute planar velocity (on the plane x, z) if the projection of the planar velocity to
 * the camera direction is positive. Otherwise it returns the negative of the absolute planar velocity
 */
function cameraFrontVelocity() {
	const frontVelocity = cameraAbsoluteVelocity();

	if(0<cameraVelocity[0]*(-Math.sin(otherUtils.degToRad(cameraCompassDirection)))
		+cameraVelocity[2]*(-Math.cos(otherUtils.degToRad(cameraCompassDirection))))
		return frontVelocity;

	return -frontVelocity;
}

/**
 * It returns the absolute planar velocity (on the plane x, z) if the projection of the planar velocity to
 * the camera direction plus 90 degrees is positive. Otherwise it returns the negative of the absolute planar velocity
 * @returns {number} absolute planar velocity (on the plane x, z) if the projection of the planar velocity to
 * the camera direction plus 90 degrees is positive. Otherwise it returns the negative of the absolute planar velocity
 */
function cameraRightVelocity() {
	const rightVelocity = cameraAbsoluteVelocity();

	if(0<cameraVelocity[0]*(Math.cos(otherUtils.degToRad(cameraCompassDirection)))
		+cameraVelocity[2]*(-Math.sin(otherUtils.degToRad(cameraCompassDirection))))
		return rightVelocity;

	return -rightVelocity;
}

/**
 * If a key is released, this function is called.
 * If the loading of the scene is not finished or the game is over, the function returns without doing anything.
 * Otherwise, if w, s, a or d i pressed then the corresponding boolean variable (that says whether the button is pressed)
 * is set to false and the front force is set to zero if w or s is pressed and the right force is set to zero if a or d is pressed.
 * If q or e is pressed then the roll velocity of the camera is set to zero and the corresponding boolean variable
 * (that says whether the button is pressed) is set to false.
 * If left-arrow or right-arrow is pressed then the compass direction velocity of the camera is set to zero.
 * If up-arrow or down-arrow is pressed then the elevation velocity of the camera is set to zero and
 * the corresponding boolean variable (that says whether the button is pressed) is set to true.
 * @param e event that has happened
 */
function keyUp(e) {
	if(!hasFinishedLoading || isGameOver) {
		return;
	}

	switch(e.keyCode) {
		case 87: //w
			isWPressed = false;
			cameraFrontForce[0] = 0;
			cameraFrontForce[2] = 0;
			break;
		case 83: //s
			isSPressed = false;
			cameraFrontForce[0] = 0;
			cameraFrontForce[2] = 0;
			break;
		case 65: //a
			isAPressed = false;
			cameraRightForce[0] = 0;
			cameraRightForce[2] = 0;
			break;
		case 68: //d
			isDPressed = false;
			cameraRightForce[0] = 0;
			cameraRightForce[2] = 0;
			break;
		case 81: //q
			isQPressed = false;
			cameraRollVelocity = 0;
			break;
		case 69: //e
			isEPressed = false;
			cameraRollVelocity = 0;
			break;
		case 38: //up arrow
			isUpArrowPressed = false;
			cameraElevationVelocity = 0;
			break;
		case 40: //down arrow
			isDownArrowPressed = false;
			cameraElevationVelocity = 0;
			break;
		case 37: //left arrow
			cameraCompassDirectionVelocity = 0;
			break;
		case 39: //right arrow
			cameraCompassDirectionVelocity = 0;
			break;
		
	}

}

/**
 * If a button on a pointing device (such as a mouse or trackpad) is released this function is called.
 * If the loading of the scene is not finished or the game is over, the function returns without doing anything.
 * Otherwise it checks whether the click points to the bird.
 * @param event event that has happened
 */
function myOnMouseUp(event) {
	if(!hasFinishedLoading || isGameOver) {
		return;
	}
	checkBirdSelection(event);
}

/**
 * It checks whether the click of a pointing device points to the bird. It calculates the possible displacement
 * in the page, then it calculates the normalised device coordinates and the coordinates of the point on the near plane.
 * It calculates the direction of the ray created by the click and the point in which starts the ray.
 * Finally it checks if the ray hits the bird. The check is done only with the obejcts that are not too far away.
 * If there is a collision with nearby objects, the first object to which the ray collides is considered: if it is
 * a bird then the game is over and a sound is played, otherwise a text that says that the hit object is not a bird is
 * displayed.
 * @param event event that has happened when a click on a pointing device has been done.
 */
function checkBirdSelection(event) {
	//This is a way of calculating the coordinates of the click in the canvas taking into account its possible displacement
	// in the page
	var top = 0.0, left = 0.0;
	canvas = gl.canvas;
	//calculates the displacement from the ancestor elements
	while (canvas && canvas.tagName !== 'BODY') {
		top += canvas.offsetTop;
		left += canvas.offsetLeft;
		// returns a reference to the element which is the closest (nearest in the containment hierarchy) positioned
		// ancestor element. If there is no positioned ancestor element the body is returned.
		canvas = canvas.offsetParent;
	}
	var x = event.clientX - left;
	var y = event.clientY - top;
		
	//Here we calculate the normalised device coordinates from the pixel coordinates of the canvas
	var normX = (2*x)/ gl.canvas.width - 1;
	var normY = 1 - (2*y) / gl.canvas.height;

	//We need to go through the transformation pipeline in the inverse order so we invert the matrices
	var projInv = utils.invertMatrix(projectionMatrix);
	var viewInv = utils.invertMatrix(viewMatrix);
	
	//Find the point (un)projected on the near plane, from clip space coords to eye coords
	//z = -1 makes it so the point is on the near plane
	//w = 1 is for the homogeneous coordinates in clip space
	var pointEyeCoords = utils.multiplyMatrixVector(projInv, [normX, normY, -1, 1]);

	//This finds the direction of the ray in eye space
	//Formally, to calculate the direction you would do dir = point - eyePos but since we are in eye space eyePos = [0,0,0] 
	//w = 0 is because this is not a point anymore but is considered as a direction
	var rayEyeCoords = [pointEyeCoords[0], pointEyeCoords[1], pointEyeCoords[2], 0];

	
	//We find the direction expressed in world coordinates by multiplying with the inverse of the view matrix
	var rayDir = utils.multiplyMatrixVector(viewInv, rayEyeCoords);
	var normalisedRayDir = normaliseVector(rayDir);
	//The ray starts from the camera in world coordinates
	var rayStartPoint = [cameraPosition[0], cameraPosition[1], cameraPosition[2]];

	var isHit = false;
	var minimumDistance=MAX_DISTANCE_FROM_BIRD_TO_CAPTURE+1;
	var nearestIntersectedObject;

	//Check for collision with the bird
	for(var object of objectsWithCollision) {
		var distance=[0];
		if(object.getCollisionObject().checkRayIntersection(rayStartPoint, normalisedRayDir, distance)) {
			if(distance[0]<MAX_DISTANCE_FROM_BIRD_TO_CAPTURE && distance[0]<minimumDistance) {
				isHit=true;
				minimumDistance=distance[0];
				nearestIntersectedObject=object;
			}
		}
	}

	if(isHit) {
		if(nearestIntersectedObject==birdNode) {
			playBirdCapturedSound();
			document.getElementById("birbText").innerHTML = "You have found the birb in "+passedTime+" seconds!";
			gameOver();
		} else {
			document.getElementById("hitFailed").innerHTML = "the hit object is not a bird";
			window.setTimeout(fadeOutHitFailed, 2000);
		}
	}
}

/**
 * This function finishes the game by stopping the movement of the camera. It plays a sound and it displays a text indicating
 * that the game is over and it sets a boolean variable indicating that the game is over.
 */
function gameOver() {
	isGameOver = true;
	playGameOverSound();
	document.getElementById("time").innerHTML = "Time: " + Math.floor(passedTime);
	document.getElementById("hitFailed").innerHTML = "Game Over, press Enter to restart";
	cameraVelocity = [0, 0, 0];
	cameraCompassDirectionVelocity = 0;
	cameraElevationVelocity = 0;
	cameraRollVelocity = 0;
	cameraFrontForce = [0, 0, 0];
	cameraRightForce = [0, 0, 0];
	isDoubleJumpDone=false;
	isWPressed = false;
	isSPressed = false;
	isAPressed = false;
	isDPressed = false;
	isQPressed = false;
	isEPressed = false;
	isUpArrowPressed = false;
	isDownArrowPressed = false;
}

/**
 * It removes the text in hitFailed html element.
 */
function fadeOutHitFailed() {
	document.getElementById("hitFailed").innerHTML = "";
}

/**
 * It normalizes the given vector.
 * @param vec vector to normalize.
 * @returns {number[]} normalized vector.
 */
function normaliseVector(vec) {
    var magnitude = Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
    var normVec = [vec[0]/magnitude, vec[1]/magnitude, vec[2]/magnitude];
    return normVec;
}

/**
 * If the loading of the scene is not finished, the function returns without doing anything.
 * It sets the personalized metalness (mu) value to the given value.
 * @param value new personalized metalness (mu) value.
 */
function onMuChange(value) {
	if(!hasFinishedLoading) {
		return;
	}
	document.getElementById("muText").innerHTML = "Metalness: " + value;
	globalMuPersonal = value;

}

/**
 * If the loading of the scene is not finished, the function returns without doing anything.
 * It sets the personalized roughness (alpha) value to the given value.
 * @param value new personalized roughness (alpha) value.
 */
function onAlphaChange(value) {
	if(!hasFinishedLoading) {
		return;
	}
	document.getElementById("alphaText").innerHTML = "Roughness: " + value;
	globalAlphaPersonal = value;

}

/**
 * If the loading of the scene is not finished, the function returns without doing anything.
 * It sets isChangeLight variable to the given value, that says whether the personalized light parameters must be used.
 * @param value boolean that says whether the personalized light parameters must be used.
 */
function onIsChangeLightChange(value) {
	if(!hasFinishedLoading) {
		return;
	}
	isChangeLight = value;

}

/**
 * If the loading of the scene is not finished, the function returns without doing anything.
 * If the given value is true, the sounds in the game are enabled. Otherwise they are disabled.
 * @param value boolean that says whether to enable the sounds in the game.
 */
function onAddSounds(value) {
	if(!hasFinishedLoading) {
		return;
	}
	addSounds = value;
	playBackgroundMusic();
	if(!addSounds) {
		stopSounds();
	}

}


/**
 * When the html has finished loading it calls the main function
 */
window.onload = main;
/**
 * Call the function keyDown when a key is pressed
 */
window.addEventListener("keydown", keyDown, false);
/**
 * Call the function keyUp when a key is pressed
 */
window.addEventListener("keyup", keyUp, false);
/**
 * If a button on a pointing device (such as a mouse or trackpad) is released the function myOnMouseUp is called.
 */
window.addEventListener("mouseup", myOnMouseUp);