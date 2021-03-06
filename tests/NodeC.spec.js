TestCase("setParent test", {
    "test setParent name": function() {
        const node = new GenericNodeC();
        const parent = new BaseNodeC();
        const newParent = new SceneNodeC();
        node.setParent(parent);
        node.setParent(newParent);
        assertEquals(node, newParent._children[0]);
        assertEquals(newParent, node._parent);
        assertEquals(null, parent._parent);
        assertEquals(null, newParent._parent);
        assertEquals(0, node._children.length);
        assertEquals(0, parent._children.length);
        assertEquals(1, newParent._children.length);
    }
});

TestCase("updateWorldMatrix test", {
    "test updateWorldMatrix name": function() {
        const rootNode = new BaseNodeC();
        const child1 = new SceneNodeC();
        const child2 = new SceneNodeC();
        const nephew = new SceneNodeC();
        child1.setParent(rootNode);
        child2.setParent(rootNode);
        nephew.setParent(child1);
        const rootLocalMatrix = [1, 7, 0.6, 1,
                            3, -1.5, 51, -2,
                            -2, 5, 1.8, 0.5,
                            6.3, 0.73, -37, 3];
        rootNode.setLocalMatrix(rootLocalMatrix);
        const child1LocalMatrix = [8, 34, -5, 3,
                            4, 7.43, 9, 1,
                            6, 21, -6, 4,
                            0, 3, 4, 1];
        child1.setLocalMatrix(child1LocalMatrix);
        const child2LocalMatrix = [1, 7, 0.6, 1,
                            3, -1.5, 6, 0,
                            -2, 5, 1.8, 0.5,
                            7.32, 0.7, -3, 3];
        child2.setLocalMatrix(child2LocalMatrix);
        const nephewLocalMatrix = [1, 0, 0.6, 1,
                            3, -1.5, 5, -2,
                            5, 1, -1, 0,
                            2, 0, -3, 1];
        nephew.setLocalMatrix(nephewLocalMatrix);

        rootNode.updateWorldMatrix();

        for(var i=0; i<rootNode.getLocalMatrix().length; i++) {
            assertEquals(rootLocalMatrix[i], +rootNode.getLocalMatrix()[i].toFixed(4));
            assertEquals(rootLocalMatrix[i], +rootNode.getWorldMatrix()[i].toFixed(4));
        }

        var expectedMatrix = [0.0396,    0.1016,    0.0584,    0.0134,
            0.3240,    1.1559,   -0.3425,    0.2095,
            0.0148,    0.0085,    0.0462,    0.0067,
            -0.1687,   -0.5484,    0.2091,   -0.1254];
        for(var i=0; i<expectedMatrix.length; i++) {
            assertEquals(child1LocalMatrix[i], +child1.getLocalMatrix()[i].toFixed(4));
            assertEquals(+(expectedMatrix[i]*1000).toFixed(1), +child1.getWorldMatrix()[i].toFixed(1));
        }

        expectedMatrix = [28.1200,    0.2000,   40.6800,    4.3000,
        -118.1400,  276.8500,   90.6000,   22.5000,
            13.0600,  -12.1500,   30.5400,    0.4000,
            104.4500, -139.8950,  -67.4400,   -3.2000];
        for(var i=0; i<expectedMatrix.length; i++) {
            assertEquals(child2LocalMatrix[i], +child2.getLocalMatrix()[i].toFixed(4));
            assertEquals(expectedMatrix[i], +child2.getWorldMatrix()[i].toFixed(4));
        }

        expectedMatrix = [0.6632,   -0.0940,    0.4332,   -0.1502,
            2.4981,   -2.0763,    5.6877,   -1.7782,
            0.2845,    0.0335,   -0.0152,    0.0046,
            -1.0192,    1.0316,   -2.6760,    0.8027];
        for(var i=0; i<expectedMatrix.length; i++) {
            assertEquals(nephewLocalMatrix[i], +nephew.getLocalMatrix()[i].toFixed(4));
            assertEquals(+(expectedMatrix[i]*1000).toFixed(1), +nephew.getWorldMatrix()[i].toFixed(1));
        }

    }
});

TestCase("ShadersType test", {
    "test ShadersType name": function() {
        assertEquals("pbrTex", ShadersType.pbr.name);
    },

    "test ShadersType id": function() {
        assertEquals(4, ShadersType.orenNayar.id);
    }
});

TestCase("Texture test", {
    "test findTexture name": function() {
        const t1 = new Texture();
        t1._name = "t1";
        t1._texture = new Object();
        const t2 = new Texture();
        t2._name = "t2";
        t2._texture = new Object();
        const t3 = new Texture();
        t3._name = "t3";
        t3._texture = new Object();
        textures.push(t1);
        textures.push(t3);
        textures.push(t2);
        var foundTexture = Texture.findTexture("t3");
        assertEquals(t3, foundTexture);
        foundTexture = Texture.findTexture("t2");
        assertEquals(t2, foundTexture);
        foundTexture = Texture.findTexture("t1");
        assertEquals(t1, foundTexture);
    }
});

TestCase("SceneNodeType test", {
    "test SceneNodeType name": function() {
        const sceneNodeType = SceneNodeType.deadTree;
        assertEquals("deadTree.obj", sceneNodeType.sceneData._objFilename);
    }
});

TestCase("SceneNodeC test", {
    "test SceneNodeC name": function() {
        const sceneNodeC = new SceneNodeC(SceneNodeType.sign);
        assertEquals(0.2, sceneNodeC.getMuPersonal());
    }
});
