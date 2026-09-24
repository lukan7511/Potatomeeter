/* ================================================================
   POTATO METER 4.0
   LOCAL IMAGE ANALYSIS + RU / EN
   Aligned with current index.html
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});


/* ================================================================
   TRANSLATIONS
   ================================================================ */

const translations = {
    ru: {
        subtitle: "Какой процент картошки?",

        badge: "ТЕХНОЛОГИЯ ОПРЕДЕЛЕНИЯ КАРТОШКИ",
        title: "Насколько картошка на фото?",
        description:
            "Загрузите фотографию, и Potato Meter определит, насколько она похожа на картошку.",

        uploadTitle: "Загрузите фотографию",
        uploadDescription:
            "Подойдёт любое фото. Картошка это или нет — сейчас выясним.",
        choosePhoto: "Выбрать фотографию",
        dragDrop: "или перетащите её сюда",
        fileHint: "JPG · PNG · WEBP · до 15 МБ",

        previewTitle: "Ваша фотография",
        remove: "Удалить",

        scan: "Сканировать",

        scanning: "Проверяем картофельный потенциал…",
        scanningDescription:
            "Измеряем форму, цвет и текстуру.",

        resultLabel: "РЕЗУЛЬТАТ POTATO METER",
        resultTitle: "Ваш картофельный балл",

        shape: "Форма",
        color: "Цвет",
        texture: "Текстура",

        shapeDescription:
            "Смотрим на пропорции объекта, его размер и общий силуэт.",

        colorDescription:
            "Картофельные бежевые, жёлтые, коричневые и землистые оттенки получают дополнительные очки.",

        textureDescription:
            "Небольшие изменения яркости помогают оценить детализацию и шероховатость поверхности.",

        share: "Поделиться",
        download: "Скачать",
        again: "Сканировать ещё",

        howKicker: "НАУКА. ПРИМЕРНО.",
        howTitle: "Как это работает?",
        howDescription:
            "Potato Meter смотрит на несколько визуальных признаков и оценивает, насколько фотография похожа на картошку.",

        footerText: "Сделано для серьёзной науки о картошке.",

        verdictVeryPotato:
            "Это практически эталонная картошка.",
        verdictPotato:
            "Очень картофельный экземпляр.",
        verdictLikelyPotato:
            "Картофельные признаки явно присутствуют.",
        verdictMaybePotato:
            "Картошка? Есть основания так считать.",
        verdictWeakPotato:
            "Картофельный потенциал обнаружен.",
        verdictNotPotato:
            "Картофельность пока не доказана.",

        invalidFile:
            "Пожалуйста, выберите изображение.",
        tooLarge:
            "Файл слишком большой. Максимальный размер — 15 МБ.",
        imageError:
            "Не удалось открыть это изображение.",

        shareTitle:
            "Мой результат Potato Meter",
        shareText:
            "Моя фотография получила {score}/100 картофельности 🥔",

        loadingStep1:
            "Изучаем силуэт объекта…",
        loadingStep2:
            "Сравниваем картофельные оттенки…",
        loadingStep3:
            "Проверяем текстуру…",
        loadingStep4:
            "Формируем окончательный вердикт…",

        copied:
            "Скопировано!"
    },

    en: {
        subtitle: "How potato is it?",

        badge: "POTATO DETECTION TECHNOLOGY",
        title: "How potato is your photo?",
        description:
            "Upload a photo and let Potato Meter determine just how potato-like it is.",

        uploadTitle: "Upload a photo",
        uploadDescription:
            "Any photo will do. Potato or not — let's find out.",
        choosePhoto: "Choose a photo",
        dragDrop: "or drag & drop it here",
        fileHint: "JPG · PNG · WEBP · up to 15 MB",

        previewTitle: "Your photo",
        remove: "Remove",

        scan: "Scan",

        scanning: "Inspecting potato potential…",
        scanningDescription:
            "Measuring shape, color and texture.",

        resultLabel: "POTATO METER RESULT",
        resultTitle: "Your potato score",

        shape: "Shape",
        color: "Color",
        texture: "Texture",

        shapeDescription:
            "We look at the object's proportions, size and overall silhouette.",

        colorDescription:
            "Potato-ish beige, yellow, brown and earthy tones get extra attention.",

        textureDescription:
            "Small changes in brightness help estimate surface detail and roughness.",

        share: "Share",
        download: "Download",
        again: "Scan another",

        howKicker: "SCIENCE. SORT OF.",
        howTitle: "How does it work?",
        howDescription:
            "Potato Meter looks at a few visual clues to estimate how potato-like your photo is.",

        footerText: "Made for serious potato science.",

        verdictVeryPotato:
            "This is practically a textbook potato.",
        verdictPotato:
            "A very potato-like specimen.",
        verdictLikelyPotato:
            "Strong potato characteristics detected.",
        verdictMaybePotato:
            "Potato? There is evidence to consider.",
        verdictWeakPotato:
            "Some potato potential detected.",
        verdictNotPotato:
            "Potatoness has not been proven.",

        invalidFile:
            "Please choose an image.",
        tooLarge:
            "The file is too large. Maximum size is 15 MB.",
        imageError:
            "Could not open this image.",

        shareTitle:
            "My Potato Meter result",
        shareText:
            "My photo scored {score}/100 potato 🥔",

        loadingStep1:
            "Inspecting the object silhouette…",
        loadingStep2:
            "Comparing potato-like colors…",
        loadingStep3:
            "Checking texture…",
        loadingStep4:
            "Preparing the final verdict…",

        copied:
            "Copied!"
    }
};


/* ================================================================
   STATE
   ================================================================ */

let currentLanguage = "ru";

let currentFile = null;
let currentObjectUrl = null;
let currentAnalysis = null;

let currentShareFile = null;


/* ================================================================
   DOM
   ================================================================ */

let fileInput;
let uploadButton;

let previewWrapper;
let previewImage;

let removeButton;
let scanButton;

