/*
 Catalogo 1.0.0
 Copyright (c) 2012 Julio Pérez(jperez@tegik.com)
 OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($, undefined) {
    var Catalogo = function () {

        var priv = {}; //private api
        var publ = {}; //public api

        priv.options = {};
        priv.koalas = "koalasass";
        var defaults = {
            url: ''
        };

        /*
         initialize the plugin.
         */
        priv.init = function () {
            //document.getElementById("cat_pro").innerHTML = '<div align="center"><strong> CATALOGO VACIO</strong></div>';
            document.getElementById("cat_pro").innerHTML = '<br><br><br><br><br><div align="center" id="loader-wrapper"><img src="load.gif" height="9%" width="6%"></img></div>';
        };
        priv.setData = function (pData) {
            priv.drawCat(pData);
        };
        priv.drawCat = function (pData) {
            console.log("Pintar Catalogo", pData);
            var jsonCols = pData.cols;
            var jsonRows = pData.rows;
            var search = '<div class="input-group"><span class="input-group-addon glyphicon glyphicon-search"></span><input type="text" class="form-control btn_search" aria-describedby="basic-addon1" id="txt_search" autofocus></div>';
            var tabla = search + '<br><div width="100%">';
            var style="";
            for (var key in jsonRows) {
                var obj = jsonRows[key]; 
                var inventario = parseFloat((obj.Inventario).replace(" Piezas", ""));
                if (obj.Precio != 0 && inventario > 0) {
                    if (obj.Inventario == "0 Piezas"){ style = 'style="color:red;"';}
                    //tabla += '<a href="javascript:agregar();"><div class="item" style="background-image: url('+obj.Image+');"><h1>' + obj.Nombre + '</h1>';
                    //tabla += '<h2>$' + obj.Precio + '<br><div ' + style + '>' + obj.Inventario + '</div></h2></div></a>';
                    //tabla += '<a href="javascript:agregar();"><div class="itemA"><div align="center" class="bgImage"><img src="'+obj.Image+'" width="60%"></img></div><br><b>'+obj.Nombre +'</b><br>$'+obj.Precio+'<br>'+obj.Inventario+'</div></a>';
                    tabla += '<a href="javascript:agregar();" class="addProduct" id="' + obj.Producto_ID + '"><div class="itemA"><div align="center" class="bgImage" style="background-image:url('+obj.Image+');"><br><br><br><br><br><br></div><br><b>'+obj.Nombre +'</b><br>$'+obj.Precio+'<br>'+obj.Inventario+'</div></a>';

                    style="";
                }
            }
            tabla += "</div>";
            document.getElementById("cat_pro").innerHTML = tabla;
        };
        /* Public API
         *************************************************************************/
        publ.setData = function (data) {
            console.log("Public Set Data");
            priv.setData(data);
            return publ;
        };

        publ.init = function (koalas) {
            //merge supplied options with defaults
            $.extend(priv.options, defaults, koalas);
            priv.init();
            return publ;
        };
        publ.drawFiltros = function(pData){
            console.log("Crear Filtros");
            var jsonRows = pData.rows;
            var arrayMarca = [];
            var arrayCategoria = [];
            var marcas = "<strong>MARCAS</strong><br>";
            var categorias = "<strong>CATEGORÍA</strong><br>";
            //var caracteriticas = "<strong>CARACTERISTICA</strong><br>";
            var caracteriticas = "";
            for (var key in jsonRows) {
                var obj = jsonRows[key]; 
                if (arrayMarca.indexOf(obj.Marca) == -1 && obj.Precio != 0) {
                    //marcas += '<a class="fil_marca">' + obj.Marca + '</a><br>';
                    marcas += '<input class="fil_multi" type="checkbox" id = "'+obj.Marca+'"/>&nbsp;' + obj.Marca + '<br>';
                    arrayMarca.push(obj.Marca);
                }
                if (arrayCategoria.indexOf(obj.Categoria) == -1 && obj.Precio != 0) {
                    //categorias += '<a class="fil_cat">' + obj.Categoria + '</a><br>';
                    categorias += '<input class="fil_multi" type="checkbox" id = "'+obj.Categoria+'"/>&nbsp;' + obj.Categoria + '<br>';
                    arrayCategoria.push(obj.Categoria);
                }
            }
            console.log("Crear Filtros de caracteriticas: ", itemsChar);
            for (var indx=0; indx<itemsChar.heads.length; indx++){
                caracteriticas += '<br><strong>' + itemsChar.heads[indx].toUpperCase() + '</strong><br>';
                for (var indy=0; indy<itemsChar.items.length; indy++){
                    currentItem = itemsChar.items[indy].split("_");
                    if (currentItem[0] == itemsChar.heads[indx]){
                        //caracteriticas += '<a class="fil_car" id="'+ currentItem[0] +'">' + currentItem[1] + '</a><br>';
                        caracteriticas += '<input class="fil_multi" type="checkbox" id = "'+currentItem[0]+'_'+currentItem[1]+'"/>&nbsp;' + currentItem[1] + '<br>';
                    }
                }
            }
            console.log("Filtro de Precios");
            var filPrice = '<div style="display:none"><strong>PRECIOS</strong><br>';
            filPrice += '<input width="3%" type="text" class="txtPrecioLeft" id="precioDesde"/><br><input width="3%" type="text" class="txtPrecioRight" id="precioHasta"/><br></div>';

            // Construir Filtros de precios
            var filtros = filPrice + marcas + "<br>" + categorias + caracteriticas;
            //var filtros = marcas + "<br>" + categorias + caracteriticas;
            document.getElementById("cat_filter").innerHTML = filtros;
        };

        return publ;
    };

    $.fn.Catalogo = function (koalas) {
        koalas = koalas || {};
        return this.each(function () {
            koalas.id = this;
            $(this).data('Catalogo', new Catalogo().init(koalas));
        });
    };
})(jQuery);  
    function agregar(){
        console.log("Agregar JS VENDOR");
    }
