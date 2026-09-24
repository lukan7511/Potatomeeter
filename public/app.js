/* ================================================================
   Potatomeeter 4.0
   LOCAL IMAGE ANALYSIS + RU / EN
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});


/* ================================================================
   TRANSLATIONS
   ================================================================ */

const translations = {
    ru: {
        brandTagline: "лаборатория обнаружения картошки",
        systemOnline: "СИСТЕМА ONLINE",

        heroEyebrow: "ДВИЖОК АНАЛИЗА КАРТОШКИ",
        heroTitleLine1: "Насколько",
        heroTitleLine2: "картошка на фото?",
        heroDescription:
            "Загрузите фотографию, и наша высоконаучная система определения картошки выяснит, насколько она похожа на картофель.",

        uploadTitle: "Перетащите фото сюда",
        uploadDescription: "Или выберите изображение на устройстве.",
        choosePhoto: "Выбрать фотографию",
        uploadHint: "JPG · PNG · WEBP · до 15 МБ",

        previewKicker: "ФОТО ГОТОВО",
        previewTitle: "Ваша фотография",
        remove: "Удалить",

        fileLabel: "ФАЙЛ",
        sizeLabel: "РАЗМЕР",

        scanButton: "Сканировать фотографию",

        loadingTitle: "Проверяем картофельный потенциал…",
        loadingText: "Измеряем форму, цвет и текстуру.",

        resultKicker: "АНАЛИЗ ЗАВЕРШЁН",
        resultTitle: "Картофельный вердикт",
        resultBadge: "ЛОКАЛЬНЫЙ АНАЛИЗ",

        scoreLabel: "КАРТОФЕЛЬНЫЙ БАЛЛ",

        shape: "Форма",
        color: "Цвет",
        texture: "Текстура",

        share: "Поделиться",
        download: "Скачать",
        scanAnother: "Сканировать ещё",

        infoLocalTitle: "Работает локально",
        infoLocalText:
            "Фотография анализируется прямо в вашем браузере.",

        infoScienceTitle: "Серьёзная наука",
        infoScienceText:
            "Форма, цвет и текстура проходят тщательное исследование.",

        infoPotatoTitle: "Картофельная экспертиза",
        infoPotatoText:
            "Десятилетия совершенно вымышленного исследования картошки.",

        footerText: "Potatomeeter",
        footerSubtext:
            "научная сомнительность, эмоциональная точность",

        verdictVeryPotato:
            "Это практически эталонная картошка.",
        verdictPotato:
            "Очень картофельный экземпляр.",
        verdictLikelyPotato:
            "Картофельные признаки явно присутствуют.",
        verdictMaybePotato:
            "Картошка? Есть основания полагать.",
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
            "Мой Potatomeeter результат",
        shareText:
            "Моя фотография получила {score}% картофельности 🥔",

        loadingStep1:
            "Изучаем силуэт объекта…",
        loadingStep2:
            "Сравниваем картофельные оттенки…",
        loadingStep3:
            "Проверяем текстуру…",
        loadingStep4:
            "Формируем окончательный вердикт…"
    },

    en: {
        brandTagline: "potato detection laboratory",
        systemOnline: "SYSTEM ONLINE",

        heroEyebrow: "POTATO ANALYSIS ENGINE",
        heroTitleLine1: "How potato",
        heroTitleLine2: "is your photo?",
        heroDescription:
            "Upload a photo and let our highly scientific potato detection system determine just how potato-like it is.",

        uploadTitle: "Drop your photo here",
        uploadDescription: "Or choose an image from your device.",
        choosePhoto: "Choose a photo",
        uploadHint: "JPG · PNG · WEBP · up to 15 MB",

        previewKicker: "PHOTO READY",
        previewTitle: "Your photo",
        remove: "Remove",

        fileLabel: "FILE",
        sizeLabel: "SIZE",

        scanButton: "Scan this photo",

        loadingTitle: "Inspecting potato potential…",
        loadingText: "Measuring shape, color and texture.",

        resultKicker: "ANALYSIS COMPLETE",
        resultTitle: "Potato verdict",
        resultBadge: "LOCAL ANALYSIS",

        scoreLabel: "POTATO SCORE",

        shape: "Shape",
        color: "Color",
        texture: "Texture",

        share: "Share",
        download: "Download",
        scanAnother: "Scan another",

        infoLocalTitle: "Runs locally",
        infoLocalText:
            "Your photo is analyzed directly in your browser.",

        infoScienceTitle: "Serious science",
        infoScienceText:
            "Shape, color and texture are carefully examined.",

        infoPotatoTitle: "Potato expertise",
        infoPotatoText:
            "Decades of completely imaginary potato research.",

        footerText: "Potatomeeter",
        footerSubtext:
            "scientifically questionable, emotionally accurate",

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
            "My Potatomeeter result",
        shareText:
            "My photo scored {score}% potato 🥔",

        loadingStep1:
            "Inspecting the object silhouette…",
        loadingStep2:
            "Comparing potato-like colors…",
        loadingStep3:
            "Checking texture…",
        loadingStep4:
            "Preparing the final verdict…"
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
let browseButton;
let dropzone;

let previewSection;
let previewImage;

let fileName;
let fileSize;

let removeButton;
let scanButton;

let loadingSection;
let loadingText;
let loadingProgressBar;

let resultSection;
let resultPhoto;

let scoreValue;
let verdict;

let shapeScore;
let colorScore;
let textureScore;

let shapeBar;
let colorBar;
let textureBar;

let shareButton;
let downloadButton;
let againButton;


/* ================================================================
   INIT
   ================================================================ */

function initApp() {
    fileInput = document.getElementById("fileInput");
    browseButton = document.getElementById("browseButton");
    dropzone = document.getElementById("dropzone");

    previewSection = document.getElementById("previewSection");
    previewImage = document.getElementById("previewImage");

    fileName = document.getElementById("fileName");
    fileSize = document.getElementById("fileSize");

    removeButton = document.getElementById("removeButton");
    scanButton = document.getElementById("scanButton");

    loadingSection = document.getElementById("loadingSection");
    loadingText = document.getElementById("loadingText");
    loadingProgressBar =
        document.getElementById("loadingProgressBar");

    resultSection = document.getElementById("resultSection");
    resultPhoto = document.getElementById("resultPhoto");

    scoreValue = document.getElementById("scoreValue");
    verdict = document.getElementById("verdict");

    shapeScore = document.getElementById("shapeScore");
    colorScore = document.getElementById("colorScore");
    textureScore = document.getElementById("textureScore");

    shapeBar = document.getElementById("shapeBar");
    colorBar = document.getElementById("colorBar");
    textureBar = document.getElementById("textureBar");

    shareButton = document.getElementById("shareButton");
    downloadButton = document.getElementById("downloadButton");
    againButton = document.getElementById("againButton");

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
            localStorage.getItem("potatoMeterLanguage");
    } catch {
        savedLanguage = null;
    }

    if (
        savedLanguage === "ru" ||
        savedLanguage === "en"
    ) {
        currentLanguage = savedLanguage;
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
            button.addEventListener("click", () => {
                const language =
                    button.dataset.language;

                if (
                    language !== "ru" &&
                    language !== "en"
                ) {
                    return;
                }

                setLanguage(language);
            });
        });

    setLanguage(currentLanguage);
}


