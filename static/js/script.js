const mobileBreakpoint = 992

function stopVideo(name) {
    const video = $(`#${name}-video`).get(0).
    video.pause()
    video.currentTime = 0
}

function playVideo(name) {
    $(`#${name}-video`).get(0).play()
}

function disableAutoplay() {
    const isDesktop = $(window).width() >= mobileBreakpoint;
    if (isDesktop) {
        stopVideo('left')
        stopVideo('right')
    } else {
        playVideo('left')
        playVideo('right')
    }
}

function setElementDisplaying(flag, id) {
    const element = document.getElementById(id);
    if (flag) {
        element.style.cssText = ""
    } else {
        element.style.cssText = "display: none;"
    }
}

function disablePreloader() {
    setElementDisplaying(false, 'loading-overlay')
}


function showPage() {
    disableAutoplay()
    disablePreloader()
}


window.onload = function () {
    isDesktop = $(window).width() >= mobileBreakpoint
    setModal(false);
    if (isDesktop) {
        $('#left-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/join-compressed.mp4')
        $('#right-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/find-events-compressed.mp4')

    } else {
        $('#left-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/join-compressed.mp4')
        $('#right-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/find-events-compressed.mp4')
        showPage()
    }
}

//POP UP
function setModal(flag) {
    setElementDisplaying(flag, 'modal')
}

function setSuccessfulSubscribed(flag) {
    setElementDisplaying(flag, 'subscribe-successful')
}


$(document).ready(function () {
    $('#left-button').click(function () {
        setModal(true)
    })

    $('.popup-bg').click(function () {
        setModal(false)
    })

    $('#popup-close').click(function () {
        setModal(false)
    })

    $('.popup-window').click(function (event) {
        event.stopPropagation()
    })

    $('#email-button').click(function (event) {
        setModal(false);
        $('#email-form').submit()
        event.preventdefault()
    })

    $('#email-form').submit(function () {
        setSuccessfulSubscribed(true);
    })

})



//Video control and Animations
$(document).ready(function () {
    //Video ready preloader
    let isLeftVideoReady = false;
    let isRightVideoReady = false;
    let isPageReady = false;

    const isDesktop = $(window).width() >= mobileBreakpoint;
    $('#left-video').bind('timeupdate', function () {
        if (this.currentTime > 0.01) {
            isLeftVideoReady = true;
            if (isRightVideoReady && isPageReady == false) {
                showPage()
                isPageReady = true
            }
        }
    })

    $('#right-video').bind('timeupdate', function () {
        if (this.currentTime > 0.01) {
            isRightVideoReady = true;
            if (isLeftVideoReady && isPageReady == false) {
                showPage()
                isPageReady = true
            }
        }
    })

    $(window).resize(disableAutoplay)

    //Right Block animation
    $('#left-button').mouseout(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            e = event.toElement || event.relatedTarget;
            if (e == this || e == $('#left-button').get(0)) {
                return;
            }
            $('#outbound-block-right').removeClass('active')
            $('#left-button').removeClass('button-hover')
            stopVideo('left')

        }
    })

    $('#left-button').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#outbound-block-right').addClass('active')
            $('#left-button').addClass('button-hover')
            playVideo('left')
        }
    })

    //Left Block animation
    $('#right-button').mouseout(function (event) {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            e = event.toElement || event.relatedTarget;
            if (e == this || e == $('#right-button').get(0)) {
                return;
            }
            $('#outbound-block-left').removeClass('active')
            $('#right-button').removeClass('button-hover')
            stopVideo('right')
        }
    })

    $('#right-button').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {

            $('#outbound-block-left').addClass('active')
            $('#right-button').addClass('button-hover')
            playVideo('right')
        }
    })

})


