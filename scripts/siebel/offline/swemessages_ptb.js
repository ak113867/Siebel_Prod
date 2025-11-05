// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "N\u00E3o \u00E9 poss\u00EDvel sincronizar. Verifique sua conex\u00E3o de rede.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Falha ao fazer o download do pacote off-line. Verifique sua conex\u00E3o com a internet, esvazie o cache e tente novamente.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Sincronize os registros criados off-line para o servidor antes de navegar para o modo On-line.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Conecte-se \u00E0 internet para prosseguir on-line.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Os bancos de dados n\u00E3o s\u00E3o suportados neste navegador.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Insira um valor para  %1, que \u00E9 obrigat\u00F3rio.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Falha ao obter o pacote off-line do servidor. Verifique a configura\u00E7\u00E3o do reposit\u00F3rio off-line.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Falha ao obter os metadados do servidor. Verifique se os metadados adequados est\u00E3o configurados no servidor.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Esta opera\u00E7\u00E3o n\u00E3o \u00E9 suportada no modo off-line no momento.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Erro ao ler o c\u00F3digo de barras. Dados n\u00E3o capturados.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "N\u00E3o foi poss\u00EDvel sincronizar. Confirme a disponibilidade do servidor e tente novamente.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "A sincroniza\u00E7\u00E3o foi efetuada com \u00EAxito. Entre em contato com o administrador para verificar os logs.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "A sess\u00E3o de logon expirou. Feche o navegador, reinicie-o e fa\u00E7a logon novamente para sincronizar.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "O arquivo do reposit\u00F3rio do Siebel foi alterado no servidor desde sua \u00FAltima sincroniza\u00E7\u00E3o. Ser\u00E1 efetuado um download completo.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Suas responsabilidades de usu\u00E1rio foram alteradas. Ser\u00E1 efetuado um download completo.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Os dados atuais est\u00E3o desatualizados. Ser\u00E1 efetuado um download completo.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Resposta inv\u00E1lida recebida do servidor para a solicita\u00E7\u00E3o: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Falha no download do cache do aplicativo.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Voc\u00EA n\u00E3o tem autoriza\u00E7\u00E3o para executar esta sincroniza\u00E7\u00E3o.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "O n\u00F3 remoto foi alterado. Ser\u00E1 efetuado um download completo.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Suas posi\u00E7\u00E3o de usu\u00E1rio foi alterada. Ser\u00E1 efetuado um download completo.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Mem\u00F3ria insuficiente. O modo desconectado n\u00E3o ser\u00E1 suportado.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Pelo menos um produto deve ser detalhado antes do envio.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Imposs\u00EDvel capturar uma assinatura se a data da chamada for posterior ao dia de hoje.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Voc\u00EA n\u00E3o pode capturar uma assinatura para uma chamada que n\u00E3o lhe pertence.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Os valores de prioridade para produtos detalhados devem ser exclusivos e devem estar em ordem sequencial. Reveja os valores de prioridade de detalhes do produto para garantir que eles n\u00E3o estejam violando essa exig\u00EAncia.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 \u00E9 um Campo obrigat\u00F3rio. Informe um valor apropriado.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "N\u00E3o \u00E9 poss\u00EDvel enviar a visita para %1. O n\u00FAmero de refer\u00EAncia das amostras ser\u00E1 necess\u00E1rio se elas forem entregues.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "N\u00E3o \u00E9 poss\u00EDvel enviar esta chamada para %1. Uma assinatura em papel ou uma assinatura eletr\u00F4nica \u00E9 necess\u00E1ria para enviar esta chamada.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "A transa\u00E7\u00E3o de amostra n\u00E3o pode ser enviada contra um per\u00EDodo reconciliado. Altere a data da transa\u00E7\u00E3o para que se situe em um per\u00EDodo n\u00E3o reconciliado ou ativo.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Uma assinatura n\u00E3o pode ser capturada para este tipo de contato.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Altere o valor da quantidade. Voc\u00EA tem permiss\u00E3o de amostra de apenas %2 de %1 por chamada.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Altere o valor da quantidade. Voc\u00EA n\u00E3o pode ter a amostra %1, pois ela excede a quantidade dispon\u00EDvel: -%2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "N\u00E3o foi permitido extrair amostras do profissional. Remova as amostras antes de enviar a chamada.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 \u00E9 um campo obrigat\u00F3rio.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "O n\u00FAmero da licen\u00E7a deste contato expirou.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "O N\u00FAmero DEA para este endere\u00E7o n\u00E3o \u00E9 v\u00E1lido. Insira um v\u00E1lido.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 neste endere\u00E7o de contato \u00E9 um campo obrigat\u00F3rio.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "O n\u00FAmero DEA para este endere\u00E7o de contato expirou. Atualize o n\u00FAmero DEA para o endere\u00E7o selecionado.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Selecione um n\u00BA de lote diferente. O n\u00BA de lote: '%1' selecionado para a amostra: '%2' est\u00E1 quase expirando.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Os campos Sobrenome, Nome, Cargo e Endere\u00E7o do contato s\u00E3o obrigat\u00F3rios para capturar uma assinatura.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Pelo menos uma amostra deve ser eliminada ou solicitada para capturar uma assinatura.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Verifique os Resultados da valida\u00E7\u00E3o para obter a a\u00E7\u00E3o corretiva para continuar. (SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "O n\u00FAmero da licen\u00E7a para este contato n\u00E3o est\u00E1 ativo.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' \u00E9 um campo obrigat\u00F3rio. Informe um valor para o campo.(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "Sua entrada para o campo '%1' \u00E9 longa demais para se encaixar em um banco de dados empresarial codificado UTF-8. Tente novamente com uma entrada mais curta.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Escolha Contato ou Conta para criar a chamada, mas n\u00E3o escolha ambos.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Voc\u00EA n\u00E3o tem permiss\u00E3o para extrair amostra. Entre em contato com seu Grupo de conformidade de amostras.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "A verifica\u00E7\u00E3o da regra de valida\u00E7\u00E3o ocorreu com \u00EAxito";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "A regra de valida\u00E7\u00E3o foi ignorada, pois n\u00E3o \u00E9 aplic\u00E1vel \u00E0 chamada atual";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Amostra %2 N\u00BA do lote %1 expirou. Remova este item e selecione a amostra com um N\u00BA do lote v\u00E1lido";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' \u00E9 necess\u00E1rio para a amostra '%2'";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "O valor \u00E9 longo demais para o campo '%1' (tamanho m\u00E1ximo %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "O m\u00E9todo especializado '%1' n\u00E3o \u00E9 aceito neste business component.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Esta opera\u00E7\u00E3o n\u00E3o est\u00E1 dispon\u00EDvel para o campo somente leitura '%1'.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Opera\u00E7\u00E3o inv\u00E1lida quando n\u00E3o estiver no modo de atualiza\u00E7\u00E3o.\n\nContinue ou pe\u00E7a ao administrador do sistema para verificar a configura\u00E7\u00E3o do seu aplicativo, se o problema persistir.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Opera\u00E7\u00E3o inv\u00E1lida quando n\u00E3o executada.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "O recurso para atualizar este registro n\u00E3o est\u00E1 dispon\u00EDvel nessa tela ou applet.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "J\u00E1 h\u00E1 uma transa\u00E7\u00E3o em andamento.(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "O campo %1 n\u00E3o est\u00E1 ativado no Componente de neg\u00F3cios %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "A senha atual digitada est\u00E1 incorreta. Digite-a novamente.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "N\u00E3o \u00E9 poss\u00EDvel modificar o registro nesta p\u00E1gina. Isso ocorre provavelmente porque voc\u00EA utilizou os bot\u00F5es Voltar e Avan\u00E7ar do navegador para chegar a esta p\u00E1gina. Utilize os bot\u00F5es Editar/Novo no aplicativo para modificar os registros.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "O valor '%1' para o campo '%2' deve ser '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Texto do erro: Solicita\u00E7\u00E3o de servi\u00E7o inv\u00E1lida. Para gerar uma ordem, \u00E9 necess\u00E1ria uma solicita\u00E7\u00E3o de servi\u00E7o v\u00E1lida.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "N\u00E3o \u00E9 poss\u00EDvel executar o Tr\u00E2nsito de verifica\u00E7\u00E3o porque nenhum funcion\u00E1rio foi encontrado.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Data de in\u00EDcio da fatura inv\u00E1lida.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Programa\u00E7\u00E3o da fatura inv\u00E1lida.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Prazo da fatura inv\u00E1lido.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "N\u00E3o \u00E9 poss\u00EDvel encontrar local de estoque de itens leves e pequenos para o respons\u00E1vel da atividade.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "O m\u00E9todo %1 requer um valor para o argumento %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "J\u00E1 existe um registro que cont\u00E9m valores id\u00EAnticos ao registro que voc\u00EA criou.\n\nSe quiser digitar um novo registro, certifique-se de que os valores de campo sejam exclusivos.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Ocorreu um erro ao tentar fazer um commit/rollback de uma transa\u00E7\u00E3o do banco de dados(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Remova o item de linha de amostra do produto %1. Voc\u00EA n\u00E3o tem permiss\u00E3o para extrair amostra ou para enviar a solicita\u00E7\u00E3o do produto %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Ficar off-line";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "Ficar on-line";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Continuar trabalhando off-line";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Carregar e ficar on-line";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Sincronizar e permanecer off-line";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Carregar apenas e permanecer off-line";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Log";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Filtros BusObj foram alterados. Ser\u00E1 efetuado um download completo.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Filtros BusComp foram alterados. Ser\u00E1 efetuado um download completo.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Resposta para Detalhes da Apresenta\u00E7\u00E3o \u00E9 obrigat\u00F3rio para Enviar a Chamada. Digite um valor apropriado.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Adicione um contato(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Informe o Sobrenome do contato ou o Sobrenome do cliente em potencial. Os dois campos n\u00E3o podem ficar em branco.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Preparando para uso offline";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 de %2 arquivos baixados";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Sincronizando dados";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Fazendo download da configura\u00E7\u00E3o do aplicativo";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Fazendo download de dados";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Salvando a configura\u00E7\u00E3o do aplicativo";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Salvando dados";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 de %2 objetos carregados";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Validando integridade de dados";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Fazendo upload de dados";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Preparando dados off-line";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "O valor digitado no campo '%2' de buscomp '%3' n\u00E3o corresponde a nenhum valor da lista de sele\u00E7\u00E3o '%1' limitada(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "O m\u00E9todo especializado '%1' n\u00E3o \u00E9 suportado offline.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
