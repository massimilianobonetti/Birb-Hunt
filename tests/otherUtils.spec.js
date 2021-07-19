TestCase("copyMatrix", {
    "test copyMatrix negative value": function() {
        const matrix = [4, 7, 1, 0,
                        -3, 9, 235, -346,
                        5, 23, 76, 4,
                        0, 1, 0.75, 6];
        const copiedMatrix =  otherUtils.copyMatrix(matrix);
        for(var i=0; i<matrix.length; i++) {
            assertEquals(matrix[i], copiedMatrix[i]);
        }
    }
});

TestCase("degToRad", {
    "test degToRad with 90 degrees": function() {
        assertEquals(Math.PI/2, otherUtils.degToRad(90));
    },

    "test degToRad with 0 degrees": function() {
        assertEquals(0, otherUtils.degToRad(0));
    },

    "test degToRad with 30 degrees": function() {
        assertEquals(30/360*2*Math.PI, otherUtils.degToRad(30));
    }
});

TestCase("invTransp", {
    "test invTransp": function() {
        const matrix = [4, 0.003, 1, 0,
            -3, 9, 235, -346,
            5, 23, 76, 4,
            0, 1, 0.75, 6];

        const expectedMatrix = [0.2307,   -0.3160,    0.0782,    0.0429,
                                -0.0043,   -0.0580,    0.0174,    0.0075,
                                0.0129,    0.2180,   -0.0521,   -0.0298,
                                -0.2576,   -3.4910,    1.0409,    0.6184];

        const actualMatrix =  otherUtils.invTransp(matrix);
        for(var i=0; i<expectedMatrix.length; i++) {
            assertEquals(expectedMatrix[i], +actualMatrix[i].toFixed(4));
        }
    }
});

TestCase("copyArray", {
    "test copyArray": function() {
        const array = [4, 7, 1, 0, -9, 0.76, -0.35, 0];
        const copiedArray =  otherUtils.copyArray(array);
        for(var i=0; i<array.length; i++) {
            assertEquals(array[i], copiedArray[i]);
        }
    },
    "test copyArray with an array empty": function() {
        const array = [];
        const copiedArray =  otherUtils.copyArray(array);
        assertEquals(0, copiedArray.length);
    }
});

TestCase("takeDiagonal2", {
    "test takeDiagonal2 positive values": function() {
        assertEquals(5, otherUtils.takeDiagonal2(3, 4));
    },

    "test takeDiagonal2 negative values": function() {
        assertEquals(40.311288741492746, otherUtils.takeDiagonal2(-40, -5));
    }
});


TestCase("takeDiagonal3", {
    "test takeDiagonal3 positive values": function() {
        assertEquals(7.0711, +otherUtils.takeDiagonal3(3, 4, 5).toFixed(4));
    },

    "test takeDiagonal3 negative values": function() {
        assertEquals(95.8853, +otherUtils.takeDiagonal3(-40, -5, -87).toFixed(4));
    }
});

TestCase("dotProduct", {
    "test dotProduct positive values": function() {
        const vector1 = [4, 7, -1];
        const vector2 = [0.5, -2, 6];
        assertEquals(-18, otherUtils.dotProduct(vector1, vector2));
    }
});

TestCase("projectionOnVector2", {
    "test dotProduct positive values": function() {
        const vector1 = [4, 7, -1];
        const vector2 = [0.5, -2, 6];
        const vector2LengthSquared = 40.25;
        const expectedResult = [0.5*(-18)/vector2LengthSquared, -2*(-18)/vector2LengthSquared, 6*(-18)/vector2LengthSquared];

        const actualResult = otherUtils.projectionOnVector2(vector1, vector2);

        for(var i=0; i<expectedResult.length; i++) {
            console.log(i);
            console.log(+expectedResult[i].toFixed(4));
            console.log(+actualResult[i].toFixed(4));
            assertEquals(+expectedResult[i].toFixed(4), +actualResult[i].toFixed(4));
        }
    }
});

TestCase("max", {
    "test max": function() {
        assertEquals(9, otherUtils.max(-5, 9));
    },

    "test max with zero as first parameter": function() {
        assertEquals(0, otherUtils.max(0, -4));
    }
});

TestCase("abs", {
    "test abs negative value": function() {
        assertEquals(5, otherUtils.abs(-5));
    },

    "test abs with zero": function() {
        assertEquals(0, otherUtils.abs(0));
    },

    "test abs positive value": function() {
        assertEquals(7, otherUtils.abs(7));
    }
});