let loadingState;
let loadingTitle;
let loadingDescription;
let loadingProgress;
let loadingPercent;

let resultSection;
let resultPhoto;

let scoreValue;
let scoreVerdict;

let shapeValue;
let colorValue;
let textureValue;

let shapeProgress;
let colorProgress;
let textureProgress;

let resultMessage;

let shareButton;
let downloadButton;
let againButton;


/* ================================================================
   INIT
   ================================================================ */

function initApp() {
    fileInput =
        document.getElementById("fileInput");

    uploadButton =
        document.getElementById("uploadButton");

    previewWrapper =
        document.getElementById("previewWrapper");

    previewImage =
        document.getElementById("previewImage");

    removeButton =
        document.getElementById("removeButton");

    scanButton =
        document.getElementById("scanButton");

    loadingState =
        document.getElementById("loadingState");

    loadingTitle =
        loadingState?.querySelector("h3") || null;

    loadingDescription =
        loadingState?.querySelector("p") || null;

    loadingProgress =
        document.getElementById("loadingProgress");

    loadingPercent =
        document.getElementById("loadingPercent");

    resultSection =
        document.getElementById("resultSection");

    resultPhoto =
        document.getElementById("resultPhoto");

    scoreValue =
        document.getElementById("scoreValue");

    scoreVerdict =
        document.getElementById("scoreVerdict");

    shapeValue =
        document.getElementById("shapeValue");

    colorValue =
        document.getElementById("colorValue");

    textureValue =
        document.getElementById("textureValue");

    shapeProgress =
        document.getElementById("shapeProgress");

    colorProgress =
        document.getElementById("colorProgress");

    textureProgress =
        document.getElementById("textureProgress");

    resultMessage =
        document.getElementById("resultMessage");

    shareButton =
        document.getElementById("shareButton");

    downloadButton =
        document.getElementById("downloadButton");

    againButton =
        document.getElementById("againButton");

    setupLanguage();
    setupFileInput();
    setupDragAndDrop();
    setupButtons();

    resetApp(false);
}


/* ================================================================
   LANGUAGE
   ================================================================ */

function setupLanguage() {
    let savedLanguage = null;

    try {
        savedLanguage =
            localStorage.getItem(
                "potatoMeterLanguage"
            );
    } catch {
        savedLanguage = null;
    }

    if (
        savedLanguage === "ru" ||
        savedLanguage === "en"
    ) {
        currentLanguage =
            savedLanguage;
    } else {
        const browserLanguage =
            navigator.language?.toLowerCase() || "";

        currentLanguage =
            browserLanguage.startsWith("ru")
                ? "ru"
                : "en";
    }

    document
        .querySelectorAll(".language-button")
        .forEach((button) => {
            button.addEventListener(
                "click",
                () => {
                    const language =
                        button.dataset.language;

                    if (
                        language !== "ru" &&
                        language !== "en"
                    ) {
                        return;
                    }

                    setLanguage(language);
                }
            );
        });

    setLanguage(currentLanguage);
}


function setLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang =
        language;

    const dictionary =
        translations[language];

    document
        .querySelectorAll("[data-i18n]")
        .forEach((element) => {
            const key =
                element.dataset.i18n;

            if (
                Object.prototype.hasOwnProperty.call(
                    dictionary,
                    key
                )
            ) {
                element.textContent =
                    dictionary[key];
            }
        });

    document
        .querySelectorAll(".language-button")
        .forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.language ===
                language
            );
        });

    try {
        localStorage.setItem(
            "potatoMeterLanguage",
            language
        );
    } catch {
        // localStorage may be unavailable.
    }

    if (currentAnalysis) {
        if (scoreVerdict) {
            scoreVerdict.textContent =
                getVerdict(
                    currentAnalysis.score
                );
        }

        if (resultMessage) {
            resultMessage.textContent =
                getResultMessage(
                    currentAnalysis.score
                );
        }

        try {
            currentShareFile =
                createShareCardFile(
                    currentAnalysis,
                    previewImage
                );
        } catch (error) {
            console.error(
                "Share card regeneration failed:",
                error
            );

            currentShareFile = null;
        }
    }

    if (
        loadingState &&
        !loadingState.hidden
    ) {
        if (loadingTitle) {
            loadingTitle.textContent =
                t("scanning");
        }

        if (loadingDescription) {
            loadingDescription.textContent =
                t("scanningDescription");
        }
    }
}


function t(key) {
    const dictionary =
        translations[currentLanguage] ||
        translations.en;

    return dictionary[key] || key;
}


/* ================================================================
   FILE INPUT
   ================================================================ */

function setupFileInput() {
    if (!fileInput) {
        return;
    }

    fileInput.addEventListener(
        "change",
        (event) => {
            const file =
                event.target.files?.[0];

            if (!file) {
                return;
            }

            handleFile(file);
        }
    );
}


/* ================================================================
   DRAG & DROP
   ================================================================ */

function setupDragAndDrop() {
    if (!uploadButton) {
        return;
    }

    [
        "dragenter",
        "dragover"
    ].forEach((eventName) => {
        uploadButton.addEventListener(
            eventName,
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                uploadButton.classList.add(
                    "dragging"
                );
            }
        );
    });

    [
        "dragleave",
        "dragend"
    ].forEach((eventName) => {
        uploadButton.addEventListener(
            eventName,
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                uploadButton.classList.remove(
                    "dragging"
                );
            }
        );
    });

    uploadButton.addEventListener(
        "drop",
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            uploadButton.classList.remove(
                "dragging"
            );

            const file =
                event.dataTransfer?.files?.[0];

            if (!file) {
                return;
            }

            handleFile(file);
        }
    );
}


/* ================================================================
   BUTTONS
   ================================================================ */

function setupButtons() {
    removeButton?.addEventListener(
        "click",
        () => {
            resetApp(true);
        }
    );

    scanButton?.addEventListener(
        "click",
        () => {
            runScan();
        }
    );

    againButton?.addEventListener(
        "click",
        () => {
            resetApp(true);
        }
    );

    shareButton?.addEventListener(
        "click",
        () => {
            shareResult();
        }
    );

    downloadButton?.addEventListener(
        "click",
        () => {
            downloadResult();
        }
    );
}


