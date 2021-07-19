/**
 * Utility variable that contains some useful functions in order to work with matrices and vectors
 */
var otherUtils={
	/**
	 * It returns the copy of the given 4x4 matrix
	 * @param matrix 4x4 matrix to copy
	 * @returns {*[]} copy of the given 4x4 matrix
	 */
	copyMatrix: function(matrix) {
		return [matrix[0],matrix[1],matrix[2],matrix[3],
				matrix[4],matrix[5],matrix[6],matrix[7],
				matrix[8],matrix[9],matrix[10],matrix[11],
				matrix[12],matrix[13],matrix[14],matrix[15]];
	},

	/**
	 * It converts the given angle from degrees to radians
	 * @param degrees angle in degrees to convert
	 * @returns {number} angle in radians converted from the given angle in degrees
	 */
	degToRad: function(degrees) {
		return degrees/360*2*Math.PI;
	},

	/**
	 * It inverts and transposes the given matrix
	 * @param matrix matrix to invert and transpose
	 * @returns {[]} inverted and transposed matrix of the given one
	 */
	invTransp: function(matrix) {
		return utils.transposeMatrix(utils.invertMatrix(matrix));
	},

	/**
	 * It returns a copy of the given array
	 * @param array array to copy
	 * @returns {[]} copy of the given array
	 */
	copyArray: function(array) {
		const newArray = [];
		for(var i=0; i<array.length; i++) {
			newArray[i] = array[i];
		}

		return newArray;
	},

	/**
	 * It returns the diagonal of the rectangular triangle with the two given catheti
	 * @param length1 first cathetus
	 * @param length2 second cathetus
	 * @returns {number} diagonal of the rectangular triangle with the two given catheti
	 */
	takeDiagonal2: function(length1, length2) {
		const diagonal = Math.sqrt(Math.pow(length1, 2)+Math.pow(length2, 2));
		return diagonal;
	},

	/**
	 * It returns the square root of the sum of the squared power of the given lengths
	 * @param length1 first length
	 * @param length2 second length
	 * @param length3 third length
	 * @returns {number} square root of the sum of the squared power of the given lengths
	 */
	takeDiagonal3: function(length1, length2, length3) {
		const diagonal = Math.sqrt(Math.pow(length1, 2)+Math.pow(length2, 2)+Math.pow(length3, 2));
		return diagonal;
	},

	/**
	 * It returns the dot product of the given two vectors
	 * @param vector1 first vector
	 * @param vector2 second vector
	 * @returns {number[]} dot product of the given two vectors
	 */
	dotProduct(vector1, vector2) {
		return vector1[0]*vector2[0] + vector1[1]*vector2[1] + vector1[2]*vector2[2];
	},

	/**
	 * It returns the projection of the first vector on the second vector
	 * @param vector1 vector to project
	 * @param vector2 vector on which the projection is done
	 * @returns {number[]} projection of the first vector on the second vector
	 */
	projectionOnVector2(vector1, vector2) {
		const dot = otherUtils.dotProduct(vector1, vector2);
		const vector2Length = Math.sqrt(Math.pow(vector2[0], 2)+Math.pow(vector2[1], 2)+Math.pow(vector2[2], 2));
		const vector2LengthSquared = Math.pow(vector2Length, 2);
		const projection = [vector2[0]*dot/vector2LengthSquared, vector2[1]*dot/vector2LengthSquared, vector2[2]*dot/vector2LengthSquared];
		return projection;
	},

	/**
	 * It returns the maximum between the two given values
	 * @param value1 first value
	 * @param value2 second value
	 * @returns {number} maximum between the two given values
	 */
	max(value1, value2) {
		if(value1>value2)
			return value1;

		return value2;
	},

	/**
	 * It returns the absolute value of the given value
	 * @param value1 number
	 * @returns {number} absolute value of the given value
	 */
	abs(value1) {
		if(value1>0)
			return value1;

		return -value1;
	}


};
