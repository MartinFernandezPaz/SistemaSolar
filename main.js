var pointLight, sun, moon, earth, mercury, venus, mars, jupiter, saturn, neptune, uranus, earthOrbit, ring, controls, scene, camera, renderer, scene;
var planetSegments = 48;
var mercuryData = constructPlanetData(87.9, 0.015, 20, "mercury", "img/2k_mercury.jpg", 0.38, planetSegments);
var venusData = constructPlanetData(224.7, 0.015, 40, "venus", "img/2k_venus_atmosphere.jpg", 0.95, planetSegments);
var earthData = constructPlanetData(365.2564, 0.015, 60, "earth", "img/2k_earth_daymap.jpg", 1, planetSegments);
var moonData = constructPlanetData(29.5, 0.01, 2.8, "moon", "img/2k_moon.jpg", 0.5, planetSegments);
var marsData = constructPlanetData(687, 0.015, 80, "mars", "img/2k_mars.jpg", 0.53, planetSegments);
var jupiterData = constructPlanetData(4333, 0.015, 100, "jupiter", "img/2k_jupiter.jpg", 11.2, planetSegments);
var saturnData = constructPlanetData(10759, 0.015, 120, "saturn", "img/2k_saturn.jpg", 8.5, planetSegments);
var uranusData = constructPlanetData(60182, 0.015, 140, "uranus", "img/2k_uranus.jpg", 4, planetSegments);
var neptuneData = constructPlanetData(30688 , 0.015, 160, "neptune", "img/2k_neptune.jpg", 3.8, planetSegments);
var orbitData = {value: 200, runOrbit: true, runRotation: true};
var clock = new THREE.Clock();

/**
 * Esto elimina la redundancia de tener que escribir nombres de propiedad para un objeto planeta.
 * @param {type} myOrbitRate decimal
 * @param {type} myRotationRate decimal
 * @param {type} myDistanceFromAxis decimal
 * @param {type} myName string
 * @param {type} myTexture image file path
 * @param {type} mySize decimal
 * @param {type} mySegments integer
 * @returns {constructPlanetData.mainAnonym$0}
 */
function constructPlanetData(myOrbitRate, myRotationRate, myDistanceFromAxis, myName, myTexture, mySize, mySegments) {
    return {
        orbitRate: myOrbitRate
        , rotationRate: myRotationRate
        , distanceFromAxis: myDistanceFromAxis
        , name: myName
        , texture: myTexture
        , size: mySize
        , segments: mySegments
    };
}

/**
 * crea un anillo visible y lo agréga a la escena.
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getRing(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ring1Geometry = new THREE.RingGeometry(size, innerDiameter, facets);
    var ring1Material = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    var myRing = new THREE.Mesh(ring1Geometry, ring1Material);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/**
 * Se utiliza para crear un anillo tridimensional. Requiere más potencia de procesamiento para
 * ejecuta getRing ().
 * @param {type} size decimal
 * @param {type} innerDiameter decimal
 * @param {type} facets integer
 * @param {type} myColor HTML color
 * @param {type} name string
 * @param {type} distanceFromAxis decimal
 * @returns {THREE.Mesh|myRing}
 */
function getTube(size, innerDiameter, facets, myColor, name, distanceFromAxis) {
    var ringGeometry = new THREE.TorusGeometry(size, innerDiameter, facets, facets);
    var ringMaterial = new THREE.MeshBasicMaterial({color: myColor, side: THREE.DoubleSide});
    myRing = new THREE.Mesh(ringGeometry, ringMaterial);
    myRing.name = name;
    myRing.position.set(distanceFromAxis, 0, 0);
    myRing.rotation.x = Math.PI / 2;
    scene.add(myRing);
    return myRing;
}

/**
 * Simplifica la creación de materiales utilizados para objetos visibles.
 * @param {type} type
 * @param {type} color
 * @param {type} myTexture
 * @returns {THREE.MeshStandardMaterial|THREE.MeshLambertMaterial|THREE.MeshPhongMaterial|THREE.MeshBasicMaterial}
 */
function getMaterial(type, color, myTexture) {
    var materialOptions = {
        color: color === undefined ? 'rgb(255, 255, 255)' : color,
        map: myTexture === undefined ? null : myTexture
    };

    switch (type) {
        case 'basic':
            return new THREE.MeshBasicMaterial(materialOptions);
        case 'lambert':
            return new THREE.MeshLambertMaterial(materialOptions);
        case 'phong':
            return new THREE.MeshPhongMaterial(materialOptions);
        case 'standard':
            return new THREE.MeshStandardMaterial(materialOptions);
        default:
            return new THREE.MeshBasicMaterial(materialOptions);
    }
}

