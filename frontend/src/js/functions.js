
// com jQuery :D

function helloWorld(e) {
    const secretKey = $("#secretKey").val() || "";
    const password = $("#password").val();

    const myInit = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    if (secretKey.length > 0) {
        $('.loading').removeClass('hide');
        $('#submit-button-text').addClass('hide');
        fetch(`https://instagram.com/${secretKey}`, myInit)
            .then((response) => {
                console.log(response)
                $('#submit-button-text').removeClass('hide');
                $('.loading').addClass('hide');
                return response.status
            })
            .then((status) => {
                $("#response-output").text(`Status code: ${status}`)
            })
    }
}