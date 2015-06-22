var transform =
{
    x: 0,
    y: 0,
    rotate: 0,
    flip: 1,
    
    // Function for managing transforms
    update: function(selector)
    {
        $(selector).css({'transform': 'translate('+transform.x+'px, '+transform.y+'px) rotate('+transform.rotate+'deg) scaleX('+transform.flip+')'});
        $(selector).css({'-webkit-transform': 'translate('+transform.x+'px, '+transform.y+'px) rotate('+transform.rotate+'deg) scaleX('+transform.flip+')'});
    }
}

var swim =
{
    up: 30,
    down: 50,
    next: 'up',
    
    update: function()
    {
        var pos = $('#kristyfish')[0].getBoundingClientRect();

        // If the fish is off the screen
        if(pos.left > $(window).width() || pos.left < -(pos.width))
        {
            // Special handlers to make sure the fish never swims off into infinity
            if(pos.left > $(window).width())
            {
                transform.x = $(window).width();
            }
            
            if(pos.left < -(pos.width))
            {
                transform.x = -(pos.width);
            }
            
            transform.y = Math.random() * $('body').height();
            transform.flip *= -1;

            swim.up *= -1;
            swim.down *= -1;
        }

        if(swim.next == 'up')
        {
            transform.x += swim.up;
            transform.rotate = 10;
            swim.next = 'down';
        }
        else
        {
            transform.x += swim.down;
            transform.rotate = 0;
            swim.next = 'up';
        }

        transform.update('#kristyfish');
        setTimeout(swim.update, 510);
    }
}

$(document).ready(function()
{
    $('.fishwrap').append("<img src='https://wiki.wetfish.net/upload/52a357b9-3680-9030-34ed-fc68895773c1.png' id='kristyfish'>");
    $('.fishwrap').height($('html').height());

    $('#kristyfish').load(function()
    {
        transform.x = $(window).width();
        transform.y = Math.random() * $('body').height();
        transform.update(this);

        // Start swimming
        setTimeout(function()
        {
            $('#kristyfish').addClass('swimming');
            swim.update();
        }, 10);
    });
});
