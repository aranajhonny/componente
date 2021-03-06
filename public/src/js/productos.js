function buscarProducto(){
//funcion agregar al carrito
 var codigo=$("#codigo").val();
    $.ajax({
      url: '?controller=productos&action=getByCod',
      type: 'GET',
      data: {'codigo':codigo},
      dataType: 'json',
      success: function(data) {
        swal(data.msj)
      },
    });
}

function borrarProducto(identificador){
    if (confirm("¿Desea eliminar este producto?"))
    {
       $.get('?controller=productos&action=borrar',{cod_prod:identificador},function(data){
          recargar();
      });
   }
}

function ver_producto(valor){
  save_method = 'update';
   // $('#form')[0].reset(); // reset form on modals
    $('.form-group').removeClass('has-error'); // clear error class
    $('.help-block').empty(); // clear error string

    //Ajax Load data from ajax
    $.ajax({
      url : "?controller=productos&action=searchProductoBycod&cod_prod=" + valor,
      type: "GET",
      dataType: "JSON",
      success: function(data)
      {

        $('[name="cod_prod"]').val(data.cod_prod);
        $('[name="descripcion"]').val(data.descripcion);
        $('[name="modelo"]').val(data.modelo);
        $('[name="p_compra"]').val(data.p_compra);
        $('[name="p_venta"]').val(data.p_venta);
        $('[name="color"]').val(data.color);
        $('[name="stock"]').val(data.stock);

            $('#modal_form').modal('show'); // show bootstrap modal when complete loaded
            $('.modal-title').text('Ver Producto'); // Set title to Bootstrap modal title

          },
          error: function (jqXHR, textStatus, errorThrown)
          {
            swal('Error');
          }
        });
  }

  function editar_producto(valor){
    save_method = 'modificar';
    //$('#form')[0].reset(); // reset form on modals
    $('.form-group').removeClass('has-error'); // clear error class
    $('.help-block').empty(); // clear error string

    //Ajax Load data from ajax
    $.ajax({
      url : "?controller=productos&action=searchProductoBycod&cod_prod=" + valor,
      type: "GET",
      dataType: "JSON",
      success: function(data)
      {
        $('[name="descripcion"]').val(data.descripcion);
        $('[name="modelo"]').val(data.modelo);
        $('[name="p_compra"]').val(data.p_compra);
        $('[name="p_venta"]').val(data.p_venta);
        $('[name="color"]').val(data.color);
        $('[name="stock"]').val(data.stock);
        $('[name="cod_prod"]').val(data.cod_prod);

            $('#modal_form1').modal('show'); // show bootstrap modal when complete loaded
            $('.modal-title').text('Editar Producto'); // Set title to Bootstrap modal title

          },
          error: function (jqXHR, textStatus, errorThrown)
          {
            swal('Error get data from ajax');
          }
        });
  }

  function guardar_producto(){
    $.ajax({
      url : "?controller=productos&action=modificar",
      type: "POST",
      data: $('#form').serialize(),
      dataType: "JSON",
      success: function(data)
      {
        swal('Ha sido actualizado');
        $('#modal_form1').modal('hide');
        recargar();
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        swal('Error');

      }
    });
  }


// crea un producto desde el modal de compras
function crear_producto(){
  var codigo
  //remove errors
  $('.form-group').removeClass('has-error');
  //validating form modals
    if ($("#codigo_p").val() === "") {
      $('[name="codigo"]').parent().addClass('has-error');
    }else if ($("#descripcion_p").val() === "") {
        $('[name="descripcion"]').parent().addClass('has-error');
      }else if ($("#modelo_p").val() === "") {
          $('[name="modelo"]').parent().addClass('has-error');
        }else if ($("#p_compra").val() === "") {
            $('[name="p_compra"]').parent().addClass('has-error');
          }else if ($("#p_venta").val() === "") {
              $('[name="p_venta"]').parent().addClass('has-error');
            }else if ($("#stock").val() === "") {
                $('[name="stock"]').parent().addClass('has-error');
              }else if ($("#stock_min").val() === "") {
                  $('[name="stock_min"]').parent().addClass('has-error');
                }else if ($("#procedencia").val() === "") {
                    $('[name="procedencia"]').parent().addClass('has-error');
                  }else if ($("#categoria").val() === "") {
                      $('[name="categoria"]').parent().addClass('has-error');
                    }else{
                      //post ajax form serialize
                      $.ajax({
                        url : "?controller=productos&action=createforjson",
                        type: "POST",
                        data: $('#form2').serialize(),
                        dataType: "JSON",
                        success: function(data)
                        {
                          swal(data.msj);
                          $('#modal-prod').modal('hide');
                              $('.form-group').removeClass('has-error'); // clear error class
                              $("#codigo_p").val('');
                              $("#modelo_p").val('');
                              $("#descripcion_p").val('');
                              $("#p_venta").val('');
                              $("#p_compra").val('');
                              $("#stock").val('');
                              $("#existencia").val('');
                              $("#stock_min").val('');
                              $("#garantia").val('');
                              $("#precio").val('');
                              $("#color").val('');
                              $('.help-block').empty()
                            },
                            error: function (jqXHR, textStatus, errorThrown)
                            {
                              swal(error);
                              $('#modal-prod').modal('hide');
                              $('.form-group').removeClass('has-error'); // clear error class
                              $('.help-block').empty(); // clear error string
                            }
                      });
                    }

}//end function

