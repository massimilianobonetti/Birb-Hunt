TestCase("SphereCollision test", {
    "test checkRayIntersection true": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var distance=[0];
        const isCollision = sphereCollision.checkRayIntersection([0, 0, 1], [0, 0, -1], distance);
        assertEquals(true, isCollision);
        assertEquals(0.3000, +distance[0].toFixed(4));
    },

    "test checkRayIntersection false": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var distance=[0];
        const isCollision = sphereCollision.checkRayIntersection([0, 0, 1], [0, 1, 0], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection behind": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var distance=[0];
        const isCollision = sphereCollision.checkRayIntersection([0, 0, 1], [0, 0, 1], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection inside": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var distance=[0];
        const isCollision = sphereCollision.checkRayIntersection([0, 0, 0], [0, 0, -1], distance);
        assertEquals(true, isCollision);
    },

    "test checkCollision body collision": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var collidedPoint=[];
        var pointType=PointType.head;
        const isCollision = sphereCollision.checkCollision([0, 0, 0.71], 1.7, collidedPoint, pointType);
        assertEquals(PointType.body.id, pointType[0].id);
        assertEquals(true, isCollision);
        assertEquals(0, collidedPoint[0]);
        assertEquals(-0.85, +collidedPoint[1].toFixed(4));
        assertEquals(0.71, collidedPoint[2]);
    },

    "test checkCollision feet collision": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var collidedPoint=[];
        var pointType=PointType.head;
        const isCollision = sphereCollision.checkCollision([0, 2.5, 0], 1.7, collidedPoint, pointType);
        assertEquals(PointType.feet.id, pointType[0].id);
        assertEquals(true, isCollision);
        assertEquals(0, collidedPoint[0]);
        assertEquals(0.8000, +collidedPoint[1].toFixed(4));
        assertEquals(0, collidedPoint[2]);
    },

    "test checkCollision false": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var collidedPoint;
        var pointType=PointType.head;
        const isCollision = sphereCollision.checkCollision([0, 0, 5], 1.7, collidedPoint, pointType);
        assertEquals(false, isCollision);
    },

    "test getCollisionForce over position and down force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.feet;
        const collisionForce = sphereCollision.getCollisionForce([1, -2, 1], [0, 0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce over position and up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.feet;
        const collisionForce = sphereCollision.getCollisionForce([1, 4, 1], [0, 0.701, 0], pointType);
        const expectedResult = [1, 4, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce over position and zero up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.feet;
        const collisionForce = sphereCollision.getCollisionForce([1, 0, 1], [0, 0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and down force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.head;
        const collisionForce = sphereCollision.getCollisionForce([1, -2, 1], [0, -0.701, 0], pointType);
        const expectedResult = [1, -2, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.head;
        const collisionForce = sphereCollision.getCollisionForce([1, 4, 1], [0, -0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and zero up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.head;
        const collisionForce = sphereCollision.getCollisionForce([1, 0, 1], [0, -0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and inside normal force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.body;
        const collisionForce = sphereCollision.getCollisionForce([1, 0, -3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and outside normal force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.body;
        const collisionForce = sphereCollision.getCollisionForce([1, 0, 3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and zero normal force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.body;
        const collisionForce = sphereCollision.getCollisionForce([1, 0, 0], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionVelocity over position and down force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.feet;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, -2, 1], [0, 0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity over position and up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.body;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, 4, 1], [0, 0.701, 0], pointType);
        const expectedResult = [1, 4, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity over position and zero up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.feet;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, 0, 1], [0, 0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and down force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.head;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, -2, 1], [0, -0.701, 0], pointType);
        const expectedResult = [1, -2, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.head;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, 4, 1], [0, -0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and zero up force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.head;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, 0, 1], [0, -0.701, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<collisionVelocity.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and inside normal force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.body;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, 0, -3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and outside normal force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.body;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, 0, 3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and zero normal force": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        var pointType=PointType.body;
        const collisionVelocity = sphereCollision.getCollisionVelocity([1, 0, 0], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test _projectOnTheNormal": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        const result = sphereCollision._projectOnTheNormal([1, -2, -3], [0, 0, 0.701]);
        const expectedResult = [0, 0, -3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], result[i]);
        }
    },

    "test _insideNormalVector": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);
        const result = sphereCollision._insideNormalVector([0, 0, 0.701]);
        const expectedResult = [0, 0, -1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], result[i]);
        }
    },

    "test getDistance front": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getDistance([0, 0, 5]);
        assertEquals(4.3, +distance.toFixed(4));
    },

    "test getDistance above": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getDistance([0, 3, 4]);
        assertEquals(4.3, +distance.toFixed(4));
    },

    "test getDistance inside": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getDistance([0, 0, 0.1]);
        assertEquals(0, +distance.toFixed(4));
    },

    "test getCylinderDistance front": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getCylinderDistance([0, 0, 5]);
        assertEquals(4.3, +distance.toFixed(4));
    },

    "test getCylinderDistance over": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getCylinderDistance([0, 3, 4]);
        assertEquals(4.0224, +distance.toFixed(4));
    },

    "test getCylinderDistance over vertically": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getCylinderDistance([0, 3, 0]);
        assertEquals(2.3, +distance.toFixed(4));
    },

    "test getCylinderDistance below": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getCylinderDistance([0, -3, 4]);
        assertEquals(4.0224, +distance.toFixed(4));
    },

    "test getCylinderDistance below vertically": function() {
        const sphereCollision = new SphereCollision([0, 0, 0], 0.7);

        const distance = sphereCollision.getCylinderDistance([0, -3, 0]);
        assertEquals(2.3, +distance.toFixed(4));
    },

    "test getCylinderDistance front arbitrary position": function() {
        const sphereCollision = new SphereCollision([1, 2, 3], 0.7);

        const distance = sphereCollision.getCylinderDistance([1, 2, 4]);
        assertEquals(0.3, +distance.toFixed(4));
    },

    "test getCylinderDistance inside": function() {
        const sphereCollision = new SphereCollision([1, 2, 3], 0.7);

        const distance = sphereCollision.getCylinderDistance([1, 2.1, 3]);
        assertEquals(0, +distance.toFixed(4));
    },

    "test isFarAway true": function() {
        const sphereCollision = new SphereCollision([1, 2, 3], 0.7);

        assertEquals(true, sphereCollision.isFarAway([10, 7, 8], 1.7, 3));
    },

    "test isFarAway false": function() {
        const sphereCollision = new SphereCollision([1, 2, 3], 0.7);

        assertEquals(false, sphereCollision.isFarAway([1, 2, 4], 1.7, 3));
    }
});

