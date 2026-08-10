// ==========================================
// ELEMENTOS HTML
// ==========================================

const loader = document.getElementById("loader");
const mainContent = document.getElementById("mainContent");

const music = document.getElementById("music");
const musicPlayer = document.getElementById("musicPlayer");

const startBtn = document.getElementById("startBtn");
const musicBtn = document.getElementById("musicBtn");
const pauseMusic = document.getElementById("pauseMusic");

const loveBtn = document.getElementById("loveBtn");
const closeLetter = document.getElementById("closeLetter");
const letter = document.getElementById("letter");

const floatingHearts =
    document.getElementById("floatingHearts");

let started = false;


// ==========================================
// BOTÓN ENTRAR
// ==========================================

startBtn.addEventListener("click", function () {

    if (started) {
        return;
    }

    started = true;

    // Intentar iniciar música
    music.play()
        .then(function () {

            pauseMusic.textContent = "⏸️";

        })
        .catch(function (error) {

            console.log(
                "La música no pudo iniciar:",
                error
            );

        });


    // Ocultar pantalla inicial
    loader.classList.add("hidden");


    // Mostrar contenido
    setTimeout(function () {

        mainContent.classList.add("show");

        musicPlayer.classList.add("show");

    }, 500);


    // Iniciar corazones
    createFloatingHeart();

});


// ==========================================
// BOTÓN MÚSICA
// ==========================================

musicBtn.addEventListener("click", function () {

    toggleMusic();

});


// ==========================================
// BOTÓN PAUSA
// ==========================================

pauseMusic.addEventListener("click", function () {

    toggleMusic();

});


// ==========================================
// FUNCIÓN MÚSICA
// ==========================================

function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(function () {

                pauseMusic.textContent = "⏸️";

            })
            .catch(function (error) {

                console.log(
                    "No se pudo reproducir la música:",
                    error
                );

            });

    } else {

        music.pause();

        pauseMusic.textContent = "▶️";

    }

}


// ==========================================
// CAMBIAR ICONO AUTOMÁTICAMENTE
// ==========================================

music.addEventListener("play", function () {

    pauseMusic.textContent = "⏸️";

});


music.addEventListener("pause", function () {

    pauseMusic.textContent = "▶️";

});


// ==========================================
// ABRIR CARTA
// ==========================================

loveBtn.addEventListener("click", function () {

    letter.classList.add("show");

});


// ==========================================
// CERRAR CARTA
// ==========================================

closeLetter.addEventListener("click", function () {

    letter.classList.remove("show");

});


// ==========================================
// CORAZONES FLOTANTES
// ==========================================

function createFloatingHeart() {

    if (!started) {
        return;
    }


    const heartElement =
        document.createElement("span");


    heartElement.className =
        "floating-heart";


    heartElement.innerHTML =
        Math.random() > 0.5
            ? "❤️"
            : "💗";


    heartElement.style.left =
        Math.random() * 100 + "%";


    heartElement.style.fontSize =
        15 + Math.random() * 25 + "px";


    const duration =
        5 + Math.random() * 5;


    heartElement.style.animationDuration =
        duration + "s";


    floatingHearts.appendChild(
        heartElement
    );


    setTimeout(function () {

        heartElement.remove();

    }, duration * 1000);


    setTimeout(
        createFloatingHeart,
        700
    );

}


// ==========================================
// THREE.JS
// ==========================================
// Three.js es opcional.
// Si no carga, los botones siguen funcionando.
// ==========================================

if (typeof THREE !== "undefined") {

    const scene = new THREE.Scene();


    const camera =
        new THREE.PerspectiveCamera(
            75,
            window.innerWidth /
            window.innerHeight,
            0.1,
            2000
        );


    camera.position.z = 80;


    const renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            alpha: true

        });


    renderer.setPixelRatio(

        Math.min(
            window.devicePixelRatio,
            2
        )

    );


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    document
        .getElementById("scene")
        .appendChild(
            renderer.domElement
        );


    // ==========================================
    // ESTRELLAS
    // ==========================================

    const starGeometry =
        new THREE.BufferGeometry();


    const starPositions = [];


    const starCount = 5000;


    for (
        let i = 0;
        i < starCount;
        i++
    ) {

        starPositions.push(

            (Math.random() - 0.5) * 900,

            (Math.random() - 0.5) * 900,

            (Math.random() - 0.5) * 900

        );

    }


    starGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            starPositions,
            3
        )

    );


    const starMaterial =
        new THREE.PointsMaterial({

            color: 0xffffff,

            size: 1.2,

            transparent: true,

            opacity: 0.9

        });


    const stars =
        new THREE.Points(

            starGeometry,

            starMaterial

        );


    scene.add(stars);


    // ==========================================
    // CORAZÓN
    // ==========================================

    const heartGeometry =
        new THREE.BufferGeometry();


    const heartPositions = [];


    const heartCount = 6000;


    for (
        let i = 0;
        i < heartCount;
        i++
    ) {

        const t =
            Math.random() *
            Math.PI *
            2;


        const scale =
            Math.sqrt(
                Math.random()
            );


        let x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        let y =

            13 *
            Math.cos(t)

            -

            5 *
            Math.cos(
                2 * t
            )

            -

            2 *
            Math.cos(
                3 * t
            )

            -

            Math.cos(
                4 * t
            );


        x *= scale;

        y *= scale;


        const z =
            (Math.random() - 0.5)
            * 7
            * scale;


        heartPositions.push(

            x * 1.8,

            y * 1.8,

            z

        );

    }


    heartGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            heartPositions,
            3
        )

    );


    const heartMaterial =
        new THREE.PointsMaterial({

            color: 0xff2e88,

            size: 0.35,

            transparent: true,

            opacity: 0.95,

            blending:
                THREE.AdditiveBlending

        });


    const heart =
        new THREE.Points(

            heartGeometry,

            heartMaterial

        );


    scene.add(heart);


    // ==========================================
    // LUZ
    // ==========================================

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            0.8
        );


    scene.add(
        ambientLight
    );


    const pinkLight =
        new THREE.PointLight(
            0xff2e88,
            4,
            200
        );


    pinkLight.position.set(
        0,
        0,
        40
    );


    scene.add(
        pinkLight
    );


    // ==========================================
    // ANIMACIÓN
    // ==========================================

    const clock =
        new THREE.Clock();


    function animate() {

        requestAnimationFrame(
            animate
        );


        const time =
            clock.getElapsedTime();


        stars.rotation.y =
            time * 0.015;


        stars.rotation.x =
            time * 0.005;


        heart.rotation.y =
            Math.sin(
                time * 0.5
            ) * 0.25;


        heart.rotation.z =
            Math.sin(
                time * 0.7
            ) * 0.08;


        if (started) {

            const beat =
                1 +
                Math.sin(
                    time * 3
                ) * 0.035;


            heart.scale.set(
                beat,
                beat,
                beat
            );

        }


        renderer.render(
            scene,
            camera
        );

    }


    animate();


    // ==========================================
    // REDIMENSIONAR
    // ==========================================

    window.addEventListener(
        "resize",
        function () {

            camera.aspect =
                window.innerWidth /
                window.innerHeight;


            camera.updateProjectionMatrix();


            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );

        }
    );

}