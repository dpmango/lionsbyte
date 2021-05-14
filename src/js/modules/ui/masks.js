//////////
// MASKS
//////////
(function ($, APP) {
  APP.Plugins.Masks = {
    init: function () {
      $('.js-datepicker').mask('9999.99.99', { placeholder: 'дд.мм.гггг' });
      $('[js-dateMask]').mask('99.99.99', { placeholder: 'ДД.ММ.ГГ' });
      $("input[type='tel']").mask('+41 (99) 999 99 99', { placeholder: '+41 ' });
    },
  };
})(jQuery, window.APP);
