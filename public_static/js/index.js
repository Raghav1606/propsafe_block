$(document).ready(() => {

    $('#login_home').click(() => {
            window.location.href = "/login"
    });

    $('#register_home').click(() => {

            window.location.href = "/register"
    });
    
    $('#start_trans').click(() => {

        window.location.href = "/login_govt_official"
    });
    $('#search_registry').click(() => {

        window.location.href = "/search_registry"
    });

    $('#pending_trans').click(() => {
        
        
        window.location.href = "/pending_trans";
        
    });

    $('#property_history').click(() => {

        window.location.href = "/property_history"
    });
    
    $('#add_land').click(() => {

        window.location.href = "/addLandT"
    });
    
    $('#record_old').click(() => {

        window.location.href = "/record_old"
    });

});