
(function ($) {
  Drupal.Panels = Drupal.Panels || {};

  Drupal.Panels.autoAttach = function() {
    if ($.browser.msie) {
      // If IE, attach a hover event so we can see our admin links.
      $("div.panel-pane").hover(
        function() {
          $('div.panel-hide', this).addClass("panel-hide-hover"); return true;
        },
        function() {
          $('div.panel-hide', this).removeClass("panel-hide-hover"); return true;
        }
      );
      $("div.admin-links").hover(
        function() {
          $(this).addClass("admin-links-hover"); return true;
        },
        function(){
          $(this).removeClass("admin-links-hover"); return true;
        }
      );
    }
  };

  $(Drupal.Panels.autoAttach);
})(jQuery);
;
(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + Drupal.settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;

(function ($) {
Drupal.backup_migrate = {
  callbackURL : "",  
  autoAttach  : function() {
    if (Drupal.settings.backup_migrate !== undefined) {
      if ($("#edit-save-settings").length && !$("#edit-save-settings").attr("checked")) {
        // Disable input and hide its description.
        // Set display none instead of using hide(), because hide() doesn't work when parent is hidden.
        $('div.backup-migrate-save-options').css('display', 'none');
      }
  
      $("#edit-save-settings").bind("click", function() {
        if (!$("#edit-save-settings").attr("checked")) {
          $("div.backup-migrate-save-options").slideUp('slow');
        }
        else {
          // Save unchecked; enable input.
          $("div.backup-migrate-save-options").slideDown('slow');
        }
      });

      $('#backup-migrate-ui-manual-backup-form select[multiple], #backup-migrate-crud-edit-form select[multiple]').each(function() {
          $(this).after(
            $('<div class="description backup-migrate-checkbox-link"></div>').append(
              $('<a href="javascript:null(0);"></a>').text(Drupal.settings.backup_migrate.checkboxLinkText).click(function() {
                Drupal.backup_migrate.selectToCheckboxes($(this).parents('.form-item').find('select'));
              })
            )
          );
        }
      );
    }
  },

  selectToCheckboxes : function($select) {
    var field_id = $select.attr('id');
    var $checkboxes = $('<div></div>').addClass('backup-migrate-tables-checkboxes');
    $('option', $select).each(function(i) {
      var self = this;
      $box = $('<input type="checkbox" class="backup-migrate-tables-checkbox">').bind('change click', function() {
        $select.find('option[value="'+self.value+'"]').attr('selected', this.checked);
        if (this.checked) {
          $(this).parent().addClass('checked');
        }
        else {
          $(this).parent().removeClass('checked');
        }
      }).attr('checked', this.selected ? 'checked' : '');
      $checkboxes.append($('<div class="form-item"></div>').append($('<label class="option backup-migrate-table-select">'+this.value+'</label>').prepend($box)));
    });
    $select.parent().find('.backup-migrate-checkbox-link').remove();
    $select.before($checkboxes);
    $select.hide();
  }
}

$(document).ready(Drupal.backup_migrate.autoAttach);
})(jQuery);
;
