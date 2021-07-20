/**
 * It contains the type that a point of the player, for which the collision is tested, can be: head, body or feet.
 * If a point is head then the collision can be only from the top or laterally.
 * If a point is body then the collision can be only laterally.
 * If a point is feet then the collision can be only from the bottom or laterally.
 */
const PointType = {"head": {id: 1},
	"body": {id: 2},
	"feet": {id: 3}};
Object.freeze(PointType);

/**
 * Small number epsilon, used to test whether a point is touching a surface of an object. If the
 * distance is less than or equal to EPSILON_FOR_DISTANCE than there is a collision
 * @type {number}
 */
const EPSILON_FOR_DISTANCE = 0.2;
/**
 * Small number epsilon, used to test whether a point is in front of a surface of an object. If the
 * distance is less than EPSILON_FOR_SEPARATION than the point is in front of the surface
 * @type {number}
 */
const EPSILON_FOR_SEPARATION = 0;

/**
 * Number of points of the body of the player to be tested in order to check for possible
 * collisions with other objects in the scene
 * @type {number}
 */
const NUMBER_OF_POINTS_FOR_BODY = 11;
/**
 * Number of points of the body of the player that are considered as feet. Which is equal
 * to the number of points of the body of the player that are considered as head.
 * @type {number}
 */
const FEET_POINTS = 2;

/**
 * Class that represents the methods that a subclass that extends Collision must have
 */
class Collision {

	/**
	 * Constructor of Collision. It creates an empty object
	 */
	constructor() {
	}

	/**
	 * It copies this object
	 * @returns {Collision} copy of this object
	 */
	copy() {
		return new Collision();
	}

	/**
	 * It checks whether the ray represented by the given start point and the given normalized direction hits this object. If
	 * yes then distance will contain the distance between the ray start point and the point on the object touched by the ray.
	 * @param rayStartPoint starting point of the ray.
	 * @param rayNormalisedDir normalized direction of the ray.
	 * @param distance distance between the ray start point and the point on the object touched by the ray. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the ray represented by the given start point and the given normalized direction hits this object.
	 */
	checkRayIntersection(rayStartPoint, rayNormalisedDir, distance) {
		return false;
	}

	/**
	 * It checks whether the person of the game,whose eyes are assumed to be in the camera position, hits this object.
	 * @param cameraPosition position of the camera.
	 * @param personHeight height of the person, whose eyes are assumed to be in the camera position.
	 * @param collidedPoint point of the person that is touching the object. It is set by
	 * this function if the function returns true.
	 * @param pointType type of the collided point, whether it is head, body or feet. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the person of the game,whose eyes are assumed to be in the camera position, hits this object.
	 */
	checkCollision(cameraPosition, personHeight, collidedPoint, pointType) {
		return false;
	}

	/**
	 * It returns the resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraForce force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionForce(cameraForce, collidedPoint, pointType) {
		return [0, 0, 0];
	}

	/**
	 * It returns the resulting velocity obtained by the given cameraVelocity and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraVelocity force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionVelocity(cameraVelocity, collidedPoint, pointType) {
		return [0, 0, 0];
	}

	/**
	 * It returns the distance of the given point from this object
	 * @param startPoint point from which the distance is measured
	 * @returns {number} distance of the given point from this object
	 */
	getDistance(startPoint) {
		return 100000;
	}

	/**
	 * It says whether this object is very far away from the given point. If it returns yes, then this object is
	 * for sure not touching the player. If it returns false then it may be touching the player.
	 * @param point point from which the distance is considered.
	 * @param bodyAllowance allowance due to the dimensions of the body of the player.
	 * @param extraAllowance extra allowance in order to stay safe to approximations.
	 * @returns {boolean} whether this object is very far away from the given point.
	 */
	isFarAway(point, bodyAllowance, extraAllowance) {
		return true;
	}

	/**
	 * It sets the position of the center of this object with the given one.
	 * @param position position of the center, that is used to set the position
	 * of the center of this object.
	 */
	setPosition(position) {
	}

	/**
	 * It scales this collision object with the given parameter
	 * @param scaling scaling parameter
	 */
	setScaling(scaling) {
	}

}

/**
 * Class that represents the objects which never collide with the player
 */
class NoCollision extends Collision {

	/**
	 * Constructor of Collision. It creates an empty object
	 */
	constructor() {
		super();
	}

	/**
	 * It copies this object
	 * @returns {Collision} copy of this object
	 */
	copy() {
		return new NoCollision();
	}

	/**
	 * It checks whether the ray represented by the given start point and the given normalized direction hits this object. If
	 * yes then distance will contain the distance between the ray start point and the point on the object touched by the ray.
	 * Only for the class NoCollision it returns always false.
	 * @param rayStartPoint starting point of the ray.
	 * @param rayNormalisedDir normalized direction of the ray.
	 * @param distance distance between the ray start point and the point on the object touched by the ray. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the ray represented by the given start point and the given normalized direction hits this object.
	 * Only for the class NoCollision it returns always false.
	 */
	checkRayIntersection(rayStartPoint, rayNormalisedDir, distance) {
		return false;
	}

	/**
	 * It checks whether the person of the game,whose eyes are assumed to be in the camera position, hits this object.
	 * Only for the class NoCollision it returns always false.
	 * @param cameraPosition position of the camera.
	 * @param personHeight height of the person, whose eyes are assumed to be in the camera position.
	 * @param collidedPoint point of the person that is touching the object. It is set by.
	 * this function if the function returns true.
	 * @param pointType type of the collided point, whether it is head, body or feet. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the person of the game,whose eyes are assumed to be in the camera position, hits this object.
	 * Only for the class NoCollision it returns always false.
	 */
	checkCollision(cameraPosition, personHeight, collidedPoint, pointType) {
		return false;
	}

	/**
	 * It returns the resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * Only for the class NoCollision it returns always [0, 0, 0].
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraForce force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @returns {number[]} resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * Only for the class NoCollision it returns always [0, 0, 0].
	 */
	getCollisionForce(cameraForce, collidedPoint, pointType) {
		return [0, 0, 0];
	}

	/**
	 * It returns the resulting velocity obtained by the given cameraVelocity and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * Only for the class NoCollision it returns always [0, 0, 0].
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraVelocity force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * Only for the class NoCollision it returns always [0, 0, 0].
	 */
	getCollisionVelocity(cameraVelocity, collidedPoint, pointType) {
		return [0, 0, 0];
	}

