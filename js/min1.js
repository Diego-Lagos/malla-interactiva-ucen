! function() {
    const t = window.location.hostname;
    ["localhost", "booterman98.github.io"].includes(t) || (window.location.href = "https://booterman98.github.io/malla-interactiva/")
}();
let vh = .01 * window.innerHeight;

function render(t) {
    return function(e, a) {
        return a % 2 ? t[e] : e
    }
}
document.documentElement.style.setProperty("--vh", `${vh}px`), window.addEventListener("resize", () => {
    let t = .01 * window.innerHeight;
    document.documentElement.style.setProperty("--vh", `${t}px`)
});
let relaPath = "./",
    prioridad = document.URL.includes("prioridad"),
    personalizar = document.URL.includes("personalizar"),
    mallaPersonal = document.URL.includes("malla."),
    contact = document.URL.includes("contact"),
    fullCareerName = "",
    texts = "Malla";
mallaPersonal ? texts = "Personal" : prioridad ? texts = "Prioridad" : personalizar && (texts = "Generadora"), ("Malla" !== texts || contact) && (relaPath = "../");
let params = new URLSearchParams(window.location.search),
    carr = localStorage.getItem("currentCarreer");
if (params.get("m") && (carr = params.get("m"), localStorage.setItem("currentCarreer", carr)), carr) {
    let t = new URL(window.location.href);
    t.searchParams.set("m", carr), window.history.pushState({}, "", t)
}
carr || (carr = "ICCI_2018");
let sct = !0;
"false" === params.get("SCT") && (sct = !1), console.log("dom");
let includes = document.querySelectorAll("[data-include]"),
    promises = [],
    welcomeTexts = {};
includes.forEach(t => {
    let e = relaPath + "views/" + t.attributes["data-include"].nodeValue + ".html";
    promises.push(fetch(e).then(t => t.text()).then(e => {
        t.insertAdjacentHTML("afterbegin", e)
    }))
});
let fileURL = relaPath + "data/welcomeTexts.json";

function removePopUp() {
    d3.select("body").style("overflow", "initial"), d3.selectAll(".overlay").style("-webkit-backdrop-filter", "blur(0px) contrast(100%)"), d3.selectAll(".overlay").style("backdrop-filter", "blur(0px) contrast(100%)"), d3.select(".overlay-content").transition().style("filter", "opacity(0)"), d3.select(".overlay").transition().style("filter", "opacity(0)").on("end", function() {
        d3.select(this).remove()
    })
}

