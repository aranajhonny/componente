function buscarProv(){
 var rif=$("#rif").val();
 $.ajax({
  url: '?controller=proveedores&action=getProvByRif',
  type: 'GET',
  data: {'rif':rif},
  dataType: 'json',
  success: function(data) {
    swal(data.msj)
  },
});
}
function eliminarProv(identificador){
    if (confirm("¿ Realmente desea eliminar este registro ?"))
    {
       $.get('?controller=proveedores&action=delete',{id_prov:identificador},function(data){
          recargar();
      });
   }
}
function ver_proveedor(valor)
{
    save_method = 'update';
   // $('#form')[0].reset(); // reset form on modals
    $('.form-group').removeClass('has-error'); // clear error class
    $('.help-block').empty(); // clear error string

    //Ajax Load data from ajax
    $.ajax({
        url : "?controller=proveedores&action=searchproveedorByid&id_prov=" + valor,
        type: "GET",
        dataType: "JSON",
        success: function(data)
        {

            $('[name="rif"]').val(data.rif);
            $('[name="razon_social"]').val(data.razon_social);
            $('[name="telefono"]').val(data.telefono);
            $('[name="email"]').val(data.email);
            $('[name="direccion"]').val(data.direccion);
            $('#modal_form').modal('show'); // show bootstrap modal when complete loaded
            $('.modal-title').text('Ver proveedor'); // Set title to Bootstrap modal title

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            swal('Error get data from ajax');
        }
    });
}
function editar_proveedor(valor)
{
    save_method = 'update';
    //$('#form')[0].reset(); // reset form on modals
    $('.form-group').removeClass('has-error'); // clear error class
    $('.help-block').empty(); // clear error string

    //Ajax Load data from ajax
    $.ajax({
        url : "?controller=proveedores&action=searchproveedorByid&id_prov=" + valor,
        type: "GET",
        dataType: "JSON",
        success: function(data)
        {

            $('[name="rif"]').val(data.rif);
            $('[name="razon_social"]').val(data.razon_social);
            $('[name="telefono"]').val(data.telefono);
            $('[name="email"]').val(data.email);
            $('[name="direccion"]').val(data.direccion);
            $('[name="id_prov"]').val(data.id_prov);
            $('#modal_form1').modal('show'); // show bootstrap modal when complete loaded
            $('.modal-title').text('Editar proveedor'); // Set title to Bootstrap modal title

        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            swal('Error get data from ajax');
        }
    });
}
function guardar_proveedor()
{
    $.ajax({
        url : "?controller=proveedores&action=update",
        type: "POST",
        data: $('#form').serialize(),
        dataType: "JSON",
        success: function(data)
        {
          swal('ha sido actualizado');
          $('#modal_form1').modal('hide');
          recargar();
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
       swal('Error');
   }
});
}
// crea un proveedor desde el modal de compras
function crear_proveedor(){ // funcion para la compra
  //remove errors
  $('.form-group').removeClass('has-error');
  //validating form modals
  if ($("#rif").val() === "") {
    $('[name="rif"]').parent().parent().addClass('has-error');
  }else{
    if ($("#razon_social").val() === "") {
      $('[name="razon_social"]').parent().addClass('has-error');
    }else{
      if ($("#telefono").val() === "") {
        $('[name="telefono"]').parent().addClass('has-error');
      }else{
        if ($("#email").val() === "") {
          $('[name="email"]').parent().addClass('has-error');
        }else{
          if ($("#direccion").val() === "") {
            $('[name="direccion"]').parent().addClass('has-error');
          }else{
            //post ajax form serialize
            $.ajax({
              url : "?controller=proveedores&action=createforjson",
              type: "POST",
              data: $('#form').serialize(),
              dataType: "json",
              success: function(data)
              {
                      swal(data.msj);
                      $('#modal-id').modal('hide');
                      $('.form-group').removeClass('has-error'); // clear error class
                      $('.help-block').empty()
                    },
                    error: function(jqXHR, textStatus, error)
                    {
                      swal(error);
                      $('#modal-id').modal('hide');
                      $('.form-group').removeClass('has-error'); // clear error class
                      $('.help-block').empty(); // clear error string
                    }
                  });
          }
        }
      }
    }
  }
}