	/**
	 * It returns the distance of the given point from this object.
	 *  Only for the class NoCollision it returns always a big number.
	 * @param startPoint point from which the distance is measured
	 * @returns {number} distance of the given point from this object.
	 * Only for the class NoCollision it returns always a big number.
	 */
	getDistance(startPoint) {
		return 100000;
	}

	/**
	 * It says whether this object is very far away from the given point. If it returns yes, then this object is
	 * for sure not touching the player. If it returns false then it may be touching the player.
	 * Only for the class NoCollision it returns always true.
	 * @param point point from which the distance is considered.
	 * @param bodyAllowance allowance due to the dimensions of the body of the player.
	 * @param extraAllowance extra allowance in order to stay safe to approximations.
	 * @returns {boolean} whether this object is very far away from the given point.
	 * Only for the class NoCollision it returns always true.
	 */
	isFarAway(point, bodyAllowance, extraAllowance) {
		return true;
	}

}

/**
 * Collision class that represents a collision object with a shape of a sphere for an object in the scene.
 */
class SphereCollision extends Collision {
	/**
	 * Position of the center of the sphere object.
	 * @type {number[]}
	 * @private
	 */
	_position=[0, 0, 0];
	/**
	 * Radius of the sphere.
	 * @type {number}
	 * @private
	 */
	_radius=0;

	/**
	 * Constructor of SphereCollision. It creates a SphereCollision object with the
	 * given center and radius.
	 * @param sphereCentre position of the center of the sphere object.
	 * @param sphereRadius radius of the sphere.
	 */
	constructor(sphereCentre, sphereRadius) {
		super();
		if(sphereCentre!=null) {
			this._position = otherUtils.copyArray(sphereCentre);
		}
		this._radius = sphereRadius;
	}

	/**
	 * It sets the position of the center of this object with the given one.
	 * @param position position of the center, that is used to set the position
	 * of the center of this object.
	 */
	setPosition(position) {
		this._position = otherUtils.copyArray(position);
	}

	/**
	 * It copies this object with its attributes.
	 * @returns {Collision} copy of this object.
	 */
	copy() {
		return new SphereCollision(otherUtils.copyArray(this._position), this._radius);
	}

	/**
	 * It checks whether the ray represented by the given start point and the given normalized direction hits this object. If
	 * yes then distance will contain the distance between the ray start point and the point on the object touched by the ray.
	 * It checks if the rayStartPoint is inside the sphere, if so there is a collision.
	 * Otherwise if the sphere is behind the rayStartPoint, there is not a collision.
	 * Otherwise the sphere is in front of the player: if the ray misses/doesn't touch the sphere,
	 * there is not a collision. Otherwise there is a collision.
	 * @param rayStartPoint starting point of the ray.
	 * @param rayNormalisedDir normalized direction of the ray.
	 * @param distance distance between the ray start point and the point on the object touched by the ray. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the ray represented by the given start point and the given normalized direction hits this object.
	 */
	checkRayIntersection(rayStartPoint, rayNormalisedDir, distance) {
		/*Check if the rayStartPoint is inside the sphere, if so there is a collision */
		//Distance between sphere origin and origin of ray
		var l = [this._position[0] - rayStartPoint[0], this._position[1] - rayStartPoint[1], this._position[2] - rayStartPoint[2]];
		var l_squared = l[0] * l[0] + l[1] * l[1] + l[2] * l[2];
		//If this is true, the ray origin is inside the sphere so it collides with the sphere
		if(l_squared < (this._radius*this._radius)) {
			distance[0]=0;
			return true;
		}
		/*Check if the sphere is behind the rayStartPoint, if so there is not a collision */
		//Projection of l onto the ray direction 
		var s = l[0] * rayNormalisedDir[0] + l[1] * rayNormalisedDir[1] + l[2] * rayNormalisedDir[2];
		//The sphere is behind the ray origin so no intersection
		if(s < 0){
			return false;
		}
		/*Now the sphere is in front of the player
		/*Check if the ray misses/doesn't touch the sphere, if so there is not a collision */
		//Squared distance from sphere centre and projection s with Pythagorean theorem
		var m_squared = l_squared - (s*s);
		//If this is true the ray will miss the sphere
		if(m_squared > (this._radius*this._radius)){
			return false;
		}
		distance[0]=this.getDistance(rayStartPoint);
		//Now we can say that the ray will hit the sphere
		return true;
	}

	/**
	 * It checks whether the person of the game, whose eyes are assumed to be in the camera position, hits this object.
	 * It tests some points in the body of the player to verify whether they hit this collision object.
	 * @param cameraPosition position of the camera.
	 * @param personHeight height of the person, whose eyes are assumed to be in the camera position.
	 * @param collidedPoint point of the person that is touching the object. It is set by
	 * this function if the function returns true.
	 * @param pointType type of the collided point, whether it is head, body or feet. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the person of the game, whose eyes are assumed to be in the camera position, hits this object.
	 */
	checkCollision(cameraPosition, personHeight, collidedPoint, pointType) {
		const STEP = personHeight/(NUMBER_OF_POINTS_FOR_BODY-1);
		var pointToTest;
		//body
		for(var i=FEET_POINTS; i<=(NUMBER_OF_POINTS_FOR_BODY-1)-FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1] - personHeight + i*STEP, cameraPosition[2]];