function changeCreditsSystem() {
    let t = "SCT",
        e = "false";
    const a = new URLSearchParams(window.location.search);
    a.has(t) && (e = !("true" === a.get(t))), t = encodeURI(t), e = encodeURI(e);
    for (var r, s = document.location.search.substr(1).split("&"), i = s.length; i--;)
        if ((r = s[i].split("="))[0] === t) {
            r[1] = e, s[i] = r.join("=");
            break
        }
    i < 0 && (s[s.length] = [t, e].join("=")), document.location.search = s.join("&")
}
promises.push(fetch(fileURL).then(t => t.json())), Promise.all(promises).then(() => fetch(new Request(relaPath + "date.txt"))).then(t => {
    console.log(t);
    let e = t.headers.get("last-modified"),
        a = new Date(e);
    console.log(a), document.getElementById("lastUpdate").textContent = a.toLocaleString()
}), Promise.all(promises).then(t => {
    welcomeTexts = t.pop()[texts];
    let e = document.getElementById("goToHome");
    return e.setAttribute("href", relaPath + "?m=" + carr), fetch(relaPath + "/data/carreras.json")
}).then(t => t.json()).then(t => {
    let e = document.querySelector('script[data-template="tab-template1"]').text.split(/\${(.+?)}/g),
        a = document.querySelector('script[data-template="tab-template2"]').text.split(/\${(.+?)}/g);
    contact && document.querySelectorAll(".carrers").forEach(t => t.remove()), t.forEach(t => {
        if (t.Link === carr)
            if (fullCareerName = t.Nombre, welcomeTexts.welcomeTitle = welcomeTexts.welcomeTitle.replace("CARRERA", t.Nombre), $(".carrera").text(t.Nombre), mallaPersonal) {
                let e = document.title;
                document.title = e + " basada en " + t.Nombre
            } else {
                let e = document.title.slice(0, 17);
                e += " " + t.Nombre, e += document.title.slice(17), document.title = e
            }
    }), $("#carreras1-nav").append(t.map(function(t) {
        return e.map(render(t)).join("")
    })), $("#carreras2-nav").append(t.map(function(t) {
        return a.map(render(t)).join("")
    })), document.querySelector(".overlay-content h1") && (document.querySelector(".overlay-content h1").textContent = welcomeTexts.welcomeTitle, document.querySelector(".overlay-content h5").textContent = welcomeTexts.welcomeDesc)
}), $(function() {
    if (contact) return;
    if (sct) {
        document.getElementById("creditsExample").textContent = "Créditos SCT";
        let t = parseInt(document.getElementById("creditsNumberExample").textContent);
        document.getElementById("creditsNumberExample").textContent = Math.round(5 * t / 3).toString()
    }
    let t = null,
        e = null;
    prioridad ? (t = new Malla(sct, SelectableRamo, .804, 1), t.enableCreditsSystem(), document.getElementById("custom-credits-USM").addEventListener("input", function() {
        "" == this.value ? document.getElementById("custom-credits-SCT").setAttribute("placeholder", "Ingrese un valor") : document.getElementById("custom-credits-SCT").setAttribute("placeholder", Math.round(5 * this.value / 3).toString())
    })) : personalizar && !mallaPersonal ? (t = new Malla(sct, SelectableRamo, .804, 1), t.enableCreditsSystem(), document.getElementById("custom-credits-USM").addEventListener("input", function() {
        "" == this.value ? document.getElementById("custom-credits-SCT").setAttribute("placeholder", "Ingrese un valor") : document.getElementById("custom-credits-SCT").setAttribute("placeholder", Math.round(5 * this.value / 3).toString())
    }), document.getElementById("custom-creditsa-USM").addEventListener("input", function() {
        "" == this.value ? document.getElementById("custom-creditsa-SCT").setAttribute("placeholder", "Ingrese un valor") : document.getElementById("custom-creditsa-SCT").setAttribute("placeholder", Math.round(5 * this.value / 3).toString())
    })) : mallaPersonal ? (t = new CustomMalla(sct), document.getElementById("cleanApprovedButton").addEventListener("click", () => t.cleanSubjects()), t.enableCreditsStats(), t.enableCreditsSystem()) : (t = new Malla(sct), t.enableCreditsStats(), t.enableCreditsSystem(), t.enableSave(), document.getElementById("cleanApprovedButton").addEventListener("click", () => t.cleanSubjects()));
    let a = t.setCareer(carr, fullCareerName, relaPath).then(e => t.drawMalla(".canvas"));
    a.then(() => {
    // 1. Inicializar datos del visualizador
    t.initVisualizer(); 
    
    // 2. ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE RENDERIZADO
    requestAnimationFrame(() => {
        // 3. Ahora sí adjuntar los listeners
        t.startVisualizerListeners();
        console.log("Visualizer: Fully initialized");
    });
    
    t.updateStats();
    t.updateSelectedCreditsCounter(); // <--- NEW CALL
    t.displayCreditSystem();
    t.showColorDescriptions(".color-description");
    document.getElementById("overlay").addEventListener("click", () => {
        prioridad || personalizar && !mallaPersonal ? t.semesterManager.loadSemesters() : t.loadAllStates(), t.enablePrerCheck()
    })
});
});
class Malla {
    constructor(t = !1, e = Ramo, a = 1, r = 1) {
        this.scaleX = a, this.scaleY = r, this.subjectType = e, this.rawMalla = {}, this.categories = {}, this.malla = {}, this.sct = t, this.longestSemester = 0, this.totalCredits = 0, this.totalSubjects = 0, 
        this.MAX_SELECTED_CREDITS = 30, // <--- VARIABLE PARA CAMBIAR EL LÍMITE DE CRÉDITOS SELECCIONADOS (AMARILLOS)
        this.semesterManager = null, this.currentMalla = null, this.generatedCode = [], 
        this.APPROVED = [], 
        this.FAILED = [], // NUEVO: Lista de ramos reprobados
        this.ONHOLD = [], // NUEVO: Lista de ramos pendientes
        this.SUBJECTID = 1, 
        this.ALLSUBJECTS = {}, 
        this.checkPrer = !1, this.saveEnabled = !1, this.isMallaSet = !1, this.showCreditSystem = !1, this.showCreditStats = !1, this.totalCredits = 0, this.totalSubjects = 0, 
        document.getElementById("loadfile") && document.getElementById("loadfile").addEventListener("click", this.loadFile.bind(this)),
        document.getElementById("downloadStateButton") && document.getElementById("downloadStateButton").addEventListener("click", this.downloadMallaState.bind(this));
        
        // MODIFICACIÓN: Listener para la descarga de imagen
        document.getElementById("downloadImageButton") && document.getElementById("downloadImageButton").addEventListener("click", () => this.downloadMallaImage("jpg"));
        
        // Propiedad para el visualizador
        this.dependencyMap = {}; // sigla -> { prer: [], unlocks: [] }
    }
    enableCreditsStats() {
        this.showCreditStats = !0
    }
    enableCreditsSystem() {
        this.showCreditSystem = !0
    }
    enableSave() {
        this.saveEnabled = !0
    }
    setCareer(t, e, a) {
        if (null != localStorage.sharedMalla) {
            let t = localStorage.sharedMalla;
            localStorage.removeItem("sharedMalla");
            let e = JSON.parse(t);
            return this.currentMalla = e.name, this.fullCareerName = e.name, console.log("hola"), console.log(e.name), Promise.resolve(this.setMallaAndCategories(e.malla, e.categories))
        } {
            this.currentMalla = t, this.fullCareerName = e;
            let r = [];
            return r.push(d3.json(a + "data/data_" + this.currentMalla + ".json")), r.push(d3.json(a + "data/colors_" + this.currentMalla + ".json")), Promise.all(r).then(t => {
                this.setMallaAndCategories(t[0], t[1])
            })
        }
    }
    setMallaAndCategories(t, e) {
        let a, r = 0,
            s = 0,
            i = 0;
        for (a in this.rawMalla = t, this.categories = e, this.rawMalla) this.malla[a] = {}, t[a].length > r && (r = t[a].length), t[a].forEach(t => {
            i += 1, 7 === t.length ? this.malla[a][t[1]] = new this.subjectType(t[0], t[1], t[2], t[4], t[5], this.SUBJECTID++, this, t[3], !1, t[6]) : this.malla[a][t[1]] = new this.subjectType(t[0], t[1], t[2], t[3], t.length > 4 ? t[4] : [], this.SUBJECTID++, this), this.ALLSUBJECTS[t[1]] = this.malla[a][t[1]], s += this.malla[a][t[1]].getDisplayCredits()
        });
        this.longestSemester = r, this.totalCredits = s, this.totalSubjects = i, this.isMallaSet = !0
    }
    setSemesterManager(t) {
        this.semesterManager = t
    }
    addSubject(t) {
        this.ALLSUBJECTS[t.sigla] = t
    }
    delSubjects(t) {
        Object.values(this.ALLSUBJECTS).forEach(e => {
            e.prer.has(t.sigla) && (e.prer.delete(t.sigla), e.verifyPrer())
        }), delete this.ALLSUBJECTS[t.sigla]
    }
    drawMalla(t) {
        if (!this.isMallaSet) return;
        let e = 10,
            a = 30 * this.scaleY,
            r = this.subjectType.getDisplayWidth(this.scaleX) * Object.keys(this.malla).length + e * (Object.keys(this.malla).length - 1),
            s = (this.subjectType.getDisplayHeight(this.scaleY) + e) * this.longestSemester + 2 * a + e,
            i = r + e,
            l = s + 5;
        const n = d3.select(t).append("svg").attr("width", i).attr("height", l).attr("role", "figure");
        n.append("title").text("Malla " + this.fullCareerName);
        const o = n;
        let c = 5,
            d = 0,
            h = !1,
            m = 0,
            p = 0,
            u = null,
            g = null,
            y = null;
        Object.keys(this.malla).forEach(t => {
            if (d = 0, 0 === m) {
                y = o.append("g").attr("cursor", "pointer").attr("role", "heading").attr("aria-level", "5").classed("year", !0);
                let t = y.append("title");
                u = y.append("rect").attr("x", c).attr("y", d).attr("width", this.subjectType.getDisplayWidth(this.scaleX)).attr("height", a).attr("fill", "gray").classed("bars", !0), m++, g = y.append("text").attr("x", c + this.subjectType.getDisplayWidth(this.scaleX) / 2).attr("y", d + a / 2).text("Año " + p++ + " 1/2").attr("font-weight", "bold").attr("fill", "white").attr("dominant-baseline", "central").attr("text-anchor", "middle"), t.text("Año " + p + " 1/2"), y.on("click", () => {
                    let t = d3.select(d3.event.currentTarget),
                        e = parseInt(t.select("text").text().substr(4));
                    t.node().getBBox().width <= 2 * this.subjectType.getDisplayWidth(this.scaleX) - this.subjectType.getDisplayWidth(this.scaleX) / 2 ? d3.select("#sem" + (2 * e + 1)).dispatch("click") : (d3.select("#sem" + 2 * e).dispatch("click"), d3.select("#sem" + (2 * e - 1)).dispatch("click"))
                })
            } else u.attr("width", 2 * this.subjectType.getDisplayWidth(this.scaleX) + e), g.text("Año " + p), g.attr("x", c - 5), m = 0, y.select("title").text("Año " + p);
            d += a + e, h || (o.append("rect").attr("x", c).attr("y", d).attr("width", r).attr("height", a).attr("fill", "#EEE").classed("sem", !0), h = !0);
            let s = t;
            s = "s" === s[0] ? parseInt(s.substr(1)) : parseInt(s);
            let i = o.append("g").attr("id", "sem" + s).attr("cursor", "pointer").attr("width", this.subjectType.getDisplayWidth(this.scaleX)).attr("height", a).attr("role", "heading").attr("aria-level", "6").classed("sem", !0);
            i.append("title").text("Semestre " + s), i.append("rect").attr("cursor", "pointer").attr("x", c).attr("y", d).attr("width", this.subjectType.getDisplayWidth(this.scaleX)).attr("height", a).classed("sem", !0).attr("fill", "#EEE"), i.append("text").attr("x", c + this.subjectType.getDisplayWidth(this.scaleX) / 2).attr("y", d + a / 2).text(this.romanize(s)).attr("dominant-baseline", "central").attr("text-anchor", "middle"), i.on("click", () => {
                let e = d3.select(d3.event.currentTarget),
                    a = this.deRomanize(e.select("text").text());
                "s" === t[0] && (a = "s" + a), Object.values(this.malla[a]).forEach(t => {
                    t.isBeingClicked()
                })
            }), d += a + e, Object.keys(this.malla[t]).forEach(a => {
                this.malla[t][a].draw(o, c, d, this.scaleX, this.scaleY), d += this.subjectType.getDisplayHeight(this.scaleY) + e
            }), c += this.subjectType.getDisplayWidth(this.scaleX) + e
        })
    }
    showColorDescriptions() {
        Object.keys(this.categories).forEach(t => {
            let e = d3.select(".color-description").append("div").attr("style", "display:flex;vertical-align:middle;margin-right:15px;");
            e.append("svg").attr("height", "25px").attr("width", "25px").append("circle").attr("r", 10).attr("cx", 12).attr("cy", 12).attr("fill", this.categories[t][0]), e.append("span").text(this.categories[t][1])
        })
    }
    enablePrerCheck() {
        this.checkPrer = !0, this.verifyPrer()
    }
    verifyPrer() {
        this.checkPrer && (Object.values(this.ALLSUBJECTS).forEach(t => {
            t.verifyPrer()
        }), this.saveAllStates())
    }
    displayCreditSystem() {
        this.showCreditSystem && d3.select("#credits-system").text(this.sct ? "SCT" : "USM") //TODO: cambiar codigos USM a UCEN
    }
    updateStats() {
        if (!this.showCreditStats) return;
        let t = 0,
            e = 0;
        this.APPROVED.forEach(a => {
            t += a.getDisplayCredits(), e += 1
        });
        let a = t / this.totalCredits * 100,
            r = e / this.totalSubjects * 100;
        d3.select("#credits").text(parseInt(t)), d3.select("#credPercentage").text(parseInt(a)), d3.select("#ramoPercentage").text(parseInt(r))
    }
    
