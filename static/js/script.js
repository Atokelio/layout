const mobileBreakpoint = 992

function setElementDisplaying(flag, id) {
    const element = document.getElementById(id);
    if (flag) {
        element.style.cssText = ""
    } else {
        element.style.cssText = "display: none;"
    }
}

function disablePreloader() {
    setElementDisplaying(false, 'loading-overlay_hub')
}


$(window).resize(function () {
    const isDesktop = $(window).width() >= mobileBreakpoint
    setElementDisplaying(isDesktop, 'left-video_hub');
})

//POP UP
function setModal(isDisplaying) {
    if (isDisplaying) {
        $('#modal_hub').addClass('active')
    } else {
        $('#modal_hub').removeClass('active')
    }

}

function setSuccessfulSubscribed(isDisplaying) {
    setElementDisplaying(isDisplaying, 'subscribe-successful_hub')
}

$(document).ready(function () {
    //Video ready preloader
    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        const isDesktop = $(window).width() >= mobileBreakpoint

        if ((!document.getElementById('left-video_hub').paused || !isDesktop)
            && !document.getElementById('right-video_hub').paused) {
            setModal(false)
            setElementDisplaying(isDesktop, 'left-video_hub');
            disablePreloader()
            return
        }
        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)

})

$(document).ready(function () {
    $('#left-button_hub').click(function () {
        setModal(true)
    })
    $('#top-button_hub').click(function () {
        setModal(true)
    })

    $('#modal_hub').click(function () {
        setModal(false)
    })

    $('#modal-close_hub').click(function () {
        setModal(false)
    })

    $('#modal-content_hub').click(function (event) {
        event.stopPropagation()
    })

    $('#email-form').submit(function () {
        setSuccessfulSubscribed(true)
    })

})

//Video control and Animations
$(document).ready(function () {


    const isDesktop = $(window).width() >= mobileBreakpoint;


    //Right Block animation
    $('#left-button_hub').mouseout(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#right-screen_hub').removeClass('active')
        }
    })

    $('#left-button_hub').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#right-screen_hub').addClass('active')
        }
    })

    //Left Block animation
    $('#right-button_hub').mouseout(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#left-screen_hub').removeClass('active')
        }
    })

    $('#right-button_hub').mouseover(function () {
        const isDesktop = $(window).width() >= mobileBreakpoint;
        if (isDesktop) {
            $('#left-screen_hub').addClass('active')
        }
    })

})