			if(this.getCylinderDistance(pointToTest)<=EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.body;
				return true;
			}
		}

		//feet
		for(var i=0; i<FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1] - personHeight + i*STEP, cameraPosition[2]];
			if (this.getCylinderDistance(pointToTest) <= EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.feet;
				return true;
			}
		}


		//head
		for(var i=0; i<FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1] - i*STEP, cameraPosition[2]];
			if (this.getCylinderDistance(pointToTest) <= EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.head;
				return true;
			}
		}

		return false;
	}

	/**
	 * It returns the resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraForce force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionForce(cameraForce, collidedPoint, pointType) {
		return this._getCollisionVector(cameraForce, collidedPoint, pointType);
	}

	/**
	 * It returns the resulting velocity obtained by the given cameraVelocity and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraVelocity force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionVelocity(cameraVelocity, collidedPoint, pointType) {
		return this._getCollisionVector(cameraVelocity, collidedPoint, pointType);
	}

	/**
	 * It returns the vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param vector vector whose direction toward the inside normal vector, of the surface of this object
	 * touched by the collidedPoint, must be removed
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given vector and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * @private
	 */
	_getCollisionVector(vector, collidedPoint, pointType) {
		if(pointType.id === PointType.body.id) {
			return this._getFrontCollision(vector, collidedPoint);
		}

		if(pointType.id === PointType.feet.id) {
			if (collidedPoint[1] >= this._position[1] + this._radius - EPSILON_FOR_SEPARATION) {
				//the camera is over
				if (vector[1] < 0) {
					//set to 0 the y component
					return [vector[0], 0, vector[2]];
				}
				return vector;
			}

			return this._getFrontCollision(vector, collidedPoint);
		}

		if(pointType.id === PointType.head.id) {
			if (collidedPoint[1] <= this._position[1] + EPSILON_FOR_SEPARATION) {
				//the camera is below
				if (vector[1] > 0) {
					//set to 0 the y component
					return [vector[0], 0, vector[2]];
				}
				return vector;
			}

			return this._getFrontCollision(vector, collidedPoint);
		}

		return vector;
	}

	/**
	 * It returns the vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the lateral surface of this object touched by the collidedPoint.
	 * @param vector vector whose direction toward the inside normal vector, of the surface of this object
	 * touched by the collidedPoint, must be removed.
	 * @param collidedPoint collidedPoint point that is touching the surface of this object.
	 * @returns {number[]} vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the lateral surface of this object touched by the collidedPoint.
	 * @private
	 */
	_getFrontCollision(vector, collidedPoint) {
		const projectionOnTheNormal = this._projectOnTheNormal(vector, collidedPoint);

		if(otherUtils.dotProduct(vector, this._insideNormalVector(collidedPoint))>0) {
			return [vector[0]-projectionOnTheNormal[0], vector[1], vector[2]-projectionOnTheNormal[2]];
		}

		return vector;
	}

	/**
	 * It projects the given vector on the inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @param vector vector to project
	 * @param collidedPoint point on which the normal vector starts
	 * @returns {number[]} projection of the given vector on the inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @private
	 */
	_projectOnTheNormal(vector, collidedPoint) {
		const insideNormalVector = this._insideNormalVector(collidedPoint);
		return otherUtils.projectionOnVector2(vector, insideNormalVector);
	}

	/**
	 * It returns the inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @param collidedPoint point on which the normal vector starts
	 * @returns {number[]} inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @private
	 */
	_insideNormalVector(collidedPoint) {
		const insideVector = [this._position[0]-collidedPoint[0], 0, this._position[2]-collidedPoint[2]];
		const insideVectorLength = Math.sqrt(Math.pow(insideVector[0], 2)+Math.pow(insideVector[1], 2)+Math.pow(insideVector[2], 2));
		const insideNormalVector = [insideVector[0]/insideVectorLength, 0, insideVector[2]/insideVectorLength];
		return insideNormalVector;
	}

	/**
	 * It returns the distance of the given point from this object
	 * @param startPoint point from which the distance is measured
	 * @returns {number} distance of the given point from this object
	 */
	getDistance(startPoint) {
		const distanceFromCenter = otherUtils.takeDiagonal3(startPoint[0]-this._position[0],
			startPoint[1]-this._position[1], startPoint[2]-this._position[2]);

		if(distanceFromCenter<=this._radius) {
			return 0;
		}

		const distance = distanceFromCenter-this._radius;
		
		return distance;
	}

	/**
	 * It returns the distance of the given point from this object, but considering
	 * this object as a cylinder and not as a sphere
	 * @param startPoint point from which the distance is measured
	 * @returns {number} distance of the given point from this object, but considering
	 * this object as a cylinder and not as a sphere
	 */
	getCylinderDistance(startPoint) {
		const cylinderPosition = [this._position[0], this._position[1]-this._radius, this._position[2]];
		const cylinderHeight = 2*this._radius;

		if(startPoint[1]<cylinderPosition[1]) {
			//below
			const planarDistanceFromCenter = otherUtils.takeDiagonal2(startPoint[0]-cylinderPosition[0], startPoint[2]-cylinderPosition[2]);
			if(planarDistanceFromCenter<this._radius) {
				//below and below vertically to the cylinder, not below and x and z very far
				return otherUtils.abs(cylinderPosition[1]-startPoint[1]);
			}
			distanceFromBorder = otherUtils.takeDiagonal2(planarDistanceFromCenter-this._radius, (cylinderPosition[1]-startPoint[1]));
			return distanceFromBorder;
		}
		if(startPoint[1]>(cylinderPosition[1]+cylinderHeight)) {
			//over
			const planarDistanceFromCenter = otherUtils.takeDiagonal2(startPoint[0]-cylinderPosition[0], startPoint[2]-cylinderPosition[2]);
			if(planarDistanceFromCenter<this._radius) {
				//over and over vertically to the cylinder, not over and x and z very far
				return otherUtils.abs(startPoint[1]-(cylinderPosition[1]+cylinderHeight));
			}
			distanceFromBorder = otherUtils.takeDiagonal2(planarDistanceFromCenter-this._radius, (startPoint[1]-(cylinderPosition[1]+cylinderHeight)));
			return distanceFromBorder;
		}
		//front
		var distanceFromBorder = otherUtils.takeDiagonal2(startPoint[0]-cylinderPosition[0],
			startPoint[2]-cylinderPosition[2])-this._radius;

		if(distanceFromBorder<0) {
			return 0;
		}

		return distanceFromBorder;
	}

	/**
	 * It says whether this object is very far away from the given point. If it returns yes, then this object is
	 * for sure not touching the player. If it returns false then it may be touching the player.
	 * @param point point from which the distance is considered.
	 * @param bodyAllowance allowance due to the dimensions of the body of the player.
	 * @param extraAllowance extra allowance in order to stay safe to approximations.
	 * @returns {boolean} whether this object is very far away from the given point.
	 */
	isFarAway(point, bodyAllowance, extraAllowance) {
		const diagonal = otherUtils.takeDiagonal3(point[0]-this._position[0], point[1]-this._position[1],
			point[2]-this._position[2]);

		if(diagonal > this._radius + bodyAllowance + extraAllowance) {
			return true;
		}

		return false;
	}

	/**
	 * It scales this collision object with the given parameter
	 * @param scaling scaling parameter
	 */
	setScaling(scaling) {
		this._radius = this._radius*scaling[0];
	}

}