    // NUEVO MÉTODO: Contador de créditos seleccionados (amarillos) y validación
    updateSelectedCreditsCounter() {
        let totalSelectedCredits = 0;
        
        // Sumar créditos de los ramos en estado 'onHold' (amarillos)
        this.ONHOLD.forEach(ramo => {
            totalSelectedCredits += ramo.getDisplayCredits();
        });

        const countDisplay = document.getElementById('selected-credit-count');
        const container = document.getElementById('credit-counter-container');

        if (countDisplay && container) {
            countDisplay.textContent = totalSelectedCredits;

            if (totalSelectedCredits > this.MAX_SELECTED_CREDITS) {
                container.classList.add('exceeded');
                // Alerta, se usa una bandera global para evitar spam
                if (!window.creditLimitAlertShown) {
                    alert(`¡Advertencia! Has superado el límite de ${this.MAX_SELECTED_CREDITS} créditos. Tienes ${totalSelectedCredits} créditos seleccionados (amarillos).`);
                    window.creditLimitAlertShown = true;
                }
            } else {
                container.classList.remove('exceeded');
                window.creditLimitAlertShown = false;
            }
        }
    }

    cleanSubjects() {
        Object.values(this.ALLSUBJECTS).forEach(t => {
            t.cleanRamo() // Llama a la función cleanRamo para limpiar todos los estados
        });
        this.APPROVED = []; // Limpia la lista de aprobados
        this.FAILED = []; // Limpia la lista de reprobados
        this.ONHOLD = []; // Limpia la lista de pendientes
        this.verifyPrer();
        this.updateStats();
        this.updateSelectedCreditsCounter(); // <--- NEW CALL
        this.saveAllStates();
    }
    
    // FUNCIONES DE GESTIÓN DE ESTADOS
    approveSubject(t) {
        this.FAILED = this.FAILED.filter(ramo => ramo.sigla !== t.sigla); 
        this.ONHOLD = this.ONHOLD.filter(ramo => ramo.sigla !== t.sigla); 
        this.APPROVED.push(t)
    }
    deApproveSubject(t) {
        let e = this.APPROVED.indexOf(t);
        e > -1 && this.APPROVED.splice(e, 1)
    }
    
    failSubject(t) { 
        this.APPROVED = this.APPROVED.filter(ramo => ramo.sigla !== t.sigla); 
        this.ONHOLD = this.ONHOLD.filter(ramo => ramo.sigla !== t.sigla); 
        this.FAILED.push(t);
    }
    deFailSubject(t) { 
        let e = this.FAILED.indexOf(t);
        e > -1 && this.FAILED.splice(e, 1)
    }

    holdSubject(t) { 
        this.APPROVED = this.APPROVED.filter(ramo => ramo.sigla !== t.sigla); 
        this.FAILED = this.FAILED.filter(ramo => ramo.sigla !== t.sigla); 
        this.ONHOLD.push(t);
    }
    deHoldSubject(t) { 
        let e = this.ONHOLD.indexOf(t);
        e > -1 && this.ONHOLD.splice(e, 1)
    }
    
    getSubject(t) {
        return this.ALLSUBJECTS[t]
    }
    
    // GUARDA los tres estados
    saveAllStates() {
        if (this.saveEnabled) {
            let t = "approvedRamos_" + this.currentMalla,
                f = "failedRamos_" + this.currentMalla,
                h = "onHoldRamos_" + this.currentMalla,
                e = [], 
                a = [], 
                r = [];
            
            this.APPROVED.forEach(t => { e.push(t.sigla) });
            this.FAILED.forEach(t => { a.push(t.sigla) });
            this.ONHOLD.forEach(t => { r.push(t.sigla) });
            
            localStorage[t] = JSON.stringify(e);
            localStorage[f] = JSON.stringify(a);
            localStorage[h] = JSON.stringify(r);
        }
    }
    
