const mobileBreakpoint = 992

function setElementDisplaying(isDisplaying, id) {
    const element = document.getElementById(id);
    if (isDisplaying) {
        element.style.cssText = ""
    } else {
        element.style.cssText = "display: none;"
    }
}

function disablePreloader() {
    setElementDisplaying(false, 'loading-overlay')
}

function showPage() {
    disablePreloader()
}

window.onload = function () {
    const isDesktop = $(window).width() >= mobileBreakpoint
    setModal(false);
    setElementDisplaying(isDesktop, 'left-video');

    if (isDesktop) {
        $('#left-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/join-compressed.mp4')
        $('#right-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/find-events-compressed.mp4')

    } else {
        $('#left-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/join-compressed.mp4')
        $('#right-video').attr('src', 'https://staging.daybreaker.com/wp-content/themes/dybrkr-with-hub/video/find-events-compressed.mp4')
        showPage()
    }
}

$(window).resize(function (){
    const isDesktop = $(window).width() >= mobileBreakpoint
    setElementDisplaying(isDesktop, 'left-video');
})

//POP UP
function setModal(isDisplaying) {
    if (isDisplaying) {
        $('#modal').addClass('active')
    } else {
        $('#modal').removeClass('active')
    }

}

function setSuccessfulSubscribed(isDisplaying) {
    setElementDisplaying(isDisplaying, 'subscribe-successful')
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

    $('#email-form').submit(function () {
        setSuccessfulSubscribed(true)
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

    //Right Block animation
    $('#left-button').mouseout(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#right-screen').removeClass('active')
        }
    })

    $('#left-button').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#right-screen').addClass('active')
        }
    })

    //Left Block animation
    $('#right-button').mouseout(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#left-screen').removeClass('active')
        }
    })

    $('#right-button').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#left-screen').addClass('active')
        }
    })

})