/**
 * Collision class that represents a collision object with a shape of a cylinder for an object in the scene.
 */
class CylinderCollision extends Collision {
	/**
	 * Position of the center of the bottom of the cylinder object.
	 * @type {number[]}
	 * @private
	 */
	_position=[0, 0, 0]; //it is the center of the base of the cylinder
	/**
	 * Radius of the base of the cylinder.
	 * @type {number}
	 * @private
	 */
	_radius=0;
	/**
	 * Height of the cylinder.
	 * @type {number}
	 * @private
	 */
	_height=0;

	/**
	 * Constructor of CylinderCollision. It creates a CylinderCollision object with the
	 * given center of the base, radius and height.
	 * @param position position of the center of the bottom of the cylinder object.
	 * @param radius radius of the base of the cylinder.
	 * @param height height of the cylinder.
	 */
	constructor(position, radius, height) {
		super();
		if(position!=null) {
			this._position = otherUtils.copyArray(position);
		}
		this._radius = radius;
		this._height = height;
	}

	/**
	 * It sets the position of the center of this object with the given one.
	 * @param position position of the center, that is used to set the position
	 * of the center of this object.
	 */
	setPosition(position) {
		this._position = otherUtils.copyArray(position);
	}

	/**
	 * It copies this object with its attributes.
	 * @returns {Collision} copy of this object.
	 */
	copy() {
		return new CylinderCollision(otherUtils.copyArray(this._position), this._radius, this._height);
	}

	/**
	 * It checks whether the ray represented by the given start point and the given normalized direction hits this object. If
	 * yes then distance will contain the distance between the ray start point and the point on the object touched by the ray.
	 * It checks if the rayStartPoint is inside the cylinder, if so there is a collision.
	 * Otherwise if the cylinder is behind the rayStartPoint, there is not a collision.
	 * Otherwise the cylinder is in front of the player: if the ray misses/doesn't touch the cylinder,
	 * there is not a collision. Otherwise there is a collision.
	 * @param rayStartPoint starting point of the ray.
	 * @param rayNormalisedDir normalized direction of the ray.
	 * @param distance distance between the ray start point and the point on the object touched by the ray. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the ray represented by the given start point and the given normalized direction hits this object.
	 */
	checkRayIntersection(rayStartPoint, rayNormalisedDir, distance) {
		/*Check if the rayStartPoint is inside the cylinder, if so there is a collision */
		if(this._isPointInside(rayStartPoint)) {
			distance[0] = 0;
			return true;
		}

		/*Check if the cylinder is behind the rayStartPoint, if so there is not a collision */
		var l3Dimensions = [this._position[0] - rayStartPoint[0], this._position[1] - rayStartPoint[1], this._position[2] - rayStartPoint[2]];
		//Projection of l3Dimensions onto the ray direction 
		var s = l3Dimensions[0] * rayNormalisedDir[0] + l3Dimensions[1] * rayNormalisedDir[1] + l3Dimensions[2] * rayNormalisedDir[2];
		//The cylinder is behind the ray origin so no intersection
		if(s < 0){
			return false;
		}


		//Now the cylinder is in front of you
		//test some points in the direction given by the ray
		const MAX_DISTANCE = 3;
		const NUMBER_OF_POINTS = 20;
		for(var i=MAX_DISTANCE/NUMBER_OF_POINTS; i<=MAX_DISTANCE; i=i+MAX_DISTANCE/NUMBER_OF_POINTS) {
			const point = [rayStartPoint[0]+rayNormalisedDir[0]*i, rayStartPoint[1]+rayNormalisedDir[1]*i, rayStartPoint[2]+rayNormalisedDir[2]*i];
			if(this._isPointInside(point)) {
				distance[0] = otherUtils.takeDiagonal3(rayStartPoint[0]-point[0], rayStartPoint[1]-point[1], rayStartPoint[2]-point[2]);
				return true;
			}
		}

		return false;
	}



	/**
	 * It checks whether the given point is inside this cylinder.
	 * @param point point to test whether it is inside this cylinder.
	 * @returns {boolean}  whether the given point is inside this cylinder.
	 * @private
	 */
	_isPointInside(point) {
		const planarDistanceFromAxis = otherUtils.takeDiagonal2(point[0]-this._position[0], point[2]-this._position[2]);

		if(planarDistanceFromAxis <= this._radius && point[1]>=this._position[1] && point[1]<=(this._position[1]+this._height)) {
			return true;
		}

		return false;
	}

	/**
	 * It checks whether the person of the game, whose eyes are assumed to be in the camera position, hits this object.
	 * It tests some points in the body of the player to verify whether they hit this collision object.
	 * @param cameraPosition position of the camera.
	 * @param personHeight height of the person, whose eyes are assumed to be in the camera position.
	 * @param collidedPoint point of the person that is touching the object. It is set by
	 * this function if the function returns true.
	 * @param pointType type of the collided point, whether it is head, body or feet. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the person of the game, whose eyes are assumed to be in the camera position, hits this object.
	 */
	checkCollision(cameraPosition, personHeight, collidedPoint, pointType) {
		const STEP = personHeight/(NUMBER_OF_POINTS_FOR_BODY-1);
		var pointToTest;
		//body
		for(var i=FEET_POINTS; i<=(NUMBER_OF_POINTS_FOR_BODY-1)-FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1]-personHeight + i*STEP, cameraPosition[2]];

