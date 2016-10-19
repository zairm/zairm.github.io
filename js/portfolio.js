// TODO:
// Eventually Need to make sure that background-color of col-*-* div of currently
// expanded project thumbnail changes when clicked on and off. On the grey style
// color scheme the color to change to was #cccccc
//
// Right now if the page load is slow and these Fn's don't load before the user
// clicks on the thumbnails we'll get an error. Change this so that we set
// the onclick events on the thumbnails only upon reaching this file.

function accordionHandlerGen() {
    oldId = null;
    function accordionHandler(contentId) {
        if (oldId) {
            $(oldId).collapse('hide');
            if (oldId == contentId) {
                oldId = null;
                return;
            }
        }
        $(contentId).collapse('show');
        oldId = contentId;
    }
    return accordionHandler
}

var handle = accordionHandlerGen();

function projFnGen() {
    containerOpen = false;
    projOpen = null;

    function projFn(proj) {
        if (containerOpen) {
            if (projOpen == proj) {
                $("#projDescription").collapse("hide");
                // $("#projDescription").toggle();
                containerOpen = false;
                return;
            }
            $(projOpen).toggle();
            $(proj).toggle();
            projOpen = proj;
            return;
        }
        if (projOpen) $(projOpen).toggle();
        $(proj).toggle();
        projOpen = proj;
        $("#projDescription").collapse("show");
        // $("#projDescription").toggle();
        containerOpen = true;
        return;
    }

    return projFn;
}

function projThumbFnGen() {
    lastThumb = null;

    function projThumbFn(event) {
        if (lastThumb) lastThumb.removeClass("thumbnail-active");
        thisThumb = $(event.target);
        if (thisThumb.is(lastThumb)) {
            lastThumb = null;
            return;
        }
        thisThumb.addClass("thumbnail-active");
        lastThumb = thisThumb;
        return;
    }
    return projThumbFn;
}

function projBtnHandlerGen() {
    internalProjFn = projFnGen();
    internalProjThumbFn = projThumbFnGen();

    function projBtnHandler(proj) {
        internalProjThumbFn(event);
        internalProjFn(proj);
    }

    return projBtnHandler;
}

// var projFn = projFnGen();
var projBtnHandle = projBtnHandlerGen();
