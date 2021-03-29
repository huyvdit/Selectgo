
$(function () {
    //$("#order-history-large").hpaging({
    //    "limit": 15,
    //    activePage: 1,
    //    parentID: '',
    //    navBar: null,
    //    totalPages:5
    //});
    if ($('#order-history-small').length > 0) {
        let optionsSmall = {
            numberPerPage: 5, //Cantidad de datos por pagina
            goBar: false, //Barra donde puedes digitar el numero de la pagina al que quiere ir
            pageCounter: false, //Contador de paginas, en cual estas, de cuantas paginas
        };

        paginate.init('#order-history-small', optionsSmall);
    }
    if ($('#order-history-large').length > 0) {
        let optionsLarge = {
            numberPerPage: 8, //Cantidad de datos por pagina
            goBar: true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
            pageCounter: true, //Contador de paginas, en cual estas, de cuantas paginas
        };

        let filterOptionsLarge = {
            el: '#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
        };

        paginate.init('#order-history-large', optionsLarge, filterOptionsLarge);
    }
    
});
