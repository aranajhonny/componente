function buscarProv(){var e=document.getElementById("rif").value;$.get("?controller=proveedores&action=getProveedorByRif",{rif:e},function(e){$('[name="rif"]').parent().parent().addClass("has-error"),$("#mensaje").text(e)})}function eliminarProv(e){confirm("¿ Realmente desea eliminar este registro ?")&&$.get("?controller=proveedores&action=delete",{id_prov:e},function(e){recargar()})}function ver_proveedor(e){save_method="update",$(".form-group").removeClass("has-error"),$(".help-block").empty(),$.ajax({url:"?controller=proveedores&action=searchproveedorByid&id_prov="+e,type:"GET",dataType:"JSON",success:function(e){$('[name="rif"]').val(e.rif),$('[name="razon_social"]').val(e.razon_social),$('[name="telefono"]').val(e.telefono),$('[name="email"]').val(e.email),$('[name="direccion"]').val(e.direccion),$("#modal_form").modal("show"),$(".modal-title").text("Ver proveedor")},error:function(e,r,a){alert("Error get data from ajax")}})}function editar_proveedor(e){save_method="update",$(".form-group").removeClass("has-error"),$(".help-block").empty(),$.ajax({url:"?controller=proveedores&action=searchproveedorByid&id_prov="+e,type:"GET",dataType:"JSON",success:function(e){$('[name="rif"]').val(e.rif),$('[name="razon_social"]').val(e.razon_social),$('[name="telefono"]').val(e.telefono),$('[name="email"]').val(e.email),$('[name="direccion"]').val(e.direccion),$('[name="id_prov"]').val(e.id_prov),$("#modal_form1").modal("show"),$(".modal-title").text("Editar proveedor")},error:function(e,r,a){alert("Error get data from ajax")}})}function guardar_proveedor(){$.ajax({url:"?controller=proveedores&action=update",type:"POST",data:$("#form").serialize(),dataType:"JSON",success:function(e){alert("ha sido actualizado"),$("#modal_form1").modal("hide"),recargar()},error:function(e,r,a){alert("Error")}})}function crear_proveedor(){$(".form-group").removeClass("has-error"),""===$("#rif").val()?$('[name="rif"]').parent().parent().addClass("has-error"):""===$("#razon_social").val()?$('[name="razon_social"]').parent().addClass("has-error"):""===$("#telefono").val()?$('[name="telefono"]').parent().addClass("has-error"):""===$("#email").val()?$('[name="email"]').parent().addClass("has-error"):""===$("#direccion").val()?$('[name="direccion"]').parent().addClass("has-error"):$.ajax({url:"?controller=proveedores&action=createforjson",type:"POST",data:$("#form").serialize(),dataType:"json",success:function(e){alert(e.msj),$("#modal-id").modal("hide"),$(".form-group").removeClass("has-error"),$(".help-block").empty()},error:function(e,r,a){alert(a),$("#modal-id").modal("hide"),$(".form-group").removeClass("has-error"),$(".help-block").empty()}})}