    // CARGA los tres estados (MODIFICADA: se eliminó la restricción `if (this.saveEnabled)`)
    loadAllStates() {
        let t = localStorage["approvedRamos_" + this.currentMalla];
        if (t) {
            JSON.parse(t).forEach(t => {
                void 0 !== this.ALLSUBJECTS[t] && this.ALLSUBJECTS[t].approveRamo()
            });
        }
        
        let f = localStorage["failedRamos_" + this.currentMalla];
        if (f) {
            JSON.parse(f).forEach(f => {
                void 0 !== this.ALLSUBJECTS[f] && this.ALLSUBJECTS[f].failRamo()
            });
        }
        
        let h = localStorage["onHoldRamos_" + this.currentMalla];
        if (h) {
            JSON.parse(h).forEach(h => {
                void 0 !== this.ALLSUBJECTS[h] && this.ALLSUBJECTS[h].holdRamo()
            });
        }
        
        this.verifyPrer()
        this.updateSelectedCreditsCounter(); // <--- NEW CALL
    }
    
    downloadMallaState() {
        let approvedSiglas = this.APPROVED.map(r => r.sigla);
        let failedSiglas = this.FAILED.map(r => r.sigla);
        let onHoldSiglas = this.ONHOLD.map(r => r.sigla);

        const mallaState = {
            career: this.currentMalla,
            approved: approvedSiglas,
            failed: failedSiglas,
            onHold: onHoldSiglas,
            timestamp: new Date().toISOString()
        };

        const jsonState = JSON.stringify(mallaState, null, 2); 
        const blob = new Blob([jsonState], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `estado_malla_${this.currentMalla}_${new Date().toLocaleDateString('es-CL').replace(/\//g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // NUEVA FUNCIÓN: DESCARGA DE MALLA COMO IMAGEN (JPEG/PNG) - CON CORRECCIÓN DE FONDO Y PIE DE PÁGINA
    downloadMallaImage(format = "png") {
        const svgElement = document.querySelector(".canvas svg");
        if (!svgElement) {
            alert("No se encontró el gráfico de la malla (SVG) para descargar.");
            return;
        }
        
        // Crear un rectángulo de fondo blanco y agregarlo al SVG temporalmente (para asegurar el fondo en la imagen)
        const tempRect = d3.select(svgElement).insert("rect", ":first-child")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "white")
            .attr("id", "svgBackgroundFix");

        // Serializar el SVG a texto XML (incluyendo el nuevo fondo blanco)
        const svgData = new XMLSerializer().serializeToString(svgElement);
        
        // Remover el rectángulo de fondo para que la visualización en pantalla no cambie
        tempRect.remove();
        
        // Crear una URL de datos para la imagen
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            // 1. Crear un canvas temporal para dibujar el SVG
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Opcional: Aumentar la resolución (ej. 2x) para mejor calidad
            const scale = 2; 
            const originalSvgWidth = svgElement.clientWidth;
            const originalSvgHeight = svgElement.clientHeight;
            
            // Espacio extra para el pie de página (ej: 70px * scale)
            const footerHeight = 70; 
            const scaledFooterHeight = footerHeight * scale;

            canvas.width = originalSvgWidth * scale;
            canvas.height = (originalSvgHeight + footerHeight) * scale;
            
            // Aplicar la escala al contexto para que el dibujo se haga en alta resolución
            ctx.scale(scale, scale);

            // 1.5. Asegurar un fondo blanco para todo el canvas (incluyendo el footer)
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width / scale, canvas.height / scale);

            // 2. Dibujar la imagen (SVG) en el canvas, comenzando desde 0, 0
            ctx.drawImage(img, 0, 0);
            
            // 2.5. Añadir el pie de página (Footer)
            // Definir posiciones verticales para tres líneas
            const line1Y = originalSvgHeight + 20;
            const line2Y = originalSvgHeight + 40;
            const line3Y = originalSvgHeight + 60;
            
            // LINEA 1: Descargo de responsabilidad
            ctx.font = 'bold 14px Arial, sans-serif';
            ctx.fillStyle = '#AA0000'; // Rojo para destacar el disclaimer
            ctx.textAlign = 'center';
            const disclaimerText = "Esta malla es meramente con fines explicativos e ilustrativos para la toma de ramos";
            ctx.fillText(disclaimerText, originalSvgWidth / 2, line1Y); 

            // LINEA 2: Nombre de la carrera y créditos/estado
            ctx.font = '12px Arial, sans-serif';
            ctx.fillStyle = '#333';
            const careerText = `Carrera: ${this.fullCareerName} (${this.currentMalla}) - Créditos Totales: ${this.totalCredits} ${this.sct ? 'SCT' : 'USM'}`;
            const statusText = ` | Aprobados: ${this.APPROVED.length} | Reprobados: ${this.FAILED.length} | Pendientes: ${this.ONHOLD.length}`;
            ctx.textAlign = 'left';
            ctx.fillText(careerText, 10, line2Y);
            ctx.textAlign = 'right';
            ctx.fillText(statusText, originalSvgWidth - 10, line2Y);

            // LINEA 3: Fuente y fecha
            ctx.font = '10px Arial, sans-serif';
            ctx.fillStyle = '#666';
            const urlText = `Generado el ${new Date().toLocaleDateString('es-CL')} | Fuente: ${window.location.origin}`;
            ctx.textAlign = 'center';
            ctx.fillText(urlText, originalSvgWidth / 2, line3Y); 
            
            // 3. Exportar el canvas a JPG o PNG
            const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
            
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `malla_${this.currentMalla}_${new Date().toLocaleDateString('es-CL').replace(/\//g, '-')}.${format}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                URL.revokeObjectURL(svgUrl);
            }, mimeType, 0.9); // 0.9 es la calidad para JPEG
        };
        
        img.onerror = (e) => {
             console.error("Error al cargar el SVG como imagen.", e);
             alert("Error al intentar dibujar la malla. Algunos navegadores o contenidos SVG muy complejos pueden fallar.");
        };

        // Asignar el SVG URL al elemento Image
        img.src = svgUrl;
    }
    