/* ================================================================
   FILE HANDLING
   ================================================================ */

function handleFile(file) {
    if (!file?.type?.startsWith("image/")) {
        alert(t("invalidFile"));

        if (fileInput) {
            fileInput.value = "";
        }

        return;
    }

    const maxSize = 15 * 1024 * 1024;

    if (file.size > maxSize) {
        alert(t("tooLarge"));

        if (fileInput) {
            fileInput.value = "";
        }

        return;
    }

    revokeCurrentObjectUrl();

    currentFile = file;
    currentAnalysis = null;
    currentShareFile = null;

    currentObjectUrl =
        URL.createObjectURL(file);

    setHidden(previewWrapper, false);
    setHidden(loadingState, true);
    setHidden(resultSection, true);

    if (scanButton) {
        scanButton.disabled = true;
    }

    if (previewImage) {
        /*
         * resetApp() скрывает изображение inline-стилем,
         * поэтому здесь обязательно возвращаем display.
         */
        previewImage.style.display = "block";

        previewImage.onload = () => {
            if (scanButton) {
                scanButton.disabled = false;
            }

            requestAnimationFrame(() => {
                previewWrapper?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });
        };

        previewImage.onerror = () => {
            alert(t("imageError"));
            resetApp(true);
        };

        previewImage.src = currentObjectUrl;
    }

    requestAnimationFrame(() => {
        previewWrapper?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* ================================================================
   SCAN
   ================================================================ */

async function runScan() {
    if (
        !currentFile ||
        !currentObjectUrl
    ) {
        return;
    }

    if (scanButton) {
        scanButton.disabled = true;
    }

    setHidden(
        resultSection,
        true
    );

    setHidden(
        loadingState,
        false
    );

    setLoadingProgress(0);

    setLoadingStep(
        "loadingStep1"
    );

    requestAnimationFrame(() => {
        loadingState?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    await sleep(180);

    setLoadingProgress(25);

    setLoadingStep(
        "loadingStep1"
    );

    await sleep(180);

    setLoadingProgress(50);

    setLoadingStep(
        "loadingStep2"
    );

    await sleep(180);

    setLoadingProgress(70);

    setLoadingStep(
        "loadingStep3"
    );

    await sleep(180);

    try {
        currentAnalysis =
            await analyzeImage(
                currentObjectUrl
            );

        setLoadingProgress(90);

        setLoadingStep(
            "loadingStep4"
        );

        await sleep(180);

        setLoadingProgress(100);

        renderResult(
            currentAnalysis
        );
    } catch (error) {
        console.error(
            "Potato Meter analysis error:",
            error
        );

        alert(
            t("imageError")
        );

        setHidden(
            loadingState,
            true
        );

        if (scanButton) {
            scanButton.disabled = false;
        }
    }
}


function setLoadingStep(key) {
    const text =
        t(key);

    if (
        key === "loadingStep1" ||
        key === "loadingStep2" ||
        key === "loadingStep3" ||
        key === "loadingStep4"
    ) {
        if (loadingTitle) {
            loadingTitle.textContent =
                text;
        }

        if (loadingDescription) {
            loadingDescription.textContent =
                t("scanningDescription");
        }

        return;
    }

    if (loadingTitle) {
        loadingTitle.textContent =
            text;
    }
}


function setLoadingProgress(percent) {
    const safePercent =
        clamp(
            percent,
            0,
            100
        );

    if (loadingProgress) {
        loadingProgress.style.width =
            `${safePercent}%`;
    }

    if (loadingPercent) {
        loadingPercent.textContent =
            `${Math.round(safePercent)}%`;
    }
}


/* ================================================================
   IMAGE ANALYSIS
   ================================================================ */

async function analyzeImage(src) {
    const image =
        await loadImage(src);

    const maxSize = 900;

    const scale =
        Math.min(
            1,
            maxSize /
            Math.max(
                image.naturalWidth,
                image.naturalHeight
            )
        );

    const width =
        Math.max(
            1,
            Math.round(
                image.naturalWidth *
                scale
            )
        );

    const height =
        Math.max(
            1,
            Math.round(
                image.naturalHeight *
                scale
            )
        );

    const canvas =
        document.createElement(
            "canvas"
        );

    canvas.width = width;
    canvas.height = height;

    const context =
        canvas.getContext(
            "2d",
            {
                willReadFrequently: true
            }
        );

    if (!context) {
        throw new Error(
            "Canvas context unavailable."
        );
    }

    context.drawImage(
        image,
        0,
        0,
        width,
        height
    );

    const imageData =
        context.getImageData(
            0,
            0,
            width,
            height
        );

    const data =
        imageData.data;

    const mask =
        buildObjectMask(
            data,
            width,
            height
        );

    const bounds =
        getMaskBounds(
            mask,
            width,
            height
        );

    const shape =
        calculateShapeScore(
            mask,
            bounds,
            width,
            height
        );

    const color =
        calculateColorScore(
            data,
            mask
        );

    const texture =
        calculateTextureScore(
            data,
            mask,
            width,
            height
        );

    const score =
        Math.round(
            shape * 0.4 +
            color * 0.4 +
            texture * 0.2
        );

    return {
        score: Math.round(
            clamp(
                score,
                0,
                100
            )
        ),

        shape: Math.round(
            clamp(
                shape,
                0,
                100
            )
        ),

        color: Math.round(
            clamp(
                color,
                0,
                100
            )
        ),

        texture: Math.round(
            clamp(
                texture,
                0,
                100
            )
        )
    };
}


/* ================================================================
   OBJECT MASK
   ================================================================ */

function buildObjectMask(
    data,
    width,
    height
) {
    const total =
        width * height;

    const mask =
        new Uint8Array(total);

    const borderPixels = [];

    const borderStep =
        Math.max(
            1,
            Math.floor(
                Math.min(
                    width,
                    height
                ) / 100
            )
        );

    for (
        let x = 0;
        x < width;
        x += borderStep
    ) {
        borderPixels.push(
            getPixel(
                data,
                width,
                x,
                0
            )
        );

        borderPixels.push(
            getPixel(
                data,
                width,
                x,
                height - 1
            )
        );
    }

    for (
        let y = 0;
        y < height;
        y += borderStep
    ) {
        borderPixels.push(
            getPixel(
                data,
                width,
                0,
                y
            )
        );

        borderPixels.push(
            getPixel(
                data,
                width,
                width - 1,
                y
            )
        );
    }

    const background =
        averageRgb(
            borderPixels
        );

    let threshold = 42;

    const maxIterations = 2;

    for (
        let iteration = 0;
        iteration < maxIterations;
        iteration++
    ) {
        let foregroundCount = 0;

        for (
            let y = 0;
            y < height;
            y++
        ) {
            for (
                let x = 0;
                x < width;
                x++
            ) {
                const index =
                    y * width + x;

                const pixel =
                    getPixel(
                        data,
                        width,
                        x,
                        y
                    );

                const distance =
                    colorDistance(
                        pixel,
                        background
                    );

                if (
                    distance >
                    threshold
                ) {
                    mask[index] = 1;
                    foregroundCount++;
                } else {
                    mask[index] = 0;
                }
            }
        }

        const ratio =
            foregroundCount /
            total;

        if (ratio > 0.92) {
            threshold += 18;
        } else if (ratio < 0.06) {
            threshold = Math.max(
                8,
                threshold - 8
            );
        } else {
            break;
        }
    }

    cleanMask(
        mask,
        width,
        height
    );

    return mask;
}


/* ================================================================
   MASK CLEANUP
   ================================================================ */

function cleanMask(
    mask,
    width,
    height
) {
    const copy =
        new Uint8Array(mask);

    for (
        let y = 1;
        y < height - 1;
        y++
    ) {
        for (
            let x = 1;
            x < width - 1;
            x++
        ) {
            const index =
                y * width + x;

            let neighbors = 0;

            for (
                let dy = -1;
                dy <= 1;
                dy++
            ) {
                for (
                    let dx = -1;
                    dx <= 1;
                    dx++
                ) {
                    if (
                        dx === 0 &&
                        dy === 0
                    ) {
                        continue;
                    }

                    neighbors +=
                        copy[
                        (y + dy) *
                        width +
                        (x + dx)
                        ];
                }
            }

            if (
                copy[index] === 1 &&
                neighbors <= 1
            ) {
                mask[index] = 0;
            }

            if (
                copy[index] === 0 &&
                neighbors >= 7
            ) {
                mask[index] = 1;
            }
        }
    }
}


/* ================================================================
   MASK BOUNDS
   ================================================================ */

function getMaskBounds(
    mask,
    width,
    height
) {
    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;
    let count = 0;

    for (
        let y = 0;
        y < height;
        y++
    ) {
        for (
            let x = 0;
            x < width;
            x++
        ) {
            const index =
                y * width + x;

            if (!mask[index]) {
                continue;
            }

            count++;

            minX =
                Math.min(
                    minX,
                    x
                );

            minY =
                Math.min(
                    minY,
                    y
                );

            maxX =
                Math.max(
                    maxX,
                    x
                );

            maxY =
                Math.max(
                    maxY,
                    y
                );
        }
    }

    if (
        maxX < 0 ||
        maxY < 0
    ) {
        return {
            minX: 0,
            minY: 0,
            maxX: width - 1,
            maxY: height - 1,
            width,
            height,
            count:
                width * height
        };
    }

    return {
        minX,
        minY,
        maxX,
        maxY,

        width:
            maxX - minX + 1,

        height:
            maxY - minY + 1,

        count
    };
}


/* ================================================================
   SHAPE SCORE
   ================================================================ */

function calculateShapeScore(
    mask,
    bounds,
    width,
    height
) {
    const objectArea =
        bounds.width *
        bounds.height;

    if (
        objectArea <= 0 ||
        bounds.count <= 0
    ) {
        return 0;
    }

    const fillRatio =
        bounds.count /
        objectArea;

    const aspect =
        bounds.width /
        bounds.height;

    const aspectScore =
        gaussianScore(
            aspect,
            0.82,
            0.48
        );

    const fillScore =
        clamp(
            100 -
            Math.abs(
                fillRatio -
                0.64
            ) *
            130,
            0,
            100
        );

    const sizeRatio =
        Math.sqrt(
            objectArea /
            (width * height)
        );

    const sizeScore =
        clamp(
            gaussianScore(
                sizeRatio,
                0.55,
                0.45
            ),
            0,
            100
        );

    return (
        aspectScore * 0.45 +
        fillScore * 0.35 +
        sizeScore * 0.2
    );
}


/* ================================================================
   COLOR SCORE
   ================================================================ */

function calculateColorScore(
    data,
    mask
) {
    let objectPixels = 0;
    let potatoPixels = 0;

    for (
        let i = 0, pixel = 0;
        i < data.length;
        i += 4, pixel++
    ) {
        if (!mask[pixel]) {
            continue;
        }

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        objectPixels++;

        const max =
            Math.max(
                r,
                g,
                b
            );

        const min =
            Math.min(
                r,
                g,
                b
            );

        const saturation =
            max === 0
                ? 0
                : (max - min) /
                max;

        const warm =
            r > g &&
            g > b;

        const earthy =
            r >= 75 &&
            g >= 50 &&
            b >= 25 &&
            r > b * 1.25;

        const yellowish =
            r > 130 &&
            g > 105 &&
            b < 100 &&
            r > b * 1.25;

        const brown =
            r >= 55 &&
            r <= 220 &&
            g >= 35 &&
            g <= 175 &&
            b >= 15 &&
            b <= 120 &&
            warm;

        if (
            earthy ||
            yellowish ||
            brown ||
            (warm && saturation > 0.12)
        ) {
            potatoPixels++;
        }
    }

    if (objectPixels === 0) {
        return 0;
    }

    const ratio =
        potatoPixels /
        objectPixels;

    return clamp(
        ratio * 115,
        0,
        100
    );
}


/* ================================================================
   TEXTURE SCORE
   ================================================================ */

function calculateTextureScore(
    data,
    mask,
    width,
    height
) {
    let samples = 0;
    let variationSum = 0;

    const step =
        Math.max(
            2,
            Math.floor(
                Math.min(
                    width,
                    height
                ) / 80
            )
        );

    for (
        let y = step;
        y < height - step;
        y += step
    ) {
        for (
            let x = step;
            x < width - step;
            x += step
        ) {
            const index =
                y * width + x;

            if (!mask[index]) {
                continue;
            }

            const center =
                luminanceAt(
                    data,
                    width,
                    x,
                    y
                );

            const left =
                luminanceAt(
                    data,
                    width,
                    x - step,
                    y
                );

            const right =
                luminanceAt(
                    data,
                    width,
                    x + step,
                    y
                );

            const up =
                luminanceAt(
                    data,
                    width,
                    x,
                    y - step
                );

            const down =
                luminanceAt(
                    data,
                    width,
                    x,
                    y + step
                );

            const variation =
                (
                    Math.abs(
                        center - left
                    ) +
                    Math.abs(
                        center - right
                    ) +
                    Math.abs(
                        center - up
                    ) +
                    Math.abs(
                        center - down
                    )
                ) / 4;

            variationSum +=
                variation;

            samples++;
        }
    }

    if (samples === 0) {
        return 0;
    }

    const averageVariation =
        variationSum /
        samples;

    return clamp(
        averageVariation * 4.2,
        0,
        100
    );
}


/* ================================================================
   RESULT
   ================================================================ */

function renderResult(
    analysis
) {
    if (resultPhoto) {
        resultPhoto.src =
            currentObjectUrl;

        resultPhoto.style.display =
            "block";
    }

    if (scoreValue) {
        scoreValue.textContent =
            `${analysis.score}`;
    }

    if (shapeValue) {
        shapeValue.textContent =
            `${analysis.shape}%`;
    }

    if (colorValue) {
        colorValue.textContent =
            `${analysis.color}%`;
    }

    if (textureValue) {
        textureValue.textContent =
            `${analysis.texture}%`;
    }

    if (shapeProgress) {
        shapeProgress.style.width =
            `${analysis.shape}%`;
    }

    if (colorProgress) {
        colorProgress.style.width =
            `${analysis.color}%`;
    }

    if (textureProgress) {
        textureProgress.style.width =
            `${analysis.texture}%`;
    }

    if (scoreVerdict) {
        scoreVerdict.textContent =
            getVerdict(
                analysis.score
            );
    }

    if (resultMessage) {
        resultMessage.textContent =
            getResultMessage(
                analysis.score
            );
    }

    setHidden(
        loadingState,
        true
    );

    setHidden(
        resultSection,
        false
    );

    if (scanButton) {
        scanButton.disabled = false;
    }

    /*
       The preview image is already loaded by this point,
       so it is a safer source for generating the share PNG
       than waiting for resultPhoto to finish loading.
    */

    try {
        currentShareFile =
            createShareCardFile(
                analysis,
                previewImage
            );
    } catch (error) {
        console.error(
            "Share card creation error:",
            error
        );

        currentShareFile = null;
    }

    requestAnimationFrame(() => {
        resultSection?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* ================================================================
   VERDICT
   ================================================================ */

function getVerdict(score) {
    if (score >= 90) {
        return t(
            "verdictVeryPotato"
        );
    }

    if (score >= 75) {
        return t(
            "verdictPotato"
        );
    }

    if (score >= 60) {
        return t(
            "verdictLikelyPotato"
        );
    }

    if (score >= 45) {
        return t(
            "verdictMaybePotato"
        );
    }

    if (score >= 25) {
        return t(
            "verdictWeakPotato"
        );
    }

    return t(
        "verdictNotPotato"
    );
}


function getResultMessage(score) {
    if (score >= 90) {
        return currentLanguage === "ru"
            ? "Картофельность практически вне конкуренции."
            : "Potato levels are dangerously impressive.";
    }

    if (score >= 75) {
        return currentLanguage === "ru"
            ? "Форма, цвет и текстура подозрительно картофельные."
            : "Shape, color and texture are suspiciously potato-like.";
    }

    if (score >= 60) {
        return currentLanguage === "ru"
            ? "Картофельные признаки довольно убедительны."
            : "The potato characteristics are fairly convincing.";
    }

    if (score >= 45) {
        return currentLanguage === "ru"
            ? "Картошка заметна, но экспертиза продолжается."
            : "There is some potato energy here, but the evidence is mixed.";
    }

    if (score >= 25) {
        return currentLanguage === "ru"
            ? "Картофельный потенциал замечен, но не подтверждён."
            : "Some potato potential is visible, but not enough for a conviction.";
    }

    return currentLanguage === "ru"
        ? "На данный момент это скорее не картошка."
        : "At this point, this is probably not a potato.";
}


/* ================================================================
   SHARE
   ================================================================ */

async function shareResult() {
    if (!currentAnalysis) {
        return;
    }

    const score =
        currentAnalysis.score;

    const shareTitle =
        t("shareTitle");

    const shareText =
        t("shareText")
            .replace(
                "{score}",
                score
            );

    const siteUrl =
        window.location.origin +
        window.location.pathname;

    if (
        !currentShareFile
    ) {
        try {
            currentShareFile =
                createShareCardFile(
                    currentAnalysis,
                    previewImage
                );
        } catch (error) {
            console.error(
                "Share card generation failed:",
                error
            );

            currentShareFile = null;
        }
    }

    /*
       Preferred path:
       share image + text + site URL.
    */

    if (
        navigator.share &&
        navigator.canShare &&
        currentShareFile
    ) {
        const shareData = {
            title: shareTitle,
            text: shareText,
            url: siteUrl,
            files: [
                currentShareFile
            ]
        };

        try {
            const canShare =
                navigator.canShare({
                    files: [
                        currentShareFile
                    ]
                });

            if (canShare) {
                await navigator.share(
                    shareData
                );

                return;
            }
        } catch (error) {
            if (
                error?.name ===
                "AbortError"
            ) {
                return;
            }

            console.warn(
                "Image share failed:",
                error
            );
        }
    }

    /*
       Secondary Web Share fallback:
       text + URL, without image.
    */

    if (navigator.share) {
        try {
            await navigator.share({
                title: shareTitle,
                text: shareText,
                url: siteUrl
            });

            return;
        } catch (error) {
            if (
                error?.name ===
                "AbortError"
            ) {
                return;
            }
        }
    }

    /*
       Clipboard fallback.
    */

    const clipboardText =
        `${shareText}\n${siteUrl}`;

    try {
        await navigator.clipboard.writeText(
            clipboardText
        );

        const shareLabel =
            shareButton?.querySelector(
                '[data-i18n="share"]'
            );

        if (shareLabel) {
            const originalText =
                t("share");

            shareLabel.textContent =
                t("copied");

            setTimeout(() => {
                shareLabel.textContent =
                    originalText;
            }, 1600);
        }

        return;
    } catch {
        // Clipboard may be unavailable.
    }

    /*
       Final fallback.
    */

    window.prompt(
        shareTitle,
        clipboardText
    );
}


/* ================================================================
   SHARE CARD
   ================================================================ */

function createShareCardFile(
    analysis,
    sourceImage
) {
    if (
        !analysis ||
        !sourceImage
    ) {
        return null;
    }

    if (
        !sourceImage.complete ||
        !sourceImage.naturalWidth ||
        !sourceImage.naturalHeight
    ) {
        return null;
    }

    const canvas =
        document.createElement(
            "canvas"
        );

    const width = 1200;
    const height = 1500;

    canvas.width = width;
    canvas.height = height;

    const context =
        canvas.getContext(
            "2d"
        );

    if (!context) {
        return null;
    }

    /*
       Background
    */

    context.fillStyle =
        "#f5f1e8";

    context.fillRect(
        0,
        0,
        width,
        height
    );

    /*
       Decorative gradient
    */

    const yellowGradient =
        context.createRadialGradient(
            130,
            130,
            20,
            130,
            130,
            420
        );

    yellowGradient.addColorStop(
        0,
        "rgba(243, 201, 75, 0.22)"
    );

    yellowGradient.addColorStop(
        1,
        "rgba(243, 201, 75, 0)"
    );

    context.fillStyle =
        yellowGradient;

    context.fillRect(
        0,
        0,
        520,
        520
    );

    /*
       Main card
    */

    roundRect(
        context,
        50,
        50,
        width - 100,
        height - 100,
        42
    );

    context.fillStyle =
        "#fffdf8";

    context.fill();

    context.strokeStyle =
        "#ddd7ca";

    context.lineWidth = 2;

    context.stroke();

    /*
       Header icon
    */

    context.fillStyle =
        "#f3c94b";

    roundRect(
        context,
        90,
        90,
        72,
        72,
        20
    );

    context.fill();

    context.font =
        '42px "Segoe UI Emoji", "Apple Color Emoji", sans-serif';

    context.textAlign =
        "center";

    context.textBaseline =
        "middle";

    context.fillText(
        "🥔",
        126,
        126
    );

    context.textAlign =
        "left";

    context.textBaseline =
        "alphabetic";

    context.fillStyle =
        "#171713";

    context.font =
        "900 31px Inter, Arial, sans-serif";

    context.fillText(
        "Potato Meter",
        185,
        122
    );

    context.fillStyle =
        "#77736a";

    context.font =
        "700 15px Inter, Arial, sans-serif";

    context.fillText(
        currentLanguage === "ru"
            ? "ЛОКАЛЬНЫЙ АНАЛИЗ"
            : "LOCAL ANALYSIS",
        185,
        148
    );

    /*
       Photo
    */

    const photoX = 90;
    const photoY = 205;
    const photoWidth = 1020;
    const photoHeight = 650;

    context.save();

    roundRect(
        context,
        photoX,
        photoY,
        photoWidth,
        photoHeight,
        28
    );

    context.clip();

    /*
       Checker background
    */

    context.fillStyle =
        "#faf8f3";

    context.fillRect(
        photoX,
        photoY,
        photoWidth,
        photoHeight
    );

    const checkerSize = 32;

    for (
        let y = photoY;
        y < photoY + photoHeight;
        y += checkerSize
    ) {
        for (
            let x = photoX;
            x < photoX + photoWidth;
            x += checkerSize
        ) {
            const cellX =
                Math.floor(
                    (x - photoX) /
                    checkerSize
                );

            const cellY =
                Math.floor(
                    (y - photoY) /
                    checkerSize
                );

            if (
                (cellX + cellY) %
                2 ===
                0
            ) {
                context.fillStyle =
                    "#efebe2";

                context.fillRect(
                    x,
                    y,
                    checkerSize,
                    checkerSize
                );
            }
        }
    }

    /*
       Preserve image ratio
    */

    const imageWidth =
        sourceImage.naturalWidth;

    const imageHeight =
        sourceImage.naturalHeight;

    const imageRatio =
        imageWidth /
        imageHeight;

    const frameRatio =
        photoWidth /
        photoHeight;

    let drawWidth;
    let drawHeight;
    let drawX;
    let drawY;

    if (
        imageRatio >
        frameRatio
    ) {
        drawWidth =
            photoWidth;

        drawHeight =
            photoWidth /
            imageRatio;

        drawX =
            photoX;

        drawY =
            photoY +
            (
                photoHeight -
                drawHeight
            ) /
            2;
    } else {
        drawHeight =
            photoHeight;

        drawWidth =
            photoHeight *
            imageRatio;

        drawX =
            photoX +
            (
                photoWidth -
                drawWidth
            ) /
            2;

        drawY =
            photoY;
    }

    context.drawImage(
        sourceImage,
        drawX,
        drawY,
        drawWidth,
        drawHeight
    );

    context.restore();

    /*
       Score label
    */

    context.textAlign =
        "center";

    context.fillStyle =
        "#77736a";

    context.font =
        "900 16px Inter, Arial, sans-serif";

    context.fillText(
        currentLanguage === "ru"
            ? "КАРТОФЕЛЬНЫЙ БАЛЛ"
            : "POTATO SCORE",
        width / 2,
        930
    );

    /*
       Score
    */

    context.fillStyle =
        "#667a3d";

    context.font =
        "950 145px Inter, Arial, sans-serif";

    context.fillText(
        `${analysis.score}/100`,
        width / 2,
        1070
    );

    /*
       Verdict
    */

    context.fillStyle =
        "#171713";

    context.font =
        "900 27px Inter, Arial, sans-serif";

    drawWrappedText(
        context,
        getVerdict(
            analysis.score
        ),
        width / 2,
        1135,
        900,
        34
    );

    /*
       Metrics
    */

    const detailsY = 1240;

    drawShareMetric(
        context,
        130,
        detailsY,
        t("shape"),
        analysis.shape
    );

    drawShareMetric(
        context,
        440,
        detailsY,
        t("color"),
        analysis.color
    );

    drawShareMetric(
        context,
        750,
        detailsY,
        t("texture"),
        analysis.texture
    );

    /*
       Footer
    */

    context.fillStyle =
        "#aaa59a";

    context.font =
        "700 14px Inter, Arial, sans-serif";

    context.textAlign =
        "center";

    context.fillText(
        "potato-meter",
        width / 2,
        1410
    );

    /*
       PNG
    */

    const dataUrl =
        canvas.toDataURL(
            "image/png"
        );

    const blob =
        dataUrlToBlob(
            dataUrl
        );

    if (!blob) {
        return null;
    }

    return new File(
        [blob],
        `potato-meter-${analysis.score}.png`,
        {
            type: "image/png",
            lastModified:
                Date.now()
        }
    );
}


/* ================================================================
   SHARE CARD HELPERS
   ================================================================ */

function drawShareMetric(
    context,
    x,
    y,
    label,
    value
) {
    context.textAlign =
        "left";

    context.fillStyle =
        "#77736a";

    context.font =
        "800 15px Inter, Arial, sans-serif";

    context.fillText(
        label,
        x,
        y
    );

    context.textAlign =
        "right";

    context.fillStyle =
        "#171713";

    context.font =
        "900 16px Inter, Arial, sans-serif";

    context.fillText(
        `${value}%`,
        x + 220,
        y
    );

    context.fillStyle =
        "#e6e1d7";

    roundRect(
        context,
        x,
        y + 16,
        220,
        10,
        5
    );

    context.fill();

    context.fillStyle =
        "#667a3d";

    roundRect(
        context,
        x,
        y + 16,
        Math.max(
            2,
            220 *
            (
                value /
                100
            )
        ),
        10,
        5
    );

    context.fill();
}


function roundRect(
    context,
    x,
    y,
    width,
    height,
    radius
) {
    const safeRadius =
        Math.min(
            radius,
            width / 2,
            height / 2
        );

    context.beginPath();

    context.moveTo(
        x + safeRadius,
        y
    );

    context.arcTo(
        x + width,
        y,
        x + width,
        y + height,
        safeRadius
    );

    context.arcTo(
        x + width,
        y + height,
        x,
        y + height,
        safeRadius
    );

    context.arcTo(
        x,
        y + height,
        x,
        y,
        safeRadius
    );

    context.arcTo(
        x,
        y,
        x + width,
        y,
        safeRadius
    );

    context.closePath();
}


function drawWrappedText(
    context,
    text,
    centerX,
    startY,
    maxWidth,
    lineHeight
) {
    const words =
        String(text)
            .split(/\s+/);

    const lines = [];
    let currentLine = "";

    for (const word of words) {
        const testLine =
            currentLine
                ? `${currentLine} ${word}`
                : word;

        const metrics =
            context.measureText(
                testLine
            );

        if (
            metrics.width >
            maxWidth &&
            currentLine
        ) {
            lines.push(
                currentLine
            );

            currentLine = word;
        } else {
            currentLine =
                testLine;
        }
    }

    if (currentLine) {
        lines.push(
            currentLine
        );
    }

    context.textAlign =
        "center";

    lines.forEach(
        (line, index) => {
            context.fillText(
                line,
                centerX,
                startY +
                index *
                lineHeight
            );
        }
    );
}


function dataUrlToBlob(
    dataUrl
) {
    try {
        const parts =
            dataUrl.split(",");

        if (
            parts.length !== 2
        ) {
            return null;
        }

        const mimeMatch =
            parts[0].match(
                /data:([^;]+);base64/
            );

        if (!mimeMatch) {
            return null;
        }

        const mime =
            mimeMatch[1];

        const binary =
            atob(parts[1]);

        const bytes =
            new Uint8Array(
                binary.length
            );

        for (
            let i = 0;
            i < binary.length;
            i++
        ) {
            bytes[i] =
                binary.charCodeAt(i);
        }

        return new Blob(
            [bytes],
            {
                type: mime
            }
        );
    } catch {
        return null;
    }
}


/* ================================================================
   DOWNLOAD
   ================================================================ */

async function downloadResult() {
    if (
        !currentObjectUrl ||
        !currentFile
    ) {
        return;
    }

    try {
        const image =
            await loadImage(
                currentObjectUrl
            );

        const maxWidth = 1400;
        const maxHeight = 1400;

        const ratio =
            Math.min(
                1,
                maxWidth /
                image.naturalWidth,
                maxHeight /
                image.naturalHeight
            );

        const width =
            Math.max(
                1,
                Math.round(
                    image.naturalWidth *
                    ratio
                )
            );

        const height =
            Math.max(
                1,
                Math.round(
                    image.naturalHeight *
                    ratio
                )
            );

        const canvas =
            document.createElement(
                "canvas"
            );

        canvas.width = width;
        canvas.height = height;

        const context =
            canvas.getContext(
                "2d"
            );

        if (!context) {
            return;
        }

        context.drawImage(
            image,
            0,
            0,
            width,
            height
        );

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    return;
                }

                const url =
                    URL.createObjectURL(
                        blob
                    );

                const link =
                    document.createElement(
                        "a"
                    );

                link.href = url;

                link.download =
                    `potato-meter-${currentAnalysis?.score ??
                    0
                    }.png`;

                document.body.appendChild(
                    link
                );

                link.click();

                link.remove();

                setTimeout(() => {
                    URL.revokeObjectURL(
                        url
                    );
                }, 1000);
            },
            "image/png"
        );
    } catch (error) {
        console.error(
            "Download error:",
            error
        );
    }
}


/* ================================================================
   RESET
   ================================================================ */

function resetApp(
    focusUpload = false
) {
    revokeCurrentObjectUrl();

    currentFile = null;
    currentAnalysis = null;
    currentShareFile = null;

    if (fileInput) {
        fileInput.value = "";
    }

    if (previewImage) {
        previewImage.onload = null;
        previewImage.onerror = null;

        previewImage.removeAttribute(
            "src"
        );

    }

    if (resultPhoto) {
        resultPhoto.removeAttribute(
            "src"
        );

        resultPhoto.style.display =
            "none";
    }

    setHidden(
        previewWrapper,
        true
    );

    setHidden(
        loadingState,
        true
    );

    setHidden(
        resultSection,
        true
    );

    if (scoreValue) {
        scoreValue.textContent =
            "0";
    }

    if (scoreVerdict) {
        scoreVerdict.textContent =
            "—";
    }

    if (shapeValue) {
        shapeValue.textContent =
            "0%";
    }

    if (colorValue) {
        colorValue.textContent =
            "0%";
    }

    if (textureValue) {
        textureValue.textContent =
            "0%";
    }

    if (shapeProgress) {
        shapeProgress.style.width =
            "0%";
    }

    if (colorProgress) {
        colorProgress.style.width =
            "0%";
    }

    if (textureProgress) {
        textureProgress.style.width =
            "0%";
    }

    if (resultMessage) {
        resultMessage.textContent =
            "—";
    }

    setLoadingProgress(0);

    if (loadingTitle) {
        loadingTitle.textContent =
            t("scanning");
    }

    if (loadingDescription) {
        loadingDescription.textContent =
            t("scanningDescription");
    }

    if (scanButton) {
        scanButton.disabled = false;
    }

    uploadButton?.classList.remove(
        "dragging"
    );

    if (focusUpload) {
        requestAnimationFrame(() => {
            document
                .querySelector(
                    ".upload-section"
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            setTimeout(() => {
                /*
                   The upload element is a label,
                   so focusing it is optional.
                */

                uploadButton?.focus();
            }, 350);
        });
    }
}


/* ================================================================
   DOM STATE HELPERS
   ================================================================ */

function setHidden(
    element,
    hidden
) {
    if (!element) {
        return;
    }

    element.hidden =
        Boolean(hidden);
}


function revokeCurrentObjectUrl() {
    if (!currentObjectUrl) {
        return;
    }

    try {
        URL.revokeObjectURL(
            currentObjectUrl
        );
    } catch {
        // Ignore cleanup errors.
    }

    currentObjectUrl = null;
}


/* ================================================================
   HELPERS
   ================================================================ */

function loadImage(src) {
    return new Promise(
        (resolve, reject) => {
            const image =
                new Image();

            image.onload = () => {
                resolve(image);
            };

            image.onerror = () => {
                reject(
                    new Error(
                        "Image could not be loaded."
                    )
                );
            };

            image.src = src;
        }
    );
}


function getPixel(
    data,
    width,
    x,
    y
) {
    const safeX =
        clamp(
            Math.round(x),
            0,
            width - 1
        );

    const imageHeight =
        Math.floor(
            data.length /
            4 /
            width
        );

    const safeY =
        clamp(
            Math.round(y),
            0,
            imageHeight - 1
        );

    const index =
        (
            safeY * width +
            safeX
        ) * 4;

    return {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2]
    };
}


function averageRgb(
    pixels
) {
    if (!pixels.length) {
        return {
            r: 0,
            g: 0,
            b: 0
        };
    }

    let r = 0;
    let g = 0;
    let b = 0;

    for (const pixel of pixels) {
        r += pixel.r;
        g += pixel.g;
        b += pixel.b;
    }

    return {
        r:
            r /
            pixels.length,

        g:
            g /
            pixels.length,

        b:
            b /
            pixels.length
    };
}


function colorDistance(
    a,
    b
) {
    const dr =
        a.r - b.r;

    const dg =
        a.g - b.g;

    const db =
        a.b - b.b;

    return Math.sqrt(
        dr * dr +
        dg * dg +
        db * db
    );
}


function luminanceAt(
    data,
    width,
    x,
    y
) {
    const pixel =
        getPixel(
            data,
            width,
            x,
            y
        );

    return (
        pixel.r * 0.299 +
        pixel.g * 0.587 +
        pixel.b * 0.114
    );
}


function gaussianScore(
    value,
    target,
    spread
) {
    const difference =
        value - target;

    return (
        Math.exp(
            -(
                difference *
                difference
            ) /
            (
                2 *
                spread *
                spread
            )
        ) * 100
    );
}


function clamp(
    value,
    min,
    max
) {
    return Math.min(
        max,
        Math.max(
            min,
            value
        )
    );
}


function sleep(ms) {
    return new Promise(
        (resolve) => {
            setTimeout(
                resolve,
                ms
            );
        }
    );
}