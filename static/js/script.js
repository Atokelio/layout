const mobileBreakpoint = 992

function stopVideo(name) {
    $(`#${name}-video`).get(0).pause()
    $(`#${name}-video`).get(0).currentTime = 0
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
    const isDesktop = $(window).width() >= mobileBreakpoint
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
    if (flag) {
        $('#modal').addClass('active')
    } else {
        $('#modal').removeClass('active')
    }

}

function setSuccessfulSubscribed(flag) {
    setElementDisplaying(flag, 'subscribe-successful')
}


$(document).ready(function () {
    $('#left-button').click(function () {
        setModal(true)
    })
    $('#top-button').click(function () {
        setModal(true)
    })

    $('#modal').click(function () {
        setModal(false)
    })

    $('#modal-close').click(function () {
        setModal(false)
    })

    $('#modal-content').click(function (event) {
        event.stopPropagation()
    })

    $('#email-button').click(function (event) {
        setModal(false);
        $('#email-form').submit()
        event.preventdefault()
    })

    $('#email-form').submit(function () {
        setSuccessfulSubscribed(true)
        $('#email-input').val('').change()
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
            $('#right-screen').removeClass('active')
            stopVideo('left')

        }
    })

    $('#left-button').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#right-screen').addClass('active')
            playVideo('left')
        }
    })

    //Left Block animation
    $('#right-button').mouseout(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#left-screen').removeClass('active')
            stopVideo('right')
        }
    })

    $('#right-button').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#left-screen').addClass('active')
            playVideo('right')
        }
    })

})


