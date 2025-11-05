// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Impossibile sincronizzare. Controllare la connessione di rete.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Download del pacchetto non in linea non riuscito. Controllare la connessione Internet, svuotare la cache e riprovare.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Sincronizzare i record creati non in linea con il server prima di passare alla modalit\u00E0 in linea.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Effettuare la connessione a Internet per passare alla modalit\u00E0 in linea.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "I database non sono supportati in questo browser.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Immettere un valore per il campo obbligatorio %1.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Impossibile recuperare il pacchetto non in linea dal server. Verificare la configurazione del repository non in linea.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Impossibile recuperare i metadati dal server. Controllare che nel server siano configurati i metadati appropriati.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Questa operazione \u00E8 attualmente non supportata in modalit\u00E0 non in linea.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Errore di lettura del codice a barre. Dati non acquisiti.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Impossibile effettuare la sincronizzazione. Confermare la disponibilit\u00E0 del server e riprovare.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Sincronizzazione riuscita. Contattare l'amministratore per verificare i log.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Sessione di login scaduta. Chiudere e riavviare il browser, quindi eseguire di nuovo il login per effettuare la sincronizzazione.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Il file repository Siebel \u00E8 stato modificato sul server rispetto all'ultima sincronizzazione. Verr\u00E0 eseguito un download completo.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Le proprie responsabilit\u00E0 utente sono state modificate. Verr\u00E0 eseguito un download completo.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "I dati correnti sono obsoleti. Verr\u00E0 eseguito un download completo.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Ricevuta risposta del server non valida per la richiesta: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Download della cache dell'applicazione non riuscito.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Non si dispone dell'autorizzazione per eseguire questa sincronizzazione.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Il nodo remoto \u00E8 stato modificato. Verr\u00E0 eseguito un download completo.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "La propria posizione utente \u00E8 stata modificata. Verr\u00E0 eseguito un download completo.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Memoria insufficiente. La modalit\u00E0 disconnessa non sar\u00E0 supportata.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "\u00C8 necessario fornire i dettagli di almeno un prodotto prima dell'invio.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Impossibile catturare una firma se la data della chiamata \u00E8 successiva alla data corrente.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Impossibile catturare una firma per una chiamata di cui non si \u00E8 proprietari.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "I valori di priorit\u00E0 dei dettagli dei prodotti devono essere univoci e disposti in ordine sequenziale. Esaminare i valori di priorit\u00E0 dei dettagli dei prodotti per verificare che corrispondano a questo requisito.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 \u00E8 un campo obbligatorio. Immettere un valore appropriato.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Impossibile inviare la visita a %1. Il numero di riferimento del campione \u00E8 obbligatorio se i campioni vengono consegnati.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Impossibile inoltrare la chiamata a %1. Per inoltrarla, \u00E8 richiesta una firma su carta o elettronica.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Impossibile inviare la transazione dei campioni per un periodo riconciliato. Modificare la data della transazione in modo che sia compresa in un periodo non riconciliato o attivo.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Impossibile catturare una firma per questo tipo di contatto.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Modificare il valore della quantit\u00E0. \u00C8 consentito solo un campione di %2 su %1 per chiamata.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Modificare il valore della quantit\u00E0. Non \u00E8 possibile eseguire il campionamento di %1 perch\u00E9 supera la quantit\u00E0 disponibile - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Non \u00E8 consentito campionare un professionista. Rimuovere i campioni prima di inviare la chiamata.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 \u00E8 un campo obbligatorio.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Il numero di licenza di questo contatto \u00E8 scaduto.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "Il numero DEA di questo indirizzo non \u00E8 valido. Inserirne uno valido.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 dell'indirizzo di questo contatto \u00E8 un campo obbligatorio.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "Il numero DEA dell'indirizzo di questo contatto \u00E8 scaduto. Aggiornare il numero DEA per l'indirizzo selezionato.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Selezionare un numero di lotto diverso. Il numero di lotto: '%1' selezionato per il campione: '%2' sta per scadere.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Per catturare una firma sono necessari i campi del nome, del cognome, della professione e dell'indirizzo del contatto.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Per catturare una firma \u00E8 necessario consegnare o richiedere almeno un campione.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Controllare i risultati della convalida per scegliere un'azione correttiva prima di continuare.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Il numero di licenza di questo contatto non \u00E8 attivo.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' \u00E8 un campo obbligatorio. Inserire un valore nel  campo.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "L'immissione per il campo '%1' \u00E8 troppo lunga per un database Enterprise con codifica UTF-8. Riprovare con un'immissione pi\u00F9 breve.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "\u00C8 necessario scegliere un contatto o un account per creare la chiamata, non entrambi.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Campionamento non consentito. Contattare il proprio gruppo di conformit\u00E0 dei campionamenti.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Controllo della regola di convalida completato";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "La regola di convalida \u00E8 stata ignorata poich\u00E9 non \u00E8 valida per la chiamata corrente";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Il campione %2 lotto numero %1 \u00E8 scaduto. Rimuovere questo elemento e selezionare un campione con un numero di lotto valido.";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' da specificare per il campione '%2'";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Valore troppo lungo per il campo '%1' (dimensioni massime %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "Metodo specializzato '%1' non supportato da questo business component.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Questa operazione non \u00E8 disponibile per il campo di sola lettura '%1'.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Operazione non valida se effettuata al di fuori della modalit\u00E0 di aggiornamento.\n\nContinuare oppure domandare all'amministratore di sistema di controllare la configurazione dell'applicazione se il problema persiste.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Operazione non valida se non eseguita.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "Non \u00E8 possibile aggiornare il record in questa schermata o in questa applet.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Una transazione \u00E8 gi\u00E0 in corso(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Il campo %1 non \u00E8 attivato nel Business Component %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "La password corrente immessa non \u00E8 corretta. Immetterla di nuovo.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Impossibile modificare il record in questa pagina. Probabilmente l'utente ha usato i pulsanti Avanti e Indietro per raggiungere questa pagina. Usare i pulsanti Modifica/Nuovo dell'applicazione per modificare i record.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "Il valore '%1' per il campo '%2' deve essere '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Testo errore: richiesta di servizio non valida. Per generare un ordine \u00E8 necessaria una richiesta di servizio valida.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Il controllo della dotazione non pu\u00F2 essere eseguito. Nessun dipendente trovato.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Data di inizio fattura non valida.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Pianificazione fattura non valida.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Tempificazione fattura non valida.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Impossibile trovare l'ubicazione di inventario di tronco per il proprietario dell'attivit\u00E0.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "Il metodo %1 richiede un valore per l'argomento %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Un record che contiene valori identici al record creato \u00E8 gi\u00E0 esistente.\n\nPrima di immettere un nuovo record, accertarsi che i valori di campo siano univoci.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Si \u00E8 verificato un errore nel tentativo di impegnare/annullare una transazione del database(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Rimuovere l'elemento campione per il prodotto %1. Non \u00E8 possibile eseguire il campionamento o inviare richieste per il prodotto %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Non in linea";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "In linea";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Continua a lavorare non in linea";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Carica e vai in linea";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Sincronizza e resta non in linea";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Carica solo e resta non in linea";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Log";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "I filtri BusObj sono stati modificati. Verr\u00E0 eseguito un download completo.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "I filtri BusComp sono stati modificati. Verr\u00E0 eseguito un download completo.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "\u00C8 richiesto Risposta per dettagli presentazione per Inoltrare la chiamata. Immettere un valore appropriato.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Aggiungere un contatto(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Aggiungere un cognome del contatto o un cognome del cliente potenziale. Non \u00E8 possibile lasciare vuoti entrambi i campi.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Preparazione per l'uso non in linea";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "Scaricati %1 file su %2";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Sincronizzazione dei dati in corso";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Download della configurazione applicazione in corso";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Download dei dati in corso";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Salvataggio della configurazione applicazione in corso";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Salvataggio dei dati in corso";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "Caricati %1 oggetti su %2";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Convalida dell'integrit\u00E0 dati in corso";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Caricamento dei dati in corso";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Preparazione dei dati non in linea in corso";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "Il valore immesso nel campo '%2' del Business Component '%3' non corrisponde ad alcun valore nell'elenco di selezione collegato '%1'.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "Metodo specializzato '%1' non supportato nella modalit\u00E0 non in linea.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