    deRomanize(t) {
        let e = this.getRnums(),
            a = this.getAnums(),
            r = t.replace(/i/g, "M"),
            s = 0,
            i = 0,
            l = r,
            n = e.length;
        for (let t = 1; t < n; ++t) {
            const l = e[t].length;
            for (; r.substr(0, l) === e[t];) {
                if (i++ > 30) return -1;
                s += a[t], r = r.substr(l, r.length - l)
            }
            if (r.length <= 0) break
        }
        return 0 !== r.length && alert(t + " INVALID truncating to " + l.replace(r, "")), 0 < s && s < 4e6 ? s : -1
    }
    romanize(t) {
        if (t > 3999999 || t < 1) return "Expect number from 1 to 3,999,999";
        let e = this.getRnums(),
            a = this.getAnums(),
            r = parseInt(t),
            s = "",
            i = 0,
            l = e.length;
        for (let t = 1; t < l; ++t) {
            for (; r >= parseInt(a[t]);) {
                if (i++ > 30) return -1;
                s += e[t], r -= a[t]
            }
            if (r <= 0) break
        }
        return s
    }
    getRnums() {
        let t = Array();
        return t[1] = "m", t[2] = "cm", t[3] = "d", t[4] = "cd", t[5] = "c", t[6] = "xc", t[7] = "l", t[8] = "xl", t[9] = "x", t[10] = "Mx", t[11] = "v", t[12] = "Mv", t[13] = "M", t[14] = "CM", t[15] = "D", t[16] = "CD", t[17] = "C", t[18] = "XC", t[19] = "L", t[20] = "XL", t[21] = "X", t[22] = "IX", t[23] = "V", t[24] = "IV", t[25] = "I", t
    }
    getAnums() {
        let t = Array();
        return t[1] = 1e6, t[2] = 9e5, t[3] = 5e5, t[4] = 4e5, t[5] = 1e5, t[6] = 9e4, t[7] = 5e4, t[8] = 4e4, t[9] = 1e4, t[10] = 9e3, t[11] = 5e3, t[12] = 4e3, t[13] = 1e3, t[14] = 900, t[15] = 500, t[16] = 400, t[17] = 100, t[18] = 90, t[19] = 50, t[20] = 40, t[21] = 10, t[22] = 9, t[23] = 5, t[24] = 4, t[25] = 1, t
    }
    generateCode() {
        let t = {};
        Object.keys(this.malla).forEach(e => {
            let a;
            a = e.includes("s") ? e : "s" + e, t[a] = [], Object.keys(this.malla[e]).forEach(e => {
                let r = this.ALLSUBJECTS[e],
                    s = [];
                s.push(r.name), s.push(r.sigla), s.push(r.getUSMCredits()), r.USMtoSCT ? s.push(0) : s.push(r.getSCTCredits()), s.push(r.category), s.push([...r.prer]), s.push(r.dictatesIn), t[a].push(s)
            })
        });
        let e = JSON.stringify(t).match(/("s[0-9]+":)+|(\[(?:,?[^\[\]])+(?:,\[[^\]]*])(?:,?[^\]]*)+])+/g),
            a = "{\n",
            r = !0,
            s = !0;
        e.forEach(t => {
            /("s[0-9]+":)/.test(t) ? (s ? (a += "    " + t + " [\n", s = !1) : a += "\n    ],\n    " + t + " [\n", r = !0) : r ? (a += "        " + t, r = !1) : a += ",\n        " + t
        }), a += "\n    ]\n}";
        let i = JSON.stringify(this.categories).match(/("[^\]]+\],?)/g),
            l = "{";
        i.forEach(t => {
            l += "\n    " + t
        }), l += "\n}", this.generatedCode = [this.currentMalla, a, l];
        let n = `{\n "name": "${this.generatedCode[0]}",\n "malla": ${this.generatedCode[1]},\n "categories": ${this.generatedCode[2]}\n}`;
        if (document.getElementById("mallaCode")) {
            new ClipboardJS(".btn"), document.getElementById("mallaCode").textContent = a, document.getElementById("colorCode").textContent = l, PR.prettyPrint(), document.getElementById("abrev").value = this.currentMalla, document.getElementById("carrMalla1").textContent = this.currentMalla, document.getElementById("carrMalla2").textContent = this.currentMalla, document.getElementById("carrColor1").textContent = this.currentMalla, document.getElementById("carrColor2").textContent = this.currentMalla;
            let t = new Blob([a], {
                    "aplication/json": "aplication/json"
                }),
                e = new Blob([l], {
                    "aplication/json": "aplication/json"
                }),
                r = new Blob([n], {
                    "aplication/json": "aplication/json"
                }),
                s = document.getElementById("dMalla"),
                i = document.getElementById("dColor"),
                o = document.getElementById("dShare");
            s.setAttribute("href", URL.createObjectURL(t)), s.setAttribute("download", "data_" + this.currentMalla + ".json"), i.setAttribute("href", URL.createObjectURL(e)), i.setAttribute("download", "colors_" + this.currentMalla + ".json"), o.setAttribute("href", URL.createObjectURL(r)), o.setAttribute("download", this.currentMalla + ".json")
        } else console.log(a), console.log(l);
        document.getElementById("abrev") && document.getElementById("abrev").addEventListener("input", function(t) {
            document.getElementById("carrMalla1").textContent = t.target.value.toUpperCase(), document.getElementById("carrMalla2").textContent = t.target.value.toUpperCase(), document.getElementById("carrColor1").textContent = t.target.value.toUpperCase(), document.getElementById("carrColor2").textContent = t.target.value.toUpperCase(), document.getElementById("dMalla").setAttribute("download", "data_" + t.target.value.toUpperCase() + ".json"), document.getElementById("dColor").setAttribute("download", "colors_" + t.target.value.toUpperCase() + ".json"), console.log(this.generatedCode[0]), this.generatedCode[0] = t.target.value, $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="tooltip"]').tooltip("disable");
            let e = document.getElementById("dShare"),
                a = `{\n "name": "${this.generatedCode[0]}",\n "malla": ${this.generatedCode[1]},\n "categories": ${this.generatedCode[2]}\n}`,
                r = new Blob([a], {
                    "aplication/json": "aplication/json"
                });
            e.setAttribute("href", URL.createObjectURL(r)), e.setAttribute("download", this.generatedCode[0] + ".json")
        }.bind(this))
    }
    
    // FUNCIÓN loadFile MODIFICADA para manejar mallas COMPLETAS o ESTADOS de malla
    loadFile(t) {
    let e = document.createElement("input");
    e.type = "file", e.accept = ".json", e.multiple = !1;
    var a = new FileReader;
    a.addEventListener("load", function(t) {
        try {
            const fileContent = JSON.parse(t.target.result);

            if (fileContent.malla && fileContent.categories) {
                // Carga de Malla COMPLETA
                localStorage.sharedMalla = JSON.stringify(fileContent);
                location.reload();
            } else if (fileContent.approved && fileContent.failed && fileContent.onHold) {
                // Carga de ESTADO de Malla
                
                // Guardamos en localStorage
                localStorage.setItem("approvedRamos_" + this.currentMalla, JSON.stringify(fileContent.approved));
                localStorage.setItem("failedRamos_" + this.currentMalla, JSON.stringify(fileContent.failed));
                localStorage.setItem("onHoldRamos_" + this.currentMalla, JSON.stringify(fileContent.onHold));
                
                // SOLUCIÓN: Limpiamos visualmente SIN tocar localStorage
                Object.values(this.ALLSUBJECTS).forEach(subject => {
                    // Limpiamos solo el visual, sin afectar las listas
                    if (!subject.isCustom) {
                        d3.select("#" + subject.sigla).select(".cross").attr("opacity", "0.01");
                        d3.select("#" + subject.sigla).select(".failed").attr("opacity", "0.01");
                        d3.select("#" + subject.sigla).select(".on-hold").attr("opacity", "0.01");
                    }
                    // Reseteamos flags internos
                    subject.approved = false;
                    subject.failed = false;
                    subject.onHold = false;
                });
                
                // Limpiamos las listas de la malla
                this.APPROVED = [];
                this.FAILED = [];
                this.ONHOLD = [];
                
                // Ahora cargamos el nuevo estado
                this.loadAllStates(); 
                this.verifyPrer();
                this.updateStats();
                
                alert(`Estados cargados exitosamente para la carrera ${fileContent.career}.`);

            } else {
                alert("El archivo JSON no parece ser un formato de Malla compartida ni de Estado de Malla válido.");
            }
        } catch (error) {
            alert("Error al leer el archivo JSON: " + error.message);
        }
    }.bind(this)), e.onchange = t => {
        let r = Array.from(e.files);
        a.readAsText(r[0])
    }, e.click()
}
    
    // ==========================================
    // LÓGICA DEL VISUALIZADOR DE DEPENDENCIAS (Integrada desde visualizer.js)
    // ==========================================

    initVisualizer() {
    console.log("Independent Visualizer: Starting...");
    this.loadDependencyData();
    }

    loadDependencyData() {
    if (Object.keys(this.rawMalla).length > 0) {
        this.processData(this.rawMalla);
        console.log("Visualizer: Dependency data processed, waiting for DOM elements...");
        // NO llamar a startVisualizerListeners() aquí
    } else {
        console.error("Visualizer: Malla data not loaded yet.");
    }
    }

    processData(mallaData) {
    // First pass: Initialize entries
    Object.values(mallaData).forEach(semesterSubjects => {
        semesterSubjects.forEach(subjectData => {
            // Formato: [nombre, sigla, creditos, categoria/creditos, prer, ...]
            let sigla = subjectData[1];
            let prer = [];

            // Los prerrequisitos están en la posición 4 o 5 dependiendo del formato
            // Buscar el primer array que aparezca después de la posición 3
            for (let i = 3; i < subjectData.length; i++) {
                if (Array.isArray(subjectData[i])) {
                    prer = subjectData[i];
                    break;
                }
            }

            if (!this.dependencyMap[sigla]) {
                this.dependencyMap[sigla] = { 
                    prer: new Set(prer), 
                    unlocks: new Set() 
                };
            } else {
                prer.forEach(p => this.dependencyMap[sigla].prer.add(p));
            }
        });
    });

    // Second pass: Populate unlocks (Reverse dependency)
    Object.keys(this.dependencyMap).forEach(sigla => {
        let subject = this.dependencyMap[sigla];
        subject.prer.forEach(prerSigla => {
            if (this.dependencyMap[prerSigla]) {
                this.dependencyMap[prerSigla].unlocks.add(sigla);
            }
        });
    });

    console.log("Independent Visualizer: Dependency map built.", this.dependencyMap);
}

    handleMouseOver(sigla) {
    if (!this.dependencyMap[sigla]) return;

    const data = this.dependencyMap[sigla];

    // Highlight Prerequisites (Red)
    data.prer.forEach(p => {
        const svgGroup = d3.select("#" + p);
        if (!svgGroup.empty()) {
            svgGroup.classed("requires-ramo", true);
        }
    });

    // Highlight Unlocks (Green)
    data.unlocks.forEach(u => {
        const svgGroup = d3.select("#" + u);
        if (!svgGroup.empty()) {
            svgGroup.classed("opens-ramo", true);
        }
    });
}

