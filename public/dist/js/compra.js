function buscar_proveedor(){var o=$("#rif-entrada").val();$.ajax({url:"?controller=compras&action=buscarProveedor&rif="+o,type:"GET",dataType:"JSON",success:function(o){$('[name="rif-entrada"]').val(o.rif),$('[name="id_prov"]').val(o.id_prov),$('[name="razon_social"]').val(o.razon_social),$('[name="telefono"]').val(o.telefono),$('[name="direccion"]').val(o.direccion),$("#codigo").removeAttr("disabled"),$("#precio").removeAttr("disabled"),$("#cantidad").removeAttr("disabled"),1==o?($("#rif-entrada").focus(),alert("Debes introducir el Rif"),$("#codigo").attr("disabled","true")):0==o&&(alert("El proveedor no existe"),$("#codigo").attr("disabled","true"))},error:function(o,a,e){console.log("error")}})}function buscar_producto(){var o=$("#codigo").val();$.ajax({url:"?controller=compras&action=buscarProducto&codigo="+o,type:"GET",dataType:"JSON",success:function(o){$('[name="codigo-entrada"]').val(o.codigo),$('[name="precio"]').val(o.precio),$('[name="descripcion"]').val(o.descripcion),$('[name="stock"]').val(o.stock),$('[name="stock_m"]').val(o.stock_minimo),1==o?($("#codigo").focus(),alert("Debes introducir el codigo")):0==o&&alert("El producto no existe")},error:function(o,a,e){console.log("error")}})}function agregar_carrito(){var o=$("#cantidad").val(),a=$("#codigo").val(),e=$("#precio").val();""!=a?""!=o?$.ajax({url:"?controller=compras&action=agregar",type:"GET",data:{codigo:a,cantidad:o,precio:e},dataType:"json",success:function(o){1==o.success?($("#codigo").val(""),$("#descripcion").val(""),$("#precio").val(""),$("#cantidad").val(""),$("#existencia").val(""),$("#minimo").val(""),$(".detalle-producto").load("views/compras/detalle.php")):alert(o.msj)},error:function(o,a,e){alert(e.msj)}}):(alert("Ingrese una cantidad"),$("#cantidad").focus()):(alert("Seleccione un producto"),$("#codigo").focus())}function eliminar_carrito(o){confirm("¿ Realmente desea eliminarlo de la lista?")&&$.ajax({url:"?controller=compras&action=eliminar",type:"post",data:{codigo:o},dataType:"json"}).done(function(o){1==o.success?$(".detalle-producto").load("views/compras/detalle.php"):alert(o.msj)})}