TestCase("CylinderCollision test", {
    "test getDistance": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.896);

        const distance = cylinderCollision.getDistance([0, 2.8, 0]);
        assertEquals(1.904, distance);
    },

    "test checkRayIntersection true": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var distance=[0];
        const isCollision = cylinderCollision.checkRayIntersection([0, 0, 1], [0, 0, -1], distance);
        assertEquals(true, isCollision);
        assertEquals(0.3000, +distance[0].toFixed(4));
    },

    "test checkRayIntersection false": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var distance=[0];
        const isCollision = cylinderCollision.checkRayIntersection([0, 0, 1], [0, 1, 0], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection behind": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.7);
        var distance=[0];
        const isCollision = cylinderCollision.checkRayIntersection([0, 0, 1], [0, 0, 1], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection inside": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.7);
        var distance=[0];
        const isCollision = cylinderCollision.checkRayIntersection([0, 0, 0], [0, 0, -1], distance);
        assertEquals(true, isCollision);
    },

    "test checkRayIntersection false too high": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 1);
        var distance=[0];
        const isCollision = cylinderCollision.checkRayIntersection([0, 0, 2], [0, 4, -1], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection false too low": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 1);
        var distance=[0];
        const isCollision = cylinderCollision.checkRayIntersection([0, 0, 2], [0, -4, -1], distance);
        assertEquals(false, isCollision);
    },

    "test _isPointInside true": function() {
        const cylinderCollision = new CylinderCollision([3, 2, 1], 0.7, 1);
        assertEquals(true, cylinderCollision._isPointInside([3, 2.5, 1]));
    },

    "test _isPointInside false": function() {
        const cylinderCollision = new CylinderCollision([3, 2, 1], 0.7, 1);
        assertEquals(false, cylinderCollision._isPointInside([3, 4, 1]));
    },

    "test checkCollision body collision": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var collidedPoint=[];
        var pointType=PointType.head;
        const isCollision = cylinderCollision.checkCollision([0, 0.4, 0.71], 1.7, collidedPoint, pointType);
        assertEquals(PointType.body.id, pointType[0].id);
        assertEquals(true, isCollision);
        assertEquals(0, collidedPoint[0]);
        assertEquals(-0.11, +collidedPoint[1].toFixed(4));
        assertEquals(0.71, collidedPoint[2]);
    },

    "test checkCollision feet collision": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var collidedPoint=[];
        var pointType=PointType.head;
        const isCollision = cylinderCollision.checkCollision([0, 2.6, 0], 1.7, collidedPoint, pointType);
        assertEquals(PointType.feet.id, pointType[0].id);
        assertEquals(true, isCollision);
        assertEquals(0, collidedPoint[0]);
        assertEquals(0.9000, +collidedPoint[1].toFixed(4));
        assertEquals(0, collidedPoint[2]);
    },

    "test checkCollision false": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var collidedPoint;
        var pointType=PointType.head;
        const isCollision = cylinderCollision.checkCollision([0, 0, 5], 1.7, collidedPoint, pointType);
        assertEquals(false, isCollision);
    },

    "test getCollisionForce over position and down force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.feet;
        const collisionForce = cylinderCollision.getCollisionForce([1, -2, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce over position and up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.feet;
        const collisionForce = cylinderCollision.getCollisionForce([1, 4, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 4, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce over position and zero up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.feet;
        const collisionForce = cylinderCollision.getCollisionForce([1, 0, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and down force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.head;
        const collisionForce = cylinderCollision.getCollisionForce([1, -2, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, -2, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.head;
        const collisionForce = cylinderCollision.getCollisionForce([1, 4, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and zero up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.head;
        const collisionForce = cylinderCollision.getCollisionForce([1, 0, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and inside normal force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.body;
        const collisionForce = cylinderCollision.getCollisionForce([1, 0, -3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and outside normal force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.body;
        const collisionForce = cylinderCollision.getCollisionForce([1, 0, 3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and zero normal force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.body;
        const collisionForce = cylinderCollision.getCollisionForce([1, 0, 0], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionVelocity over position and down force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.feet;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, -2, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity over position and up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.body;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, 4, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 4, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity over position and zero up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.feet;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, 0, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and down force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.head;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, -2, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, -2, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.0);
        var pointType=PointType.head;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, 4, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and zero up force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.9);
        var pointType=PointType.head;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, 0, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<collisionVelocity.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and inside normal force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.body;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, 0, -3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and outside normal force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.body;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, 0, 3], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and zero normal force": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        var pointType=PointType.body;
        const collisionVelocity = cylinderCollision.getCollisionVelocity([1, 0, 0], [0, 0, 0.701], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test _projectOnTheNormal": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        const result = cylinderCollision._projectOnTheNormal([1, -2, -3], [0, 0, 0.701]);
        const expectedResult = [0, 0, -3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], result[i]);
        }
    },

    "test _insideNormalVector": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);
        const result = cylinderCollision._insideNormalVector([0, 0, 0.701]);
        const expectedResult = [0, 0, -1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], result[i]);
        }
    },

    "test getDistance front": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([0, 0, 5]);
        assertEquals(4.3, +distance.toFixed(4));
    },

    "test getDistance over": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([0, 3, 4]);
        assertEquals(3.966, +distance.toFixed(3));
    },

    "test getDistance inside": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([0, 0, 0.1]);
        assertEquals(0, +distance.toFixed(4));
    },

    "test getDistance over vertically": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([0, 3, 0]);
        assertEquals(2.2, +distance.toFixed(4));
    },

    "test getDistance below": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([0, -3, 4]);
        assertEquals(4.4598, +distance.toFixed(4));
    },

    "test getDistance below vertically": function() {
        const cylinderCollision = new CylinderCollision([0, 0, 0], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([0, -3, 0]);
        assertEquals(3, +distance.toFixed(4));
    },

    "test getDistance front arbitrary position": function() {
        const cylinderCollision = new CylinderCollision([1, 2, 3], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([1, 2, 4]);
        assertEquals(0.3, +distance.toFixed(4));
    },

    "test getDistance front arbitrary position inside": function() {
        const cylinderCollision = new CylinderCollision([1, 2, 3], 0.7, 0.8);

        const distance = cylinderCollision.getDistance([1, 2.1, 3]);
        assertEquals(0, +distance.toFixed(4));
    },

    "test isFarAway true": function() {
        const cylinderCollision = new CylinderCollision([1, 2, 3], 0.7, 0.8);

        assertEquals(true, cylinderCollision.isFarAway([10, 7, 8], 1.7, 3));
    },

    "test isFarAway false": function() {
        const cylinderCollision = new CylinderCollision([1, 2, 3], 0.7, 0.8);

        assertEquals(false, cylinderCollision.isFarAway([1, 2, 4], 1.7, 3));
    }
});

TestCase("ParallelepipedCollision test", {
    "test getDistance": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, -5, 0], 40, 5, 40);
        const distance = parallelepipedCollision.getDistance([0, 1.7, 0]);
        assertEquals(1.7, distance);
    },

    "test checkRayIntersection true": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var distance=[0];
        const isCollision = parallelepipedCollision.checkRayIntersection([0, 0, 1], [0, 0, -1], distance);
        assertEquals(true, isCollision);
        assertEquals(0.6, +distance[0].toFixed(4));
    },

    "test checkRayIntersection false": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var distance=[0];
        const isCollision = parallelepipedCollision.checkRayIntersection([0, 0, 1], [0, 1, 0], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection behind": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var distance=[0];
        const isCollision = parallelepipedCollision.checkRayIntersection([0, 0, 1], [0, 0, 1], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection inside": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var distance=[0];
        const isCollision = parallelepipedCollision.checkRayIntersection([0, 0, 0], [0, 0, -1], distance);
        assertEquals(true, isCollision);
    },

    "test checkRayIntersection false too high": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var distance=[0];
        const isCollision = parallelepipedCollision.checkRayIntersection([0, 0, 2], [0, 4, -1], distance);
        assertEquals(false, isCollision);
    },

    "test checkRayIntersection false too low": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var distance=[0];
        const isCollision = parallelepipedCollision.checkRayIntersection([0, 0, 2], [0, -4, -1], distance);
        assertEquals(false, isCollision);
    },

    "test _isPointInside true": function() {
        const parallelepipedCollision = new ParallelepipedCollision([3, 2, 1], 0.4, 0.8, 0.4);
        assertEquals(true, parallelepipedCollision._isPointInside([3, 2.1, 1.2]));
    },

    "test _isPointInside false": function() {
        const parallelepipedCollision = new ParallelepipedCollision([3, 2, 1], 0.4, 0.8, 0.4);
        assertEquals(false, parallelepipedCollision._isPointInside([3, 4, 1]));
    },

    "test checkCollision body collision": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var collidedPoint=[];
        var pointType=PointType.head;
        const isCollision = parallelepipedCollision.checkCollision([0, 0.4, 0.41], 1.7, collidedPoint, pointType);
        assertEquals(PointType.body.id, pointType[0].id);
        assertEquals(true, isCollision);
        assertEquals(0, collidedPoint[0]);
        assertEquals(-0.11, +collidedPoint[1].toFixed(4));
        assertEquals(0.41, collidedPoint[2]);
    },

    "test checkCollision feet collision": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var collidedPoint=[];
        var pointType=PointType.head;
        const isCollision = parallelepipedCollision.checkCollision([0, 2.6, 0], 1.7, collidedPoint, pointType);
        assertEquals(PointType.feet.id, pointType[0].id);
        assertEquals(true, isCollision);
        assertEquals(0, collidedPoint[0]);
        assertEquals(0.9000, +collidedPoint[1].toFixed(4));
        assertEquals(0, collidedPoint[2]);
    },

    "test checkCollision false": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var collidedPoint;
        var pointType=PointType.head;
        const isCollision = parallelepipedCollision.checkCollision([0, 0, 5], 1.7, collidedPoint, pointType);
        assertEquals(false, isCollision);
    },

    "test getCollisionForce over position and down force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.feet;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, -2, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce over position and up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.feet;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, 4, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 4, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce over position and zero up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.feet;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, 0, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and down force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.head;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, -2, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, -2, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.head;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, 4, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce below position and zero up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.head;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, 0, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and inside normal force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.body;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, 0, -3], [0, 0, 0.401], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and outside normal force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.body;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, 0, 3], [0, 0, 0.401], pointType);
        const expectedResult = [1, 0, 3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionForce front position and zero normal force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.body;
        const collisionForce = parallelepipedCollision.getCollisionForce([1, 0, 0], [0, 0, 0.401], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionForce[i]);
        }
    },

    "test getCollisionVelocity over position and down force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.feet;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, -2, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity over position and up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.body;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, 4, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 4, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity over position and zero up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.feet;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, 0, 1], [0, 0.801, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and down force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.head;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, -2, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, -2, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.head;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, 4, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity below position and zero up force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.head;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, 0, 1], [0, -0.001, 0], pointType);
        const expectedResult = [1, 0, 1];
        for(var i=0; i<collisionVelocity.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and inside normal force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.body;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, 0, -3], [0, 0, 0.401], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and outside normal force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.body;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, 0, 3], [0, 0, 0.401], pointType);
        const expectedResult = [1, 0, 3];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },

    "test getCollisionVelocity front position and zero normal force": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);
        var pointType=PointType.body;
        const collisionVelocity = parallelepipedCollision.getCollisionVelocity([1, 0, 0], [0, 0, 0.401], pointType);
        const expectedResult = [1, 0, 0];
        for(var i=0; i<expectedResult.length; i++) {
            assertEquals(expectedResult[i], collisionVelocity[i]);
        }
    },





    "test getDistance same level higherZ-middle": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, 0, 5]);
        assertEquals(4.6, +distance.toFixed(4));
    },

    "test getDistance same level lowerZ-middle": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, 0, -5]);
        assertEquals(4.6, +distance.toFixed(4));
    },

    "test getDistance same level higherZ-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, 0, 5]);
        assertEquals(5.8412, +distance.toFixed(4));
    },

    "test getDistance same level center-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, 0, 0]);
        assertEquals(3.6, +distance.toFixed(4));
    },

    "test getDistance same level lowerZ-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, 0, -5]);
        assertEquals(5.8412, +distance.toFixed(4));
    },

    "test getDistance same level higherZ-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, 0, 5]);
        assertEquals(5.8412, +distance.toFixed(4));
    },

    "test getDistance same level center-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, 0, 0]);
        assertEquals(3.6, +distance.toFixed(4));
    },

    "test getDistance same level lowerZ-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, 0, -5]);
        assertEquals(5.8412, +distance.toFixed(4));
    },



    "test getDistance directly over": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, 3, 0]);
        assertEquals(2.2, +distance.toFixed(4));
    },

    "test getDistance over higherZ-middle": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, 3, 4]);
        assertEquals(4.219, +distance.toFixed(3));
    },

    "test getDistance over level lowerZ-middle": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, 3, 4]);
        assertEquals(4.219, +distance.toFixed(4));
    },

    "test getDistance over level higherZ-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, 3, 5]);
        assertEquals(6.3, +distance.toFixed(4));
    },

    "test getDistance over level center-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, 3, 0]);
        assertEquals(4.219, +distance.toFixed(4));
    },

    "test getDistance over level lowerZ-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, 3, -5]);
        assertEquals(6.3, +distance.toFixed(4));
    },

    "test getDistance over level higherZ-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, 3, 5]);
        assertEquals(6.3, +distance.toFixed(4));
    },

    "test getDistance over level center-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, 3, 0]);
        assertEquals(4.219, +distance.toFixed(4));
    },

    "test getDistance over level lowerZ-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, 3, -5]);
        assertEquals(6.3, +distance.toFixed(4));
    },





    "test getDistance directly below": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, -3, 0]);
        assertEquals(3, +distance.toFixed(4));
    },

    "test getDistance below higherZ-middle": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, -3, 4]);
        assertEquals(4.6861, +distance.toFixed(4));
    },

    "test getDistance below level lowerZ-middle": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, -2.2, 4]);
        assertEquals(4.219, +distance.toFixed(4));
    },

    "test getDistance below level higherZ-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, -2.2, 5]);
        assertEquals(6.3, +distance.toFixed(4));
    },

    "test getDistance below level center-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, -2.2, 0]);
        assertEquals(4.219, +distance.toFixed(4));
    },

    "test getDistance below level lowerZ-right": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([4, -2.2, -5]);
        assertEquals(6.3, +distance.toFixed(4));
    },

    "test getDistance below level higherZ-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, -2.2, 5]);
        assertEquals(6.3, +distance.toFixed(4));
    },

    "test getDistance below level center-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, -2.2, 0]);
        assertEquals(4.219, +distance.toFixed(4));
    },

    "test getDistance below level lowerZ-left": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.3, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([-4, -2.2, -5]);
        assertEquals(6.3, +distance.toFixed(4));
    },



    "test getDistance inside": function() {
        const parallelepipedCollision = new ParallelepipedCollision([0, 0, 0], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([0, 0, 0.1]);
        assertEquals(0, +distance.toFixed(4));
    },

    "test getDistance front arbitrary position, directly below": function() {
        const parallelepipedCollision = new ParallelepipedCollision([1, 2, 3], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([1, 2, 4]);
        assertEquals(0.6, +distance.toFixed(4));
    },





    "test getDistance front arbitrary position, inside": function() {
        const parallelepipedCollision = new ParallelepipedCollision([1, 2, 3], 0.4, 0.8, 0.4);

        const distance = parallelepipedCollision.getDistance([1, 2.1, 3]);
        assertEquals(0, +distance.toFixed(4));
    },

    "test isFarAway true": function() {
        const parallelepipedCollision = new ParallelepipedCollision([1, 2, 3], 0.4, 0.8, 0.4);

        assertEquals(true, parallelepipedCollision.isFarAway([10, 7, 8], 1.7, 3));
    },

    "test isFarAway false": function() {
        const parallelepipedCollision = new ParallelepipedCollision([1, 2, 3], 0.4, 0.8, 0.4);

        assertEquals(false, parallelepipedCollision.isFarAway([1, 2, 4], 1.7, 3));
    }
});