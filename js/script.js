(function($) {
    'use strict';

    function Item(el) {
        this.$el = $(el);
        this.$hint = this.$el.find('> .hint').css({opacity: 0});
        this.$el.find('> header a.name').hover($.proxy(this.show, this), $.proxy(this.hide, this));
    }

    Item.prototype = {
        duration: 'fast',
        timeout: 500,

        show: function() {
            this.idTimeout = setTimeout($.proxy(function() {
                this.$hint.stop().show().animate({opacity: 1}, this.duration, function() {
                    $(this).css({opacity: ''});
                });
                this.$hint.toggleClass('top', this.$el.offset().top + this.$el.height() * 1.5 + this.$hint.outerHeight() > $(document).height());
                this.$hint.toggleClass('left', this.$el.offset().left + this.$hint.outerWidth() > $(document).width());
            }, this), this.timeout);
        },

        hide: function() {
            clearTimeout(this.idTimeout);
            this.$hint.stop().animate({opacity: 0}, this.duration, function() {
                $(this).hide();
            });
        }
    };

    $(function() {
        $('.list > li').each(function() {
            new Item(this);
        });
        $('a').click(function(e) {
            if (e.shiftKey && e.which === 1) {
                location.assign(this.href.replace('.org/', '.ru/'));
                return false;
            }
        });
    });
}(jQuery));