			if(this.getDistance(pointToTest)<=EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.body;
				return true;
			}
		}

		//feet
		for(var i=0; i<FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1] - personHeight + i*STEP, cameraPosition[2]];
			if (this.getDistance(pointToTest) <= EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.feet;
				return true;
			}
		}


		//head
		for(var i=0; i<FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1] - i*STEP, cameraPosition[2]];
			if (this.getDistance(pointToTest) <= EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.head;
				return true;
			}
		}

		return false;
	}

	/**
	 * It returns the resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraForce force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionForce(cameraForce, collidedPoint, pointType) {
		return this._getCollisionVector(cameraForce, collidedPoint, pointType);
	}

	/**
	 * It returns the resulting velocity obtained by the given cameraVelocity and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraVelocity force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionVelocity(cameraVelocity, collidedPoint, pointType) {
		return this._getCollisionVector(cameraVelocity, collidedPoint, pointType);
	}

	/**
	 * It returns the vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param vector vector whose direction toward the inside normal vector, of the surface of this object
	 * touched by the collidedPoint, must be removed
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given vector and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * @private
	 */
	_getCollisionVector(vector, collidedPoint, pointType) {

		if(pointType.id === PointType.body.id) {
			return this._getFrontCollision(vector, collidedPoint);
		}

		if(pointType.id === PointType.feet.id) {
			if (collidedPoint[1] > this._position[1] + this._height - EPSILON_FOR_SEPARATION) {
				//the camera is over
				if (vector[1] < 0) {
					//set to 0 the y component
					return [vector[0], 0, vector[2]];
				}
				return vector;
			}

			return this._getFrontCollision(vector, collidedPoint);
		}

		if(pointType.id === PointType.head.id) {
			if (collidedPoint[1] < this._position[1] + EPSILON_FOR_SEPARATION) {
				//the camera is below
				if (vector[1] > 0) {
					//set to 0 the y component
					return [vector[0], 0, vector[2]];
				}
				return vector;
			}

			return this._getFrontCollision(vector, collidedPoint);
		}

		return vector;
	}

	/**
	 * It returns the vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the lateral surface of this object touched by the collidedPoint.
	 * @param vector vector whose direction toward the inside normal vector, of the surface of this object
	 * touched by the collidedPoint, must be removed.
	 * @param collidedPoint collidedPoint point that is touching the surface of this object.
	 * @returns {number[]} vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the lateral surface of this object touched by the collidedPoint.
	 * @private
	 */
	_getFrontCollision(vector, collidedPoint) {
		const projectionOnTheNormal = this._projectOnTheNormal(vector, collidedPoint);

		if(otherUtils.dotProduct(vector, this._insideNormalVector(collidedPoint))>0) {
			return [vector[0]-projectionOnTheNormal[0], vector[1], vector[2]-projectionOnTheNormal[2]];
		}

		return vector;
	}

	/**
	 * It projects the given vector on the inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @param vector vector to project
	 * @param collidedPoint point on which the normal vector starts
	 * @returns {number[]} projection of the given vector on the inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @private
	 */
	_projectOnTheNormal(vector, collidedPoint) {
		const insideNormalVector = this._insideNormalVector(collidedPoint);
		return otherUtils.projectionOnVector2(vector, insideNormalVector);
	}

	/**
	 * It returns the inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @param collidedPoint point on which the normal vector starts
	 * @returns {number[]} inside normal vector on the given collidedPoint on the
	 * surface of this object
	 * @private
	 */
	_insideNormalVector(collidedPoint) {
		const insideVector = [this._position[0]-collidedPoint[0], 0, this._position[2]-collidedPoint[2]];
		const insideVectorLength = Math.sqrt(Math.pow(insideVector[0], 2)+Math.pow(insideVector[1], 2)+Math.pow(insideVector[2], 2));
		const insideNormalVector = [insideVector[0]/insideVectorLength, 0, insideVector[2]/insideVectorLength];
		return insideNormalVector;
	}

	/**
	 * It returns the distance of the given point from this object
	 * @param startPoint point from which the distance is measured
	 * @returns {number} distance of the given point from this object
	 */
	getDistance(startPoint) {
		if(startPoint[1]<this._position[1]) {
			//below
			const distanceFromCenter = otherUtils.takeDiagonal2(startPoint[0]-this._position[0], startPoint[2]-this._position[2]);
			if(distanceFromCenter<this._radius) {
				//below and below vertically to the cylinder, not below and x and z very far
				return otherUtils.abs(this._position[1]-startPoint[1]);
			}
			distanceFromBorder = otherUtils.takeDiagonal2(distanceFromCenter-this._radius, (this._position[1]-startPoint[1]));
			return distanceFromBorder;
		}
		if(startPoint[1]>(this._position[1]+this._height)) {
			//over
			const distanceFromCenter = otherUtils.takeDiagonal2(startPoint[0]-this._position[0], startPoint[2]-this._position[2]);
			if(distanceFromCenter<this._radius) {
				//over and over vertically to the cylinder, not over and x and z very far
				return otherUtils.abs(startPoint[1]-(this._position[1]+this._height));
			}
			distanceFromBorder = otherUtils.takeDiagonal2(distanceFromCenter-this._radius, startPoint[1]-(this._position[1]+this._height));
			return distanceFromBorder;
		}
		//front
		var distanceFromBorder = otherUtils.takeDiagonal2(startPoint[0]-this._position[0],
			startPoint[2]-this._position[2])-this._radius;

		if(distanceFromBorder<0) {
			return 0;
		}

		return distanceFromBorder;
	}

	/**
	 * It says whether this object is very far away from the given point. If it returns yes, then this object is
	 * for sure not touching the player. If it returns false then it may be touching the player.
	 * @param point point from which the distance is considered.
	 * @param bodyAllowance allowance due to the dimensions of the body of the player.
	 * @param extraAllowance extra allowance in order to stay safe to approximations.
	 * @returns {boolean} whether this object is very far away from the given point.
	 */
	isFarAway(point, bodyAllowance, extraAllowance) {
		const diagonal = otherUtils.takeDiagonal3(point[0]-this._position[0], point[1]-this._position[1],
			point[2]-this._position[2]);

		if(diagonal > (this._radius+this._height) + bodyAllowance + extraAllowance) {
			return true;
		}

		return false;
	}

	/**
	 * It scales this collision object with the given parameter
	 * @param scaling scaling parameter
	 */
	setScaling(scaling) {
		this._radius = this._radius*scaling[0];
		this._height = this._height*scaling[1];
	}
}

/**
 * Collision class that represents a collision object with a shape of a rectangular parallelepiped for an object in the scene.
 */
class ParallelepipedCollision extends Collision {
	/**
	 * Position of the center of the bottom of the parallelepiped object.
	 * @type {number[]}
	 * @private
	 */
	_position=[0, 0, 0];
	/**
	 * Half of the width along the x axis of the parallelepiped.
	 * @type {number}
	 * @private
	 */
	_hwidthX=0;
	/**
	 * Height of the parallelepiped.
	 * @type {number}
	 * @private
	 */
	_height=0;
	/**
	 * Half of the width along the z axis of the parallelepiped.
	 * @type {number}
	 * @private
	 */
	_hwidthZ=0;

