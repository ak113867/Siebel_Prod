// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Kan ikke synkronisere. Kontroller netv\u00E6rksforbindelsen.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Download af offline-pakken fejlede. Kontroller internetforbindelsen, t\u00F8m cachen, og pr\u00F8v igen.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Synkroniser poster, der er oprettet offline, med serveren, f\u00F8r du navigerer til online-tilstand.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Opret forbindelse til internettet for at g\u00E5 online.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Databaser underst\u00F8ttes ikke i denne browser.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Indtast en v\u00E6rdi til %1, som er p\u00E5kr\u00E6vet.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Kunne ikke hente offline-pakke fra server. Verificer konfiguration af offline-informationsbase.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Kunne ikke hente metadata fra server. Kontroller, at relevante metadata er konfigureret p\u00E5 serveren.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Denne operation underst\u00F8ttes ikke i offline-tilstand i \u00F8jeblikket.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Fejl under l\u00E6sning af stregkode. Data er ikke hentet.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Kan ikke konfigurere. Bekr\u00E6ft servertilg\u00E6ngelighed, og pr\u00F8v igen.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synkronisering er gennemf\u00F8rt. Kontakt administratoren for at f\u00E5 verificeret logge.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Logonsession er udl\u00F8bet. Luk, genstart dern\u00E6st browseren, og log p\u00E5 igen for at synkronisere.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Siebel-informationsbasefilen er blevet \u00E6ndret p\u00E5 serveren siden sidste synkronisering. En fuld download vil blive udf\u00F8rt.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Dine brugeransvarsomr\u00E5der er \u00E6ndret. En fuld download vil blive udf\u00F8rt.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Aktuelle data er for\u00E6ldede. En fuld download vil blive udf\u00F8rt.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Modtog en ugyldig serverrespons til anmodning: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Download af applikationscache fejlede.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Du har ikke bemyndigelse til at udf\u00F8re denne synkronisering.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Fjernnoden er \u00E6ndret. En fuld download vil blive udf\u00F8rt.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Dine brugerstilling er \u00E6ndret. En fuld download vil blive udf\u00F8rt.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Utilstr\u00E6kkelig hukommelse. Afbrudt tilstand underst\u00F8ttes ikke.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Du skal specificere mindst \u00E9t produkt, f\u00F8r du sender.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Kan ikke hente en signatur, hvis opkaldsdatoen ligger senere end i dag.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Du kan ikke hente en signatur for et opkald, du ikke ejer.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Prioritetsv\u00E6rdier for de detaljerede produkter skal v\u00E6re entydige og i fortl\u00F8bende r\u00E6kkef\u00F8lge. Gennemg\u00E5 prioritetsv\u00E6rdierne for produktdetalje for at sikre, at de ikke overtr\u00E6der dette krav.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 er et p\u00E5kr\u00E6vet felt. Indtast en relevant v\u00E6rdi.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Kan ikke sende bes\u00F8get til %1. Der skal bruges et pr\u00F8vereferencenummer, hvis der afleveres pr\u00F8ver.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Kan ikke sende dette opkald til %1. Der kr\u00E6ves en papirsignatur eller en elektronisk signatur for at kunne sende dette opkald.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Denne pr\u00F8vetransaktion kan ikke sendes mod en afstemt periode. Rediger transaktionsdatoen, s\u00E5 den er inden for en ikke-afstemt eller aktiv periode.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "En signatur kan ikke hentes til denne type kontakt.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Ret m\u00E6ngdev\u00E6rdien. Du m\u00E5 kun pr\u00F8veudtage %2 af %1 pr. kald.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Ret m\u00E6ngdev\u00E6rdien. Du kan ikke pr\u00F8veudtage %1, da den overskrider disponibel m\u00E6ngde - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Professionel m\u00E5 ikke udtages til pr\u00F8ve. Fjern stikpr\u00F8ver, f\u00F8r kaldet sendes.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 er et p\u00E5kr\u00E6vet felt.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Licensnummeret for denne kontakt er udl\u00F8bet.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "DEA-nummeret til denne adresse er ikke gyldigt. Indtast et gyldigt nummer.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 p\u00E5 denne kontakts adresse er et p\u00E5kr\u00E6vet felt.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "DEA-nummer til denne kontakts adresse er udl\u00F8bet. Opdater DEA-nummer for den valgte adresse.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "V\u00E6lg et andet partinummer: Partinummer: '%1', der er valgt til pr\u00F8ve: '%2', n\u00E6rmer sig udl\u00F8b.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Felterne til kontaktens efternavn, fornavn, titel og adresse skal angives for at kunne hente en signatur";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Mindst \u00E9n pr\u00F8ve skal sendes eller anmodes for at kunne hente en signatur.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Kontroller valideringsresultater for korrigerende handling for at forts\u00E6tte.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Licensnummeret for denne kontakt er ikke aktivt.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' er et p\u00E5kr\u00E6vet felt.  Angiv en v\u00E6rdi for dette felt.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "Din indtastning i feltet '%1' er for lang til en UTF-8 kodet Enterprise-database.  Fors\u00F8g igen med en kortere indtastning.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Du skal v\u00E6lge Kontakt eller Konto for at oprette bes\u00F8get, men ikke begge.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Du har ikke tilladelse til at udtage pr\u00F8ver. Kontakt Samples Compliance Group.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Kontrol af valideringsregel lykkedes";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Valideringsreglen blev ignoreret og er ikke g\u00E6ldende for det aktuelle kald";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Stikpr\u00F8ve %2 partinr. %1 er udl\u00F8bet. Fjern denne vare, og v\u00E6lg stikpr\u00F8ve med et gyldigt partinummer";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' er n\u00F8dvendigt til '%2'.";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "V\u00E6rdien er for lang til feltet '%1' (maksimal l\u00E6ngde %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "Den specialiserede metode '%1' underst\u00F8ttes ikke p\u00E5 denne forretningskommponent.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Denne handling er ikke tilg\u00E6ngelig for skrivebeskyttet felt '%1'.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Ugyldig handling, medmindre du er i opdateringstilstand.\n\nForts\u00E6t, eller bed systemadministratoren om at kontrollere applikationens konfiguration, hvis problemet forts\u00E6tter.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Handlingen er ugyldig, n\u00E5r den ikke udf\u00F8res.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "Du kan ikke opdatere denne post p.t. Kontroller egenskaben Ingen opdatering p\u00E5 Applet, Forretningskomponent og Link.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "En transaktion er allerede i gang(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Feltet %1 er ikke aktiveret i forretningskomponenten %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Den indtastede adgangskode er forkert. Indtast igen.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Du kan ikke \u00E6ndre posten p\u00E5 denne side. Dette er sikkert, fordi du anvendte browserknapperne Tilbage og Frem for at n\u00E5 frem til denne side. Anvend knapperne Rediger/Ny i applikationen for at \u00E6ndre posterne.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "V\u00E6rdien '%1' til feltet '%2' skal v\u00E6re '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Fejltekst: Ugyldig serviceanmodning. Der kr\u00E6ves en gyldig serviceanmodning for at generere en ordre.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Kontrol af bagagerum kan ikke udf\u00F8res, da der ikke er fundet nogen medarbejder(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Ugyldig startdato for faktura.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Ugyldig fakturaplan.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Ugyldig fakturatiming.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Kan kan finde placering af bagagerumslager til aktivitetsejeren.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "Metoden %1 kr\u00E6ver en v\u00E6rdi til argumentet %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "En post, der indeholder samme v\u00E6rdier som den post, du har oprettet, eksisterer allerede.\n\nHvis du \u00F8nsker at indtaste en ny post, skal du sikre, at feltv\u00E6rdierne er entydige.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Der opstod en fejl under fors\u00F8g p\u00E5 at bekr\u00E6fte/tilbagestille en databasetransaktion(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Fjern pr\u00F8velinjeelementet for produkt %1. Du m\u00E5 ikke pr\u00F8veudtage eller sende anmodning om produkt %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "G\u00E5 offline";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "G\u00E5 offline";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Forts\u00E6t med at arbejde offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Upload og g\u00E5 online";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Synk. og forbliv offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Upload kun, og forbliv offline";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Log";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "BusObj-filtre er \u00E6ndret. En fuld download vil blive udf\u00F8rt.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "BusComp-filtre er \u00E6ndret. En fuld download vil blive udf\u00F8rt.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Detaljer om svar p\u00E5 pr\u00E6sentation er p\u00E5kr\u00E6vet for at afsende bes\u00F8get. Indtast en relevant v\u00E6rdi.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Tilf\u00F8j kontakt(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Tilf\u00F8j enten 'Kontakts efternavn' eller 'Potentiel kundes efternavn'. Begge felter m\u00E5 ikke st\u00E5 tomme.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Forbereder til offline-brug";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 af %2 filer downloadet";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Synkroniserer data";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Downloader applikationskonfiguration";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Downloader data";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Gemmer applikationskonfiguration";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Gemmer data";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 af %2 objekter indl\u00E6st";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Validerer dataintegritet";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Uploader data";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Forbereder offlinedata";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "Den indtastede v\u00E6rdi i feltet '%2' i forretningskomponenten '%3' svarer ikke til en v\u00E6rdi i den bundne valgliste '%1'.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "Den specialiserede metode '%1' underst\u00F8ttes ikke i offline.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
