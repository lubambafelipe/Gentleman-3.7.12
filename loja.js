/**
 * Preenche o modal de detalhes com os dados do produto clicado
 * (lidos dos atributos data-* de cada cartão) e gera o link de encomenda.
 * Para mudar o número de WhatsApp, altera apenas a constante abaixo.
 */
(function ($) {
  var WHATSAPP = "244930361290";

  $("#modal_box").on("show.bs.modal", function (e) {
    var $p = $(e.relatedTarget).closest(".single_product");
    if (!$p.length) return;
    var g = function (k) { return $p.attr("data-" + k) || ""; };

    $("#modal_img").attr({ src: g("img"), alt: g("name") });
    $("#modal_title").text(g("name"));
    $("#modal_price").text(g("price"));
    $("#modal_desc").text(g("desc")).toggle(!!g("desc"));
    $("#modal_note").text(g("note")).toggle(!!g("note"));

    var rows = [["Marca", g("brand")], ["Volume", g("size")], ["Fixação", g("fixacao")], ["Projeção", g("projecao")]];
    var $ul = $("#modal_specs").empty();
    rows.forEach(function (r) {
      if (r[1]) $ul.append($("<li>").append($("<strong>").text(r[0] + ": ")).append(document.createTextNode(r[1])));
    });

    var msg = "Olá! Quero encomendar: " + g("name") + " (" + g("price") + ").";
    $("#modal_order").attr("href", "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg));
  });
})(jQuery);