// 6. MEJORAR handleMouseOut() - Usar D3 para seleccionar elementos
handleMouseOut(sigla) {
    if (!this.dependencyMap[sigla]) return;

    const data = this.dependencyMap[sigla];

    data.prer.forEach(p => {
        const svgGroup = d3.select("#" + p);
        if (!svgGroup.empty()) {
            svgGroup.classed("requires-ramo", false);
        }
    });

    data.unlocks.forEach(u => {
        const svgGroup = d3.select("#" + u);
        if (!svgGroup.empty()) {
            svgGroup.classed("opens-ramo", false);
        }
    });
}

    startVisualizerListeners() {
    console.log("Visualizer: Attaching listeners...");
    
    let attachedCount = 0;
    
    Object.keys(this.dependencyMap).forEach(sigla => {
        // Usar D3 para seleccionar correctamente el grupo SVG
        const svgGroup = d3.select("#" + sigla);
        
        if (!svgGroup.empty() && svgGroup.node()) {
            const element = svgGroup.node();
            
            // Remover listeners anteriores si existen
            element.removeEventListener("mouseenter", this._mouseEnterHandler);
            element.removeEventListener("mouseleave", this._mouseLeaveHandler);
            
            // Crear funciones bound para poder removerlas después
            if (!this._boundHandlers) this._boundHandlers = {};
            
            this._boundHandlers[sigla] = {
                enter: () => this.handleMouseOver(sigla),
                leave: () => this.handleMouseOut(sigla)
            };
            
            element.addEventListener("mouseenter", this._boundHandlers[sigla].enter);
            element.addEventListener("mouseleave", this._boundHandlers[sigla].leave);
            
            attachedCount++;
        } else {
            console.warn(`Visualizer: Element not found for sigla: ${sigla}`);
        }
    });
    
    console.log(`Visualizer: ${attachedCount} listeners attached successfully.`);
    }
}
let width = 100,
    height = 100;