	/**
	 * Constructor of ParallelepipedCollision. It creates a ParallelepipedCollision object with the
	 * given center of the base, half of the width along the x axis, height and
	 * half of the width along the z axis
	 * @param position center of the base
	 * @param hwidthX half of the width along the x axis
	 * @param height height
	 * @param hwidthZ half of the width along the z axis
	 */
	constructor(position, hwidthX, height, hwidthZ) {
		super();
		if(position!=null) {
			this._position = otherUtils.copyArray(position);
		}
		this._hwidthX = hwidthX;
		this._height = height;
		this._hwidthZ = hwidthZ;
	}

	/**
	 * It sets the position of the center of this object with the given one.
	 * @param position position of the center, that is used to set the position
	 * of the center of this object.
	 */
	setPosition(position) {
		this._position = otherUtils.copyArray(position);
	}

	/**
	 * It copies this object with its attributes.
	 * @returns {Collision} copy of this object.
	 */
	copy() {
		return new ParallelepipedCollision(otherUtils.copyArray(this._position), this._hwidthX, this._height, this._hwidthZ);
	}

	/**
	 * It checks whether the ray represented by the given start point and the given normalized direction hits this object. If
	 * yes then distance will contain the distance between the ray start point and the point on the object touched by the ray.
	 * It checks if the rayStartPoint is inside the parallelepiped, if so there is a collision.
	 * Otherwise if the parallelepiped is behind the rayStartPoint, there is not a collision.
	 * Otherwise tests some points in the direction of the ray, if a point is inside the parallelepiped
	 * then there is a collision.
	 * Otherwise there is not a collision.
	 * @param rayStartPoint starting point of the ray.
	 * @param rayNormalisedDir normalized direction of the ray.
	 * @param distance distance between the ray start point and the point on the object touched by the ray. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the ray represented by the given start point and the given normalized direction hits this object.
	 */
	checkRayIntersection(rayStartPoint, rayNormalisedDir, distance) {
		/*Check if the rayStartPoint is inside the parallelepiped, if so there is a collision */

		//If this is true, the ray origin is inside the parallelepiped so it collides with the parallelepiped
		if(this._isPointInside(rayStartPoint)) {
			distance[0] = 0;
			return true;
		}

		/*Check if the parallelepiped is behind the rayStartPoint, if so there is not a collision */
		var l3Dimensions = [this._position[0] - rayStartPoint[0], this._position[1] - rayStartPoint[1], this._position[2] - rayStartPoint[2]];
		//Projection of l3Dimensions onto the ray direction 
		var s = l3Dimensions[0] * rayNormalisedDir[0] + l3Dimensions[1] * rayNormalisedDir[1] + l3Dimensions[2] * rayNormalisedDir[2];
		//The parallelepiped is behind the ray origin so no intersection
		if(s < 0) {
			return false;
		}

		//test some points in the direction given by the ray
		const MAX_DISTANCE = 3;
		const NUMBER_OF_POINTS = 20;
		for(var i=MAX_DISTANCE/NUMBER_OF_POINTS; i<=MAX_DISTANCE; i=i+MAX_DISTANCE/NUMBER_OF_POINTS) {
			const point = [rayStartPoint[0]+rayNormalisedDir[0]*i, rayStartPoint[1]+rayNormalisedDir[1]*i, rayStartPoint[2]+rayNormalisedDir[2]*i];
			if(this._isPointInside(point)) {
				distance[0] = otherUtils.takeDiagonal3(rayStartPoint[0]-point[0], rayStartPoint[1]-point[1], rayStartPoint[2]-point[2]);
				return true;
			}
		}

		return false;
	}

	/**
	 * It checks whether the given point is inside this parallelepiped.
	 * @param point point to test whether it is inside this parallelepiped.
	 * @returns {boolean}  whether the given point is inside this parallelepiped.
	 * @private
	 */
	_isPointInside(point) {
		if((point[0]>=(this._position[0]-this._hwidthX) && point[0]<=(this._position[0]+this._hwidthX)) &&
			(point[2]>=(this._position[2]-this._hwidthZ) && point[2]<=(this._position[2]+this._hwidthZ)) &&
			point[1]>=this._position[1] && point[1]<=(this._position[1]+this._height)) {
			return true;
		}

		return false;
	}

	/**
	 * It checks whether the person of the game, whose eyes are assumed to be in the camera position, hits this object.
	 * It tests some points in the body of the player to verify whether they hit this collision object.
	 * @param cameraPosition position of the camera.
	 * @param personHeight height of the person, whose eyes are assumed to be in the camera position.
	 * @param collidedPoint point of the person that is touching the object. It is set by
	 * this function if the function returns true.
	 * @param pointType type of the collided point, whether it is head, body or feet. It is set by
	 * this function if the function returns true.
	 * @returns {boolean} whether the person of the game, whose eyes are assumed to be in the camera position, hits this object.
	 */
	checkCollision(cameraPosition, personHeight, collidedPoint, pointType) {
		const STEP = personHeight/(NUMBER_OF_POINTS_FOR_BODY-1);
		var pointToTest;
		//body
		for(var i=FEET_POINTS; i<=(NUMBER_OF_POINTS_FOR_BODY-1)-FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1]-personHeight + i*STEP, cameraPosition[2]];