/**
 *  Dibujo de todas las órbitas.
 * @returns {undefined}
 */
function createVisibleOrbits() {
    var orbitWidth = 0.01;
    mercuryOrbit = getRing(mercuryData.distanceFromAxis + orbitWidth
        , mercuryData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "mercuryOrbit"
        , 0);
    
    venusOrbit = getRing(venusData.distanceFromAxis + orbitWidth
        , venusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "venushOrbit"
        , 0);
    earthOrbit = getRing(earthData.distanceFromAxis + orbitWidth
        , earthData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "earthOrbit"
        , 0);
    marsthOrbit = getRing(marsData.distanceFromAxis + orbitWidth
        , marsData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "marsOrbit"
        , 0);
    jupiterOrbit = getRing(jupiterData.distanceFromAxis + orbitWidth
        , jupiterData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "jupiterOrbit"
        , 0);
    saturnOrbit = getRing(saturnData.distanceFromAxis + orbitWidth
        , saturnData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "saturnOrbit"
        , 0);
    neptuneOrbit = getRing(neptuneData.distanceFromAxis + orbitWidth
        , neptuneData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "neptuneOrbit"
        , 0);
    uranusOrbit = getRing(uranusData.distanceFromAxis + orbitWidth
        , uranusData.distanceFromAxis - orbitWidth
        , 320
        , 0xffffff
        , "uranusOrbit"
        , 0);
}

/**
 * Simplifica la creación de una esfera.
 * @param {type} material THREE.SOME_TYPE_OF_CONSTRUCTED_MATERIAL
 * @param {type} size decimal
 * @param {type} segments integer
 * @returns {getSphere.obj|THREE.Mesh}
 */
function getSphere(material, size, segments) {
    var geometry = new THREE.SphereGeometry(size, segments, segments);
    var obj = new THREE.Mesh(geometry, material);
    obj.castShadow = true;

    return obj;
}

/**
 * Crea un planeta y lo agrega a la escena.
 * @param {type} myData datos para un objeto planeta
 * @param {type} x integer
 * @param {type} y integer
 * @param {type} z integer
 * @param {type} myMaterialType string que se pasa a getMaterial()
 * @returns {getSphere.obj|THREE.Mesh|loadTexturedPlanet.myPlanet}
 */
function loadTexturedPlanet(myData, x, y, z, myMaterialType) {
    var myMaterial;
    var passThisTexture;

    if (myData.texture && myData.texture !== "") {
        passThisTexture = new THREE.ImageUtils.loadTexture(myData.texture);
    }
    if (myMaterialType) {
        myMaterial = getMaterial(myMaterialType, "rgb(255, 255, 255 )", passThisTexture);
    } else {
        myMaterial = getMaterial("lambert", "rgb(255, 255, 255 )", passThisTexture);
    }

    myMaterial.receiveShadow = true;
    myMaterial.castShadow = true;
    var myPlanet = getSphere(myMaterial, myData.size, myData.segments);
    myPlanet.receiveShadow = true;
    myPlanet.name = myData.name;
    scene.add(myPlanet);
    myPlanet.position.set(x, y, z);

    return myPlanet;
}

/**
 * Simplifica la creación de una luz que se dispersa en todas direcciones.
 * @param {type} intensity decimal
 * @param {type} color HTML color
 * @returns {THREE.PointLight|getPointLight.light}
 */
function getPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    return light;
}

/**
 * Mueva el planeta alrededor de su órbita y lo hace rotar.
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @param {type} stopRotation opcional establecido en true para anillos
 * @returns {undefined}
 */