class Ramo {
    static get width() {
        return width
    }
    static get height() {
        return height
    }
    static getDisplayWidth(t) {
        return width * t
    }
    static getDisplayHeight(t) {
        return height * t
    }
    constructor(t, e, a, r, s = [], i, l, n = 0, o = !1, c = "") {
        this.name = t, this.sigla = e, this.credits = a, this.category = r, this.prer = new Set(s), n ? (this.creditsSCT = n, this.USMtoSCT = !1) : (this.creditsSCT = Math.round(5 * a / 3), this.USMtoSCT = !0), this.dictatesIn = c, this.malla = l, this.isCustom = o, this.beenEdited = !1, this.id = i, this.ramo = null, 
        this.approved = !1, // Estado 1: Verde (Aprobado)
        this.failed = !1, // Estado 2: Rojo (Reprobado)
        this.onHold = !1 // Estado 3: Amarillo (Pendiente/En Curso)
    }
    getSCTCredits() {
        return this.creditsSCT
    }
    getUSMCredits() {
        return this.credits
    }
    updateCredits(t, e = 0) {
        this.credits = t, this.creditsSCT = e || Math.round(5 * t / 3)
    }
    getDisplayCredits() {
        return this.malla.sct ? this.getSCTCredits() : this.getUSMCredits()
    }
    draw(t, e, a, r, s) {
        this.ramo = t.append("g").attr("cursor", "pointer").attr("role", "img").classed("subject", !0).attr("id", this.sigla);
        let i = this.constructor.getDisplayWidth(r),
            l = this.constructor.getDisplayHeight(s),
            n = l / 5,
            o = this.getDisplayCredits(this.credits),
            c = this.malla.categories[this.category][0],
            d = "",
            h = this.prer.size - 1,
            m = 0;
            
        // MODIFICACIÓN: Mostrar nombres de prerrequisitos en el tooltip
        this.prer.forEach(sigla => {
            let prerRamo = this.malla.getSubject(sigla); // Obtener el objeto Ramo
            let name = prerRamo ? prerRamo.name : sigla; // Usar nombre, o sigla si no se encuentra
            
            d += 0 === m ? name : m === h ? " y " + name : ", " + name; 
            m += 1;
        }), 
        
        this.ramo.append("title").text("Ramo " + this.sigla + ", " + this.name + ". Este ramo tiene " + this.getUSMCredits() + " créditos USM y " + this.getSCTCredits() + " créditos SCT. Se dicta de manera " + {
            "": "¿ambos semestres?",
            S: "Semestral",
            A: "Anual",
            X: "Porque estas leyendo esto? No deberias"
        }[this.dictatesIn] + " y " + (this.prer.size ? "tiene como prerrequisitos a " + d : "no tiene prerrequisitos") + "."), this.ramo.append("rect").attr("x", e).attr("y", a).attr("width", i).attr("height", l).attr("fill", c), this.ramo.append("rect").attr("x", e).attr("y", a).attr("width", i).attr("height", n).attr("fill", "#6D6E71").classed("bars", !0), this.ramo.append("rect").attr("x", e).attr("y", a + l - n).attr("width", i).attr("height", n).attr("fill", "#6D6E71").classed("bars", !0), this.ramo.append("rect").attr("x", e + i - 22 * r).attr("y", a + l - n).attr("width", 20 * r).attr("height", n).attr("fill", "white"), this.ramo.append("text").attr("x", e + i - 22 * r + 20 * r / 2).attr("y", a + l - n / 2).text(o).attr("font-weight", "regular").attr("fill", "black").attr("dominant-baseline", "central").attr("text-anchor", "middle").attr("font-size", 12 * s), this.ramo.append("text").attr("x", e + i / 2).attr("y", a + l / 2).attr("dy", 0).text(this.name).attr("class", "ramo-label").attr("fill", () => this.needsWhiteText(c) ? "white" : "#222222").attr("font-size", 13).attr("text-anchor", "middle").attr("dominant-baseline", "central"), this.ramo.append("text").attr("x", e + 2).attr("y", a + 10).attr("dominant-baseline", "central").text(this.sigla).attr("font-weight", "bold").attr("fill", "white").attr("font-size", r < .85 ? 11 : 12), "P" !== this.dictatesIn && "I" !== this.dictatesIn || this.ramo.append("text").attr("x", e + i - (r < .85 ? 25 : 30)).attr("y", a + 10).attr("dominant-baseline", "central").attr("text-anchor", "middle").text(this.dictatesIn).attr("font-weight", "bold").attr("fill", "yellow").attr("font-size", r < .85 ? 11 : 12), this.drawActions(e, a, i, l), this.ramo.append("circle").attr("cx", e + i - 10).attr("cy", a + n / 2).attr("fill", "white").attr("r", 8), this.ramo.append("text").attr("x", e + i - 10).attr("y", a + n / 2).attr("dominant-baseline", "central").attr("text-anchor", "middle").attr("fill", "black").attr("font-size", 10).text(this.id);
        this.createActionListeners(), this.wrap(i - 5, l / 5 * 3)
    }
    
    // Añade el grupo para el estado Reprobado (Rojo)
    drawActions(t, e, a, r) {
        if (null == this.ramo) return null;
        
        // Capa para prerrequisitos no cumplidos (Opacidad grisácea)
        this.ramo.append("rect").attr("x", t).attr("y", e).attr("width", a).attr("height", r).attr("fill", "white").attr("opacity", "0.001").attr("class", "non-approved");
    
        // GRUPO 1: INDICADOR DE RAMO PENDIENTE/EN CURSO (AMARILLO)
        let holdGroup = this.ramo.append("g").attr("class", "on-hold").attr("opacity", 0);
    
        // 1. RECTÁNGULO PARA EL RELLENO TRANSPARENTE (FILL) - AMARILLO
        holdGroup.append("rect") 
            .attr("x", t)
            .attr("y", e)
            .attr("width", a)
            .attr("height", r)
            .attr("fill", "#FFD44040") // Amarillo con 25% de opacidad (40)
            .attr("stroke", "none"); // Sin borde
    
        // 2. RECTÁNGULO PARA EL BORDE SÓLIDO (STROKE) - AMARILLO
        holdGroup.append("rect")
            .attr("x", t)
            .attr("y", e)
            .attr("width", a)
            .attr("height", r)
            .attr("fill", "none") // Sin relleno
            .attr("stroke", "#FFD440") // Borde Amarillo Sólido
            .attr("stroke-width", 5) // Grosor del borde
    
        // GRUPO 2: INDICADOR DE RAMO REPROBADO (ROJO)
        let failedGroup = this.ramo.append("g").attr("class", "failed").attr("opacity", 0);
        
        // 1. RECTÁNGULO PARA EL RELLENO TRANSPARENTE (FILL AL 25%) - ROJO
        failedGroup.append("rect") 
            .attr("x", t)
            .attr("y", e)
            .attr("width", a)
            .attr("height", r)
            .attr("fill", "#AA000040") // Rojo con 25% de opacidad (40)
            .attr("stroke", "none"); // Sin borde
    
        // 2. RECTÁNGULO PARA EL BORDE SÓLIDO (STROKE AL 100%) - ROJO
        failedGroup.append("rect")
            .attr("x", t)
            .attr("y", e)
            .attr("width", a)
            .attr("height", r)
            .attr("fill", "none") // Sin relleno
            .attr("stroke", "#AA0000") // Borde Rojo Sólido
            .attr("stroke-width", 5) // Grosor del borde
    
        // GRUPO 3: INDICADOR DE RAMO APROBADO (VERDE)
        let approvedGroup = this.ramo.append("g").attr("class", "cross").attr("opacity", 0);
    
        // 1. RECTÁNGULO PARA EL RELLENO TRANSPARENTE (FILL AL 25%) - VERDE
        approvedGroup.append("rect") 
            .attr("x", t)
            .attr("y", e)
            .attr("width", a)
            .attr("height", r)
            .attr("fill", "#00AA0040") // Verde con 25% de opacidad (40)
            .attr("stroke", "none"); // Sin borde
    
        // 2. RECTÁNGULO PARA EL BORDE SÓLIDO (STROKE AL 100%) - VERDE
        approvedGroup.append("rect")
            .attr("x", t)
            .attr("y", e)
            .attr("width", a)
            .attr("height", r)
            .attr("fill", "none") // Sin relleno
            .attr("stroke", "#00AA00") // Borde Verde Sólido
            .attr("stroke-width", 5) // Grosor del borde
    }
    
