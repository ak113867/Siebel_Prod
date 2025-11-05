// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "N\u00E3o \u00E9 poss\u00EDvel sincronizar. Verifique a sua liga\u00E7\u00E3o \u00E0 rede.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "O descarregamento do pacote offline falhou. Verifique a sua liga\u00E7\u00E3o \u00E0 Internet, limpe a cache e volte a tentar.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Sincronize os registos criados em offline no servidor antes de navegar para o modo online.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Ligue-se \u00E0 Internet para ficar online.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "As bases de dados n\u00E3o s\u00E3o suportadas neste browser.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Introduza um valor para %1, que \u00E9 obrigat\u00F3rio.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Falha ao obter o pacote offline do servidor. Verifique a configura\u00E7\u00E3o do reposit\u00F3rio offline.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Falha ao obter os metadados do servidor. Verifique se os metadados corretos est\u00E3o configurados no servidor.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Esta opera\u00E7\u00E3o n\u00E3o \u00E9 atualmente suportada no modo offline.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Erro ao ler o c\u00F3digo de barras. Os dados n\u00E3o foram capturados.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "N\u00E3o \u00E9 poss\u00EDvel sincronizar. Confirme a disponibilidade do servidor e volte a tentar.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "A sincroniza\u00E7\u00E3o foi bem-sucedida. Contacte o administrador para verificar os registos.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "A entrada em sess\u00E3o expirou. Feche e, em seguida, reinicie o browser e entre em sess\u00E3o novamente para sincronizar.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "O ficheiro do reposit\u00F3rio Siebel foi alterado no servidor desde a \u00FAltima sincroniza\u00E7\u00E3o. Um descarregamento total ser\u00E1 efetuado.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "As responsabilidades de utilizador foram alteradas. Um descarregamento total ser\u00E1 efetuado.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Os dados atuais est\u00E3o desatualizados. Um descarregamento total ser\u00E1 efetuado.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Foi recebida uma resposta do servidor inv\u00E1lida para o pedido: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Falhou o descarregamento da cache da aplica\u00E7\u00E3o.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "N\u00E3o tem autoriza\u00E7\u00E3o para efetuar esta sincroniza\u00E7\u00E3o.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "O n\u00F3 remoto foi alterado. Um descarregamento total ser\u00E1 efetuado.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "O seu cargo de utilizador foi alterado. Um descarregamento total ser\u00E1 efetuado.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Mem\u00F3ria insuficiente. O modo desligado n\u00E3o ser\u00E1 suportado.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "\u00C9 necess\u00E1rio apresentar os detalhes de, pelo menos, um produto antes de enviar.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "N\u00E3o \u00E9 poss\u00EDvel capturar uma assinatura se a Data da chamada for posterior a Hoje.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "N\u00E3o pode capturar uma assinatura para uma chamada da qual n\u00E3o \u00E9 propriet\u00E1rio.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Os valores de prioridade dos produtos detalhados devem ser exclusivos e em ordem sequencial. Reveja os valores de prioridade do detalhe do produto para garantir que n\u00E3o existe viola\u00E7\u00E3o deste requisito.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 \u00E9 um Campo obrigat\u00F3rio.  Introduza um valor adequado.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "N\u00E3o \u00E9 poss\u00EDvel submeter a visita para %1. \u00C9 necess\u00E1rio um n\u00FAmero de refer\u00EAncia da amostra se forem entregues amostras.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "N\u00E3o \u00E9 poss\u00EDvel enviar esta chamada para %1. Para enviar esta chamada, \u00E9 necess\u00E1ria uma assinatura em papel ou uma assinatura eletr\u00F3nica.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Esta transa\u00E7\u00E3o de amostras n\u00E3o pode ser enviada em rela\u00E7\u00E3o a um per\u00EDodo reconciliado. Altere a data da transa\u00E7\u00E3o para que esta recaia num per\u00EDodo n\u00E3o reconciliado ou ativo.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "N\u00E3o \u00E9 poss\u00EDvel capturar uma assinatura para este tipo de contacto.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Altere o valor da quantidade. Tem permiss\u00E3o para testar apenas %2 de %1 por chamada.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Altere o valor da quantidade. N\u00E3o \u00E9 poss\u00EDvel testar %1, uma vez que excede a quantidade dispon\u00EDvel - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "O profissional n\u00E3o pode ser testado. Remova as amostras antes de submeter a chamada.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 \u00E9 um campo obrigat\u00F3rio.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "O N\u00FAmero de licen\u00E7a deste contacto expirou.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "O N\u00FAmero DEA para este endere\u00E7o n\u00E3o \u00E9 v\u00E1lido. Introduza um n\u00FAmero v\u00E1lido.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 na morada deste contacto \u00E9 um campo obrigat\u00F3rio.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "O n\u00FAmero DEA da Morada deste contacto expirou. Atualize o n\u00FAmero DEA para a morada selecionada.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Selecione um N.\u00BA do lote diferente. O N.\u00BA do lote: '%1' selecionado para a amostra: '%2' est\u00E1 a atingir a expira\u00E7\u00E3o.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Para capturar uma assinatura, s\u00E3o obrigat\u00F3rios os campos Apelido, Nome, T\u00EDtulo e Morada do contacto.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Para capturar uma assinatura, \u00E9 necess\u00E1rio entregar ou solicitar, pelo menos, uma amostra.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Verifique os Resultados da valida\u00E7\u00E3o para proceder \u00E0 a\u00E7\u00E3o corretiva e continuar.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "O N\u00FAmero de licen\u00E7a deste Contacto n\u00E3o est\u00E1 Ativo.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' \u00E9 um campo obrigat\u00F3rio. Introduza um valor para o campo.(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "A entrada p/ o campo '%1' \u00E9 demasiado longa p/ uma base de dados emp. cod. em UTF-8. Repita c/ uma entrada mais curta.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Deve escolher o Contacto ou a Conta para criar a chamada, mas n\u00E3o ambos.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "N\u00E3o tem permiss\u00E3o para testar. Contacte o Grupo de conformidade das amostras.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "A verifica\u00E7\u00E3o da regra de valida\u00E7\u00E3o foi efetuada com \u00EAxito";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "A regra de valida\u00E7\u00E3o foi ignorada uma vez que n\u00E3o se aplica \u00E0 chamada atual";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "O N.\u00BA do lote %1 da amostra %2 expirou. Remova este artigo e selecione a amostra com o N.\u00BA do lote v\u00E1lido";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' \u00E9 obrigat\u00F3rio para a amostra '%2'";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Valor demasiado longo para o campo '%1' (tamanho m\u00E1ximo %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "O m\u00E9todo especializado '%1' n\u00E3o \u00E9 suportado neste business component.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Esta opera\u00E7\u00E3o n\u00E3o est\u00E1 dispon\u00EDvel para o campo s\u00F3 de leitura '%1'.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Esta opera\u00E7\u00E3o \u00E9 inv\u00E1lida quando n\u00E3o est\u00E1 no modo de atualiza\u00E7\u00E3o.\n\nContinue ou, se o problema persistir, solicite ao administrador do sistema para verificar a aplica\u00E7\u00E3o.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Opera\u00E7\u00E3o inv\u00E1lida quando n\u00E3o executada.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "N\u00E3o \u00E9 poss\u00EDvel atualizar este registo de momento. Verifique as propriedades de Sem atualiza\u00E7\u00E3o na Applet, no Business Component e na Liga\u00E7\u00E3o.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "J\u00E1 se encontra uma transa\u00E7\u00E3o em curso(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "O campo %1 n\u00E3o est\u00E1 ativado no Business Component %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "A senha atual que introduziu est\u00E1 incorreta. Introduza a senha novamente.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "N\u00E3o \u00E9 poss\u00EDvel modificar o registo nesta p\u00E1gina. Isto deve-se, provavelmente, ao facto de ter utilizado os bot\u00F5es Anterior e Seguinte do browser para alcan\u00E7ar esta p\u00E1gina. Utilize os bot\u00F5es Editar/Novo da aplica\u00E7\u00E3o para modificar os registos.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "\u00C9 obrigat\u00F3rio que o valor '%1' para o campo '%2' seja '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Texto do erro: Pedido de assist\u00EAncia inv\u00E1lido. \u00C9 necess\u00E1rio um Pedido de assist\u00EAncia v\u00E1lido para gerar uma encomenda.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "N\u00E3o \u00E9 poss\u00EDvel Verificar porta-malas porque n\u00E3o foi encontrado nenhum funcion\u00E1rio.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Data de in\u00EDcio da fatura inv\u00E1lida.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Calend\u00E1rio da fatura inv\u00E1lido.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Prazo da fatura inv\u00E1lido.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "N\u00E3o \u00E9 poss\u00EDvel encontrar a localiza\u00E7\u00E3o do invent\u00E1rio em tr\u00E2nsito para o propriet\u00E1rio da atividade.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "O m\u00E9todo %1 requer um valor para o argumento %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "J\u00E1 existe um registo que cont\u00E9m valores id\u00EAnticos ao registo que criou.\n\nSe pretende introduzir um registo novo, certifique-se de que os valores dos campos s\u00E3o exclusivos.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Ocorreu um erro ao tentar comprometer/anular uma transa\u00E7\u00E3o de base de dados(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Remova o artigo de linha de amostra relativa ao produto %1. N\u00E3o tem permiss\u00E3o para testar ou enviar o pedido do produto %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Ficar offline";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "Ficar online";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Continuar a trabalhar offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Carregar e ficar online";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Sincronizar e ficar offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Carregar apenas e ficar offline";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Registo";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Os Filtros BusObj foram alterados. Um descarregamento total ser\u00E1 efetuado.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Os Filtros BusComp foram alterados. Um descarregamento total ser\u00E1 efetuado.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "\u00C9 necess\u00E1ria a Resposta para os Detalhes da Apresenta\u00E7\u00E3o para Submeter a Chamada. Introduza um valor adequado.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Acrescente um Contacto(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Especifique um Apelido do Contacto ou um Apelido do Cliente Potencial. Ambos os campos n\u00E3o podem ficar em branco.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "A preparar para utiliza\u00E7\u00E3o offline";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 de %2 ficheiros descarregados";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "A sincronizar dados";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "A descarregar a configura\u00E7\u00E3o da aplica\u00E7\u00E3o";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "A descarregar dados";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "A guardar a configura\u00E7\u00E3o da aplica\u00E7\u00E3o";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "A gravar dados";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 de %2 objetos carregados";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "A validar a integridade dos dados";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "A carregar dados";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "A preparar os dados offline";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "O valor introduzido no campo '%2' do buscomp '%3' n\u00E3o corresponde a nenhum valor na lista de escolha limitada '%1'(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "O m\u00E9todo especializado '%1' n\u00E3o \u00E9 suportado em modo offline.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
