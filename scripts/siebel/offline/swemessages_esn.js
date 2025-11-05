// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "No se ha podido sincronizar. Compruebe su conexi\u00F3n de red.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Fallo de descarga del paquete fuera de l\u00EDnea. Compruebe su conexi\u00F3n de Internet, vac\u00EDe la cach\u00E9 y vuelva a intentarlo.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Sincronice los registros que se hayan creado fuera de l\u00EDnea con el servidor antes de pasar a modo en l\u00EDnea.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Con\u00E9ctese a Internet para pasar al modo en l\u00EDnea.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Las bases de datos no est\u00E1n admitidas en este explorador.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Introduzca un valor para %1 que es necesario.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Fallo al obtener el paquete fuera de l\u00EDnea del servidor. Compruebe la configuraci\u00F3n del repositorio fuera de l\u00EDnea.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Fallo al obtener metadatos del servidor. Compruebe que se han configurado los metadatos adecuados en el servidor.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Esta operaci\u00F3n no est\u00E1 admitida actualmente en modo fuera de l\u00EDnea.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Error al leer el c\u00F3digo de barras. No se han capturado los datos.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "No se ha podido sincronizar. Compruebe la disponibilidad del servidor y vuelva a intentarlo.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "La sincronizaci\u00F3n se ha realizado correctamente. P\u00F3ngase en contacto con el administrador para verificar los logs.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "La sesi\u00F3n de conexi\u00F3n ha caducado. Cierre y vuelva a abrir el explorador para volver a conectarse para la sincronizaci\u00F3n.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "El archivo de repositorio de Siebel ha cambiado en el servidor desde su \u00FAltima sincronizaci\u00F3n. Se realizar\u00E1 una descarga completa.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Han cambiado las responsabilidades de usuario. Se realizar\u00E1 una descarga completa.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Los datos actuales est\u00E1n anticuados. Se realizar\u00E1 una descarga completa.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Se ha recibido una respuesta del servidor no v\u00E1lida para la solicitud: %1(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Fallo de descarga de la cach\u00E9 de la aplicaci\u00F3n.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "No est\u00E1 autorizado a realizar esta sincronizaci\u00F3n.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "El nodo remoto ha cambiado. Se realizar\u00E1 una descarga completa.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Su posici\u00F3n de usuario ha cambiado. Se realizar\u00E1 la descarga completa.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "No hay memoria suficiente. El modo desconectado no est\u00E1 admitido.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Debe detallarse como m\u00EDnimo un producto antes de la presentaci\u00F3n.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "No se puede capturar una firma si la fecha de la visita es posterior a hoy.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "No puede capturar una firma para una visita que no es de su propiedad.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Se requiere que los valores prioritarios para los productos detallados sean exclusivos y est\u00E9n en orden secuencial. Revise los valores prioritarios de detalle del producto para comprobar que no infringen este requisito.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 es un campo obligatorio. Introduzca un valor adecuado.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "No se puede presentar la visita a %1.Si se distribuyen muestras, debe especificarse el n\u00FAmero de referencia de muestra.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "No se puede presentar esta visita a %1.\nSe requiere una firma en papel o una firma electr\u00F3nica para presentar esta visita.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Esta transacci\u00F3n de muestras no se puede presentar para un per\u00EDodo reconciliado. Cambie la fecha de transacci\u00F3n para que coincida con un per\u00EDodo no reconciliado o activo.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "No se puede capturar una firma para este tipo de contacto.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Cambie el valor de cantidad. S\u00F3lo puede muestrear %2 de %1 por visita.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Cambie el valor de la cantidad. No puede muestrear %1 ya que excede la cantidad disponible - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "El profesional no puede ser muestreado. Elimine las muestras antes de presentar la visita.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 es un campo obligatorio.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "El n\u00FAmero de licencia para este contacto ha caducado.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "El n\u00FAmero DEA especificado de esta direcci\u00F3n no es v\u00E1lido. Especifique uno v\u00E1lido.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 en esta direcci\u00F3n del contacto es un campo obligatorio.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "El n\u00FAmero DEA especificado para la direcci\u00F3n de este contacto ha caducado. Actualice el n\u00FAmero DEA para la direcci\u00F3n seleccionada.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Seleccione un n\u00FAmero de lote diferente. El n\u00FAmero de lote: '%1' seleccionado para la muestra: '%2' est\u00E1 a punto de vencer.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Los campos Nombre, Apellidos, T\u00EDtulo y Direcci\u00F3n del contacto son necesarios para capturar una firma.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Debe distribuirse o solicitarse una muestra, por lo menos, para capturar una firma.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Compruebe los resultados de validaci\u00F3n de la acci\u00F3n correctiva para continuar.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "El n\u00FAmero de licencia para este contacto no est\u00E1 activo";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' es un campo requerido. Especifique un valor para el campo.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "La entrada para el campo '%1' es demasiado larga para una base de datos de empresa codificada en UTF-8. Int\u00E9ntelo de nuevo con otra entrada.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Debe seleccionar el valor Contacto o Cuenta para crear la visita, pero no ambos.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "No puede muestrear. P\u00F3ngase en contacto con el grupo de compatibilidad de muestras.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "La comprobaci\u00F3n de la regla de validaci\u00F3n se realiz\u00F3 correctamente";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Se ha ignorado la regla de validaci\u00F3n ya que no es aplicable a la visita actual";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "La muestra %2 Lot# %1 ha caducado. Elimine este \u00EDtem y seleccione una muestra con un n\u00FAmero de lote v\u00E1lido";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "Se necesita '%1' para la muestra '%2'.";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "El valor es muy largo para el campo '%1' (tama\u00F1o m\u00E1ximo %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "El m\u00E9todo especializado '%1' no es compatible en este componente de negocio.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Esta operaci\u00F3n no se encuentra disponible para el campo s\u00F3lo lectura '%1'.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "La operaci\u00F3n no es v\u00E1lida cuando no se encuentra en modo actualizado.\n\nSi el problema persiste, contin\u00FAe o solicite al administrador del sistema que verifique la configuraci\u00F3n de la aplicaci\u00F3n.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Operaci\u00F3n no v\u00E1lida cuando no est\u00E1 en ejecuci\u00F3n.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "La capacidad para actualizar este registro no est\u00E1 disponible en esta pantalla o applet.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Una transacci\u00F3n ya est\u00E1 en proceso.(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "El campo %1 no est\u00E1 activado en el componente de negocio %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "La contrase\u00F1a actual que especific\u00F3 no es correcta. Especif\u00EDquela de nuevo.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "No puede modificar el registro en esta p\u00E1gina. Probablemente se debe a que ha utilizado los botones atr\u00E1s y adelante del explorador para acceder a esta p\u00E1gina. Utilice los botones Editar/Nuevo de la aplicaci\u00F3n para modificar los registros.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "Se requiere que el valor '%1' para el campo '%2' sea '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Texto de error: solicitud de servicio no v\u00E1lida. Se necesita una solicitud de servicio v\u00E1lida para generar un pedido.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "No se puede comprobar el inventario personal porque no se ha encontrado al empleado(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Fecha de inicio de facturaci\u00F3n no v\u00E1lida.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Programaci\u00F3n de facturaci\u00F3n no v\u00E1lida.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Plazo de tiempo de facturaci\u00F3n no v\u00E1lido.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "No se puede encontrar la ubicaci\u00F3n de inventario personal para el propietario de la actividad.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "El m\u00E9todo %1 requiere un valor para el argumento %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Ya existe un registro que contiene valores id\u00E9nticos a los del registro que ha creado.\n\nSi desea especificar un registro nuevo, aseg\u00FArese de que los valores de campo sean exclusivos.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Error al intentar comprometer/deshacer una transacci\u00F3n de la base de datos(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Elimine el detalle de la muestra del producto %1. No puede muestrear o enviar la solicitud del producto %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Desconectar";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "Conectar";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Continuar trabajando sin conexi\u00F3n";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Cargar y conectar";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Sincronizar y permanecer sin conexi\u00F3n";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Cargar solo y permanecer sin conexi\u00F3n";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Registro";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Los filtros de BusObj han cambiado. Se realizar\u00E1 una descarga completa.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Los filtros de BusComp han cambiado. Se realizar\u00E1 una descarga completa.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Se necesita una respuesta para los detalles de presentaci\u00F3n para enviar la llamada. Introduzca un valor adecuado.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Agregue un contacto(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Agregue informaci\u00F3n a Apellido del contacto o Apellido del cliente potencial. Ninguno de estos campos se puede quedar en blanco.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Preparando para uso fuera de l\u00EDnea";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 de %2 archivos descargados";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Sincronizando datos";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Descargando configuraci\u00F3n de aplicaci\u00F3n";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Descargando datos";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Guardando configuraci\u00F3n de aplicaci\u00F3n";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Guardando datos";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 de %2 objetos cargados";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Validando integridad de datos";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Cargando datos";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Preparando datos fuera de l\u00EDnea";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "El valor del campo '%2' del buscomp '%3' no coincide con ning\u00FAn valor de la lista de selecci\u00F3n enlazada '%1'.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "El m\u00E9todo especializado '%1' no est\u00E1 soportado fuera de l\u00EDnea.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