    createActionListeners() {
        this.ramo.on("click", () => this.isBeingClicked());
    }
    
    // Lógica de ciclo de clicks (Sin Estado -> Verde -> Rojo -> Amarillo -> Sin Estado)
    isBeingClicked() {
        if (this.approved) {
            // Está en Verde -> pasa a Rojo
            this.deApproveRamo(); 
            this.failRamo(); 
        } else if (this.failed) {
            // Está en Rojo -> pasa a Amarillo
            this.cleanFail(); 
            this.holdRamo(); 
        } else if (this.onHold) {
            // Está en Amarillo -> pasa a Sin Estado
            this.cleanHold(); 
        } else {
            // Está en Sin Estado -> pasa a Verde
            this.approveRamo(); 
        }

        this.malla.verifyPrer();
        this.malla.updateStats();
        this.malla.updateSelectedCreditsCounter(); // <--- NEW CALL
        this.malla.saveAllStates();
    }
    
    // Funciones de estado (Verde)
    approveRamo() {
    // Aplicamos directamente sin transición para la carga
    this.isCustom || d3.select("#" + this.sigla).select(".cross").attr("opacity", "1");
    
    if (!this.approved) {
        this.malla.approveSubject(this);
        this.approved = true;
    }   
}

    deApproveRamo() {
        if (this.approved) {
            this.isCustom || d3.select("#" + this.sigla).select(".cross").transition().delay(20).attr("opacity", "0.01");
            this.malla.deApproveSubject(this);
            this.approved = false;
        }
    }
    
    // Funciones de estado (Rojo)
    failRamo() {
    if (!this.failed) {
        this.isCustom || d3.select("#" + this.sigla).select(".failed").attr("opacity", "1");
        this.malla.failSubject(this);
        this.failed = true;
    }
}

    cleanFail() {
        if (this.failed) {
            this.isCustom || d3.select("#" + this.sigla).select(".failed").transition().delay(20).attr("opacity", "0.01");
            this.malla.deFailSubject(this);
            this.failed = false;
        }
    }
    
    // Funciones de estado (Amarillo)
    holdRamo() {
    if (!this.onHold) {
        this.isCustom || d3.select("#" + this.sigla).select(".on-hold").attr("opacity", "1");
        this.malla.holdSubject(this);
        this.onHold = true;
    }
}
    cleanHold() {
        if (this.onHold) {
            this.isCustom || d3.select("#" + this.sigla).select(".on-hold").transition().delay(20).attr("opacity", "0.01");
            this.malla.deHoldSubject(this);
            this.onHold = false;
        }
    }

    // Limpia todos los estados
    cleanRamo() {
        // Ejecutamos las funciones de limpieza de estado incondicionalmente
        // Esto asegura que se elimine el estado lógico (listas) y el estado visual (opacidad 0.01)
        if (this.approved) {
            this.deApproveRamo(); 
        }
        if (this.failed) {
            this.cleanFail(); 
        }
        if (this.onHold) {
            this.cleanHold(); 
        }

        // Además, nos aseguramos de que cualquier indicador visual restante se apague:
        this.isCustom || d3.select("#" + this.sigla).select(".cross").attr("opacity", "0.01");
        this.isCustom || d3.select("#" + this.sigla).select(".failed").attr("opacity", "0.01");
        this.isCustom || d3.select("#" + this.sigla).select(".on-hold").attr("opacity", "0.01");
    }
    
    verifyPrer() {
        if (this.isCustom) return;
        let t = [];
        // Solo los ramos VERDES cuentan como aprobados para el prerrequisito
        this.malla.APPROVED.forEach(function(e) {
            t.push(e.sigla)
        }), t = new Set(t);
        for (let e of this.prer)
            if (!t.has(e)) return void this.ramo.select(".non-approved").transition().delay(20).attr("opacity", "0.71");
        this.ramo.select(".non-approved").transition().delay(20).attr("opacity", "0.0")
    }
    wrap(t, e) {
        let a, r, s, i = this.ramo.select(".ramo-label"),
            l = i.text().split(/\s+/).reverse(),
            n = [],
            o = 0,
            c = parseInt(i.attr("font-size"), 10),
            d = i.text(null).append("tspan").attr("x", i.attr("x")).attr("dominant-baseline", "central").attr("dy", "0em");
        for (a = l.pop(); a;) {
            for (n.push(a), d.text(n.join(" ")); d.node().getComputedTextLength() > t;) 1 === n.length ? i.attr("font-size", String(--c)) : (n.pop(), d.text(n.join(" ")), n = [a], d = i.append("tspan").attr("x", i.attr("x")).attr("dominant-baseline", "central").attr("dy", "1.1em").text(a));
            a = l.pop()
        }
        let h = i.selectAll("tspan");
        for (i.attr("dy", 0), r = h._groups[0].length, s = i.node().getBoundingClientRect().height; s > e - 5;) i.attr("font-size", String(--c)), i.attr("dy", 0), s = i.node().getBoundingClientRect().height, o = 0;
        if (1 !== r) {
            h.filter(function(t, e) {
                return 0 === e
            }).attr("dy", -(1.1 * r / 2 - .55) + "em")
        }
        i.attr("dy", 0)
    }
    needsWhiteText(t) {
        let e = 0,
            a = 0,
            r = 0;
        4 === t.length ? (e = "0x" + t[1] + t[1], a = "0x" + t[2] + t[2], r = "0x" + t[3] + t[3]) : 7 === t.length && (e = "0x" + t[1] + t[2], a = "0x" + t[3] + t[4], r = "0x" + t[5] + t[6]);
        let s = [0, 0, 0];
        s[0] = e / 255, s[1] = a / 255, s[2] = r / 255;
        for (let t in s) s[t] <= .03928 ? s[t] /= 12.92 : s[t] = Math.pow((s[t] + .055) / 1.055, 2.4);
        return .2126 * s[0] + .7152 * s[1] + .0722 * s[2] <= .6
    }
}