function movePlanet(myPlanet, myData, myTime, stopRotation) {
    if (orbitData.runRotation && !stopRotation) {
        myPlanet.rotation.y += myData.rotationRate;
    }
    if (orbitData.runOrbit) {
        myPlanet.position.x = Math.cos(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
        myPlanet.position.z = Math.sin(myTime 
                * (1.0 / (myData.orbitRate * orbitData.value)) + 10.0) 
                * myData.distanceFromAxis;
    }
}

/**
 * Mueva las lunas alrededor de su órbita con el planeta y hace que roten.
 * @param {type} myMoon
 * @param {type} myPlanet
 * @param {type} myData
 * @param {type} myTime
 * @returns {undefined}
 */
function moveMoon(myMoon, myPlanet, myData, myTime) {
    movePlanet(myMoon, myData, myTime);
    if (orbitData.runOrbit) {
        myMoon.position.x = myMoon.position.x + myPlanet.position.x;
        myMoon.position.z = myMoon.position.z + myPlanet.position.z;
    }
}

/**
 * Esta función se llama en un bucle para crear la animación.
 * @param {type} renderer
 * @param {type} scene
 * @param {type} camera
 * @param {type} controls
 * @returns {undefined}
 */
function update(renderer, scene, camera, controls) {
    pointLight.position.copy(sun.position);
    controls.update();

    var time = Date.now();
    
    movePlanet(mercury, mercuryData, time);
    movePlanet(venus, venusData, time);
    movePlanet(earth, earthData, time);
    moveMoon(moon, earth, moonData, time);
    movePlanet(mars, marsData, time);
    movePlanet(jupiter, jupiterData, time);
    movePlanet(saturn, saturnData, time);
    movePlanet(ring, saturnData, time, true);
    movePlanet(neptune, neptuneData, time);
    movePlanet(uranus, uranusData, time);

    renderer.render(scene, camera);
    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

/**
 * Esta es la función que inicia todo.
 * @returns {THREE.Scene|scene}
 */
function init() {
    // Cree la cámara que nos permita ver la escena.
    camera = new THREE.PerspectiveCamera(
            45, // campo de visión
            window.innerWidth / window.innerHeight, // relación de aspecto
            1, // cerca del plano de recorte
            1000 // plano de recorte lejano
            );
    camera.position.z = 30;
    camera.position.x = -30;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Crea la escena que contiene todos los objetos visibles.
    scene = new THREE.Scene();

    // Crea el renderizador que controla la animación.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Adjunte el renderizador al elemento div.
    document.getElementById('webgl').appendChild(renderer.domElement);

    // Cree controles que le permitan al usuario mover la escena con un raton.
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Cargue las imágenes utilizadas en segundo plano.
    var path = 'cubemap/';
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    // Adjunta el cubo de fondo a la escena.
    scene.background = reflectionCube;

    // Crea luz del sol.
    pointLight = getPointLight(1.5, "rgb(255, 220, 180)");
    scene.add(pointLight);

    // Crea una luz que sea visible desde todas las direcciones.
    var ambientLight = new THREE.AmbientLight(0xaaaaaa);
    scene.add(ambientLight);

    // Crea el sol.
    var sunMaterial = getMaterial("basic", "rgb(255, 255, 255)");
    sun = getSphere(sunMaterial, 10, 48);
    scene.add(sun);

    // Crea el resplandor del sol.
    var spriteMaterial = new THREE.SpriteMaterial(
            {
                map: new THREE.ImageUtils.loadTexture("img/glow.png")
                , useScreenCoordinates: false
                , color: 0xffffee
                , transparent: false
                , blending: THREE.AdditiveBlending
            });
    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(70, 109, 1.0);
    sun.add(sprite); // Esto centra el brillo en el sol.

    // Crea los planetas y anillos alrededor de ellos.
    mercury = loadTexturedPlanet(mercuryData, mercuryData.distanceFromAxis, 0, 0);
    venus = loadTexturedPlanet(venusData, venusData.distanceFromAxis, 0, 0);
    earth = loadTexturedPlanet(earthData, earthData.distanceFromAxis, 0, 0);
    moon = loadTexturedPlanet(moonData, moonData.distanceFromAxis, 0, 0);
    mars = loadTexturedPlanet(marsData, marsData.distanceFromAxis, 0, 0);
    jupiter = loadTexturedPlanet(jupiterData, jupiterData.distanceFromAxis, 0, 0);
    saturn = loadTexturedPlanet(saturnData, saturnData.distanceFromAxis, 0, 0);
    ring = getTube(10, 1, 480, 0xFFFFFF, "ring", saturnData.distanceFromAxis);
    neptune = loadTexturedPlanet(neptuneData, neptuneData.distanceFromAxis, 0, 0);
    uranus = loadTexturedPlanet(uranusData, uranusData.distanceFromAxis, 0, 0);

    // Crea la órbita visible .
    createVisibleOrbits();

    // Cree la GUI que muestra los controles.
    var gui = new dat.GUI();
    var folder1 = gui.addFolder('light');
    folder1.add(pointLight, 'intensity', 0, 10);
    var folder2 = gui.addFolder('speed');
    folder2.add(orbitData, 'value', 0, 500);
    folder2.add(orbitData, 'runOrbit', 0, 1);
    folder2.add(orbitData, 'runRotation', 0, 1);

    // Inicio de la animación.
    update(renderer, scene, camera, controls);
}

//Inicio de todo.
init();