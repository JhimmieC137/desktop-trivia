import React from "react";

import $ from "jquery";

const SectionPanelHandle = () => {

    var minOffset = 200;
    var maxOffset = 600;

    $('.handle').on('mousedown', function(ev, handler) {
        $(document).on('mousemove', function(ev, handler) {
            var offset = ev.pageX;
            
            offset = offset < minOffset ? minOffset : offset;
            offset = offset > maxOffset ? maxOffset : offset;
            
            $('.sidebar').css('width', offset);
            $('.content').css('marginLeft', offset + 10);
        });
    });

    $(document).on('mouseup', function(e) {
    $(document).off('mousemove');
    });




    return ( 
        <div className="handle"></div>
     );
}
 
export default SectionPanelHandle;