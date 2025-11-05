// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Nelze synchronizovat. Zkontrolujte p\u0159ipojen\u00ED k s\u00EDti.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Sta\u017Een\u00ED offline bal\u00ED\u010Dku se nezda\u0159ilo. Zkontrolujte p\u0159ipojen\u00ED k Internetu, vypr\u00E1zdn\u011Bte pam\u011B\u0165 cache a zkuste to znovu.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "P\u0159ed p\u0159echodem do online re\u017Eimu nejprve synchronizujte z\u00E1znamy vytvo\u0159en\u00E9 offline na server.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Chcete-li pracovat v online re\u017Eimu, p\u0159ipojte se k Internetu.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Datab\u00E1ze nejsou v tomto prohl\u00ED\u017Ee\u010Di podporov\u00E1ny.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Zadejte hodnotu povinn\u00E9ho pole %1.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Ze serveru se nepoda\u0159ilo z\u00EDskat offline bal\u00ED\u010Dek. Ov\u011B\u0159te konfiguraci offline \u00FAlo\u017Ei\u0161t\u011B.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Ze serveru se nepoda\u0159ilo z\u00EDskat metadata. Zkontrolujte, zda jsou na serveru konfigurov\u00E1na spr\u00E1vn\u00E1 metadata.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Tato operace nen\u00ED v tuto chv\u00EDli v offline re\u017Eimu podporov\u00E1na.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Chyba p\u0159i \u010Dten\u00ED \u010D\u00E1rov\u00E9ho k\u00F3du. \u00DAdaje nebyly zachyceny.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Nelze synchronizovat. Potvr\u010Fte dostupnost serveru a zkuste to znovu.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synchronizace byla \u00FAsp\u011B\u0161n\u00E1. Chcete-li ov\u011B\u0159it protokoly, obra\u0165te se na spr\u00E1vce.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Platnost relace p\u0159ihl\u00E1\u0161en\u00ED vypr\u0161ela. Chcete-li prov\u00E9st synchronizaci, prohl\u00ED\u017Ee\u010D nejprve zav\u0159ete, pak jej spus\u0165te znovu a p\u0159ihlaste se.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Soubor \u00FAlo\u017Ei\u0161t\u011B Siebel na serveru byl od posledn\u00ED synchronizace zm\u011Bn\u011Bn. Bude provedeno \u00FApln\u00E9 sta\u017Een\u00ED.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Va\u0161e zodpov\u011Bdnosti u\u017Eivatele se zm\u011Bnily. Bude provedeno \u00FApln\u00E9 sta\u017Een\u00ED.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Aktu\u00E1ln\u00ED data jsou zastaral\u00E1. Bude provedeno \u00FApln\u00E9 sta\u017Een\u00ED.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Ze serveru byl p\u0159ijat neplatn\u00FD typ odpov\u011Bdi na po\u017Eadavek: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Sta\u017Een\u00ED pam\u011Bti cache aplikace se nezda\u0159ilo.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Nejste opr\u00E1vn\u011Bni prov\u00E9st tuto synchronizaci.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Vzd\u00E1len\u00FD uzel se zm\u011Bnil. Bude provedeno \u00FApln\u00E9 sta\u017Een\u00ED.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Va\u0161e pozice u\u017Eivatele se zm\u011Bnila. Bude provedeno \u00FApln\u00E9 sta\u017Een\u00ED.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Nedostatek pam\u011Bti. Re\u017Eim bez p\u0159ipojen\u00ED nebude podporov\u00E1n.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "P\u0159ed odesl\u00E1n\u00EDm mus\u00ED b\u00FDt ur\u010Den alespo\u0148 jeden produkt.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Podpis nelze zaznamenat, pokud datum hovoru n\u00E1sleduje po dne\u0161n\u00EDm datu.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Nelze zaznamenat podpis pro hovor, kter\u00FD nevlastn\u00EDte.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Hodnoty priority pro podrobnosti produkt\u016F mus\u00ED b\u00FDt jedine\u010Dn\u00E9 a m\u00EDt sekven\u010Dn\u00ED po\u0159ad\u00ED. Ov\u011B\u0159te, zda hodnoty priority pro podrobnosti produktu neporu\u0161uj\u00ED tento po\u017Eadavek.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 je povinn\u00E9 pole. Zadejte vhodnou hodnotu.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "N\u00E1v\u0161t\u011Bvu nelze odeslat %1. Pokud jsou vzorky vy\u0159azeny, je vy\u017Eadov\u00E1no referen\u010Dn\u00ED \u010D\u00EDslo vzorku.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Tento hovor nelze odeslat do %1. K odesl\u00E1n\u00ED hovoru je t\u0159eba vlastnoru\u010Dn\u00ED nebo elektronick\u00FD podpis.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Tuto transakci vzorku nelze odeslat pro odsouhlasen\u00E9 obdob\u00ED. Zm\u011B\u0148te datum transakce tak, aby spadalo do neodsouhlasen\u00E9ho nebo do aktivn\u00EDho obdob\u00ED.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Pro tento typ kontaktu nelze zaznamenat podpis.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Zm\u011B\u0148te hodnotu mno\u017Estv\u00ED. M\u016F\u017Eete vytvo\u0159it vzorek pouze %2 z %1 na jeden hovor.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Zm\u011B\u0148te hodnotu mno\u017Estv\u00ED. Nem\u016F\u017Eete vytvo\u0159it vzorek %1, proto\u017Ee p\u0159ekra\u010Duje dostupn\u00E9 mno\u017Estv\u00ED - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "U odborn\u00EDka nen\u00ED povoleno vytvo\u0159en\u00ED vzork\u016F. Odeberte vzorky p\u0159ed odesl\u00E1n\u00EDm hovoru.  ";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 je povinn\u00E9 pole.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Skon\u010Dila platnost \u010D\u00EDsla licence pro tento kontakt.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "\u010C\u00EDslo DEA pro tuto adresu nen\u00ED platn\u00E9. Zadejte platn\u00E9 \u010D\u00EDslo.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "Pole %1 u adresy tohoto kontaktu je povinn\u00E9 pole.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "Vypr\u0161ela platnost \u010D\u00EDsla DEA u t\u00E9to adresy kontaktu. Aktualizujte u vybran\u00E9 adresy \u010D\u00EDslo DEA.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Vyberte jin\u00E9 \u010D. \u0161ar\u017Ee. Bl\u00ED\u017E\u00ED se konec platnosti \u010D. \u0161ar\u017Ee '%1' vybran\u00E9 pro vzorek '%2'.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "K zaznamen\u00E1n\u00ED podpisu kontaktu jsou po\u017Eadov\u00E1na pole P\u0159\u00EDjmen\u00ED, Jm\u00E9no, Titul a Adresa.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Aby bylo mo\u017En\u00E9 zaznamenat podpis, je t\u0159eba vy\u0159adit nebo po\u017Eadovat alespo\u0148 jeden vzorek.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Zkontrolujte v\u00FDsledky ov\u011B\u0159en\u00ED u opravn\u00E9 akce, chcete-li pokra\u010Dovat.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "\u010C\u00EDslo licence pro tento kontakt nen\u00ED aktivn\u00ED.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "%1 je vy\u017Eadovan\u00E9 pole. Zadejte hodnotu pro toto pole.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "Va\u0161e polo\u017Eka pro pole %1 je p\u0159\u00EDli\u0161 dlouh\u00E1 pro datab\u00E1zi podniku v k\u00F3dov\u00E1n\u00ED UTF-8. Zkuste zadat krat\u0161\u00ED polo\u017Eku.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "K uskute\u010Dn\u011Bn\u00ED hovoru mus\u00EDte vybrat bu\u010F kontakt, nebo z\u00E1kazn\u00EDka, nikoli ob\u011B mo\u017Enosti.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Nem\u00E1te opr\u00E1vn\u011Bn\u00ED vytvo\u0159it vzorek. Obra\u0165te se na skupinu pro pln\u011Bn\u00ED po\u017Eadavk\u016F na vzorky.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Kontrola pravidla ov\u011B\u0159en\u00ED prob\u011Bhla \u00FAsp\u011B\u0161n\u011B.";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Pravidlo ov\u011B\u0159en\u00ED bylo ignorov\u00E1no, proto\u017Ee je nelze pou\u017E\u00EDt u aktu\u00E1ln\u00EDho vol\u00E1n\u00ED.";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Vypr\u0161ela platnost vzorku %2, \u010D. \u0161ar\u017Ee %1. Odeberte tuto polo\u017Eku a vyberte vzorek s platn\u00FDm \u010D. \u0161ar\u017Ee.";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "Pro vzorek '%2' je nutn\u00E9 zadat '%1'.";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Hodnota pro pole %1 je p\u0159\u00EDli\u0161 dlouh\u00E1 (maxim\u00E1ln\u00ED velikost je %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "Specializovan\u00E1 metoda %1 nen\u00ED pro tuto aplika\u010Dn\u00ED komponentu podporov\u00E1na.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Tato operace nen\u00ED k dispozici pro pole %1, kter\u00E9 je jen pro \u010Dten\u00ED.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Tato operace je neplatn\u00E1 mimo re\u017Eim aktualizace.\n\nPokra\u010Dujte v pr\u00E1ci, nebo pokud bude probl\u00E9m p\u0159etrv\u00E1vat, po\u017E\u00E1dejte spr\u00E1vce syst\u00E9mu o kontrolu konfigurace va\u0161\u00ED aplikace.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Tato operace je neplatn\u00E1, nen\u00ED-li provedena.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "Tento z\u00E1znam nyn\u00ED nelze aktualizovat. Zkontrolujte vlastnosti \u017D\u00E1dn\u00E1 aktualizace v apletu, aplika\u010Dn\u00ED komponent\u011B a odkazu.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Transakce ji\u017E prob\u00EDh\u00E1.(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Pole %1 nen\u00ED aktivov\u00E1no v aplika\u010Dn\u00ED komponent\u011B %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Aktu\u00E1ln\u011B zadan\u00E9 heslo nen\u00ED spr\u00E1vn\u00E9. Zkuste zadat heslo znovu.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Z\u00E1znam na t\u00E9to str\u00E1nce nelze upravit. D\u016Fvodem je pravd\u011Bpodobn\u011B to, \u017Ee jste se na str\u00E1nku dostali pomoc\u00ED tla\u010D\u00EDtek prohl\u00ED\u017Ee\u010De zp\u011Bt nebo vp\u0159ed. Chcete-li z\u00E1znamy upravit, pou\u017Eijte tla\u010D\u00EDtka aplikace Upravit nebo Nov\u00FD.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "Hodnota '%1' pole '%2' mus\u00ED b\u00FDt '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Text chyby: Neplatn\u00FD servisn\u00ED po\u017Eadavek. Ke generov\u00E1n\u00ED objedn\u00E1vky je nutn\u00FD platn\u00FD servisn\u00ED po\u017Eadavek.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Kmenovou kontrolu nelze prov\u00E9st, proto\u017Ee nebyl nalezen \u017E\u00E1dn\u00FD zam\u011Bstnanec.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Neplatn\u00E9 po\u010D\u00E1te\u010Dn\u00ED datum fakturace(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Neplatn\u00FD pl\u00E1n fakturace(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Neplatn\u00E9 \u010Dasov\u00E1n\u00ED fakturace(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Um\u00EDst\u011Bn\u00ED hlavn\u00EDho invent\u00E1\u0159e vlastn\u00EDka aktivity nebylo nalezeno.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "Metoda %1 vy\u017Eaduje zad\u00E1n\u00ED hodnoty argumentu %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Ji\u017E existuje z\u00E1znam, kter\u00FD obsahuje stejn\u00E9 hodnoty jako z\u00E1znam, kter\u00FD jste vytvo\u0159ili.\n\nPokud chcete zadat nov\u00FD z\u00E1znam, zkontrolujte, zda jsou hodnoty pol\u00ED jedine\u010Dn\u00E9.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Do\u0161lo k chyb\u011B p\u0159i pokusu o potvrzen\u00ED nebo n\u00E1vrat datab\u00E1zov\u00E9 transakce.(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Odeberte polo\u017Eku \u0159\u00E1dky vzorku pro produkt %1. Nem\u00E1te opr\u00E1vn\u011Bn\u00ED vytvo\u0159it vzorek nebo odeslat po\u017Eadavek pro produkt %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "P\u0159ej\u00EDt offline";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "P\u0159ej\u00EDt offline";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Pokra\u010Dovat v pr\u00E1ci offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Odeslat a p\u0159ej\u00EDt online";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Synchronizovat a z\u016Fstat offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Pouze odeslat a z\u016Fstat offline";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Protokol";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Filtry BusObj se zm\u011Bnily. Bude provedeno \u00FApln\u00E9 sta\u017Een\u00ED.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Filtry BusComp se zm\u011Bnily. Bude provedeno \u00FApln\u00E9 sta\u017Een\u00ED.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Chcete-li hovor odeslat, je nutn\u00E9 zadat odpov\u011B\u010F pro podrobnosti prezentace. Zadejte p\u0159\u00EDslu\u0161nou hodnotu.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "P\u0159idejte kontaktn\u00ED osobu(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Zadejte p\u0159\u00EDjmen\u00ED kontaktu nebo p\u0159\u00EDjmen\u00ED kandid\u00E1ta. Ob\u011B tato pole nemohou b\u00FDt ponech\u00E1na pr\u00E1zdn\u00E1.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "P\u0159\u00EDprava k offline pou\u017Eit\u00ED";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "Po\u010Det sta\u017Een\u00FDch soubor\u016F: %1 z %2";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Synchronizace dat";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Stahov\u00E1n\u00ED konfigurace aplikace";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Stahov\u00E1n\u00ED dat";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Ukl\u00E1d\u00E1n\u00ED konfigurace aplikace";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Ukl\u00E1daj\u00ED se data";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "Po\u010Det na\u010Dten\u00FDch objekt\u016F: %1 z %2";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Ov\u011B\u0159ov\u00E1n\u00ED integrity dat";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Odes\u00EDl\u00E1n\u00ED dat";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "P\u0159\u00EDprava dat offline";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "Hodnota zadan\u00E1 do pole '%2' aplika\u010Dn\u00ED komponenty '%3' neodpov\u00EDd\u00E1 \u017E\u00E1dn\u00E9 hodnot\u011B omezen\u00E9ho seznamu pro v\u00FDb\u011Br '%1'.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "Specializovan\u00E1 metoda '%1' nen\u00ED v re\u017Eimu offline podporov\u00E1na.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
