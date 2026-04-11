/* =============================================
   SCROLL ANIMATIONS — animations.js
   Funciona em Portfolio.html e Serviços.html
   ============================================= */

(function () {

    /* --------------------------------------------------
       1. MAPEAR SELECTORES → CLASSE DE ANIMAÇÃO
       Adiciona .anim (ou .anim-mini) aos elementos certos
       e distribui delays automáticos nos grids
    -------------------------------------------------- */
    const singleTargets = [
        /* Serviços & Portfolio — headers */
        '.servicos-header h2',
        '.servicos-header p',
        '.portfolio-header h2',
        '.portfolio-header p',

        /* Portfolio — secção CV */
        '.cv-photo-card .cv-name-box',
        '.cv-sobre-card p',
    ];

    const miniTargets = [
        '.mini-title',
        '.cv-label',
    ];

    /* Grids: cada filho recebe delay escalonado */
    const gridTargets = [
        { parent: '.servicos-grid',   child: '.card' },
        { parent: '.portfolio-grid',  child: '.portfolio-card' },
        { parent: '.cv-container',    child: '.cv-card' },
    ];

    /* Itens dentro dos cards CV (skills, softwares, contactos) */
    const innerGridTargets = [
        { parent: '.cv-habilidades-card',  child: '.cv-skill-item' },
        { parent: '.cv-softwares-card',    child: '.cv-software-item' },
        { parent: '.cv-experiencias-card', child: '.cv-skill-item' },
        { parent: '.cv-contacto-card',     child: '.cv-contact-item' },
    ];

    /* --------------------------------------------------
       2. APLICAR CLASSES AOS ELEMENTOS
    -------------------------------------------------- */
    function prepare() {

        /* Singles */
        singleTargets.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.classList.add('anim');
            });
        });

        /* Mini */
        miniTargets.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                el.classList.add('anim-mini');
            });
        });

        /* Grids com delay escalonado */
        gridTargets.forEach(({ parent, child }) => {
            const parents = document.querySelectorAll(parent);
            parents.forEach(p => {
                const children = p.querySelectorAll(child);
                children.forEach((el, i) => {
                    el.classList.add('anim');
                    const delay = Math.min(i + 1, 6);
                    el.classList.add('anim-delay-' + delay);
                });
            });
        });

        /* Inner grids */
        innerGridTargets.forEach(({ parent, child }) => {
            const parents = document.querySelectorAll(parent);
            parents.forEach(p => {
                const children = p.querySelectorAll(child);
                children.forEach((el, i) => {
                    el.classList.add('anim-mini');
                    const delay = Math.min(i + 1, 6);
                    el.classList.add('anim-delay-' + delay);
                });
            });
        });
    }

    /* --------------------------------------------------
       3. INTERSECTION OBSERVER
       Ativa .visible quando o elemento entra no viewport
    -------------------------------------------------- */
    function observe() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        /* Não volta ao estado inicial ao sair — efeito Apple */
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,        /* Dispara quando 12% do elemento está visível */
                rootMargin: '0px 0px -48px 0px'  /* Margem inferior: não dispara demasiado cedo */
            }
        );

        document.querySelectorAll('.anim, .anim-mini').forEach(el => {
            observer.observe(el);
        });
    }

    /* --------------------------------------------------
       4. INIT — aguarda DOM pronto
    -------------------------------------------------- */
    function init() {
        prepare();
        observe();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        /* DOM já carregado (script no <head> com defer, ou inline) */
        init();
    }

})();