function setLanguage(language) {
    currentLanguage = language;

    document.documentElement.lang = language;

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
                button.dataset.language === language
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
        verdict.textContent =
            getVerdict(currentAnalysis.score);

        /*
           Пересоздаём карточку Share на новом языке.
           Это гарантирует, что после переключения RU/EN
           отправится актуальная версия карточки.
        */
        currentShareFile =
            createShareCardFile(
                currentAnalysis
            );
    }
}


function t(key) {
    const dictionary =
        translations[currentLanguage] ||
        translations.ru;

    return dictionary[key] || key;
}


/* ================================================================
   FILE INPUT
   ================================================================ */

function setupFileInput() {
    if (!fileInput) {
        return;
    }

    fileInput.addEventListener("change", (event) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        handleFile(file);
    });
}


/* ================================================================
   DRAG & DROP
   ================================================================ */

function setupDragAndDrop() {
    if (!dropzone) {
        return;
    }

    [
        "dragenter",
        "dragover"
    ].forEach((eventName) => {
        dropzone.addEventListener(
            eventName,
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                dropzone.classList.add("dragging");
            }
        );
    });

    [
        "dragleave",
        "dragend"
    ].forEach((eventName) => {
        dropzone.addEventListener(
            eventName,
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                dropzone.classList.remove(
                    "dragging"
                );
            }
        );
    });

    dropzone.addEventListener(
        "drop",
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            dropzone.classList.remove(
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
    if (!file.type.startsWith("image/")) {
        alert(t("invalidFile"));

        if (fileInput) {
            fileInput.value = "";
        }

        return;
    }

    const maxSize =
        15 * 1024 * 1024;

    if (file.size > maxSize) {
        alert(t("tooLarge"));

        if (fileInput) {
            fileInput.value = "";
        }

        return;
    }

    if (currentObjectUrl) {
        URL.revokeObjectURL(
            currentObjectUrl
        );

        currentObjectUrl = null;
    }

    currentFile = file;
    currentAnalysis = null;
    currentShareFile = null;

    currentObjectUrl =
        URL.createObjectURL(file);

    previewSection.classList.remove(
        "hidden"
    );

    loadingSection.classList.add(
        "hidden"
    );

    resultSection.classList.add(
        "hidden"
    );

    scanButton.disabled = false;

    fileName.textContent =
        file.name;

    fileSize.textContent =
        formatFileSize(file.size);

    previewImage.style.display =
        "block";

    previewImage.onload = () => {
        previewSection.classList.remove(
            "hidden"
        );

        requestAnimationFrame(() => {
            previewSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    };

    previewImage.onerror = () => {
        alert(t("imageError"));

        resetApp(true);
    };

    previewImage.src =
        currentObjectUrl;
}


/* ================================================================
   SCAN
   ================================================================ */

async function runScan() {
    if (!currentFile || !currentObjectUrl) {
        return;
    }

    scanButton.disabled = true;

    resultSection.classList.add(
        "hidden"
    );

    loadingSection.classList.remove(
        "hidden"
    );

    loadingProgressBar.style.width =
        "0%";

    loadingText.textContent =
        t("loadingStep1");

    loadingSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    await sleep(180);

    loadingProgressBar.style.width =
        "25%";

    loadingText.textContent =
        t("loadingStep1");

    await sleep(180);

    loadingProgressBar.style.width =
        "50%";

    loadingText.textContent =
        t("loadingStep2");

    await sleep(180);

    loadingProgressBar.style.width =
        "70%";

    loadingText.textContent =
        t("loadingStep3");

    await sleep(180);

    try {
        currentAnalysis =
            await analyzeImage(
                currentObjectUrl
            );

        loadingProgressBar.style.width =
            "90%";

        loadingText.textContent =
            t("loadingStep4");

        await sleep(180);

        loadingProgressBar.style.width =
            "100%";

        renderResult(
            currentAnalysis
        );
    } catch (error) {
        console.error(
            "Potatomeeter analysis error:",
            error
        );

        alert(
            t("imageError")
        );

        loadingSection.classList.add(
            "hidden"
        );

        scanButton.disabled = false;
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
                image.naturalWidth * scale
            )
        );

    const height =
        Math.max(
            1,
            Math.round(
                image.naturalHeight * scale
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
        score: clamp(
            score,
            0,
            100
        ),
        shape: Math.round(
            clamp(shape, 0, 100)
        ),
        color: Math.round(
            clamp(color, 0, 100)
        ),
        texture: Math.round(
            clamp(texture, 0, 100)
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
                Math.min(width, height) / 100
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

    let threshold =
        42;

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
                }
            }
        }

        const ratio =
            foregroundCount /
            total;

        if (ratio > 0.92) {
            threshold += 18;
        } else if (ratio < 0.06) {
            threshold -= 8;
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
            count: width * height
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
                fillRatio - 0.64
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
        sizeScore * 0.20
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
            Math.max(r, g, b);

        const min =
            Math.min(r, g, b);

        const saturation =
            max === 0
                ? 0
                : (max - min) / max;

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
    resultPhoto.src =
        currentObjectUrl;

    resultPhoto.style.display =
        "block";

    scoreValue.textContent =
        `${analysis.score}%`;

    shapeScore.textContent =
        `${analysis.shape}%`;

    colorScore.textContent =
        `${analysis.color}%`;

    textureScore.textContent =
        `${analysis.texture}%`;

    shapeBar.style.width =
        `${analysis.shape}%`;

    colorBar.style.width =
        `${analysis.color}%`;

    textureBar.style.width =
        `${analysis.texture}%`;

    verdict.textContent =
        getVerdict(
            analysis.score
        );

    loadingSection.classList.add(
        "hidden"
    );

    resultSection.classList.remove(
        "hidden"
    );

    scanButton.disabled = false;

    /*
       Создаём PNG-карточку сразу после результата.
       Поэтому к моменту нажатия Share файл уже готов.
    */
    try {
        currentShareFile =
            createShareCardFile(
                analysis
            );
    } catch (error) {
        console.error(
            "Share card creation error:",
            error
        );

        currentShareFile = null;
    }

    requestAnimationFrame(() => {
        resultSection.scrollIntoView({
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


/* ================================================================
   SHARE
   ================================================================ */

async function shareResult() {
    if (!currentAnalysis) {
        return;
    }

    const shareTitle =
        t("shareTitle");

    const shareText =
        t("shareText")
            .replace(
                "{score}",
                currentAnalysis.score
            );

    /*
       Если карточка ещё не создана —
       создаём её прямо сейчас.
    */
    if (!currentShareFile) {
        try {
            currentShareFile =
                createShareCardFile(
                    currentAnalysis
                );
        } catch (error) {
            console.error(
                "Share card creation error:",
                error
            );

            currentShareFile = null;
        }
    }

    /*
       Нужна поддержка Web Share API.
    */
    if (
        !navigator.share ||
        !navigator.canShare
    ) {
        showShareError();

        return;
    }

    /*
       Без файла НЕ вызываем navigator.share().
       Иначе телефон снова получит только текст.
    */
    if (!currentShareFile) {
        showShareError();

        return;
    }

    /*
       Проверяем именно возможность
       отправки файлов.
    */
    let canShareFile = false;

    try {
        canShareFile =
            navigator.canShare({
                files: [
                    currentShareFile
                ]
            });
    } catch (error) {
        console.error(
            "File sharing check failed:",
            error
        );

        canShareFile = false;
    }

    /*
       Браузер не умеет отправлять изображения.
       Не откатываемся к тексту.
    */
    if (!canShareFile) {
        showShareError();

        return;
    }

    /*
       Отправляем ТОЛЬКО изображение.

       text специально НЕ передаём.
       Это важно: некоторые системы иначе
       показывают текст вместо изображения.
    */
    try {
        await navigator.share({
            files: [
                currentShareFile
            ],
            title: shareTitle
        });

        console.log(
            "Potatomeeter card shared successfully."
        );
    } catch (error) {
        if (
            error?.name ===
            "AbortError"
        ) {
            return;
        }

        console.error(
            "Image sharing failed:",
            error
        );

        showShareError();
    }
}

/* ================================================================
   SHARE ERROR
   ================================================================ */

function showShareError() {
    const message =
        currentLanguage === "ru"
            ? "Этот браузер не поддерживает отправку изображений через кнопку «Поделиться». Попробуйте открыть Potatomeeter в Chrome или Safari."
            : "This browser does not support sharing images from the website. Try opening Potatomeeter in Chrome or Safari.";

    alert(message);
}


/* ================================================================
   SHARE CARD
   ================================================================ */

/*
   Создаёт самостоятельную PNG-карточку:

   ┌──────────────────────────────────┐
   │          Potatomeeter            │
   │                                  │
   │          [ ФОТО ]                │
   │                                  │
   │          POTATO SCORE             │
   │             87%                  │
   │      Very potato-like...         │
   │                                  │
   │  Shape     Color     Texture     │
   │   82%       91%        64%       │
   └──────────────────────────────────┘

   Карточка не зависит от DOM/CSS сайта.
   Это настоящий PNG, который можно отправить
   в Telegram / WhatsApp / Messages и т.д.
*/

function createShareCardFile(
    analysis
) {
    if (
        !analysis ||
        !resultPhoto
    ) {
        return null;
    }

    if (
        !resultPhoto.complete ||
        !resultPhoto.naturalWidth ||
        !resultPhoto.naturalHeight
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
       Subtle decorative circles
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
       Header
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
        "Potatomeeter",
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
       Photo area
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
       Preserve original image aspect ratio.
    */

    const imageWidth =
        resultPhoto.naturalWidth;

    const imageHeight =
        resultPhoto.naturalHeight;

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
        resultPhoto,
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
        `${analysis.score}%`,
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

    const verdictText =
        getVerdict(
            analysis.score
        );

    drawWrappedText(
        context,
        verdictText,
        width / 2,
        1135,
        900,
        34
    );

    /*
       Details
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
       Convert canvas to PNG synchronously.

       Это сделано намеренно: File создаётся
       ещё до нажатия Share, поэтому само
       navigator.share() вызывается непосредственно
       из обработчика кнопки без дополнительного
       ожидания генерации изображения.
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
        [
            blob
        ],
        `potato-meter-${analysis.score}.png`,
        {
            type: "image/png",
            lastModified:
                Date.now()
        }
    );
}


/* ================================================================
   SHARE CARD DRAWING HELPERS
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

    /*
       Bar background
    */

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

    /*
       Bar value
    */

    context.fillStyle =
        "#667a3d";

    roundRect(
        context,
        x,
        y + 16,
        Math.max(
            2,
            220 * (
                value / 100
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

            currentLine =
                word;
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
            [
                bytes
            ],
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
                    `potato-meter-${currentAnalysis?.score ?? 0}.png`;

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
    if (currentObjectUrl) {
        URL.revokeObjectURL(
            currentObjectUrl
        );

        currentObjectUrl = null;
    }

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

        previewImage.style.display =
            "none";
    }

    if (resultPhoto) {
        resultPhoto.onload = null;
        resultPhoto.onerror = null;

        resultPhoto.removeAttribute(
            "src"
        );

        resultPhoto.style.display =
            "none";
    }

    previewSection?.classList.add(
        "hidden"
    );

    loadingSection?.classList.add(
        "hidden"
    );

    resultSection?.classList.add(
        "hidden"
    );

    if (fileName) {
        fileName.textContent = "—";
    }

    if (fileSize) {
        fileSize.textContent = "—";
    }

    if (scoreValue) {
        scoreValue.textContent = "0%";
    }

    if (shapeScore) {
        shapeScore.textContent = "0%";
    }

    if (colorScore) {
        colorScore.textContent = "0%";
    }

    if (textureScore) {
        textureScore.textContent = "0%";
    }

    if (verdict) {
        verdict.textContent = "—";
    }

    if (shapeBar) {
        shapeBar.style.width = "0%";
    }

    if (colorBar) {
        colorBar.style.width = "0%";
    }

    if (textureBar) {
        textureBar.style.width = "0%";
    }

    if (loadingProgressBar) {
        loadingProgressBar.style.width =
            "0%";
    }

    if (loadingText) {
        loadingText.textContent =
            t("loadingText");
    }

    if (scanButton) {
        scanButton.disabled = false;
    }

    dropzone?.classList.remove(
        "dragging"
    );

    if (focusUpload) {
        requestAnimationFrame(() => {
            document
                .getElementById(
                    "uploadSection"
                )
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            setTimeout(() => {
                browseButton?.focus();
            }, 400);
        });
    }
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

    const safeY =
        clamp(
            Math.round(y),
            0,
            Math.floor(
                data.length /
                4 /
                width
            ) - 1
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
        r: r / pixels.length,
        g: g / pixels.length,
        b: b / pixels.length
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


function formatFileSize(
    bytes
) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(
            bytes / 1024
        ).toFixed(1)} KB`;
    }

    return `${(
        bytes /
        (1024 * 1024)
    ).toFixed(1)} MB`;
}