			if(this.getDistance(pointToTest)<=EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.body;
				return true;
			}
		}

		//feet
		for(var i=0; i<FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1] - personHeight + i*STEP, cameraPosition[2]];
			if (this.getDistance(pointToTest) <= EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.feet;
				return true;
			}
		}


		//head
		for(var i=0; i<FEET_POINTS; i=i+1) {
			pointToTest = [cameraPosition[0], cameraPosition[1] - i*STEP, cameraPosition[2]];
			if (this.getDistance(pointToTest) <= EPSILON_FOR_DISTANCE) {
				collidedPoint[0] = pointToTest[0];
				collidedPoint[1] = pointToTest[1];
				collidedPoint[2] = pointToTest[2];
				pointType[0] = PointType.head;
				return true;
			}
		}

		return false;
	}

	/**
	 * It returns the resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraForce force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting force obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionForce(cameraForce, collidedPoint, pointType) {
		return this._getCollisionVector(cameraForce, collidedPoint, pointType);
	}

	/**
	 * It returns the resulting velocity obtained by the given cameraVelocity and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param cameraVelocity force on the camera.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given cameraForce and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 */
	getCollisionVelocity(cameraVelocity, collidedPoint, pointType) {
		return this._getCollisionVector(cameraVelocity, collidedPoint, pointType);
	}

	/**
	 * It returns the vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * If a point is head then the collision can be only from the top or laterally.
	 * If a point is body then the collision can be only laterally.
	 * If a point is feet then the collision can be only from the bottom or laterally.
	 * @param vector vector whose direction toward the inside normal vector, of the surface of this object
	 * touched by the collidedPoint, must be removed.
	 * @param collidedPoint point that is touching the surface of this object.
	 * @param pointType type of the collided point, whether it is head, body or feet.
	 * @returns {number[]} resulting velocity obtained by the given vector and by removing the part in the direction of the
	 * inside normal vector of the surface of this object touched by the collidedPoint.
	 * @private
	 */
	_getCollisionVector(vector, collidedPoint, pointType) {
		if(pointType.id === PointType.body.id) {
			return this._getFrontCollision(vector, collidedPoint);
		}

		if(pointType.id === PointType.feet.id) {
			if(collidedPoint[1]>this._position[1]+this._height-EPSILON_FOR_SEPARATION){
				//over
				const insideNormalVector = [0, -1, 0];
				const projectionOnTheNormal = otherUtils.projectionOnVector2(vector, insideNormalVector);

				if(otherUtils.dotProduct(vector, insideNormalVector)>0) {
					return [vector[0]-projectionOnTheNormal[0], vector[1]-projectionOnTheNormal[1], vector[2]-projectionOnTheNormal[2]];
				}

				return vector;
			}


			return this._getFrontCollision(vector, collidedPoint);
		}

		if(pointType.id === PointType.head.id) {
			if(collidedPoint[1]<this._position[1]+EPSILON_FOR_SEPARATION){
				//below
				const insideNormalVector = [0, 1, 0];
				const projectionOnTheNormal = otherUtils.projectionOnVector2(vector, insideNormalVector);

				if(otherUtils.dotProduct(vector, insideNormalVector)>0) {
					return [vector[0]-projectionOnTheNormal[0], vector[1]-projectionOnTheNormal[1], vector[2]-projectionOnTheNormal[2]];
				}

				return vector;
			}
			return this._getFrontCollision(vector, collidedPoint);
		}

		return vector;
	}

	/**
	 * It returns the vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the lateral surface of this object touched by the collidedPoint.
	 * @param vector vector whose direction toward the inside normal vector, of the surface of this object
	 * touched by the collidedPoint, must be removed.
	 * @param collidedPoint collidedPoint point that is touching the surface of this object.
	 * @returns {number[]} vector obtained by the given vector and by removing the part in the direction toward the
	 * inside normal vector of the lateral surface of this object touched by the collidedPoint.
	 * @private
	 */
	_getFrontCollision(vector, collidedPoint) {
		var insideNormalVector = [0, -1, 0];
		if(collidedPoint[0]>this._position[0]+this._hwidthX-EPSILON_FOR_SEPARATION) {
			//right
			insideNormalVector = [-1, 0, 0];
		} else if(collidedPoint[0]<this._position[0]-this._hwidthX+EPSILON_FOR_SEPARATION) {
			//left
			insideNormalVector = [1, 0, 0];
		} else if(collidedPoint[2]>this._position[2]+this._hwidthZ-EPSILON_FOR_SEPARATION) {
			//higherZ
			insideNormalVector = [0, 0, -1];
		} else if(collidedPoint[2]<this._position[2]-this._hwidthZ+EPSILON_FOR_SEPARATION){
			//lowerZ
			insideNormalVector = [0, 0, 1];
		}

		const projectionOnTheNormal = otherUtils.projectionOnVector2(vector, insideNormalVector);

		if(otherUtils.dotProduct(vector, insideNormalVector)>0) {
			return [vector[0]-projectionOnTheNormal[0], vector[1]-projectionOnTheNormal[1], vector[2]-projectionOnTheNormal[2]];
		}

		return vector;
	}

	/**
	 * It returns the distance of the given point from this object.
	 * @param startPoint point from which the distance is measured.
	 * @returns {number} distance of the given point from this object.
	 */
	getDistance(startPoint) {
		if(startPoint[1]>this._position[1]+this._height-EPSILON_FOR_SEPARATION) {
			//over
			return this._getDistanceOver(startPoint);
		}
		
		if(startPoint[1]<this._position[1]+EPSILON_FOR_SEPARATION) {
			//below
			return this._getDistanceBelow(startPoint);
		}

		//startPoint is at the same level of the parallelepiped
		return this._getDistanceSameLevel(startPoint);
		
	}

	/**
	 * It returns the distance of the given point from this object.
	 * The startPoint is assumed to be over the parallelepiped.
	 * @param startPoint point from which the distance is measured.
	 * @returns {number} distance of the given point from this object.
	 * @private
	 */
	_getDistanceOver(startPoint) {
		return this._getDistanceOverBelow(startPoint, true);
	}

	/**
	 * It returns the distance of the given point from this object.
	 * The startPoint is assumed to be below the parallelepiped.
	 * @param startPoint point from which the distance is measured.
	 * @returns {number} distance of the given point from this object.
	 * @private
	 */
	_getDistanceBelow(startPoint) {
		return this._getDistanceOverBelow(startPoint, false);
	}


	/**
	 * It returns the distance of the given point from this object.
	 * The startPoint is assumed to be over or below the parallelepiped,
	 * according to the value of the parameter isOver.
	 * @param startPoint point from which the distance is measured.
	 * @param isOver whether to consider the point over (true) or below (false)
	 * the parallelepiped.
	 * @returns {number} distance of the given point from this object.
	 * @private
	 */
	_getDistanceOverBelow(startPoint, isOver) {
		var yShift;

		if(isOver) {
			yShift = this._height;
		} else {
			yShift = 0;
		}

		if(startPoint[0]>this._position[0]+this._hwidthX-EPSILON_FOR_SEPARATION) {
			//it is on the right
			if(startPoint[2]>this._position[2]-this._hwidthZ) {
				if(startPoint[2]<this._position[2]+this._hwidthZ) {
					//center-right
					const edge = [this._position[0]+this._hwidthX, this._position[1]+yShift, this._position[2]];
					return otherUtils.takeDiagonal2(startPoint[0]-edge[0], startPoint[1]-edge[1]);
				}

				//higherZ(camera has a z less then the parallelepiped)-right
				const vertex = [this._position[0]+this._hwidthX, this._position[1]+yShift, this._position[2]+this._hwidthZ];
				return otherUtils.takeDiagonal3(startPoint[0]-vertex[0], startPoint[1]-vertex[1],startPoint[2]-vertex[2]);
			}

			//lowerZ-right
			const vertex = [this._position[0]+this._hwidthX, this._position[1]+yShift, this._position[2]-this._hwidthZ];
			return otherUtils.takeDiagonal3(startPoint[0]-vertex[0], startPoint[1]-vertex[1], startPoint[2]-vertex[2]);
		}

		
		if(startPoint[0]<this._position[0]-this._hwidthX+EPSILON_FOR_SEPARATION) {
			//it is on the left
			if(startPoint[2]>this._position[2]-this._hwidthZ) {
				if(startPoint[2]<this._position[2]+this._hwidthZ) {
					//center-left
					const edge = [this._position[0]-this._hwidthX, this._position[1]+yShift, this._position[2]];
					return otherUtils.takeDiagonal2(startPoint[0]-edge[0], startPoint[1]-edge[1]);
				}

				//higherZ-left
				const vertex = [this._position[0]-this._hwidthX, this._position[1]+yShift, this._position[2]+this._hwidthZ];
				return otherUtils.takeDiagonal3(startPoint[0]-vertex[0], startPoint[1]-vertex[1], startPoint[2]-vertex[2]);
			}

			//lowerZ-left
			const vertex = [this._position[0]-this._hwidthX, this._position[1]+yShift, this._position[2]-this._hwidthZ];
			return otherUtils.takeDiagonal3(startPoint[0]-vertex[0], startPoint[1]-vertex[1], startPoint[2]-vertex[2]);
		}

		//it is on the middle
		if(startPoint[2]<this._position[2]-this._hwidthZ+EPSILON_FOR_SEPARATION) {
			//lowerZ-middle
			const edge = [this._position[0], this._position[1]+yShift, this._position[2]-this._hwidthZ];
			return otherUtils.takeDiagonal2(startPoint[2]-edge[2], startPoint[1]-edge[1]);
		}

		if(startPoint[2]>this._position[2]+this._hwidthZ-EPSILON_FOR_SEPARATION) {
			//higherZ-middle
			const edge = [this._position[0], this._position[1]+yShift, this._position[2]+this._hwidthZ];
			return otherUtils.takeDiagonal2(startPoint[2]-edge[2], startPoint[1]-edge[1]);
		}

		//directly over
		return otherUtils.abs(startPoint[1]-(this._position[1]+yShift));
	}

	/**
	 * It returns the distance of the given point from this object.
	 * The startPoint is assumed to be at the same level of the parallelepiped,
	 * not over nor below.
	 * @param startPoint point from which the distance is measured.
	 * @returns {number} distance of the given point from this object.
	 * @private
	 */
	_getDistanceSameLevel(startPoint) {
		//it is on the right
		if(startPoint[0]>this._position[0]+this._hwidthX-EPSILON_FOR_SEPARATION) {
			if(startPoint[2]>this._position[2]-this._hwidthZ) {
				if(startPoint[2]<this._position[2]+this._hwidthZ) {
					return otherUtils.abs(startPoint[0]-(this._position[0]+this._hwidthX));
				}

				//higherZ-right
				const vertex = [this._position[0]+this._hwidthX, 0, this._position[2]+this._hwidthZ];
				return otherUtils.takeDiagonal2(startPoint[0]-vertex[0], startPoint[2]-vertex[2]);
			}

			//lowerZ-right
			const vertex = [this._position[0]+this._hwidthX, 0, this._position[2]-this._hwidthZ];
			return otherUtils.takeDiagonal2(startPoint[0]-vertex[0], startPoint[2]-vertex[2]);
		}

		//it is on the left
		if(startPoint[0]<this._position[0]-this._hwidthX+EPSILON_FOR_SEPARATION) {
			if(startPoint[2]>this._position[2]-this._hwidthZ) {
				if(startPoint[2]<this._position[2]+this._hwidthZ) {
					return otherUtils.abs(startPoint[0]-(this._position[0]-this._hwidthX));
				}

				//higherZ-left
				const vertex = [this._position[0]-this._hwidthX, 0, this._position[2]+this._hwidthZ];
				return otherUtils.takeDiagonal2(startPoint[0]-vertex[0], startPoint[2]-vertex[2]);
			}

			//lowerZ-left
			const vertex = [this._position[0]-this._hwidthX, 0, this._position[2]-this._hwidthZ];
			return otherUtils.takeDiagonal2(startPoint[0]-vertex[0], startPoint[2]-vertex[2]);
		}

		//it is on the middle
		if(startPoint[2]<this._position[2]-this._hwidthZ+EPSILON_FOR_SEPARATION) {
			//lowerZ-middle
			return otherUtils.abs(startPoint[2]-(this._position[2]-this._hwidthZ));
		}

		if(startPoint[2]>this._position[2]+this._hwidthZ-EPSILON_FOR_SEPARATION) {
			//higherZ-middle
			return otherUtils.abs(startPoint[2]-(this._position[2]+this._hwidthZ));
		}

		//the point is inside
		return 0;
	}

	/**
	 * It says whether this object is very far away from the given point. If it returns yes, then this object is
	 * for sure not touching the player. If it returns false then it may be touching the player.
	 * @param point point from which the distance is considered.
	 * @param bodyAllowance allowance due to the dimensions of the body of the player.
	 * @param extraAllowance extra allowance in order to stay safe to approximations.
	 * @returns {boolean} whether this object is very far away from the given point.
	 */
	isFarAway(point, bodyAllowance, extraAllowance) {
		const diagonal = otherUtils.takeDiagonal3(point[0]-this._position[0], point[1]-this._position[1],
			point[2]-this._position[2]);

		if(diagonal > (this._hwidthX+this._hwidthZ+this._height) + bodyAllowance + extraAllowance) {
			return true;
		}

		return false;
	}

	/**
	 * It scales this collision object with the given parameter
	 * @param scaling scaling parameter
	 */
	setScaling(scaling) {
		this._hwidthX = this._hwidthX*scaling[0];
		this._height = this._height*scaling[1];
		this._hwidthZ = this._hwidthZ*scaling[2];
	}

}