/**
 * Sistema simples de includes para HTML estático.
 * Carrega cada partial de forma SÍNCRONA (XHR) para garantir que o HTML
 * já esteja no DOM antes dos scripts seguintes (countdown.js, main.js,
 * owl.carousel, nice-select) rodarem no $(document).ready().
 *
 * Requer servir o site por HTTP (ex: Live Server, Node/Express, etc).
 * Não funciona abrindo o index.html direto via file:// (bloqueio de CORS).
 */
(function () {
    var placeholders = document.querySelectorAll('[data-include]');

    placeholders.forEach(function (el) {
        var file = el.getAttribute('data-include');
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', file, false); // false = síncrono, de propósito
            xhr.send(null);

            if (xhr.status === 200 || xhr.status === 0) {
                el.outerHTML = xhr.responseText;
            } else {
                console.error('Falha ao carregar partial:', file, xhr.status);
                el.outerHTML = '<!-- erro ao carregar ' + file + ' -->';
            }
        } catch (err) {
            console.error('Erro ao buscar partial:', file, err);
        }
    });
})();