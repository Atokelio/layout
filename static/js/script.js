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
    setElementDisplaying(false, 'loading-overlay')
}


$(window).resize(function () {
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
    //Video ready preloader
    let start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;
        const isDesktop = $(window).width() >= mobileBreakpoint

        if ((!document.getElementById('left-video').paused || !isDesktop)
            && !document.getElementById('right-video').paused) {
            setModal(false)
            setElementDisplaying(isDesktop, 'left-video');
            disablePreloader()
            return
        }
        window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)

})

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


    const isDesktop = $(window).width() >= mobileBreakpoint;


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