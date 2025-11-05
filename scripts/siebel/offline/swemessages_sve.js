// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Kunde inte synkronisera. Kontrollera din n\u00E4tverksanslutning.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Kunde inte ladda ned offlinepaketet. Kontrollera din internetanslutning, t\u00F6m cacheminnet och f\u00F6rs\u00F6k igen.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Synkronisera poster som skapats offline till servern innan du g\u00E5r till onlinel\u00E4get.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Anslut till Internet om du vill g\u00E5 online.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Databaser st\u00F6ds inte i den h\u00E4r webbl\u00E4saren.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Ange ett v\u00E4rde f\u00F6r %1 (obligatoriskt).(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Kunde inte h\u00E4mta offlinepaketet fr\u00E5n servern. Verifiera konfigurationen f\u00F6r offlinedatalagret.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Kunde inte h\u00E4mta metadata fr\u00E5n servern. Kontrollera att r\u00E4tt metadata har konfigurerats p\u00E5 servern.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "\u00C5tg\u00E4rden st\u00F6ds f\u00F6r n\u00E4rvarande inte i offlinel\u00E4ge.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Fel vid inl\u00E4sning av streckkod. Data f\u00E5ngades inte.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Kunde inte synkronisera. Bekr\u00E4fta servertillg\u00E4nglighet och f\u00F6rs\u00F6k igen.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synkroniseringen har utf\u00F6rts. Kontakta administrat\u00F6ren om du vill verifiera loggarna.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Inloggningssessionen har upph\u00F6rt. St\u00E4ng, starta om webbl\u00E4saren och logga in igen om du vill synkronisera.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Siebel-datalagerfilen har \u00E4ndrats p\u00E5 servern efter din senaste synkronisering. En fullst\u00E4ndig nedladdning utf\u00F6rs.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Dina anv\u00E4ndarbeh\u00F6righeter har \u00E4ndrats. En fullst\u00E4ndig nedladdning utf\u00F6rs.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Nuvarande data \u00E4r inaktuella. En fullst\u00E4ndig nedladdning utf\u00F6rs.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Fick ett ogiltigt serversvar f\u00F6r beg\u00E4ran: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Kunde inte ladda ned applikationscacheminnet.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Du har inte beh\u00F6righet att utf\u00F6ra den h\u00E4r synkroniseringen.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Fj\u00E4rrnoden har \u00E4ndrats. En fullst\u00E4ndig nedladdning utf\u00F6rs.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Din anv\u00E4ndarposition har \u00E4ndrats. En fullst\u00E4ndig nedladdning utf\u00F6rs.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Inte tillr\u00E4ckligt med minne. St\u00F6der inte fr\u00E5nkopplat l\u00E4ge.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Minst en produkt m\u00E5ste anges innan du skickar.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Kan inte g\u00F6ra en signaturframst\u00E4llning om samtalsdatumet \u00E4r senare \u00E4n i dag.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Du f\u00E5r inte g\u00F6ra en signaturframst\u00E4llning f\u00F6r ett samtal som du inte \u00E4ger.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Prioritetsv\u00E4rdena f\u00F6r de intressanta produkterna m\u00E5ste vara unika och i l\u00F6pande nummerordning. Kontrollera att dina prioritetsv\u00E4rden f\u00F6r produkterna inte bryter mot detta krav.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 \u00E4r ett obligatoriskt f\u00E4lt. Ange ett l\u00E4mpligt v\u00E4rde.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Kan inte skicka bes\u00F6ket till %1. Ett referensnummer f\u00F6r varuprov kr\u00E4vs om varuprov levereras.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Samtalet kan inte skickas till %1. En skriftlig eller elektronisk signatur kr\u00E4vs f\u00F6r att samtalet ska kunna skickas.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Kan inte skicka den h\u00E4r varuprovstransaktionen mot en avst\u00E4md period. \u00C4ndra transaktionsdatum s\u00E5 att det faller inom en aktiv eller inte avst\u00E4md period.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Du kan inte f\u00E5nga en signatur f\u00F6r den h\u00E4r typen av kontakt.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "\u00C4ndra kvantitetsv\u00E4rdet. Du f\u00E5r endast ge prover till %2 av %1 per samtal.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "\u00C4ndra kvantitetsv\u00E4rde. Du f\u00E5r inte ge bort %1 eftersom det \u00F6verstiger tillg\u00E4nglig kvantitet - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Yrkesverksam kan inte anges. Ta bort varuprov innan du skickar samtalet. ";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 \u00E4r ett obligatoriskt f\u00E4lt.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Kontaktens licensnummer har g\u00E5tt ut.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "DEA-numret f\u00F6r adressen \u00E4r ogiltigt. Ange ett giltigt nummer.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 vid kontaktens adress \u00E4r ett obligatoriskt f\u00E4lt.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "DEA-numret f\u00F6r kontaktadressen har g\u00E5tt ut. Uppdatera DEA-numret f\u00F6r den valda adressen.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "V\u00E4lj ett annat partinr. Parti nr %1 som har valts ut f\u00F6r varuprov %2 n\u00E4rmar sig utg\u00E5ngsdatum.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "F\u00E4lten f\u00F6r kontaktens efternamn, f\u00F6rnamn, befattning och adress m\u00E5ste fyllas i n\u00E4r du ska g\u00F6ra en signaturframst\u00E4llning.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Minst ett varuprov m\u00E5ste levereras eller best\u00E4llas f\u00F6r att det ska g\u00E5 att g\u00F6ra en signaturframst\u00E4llning.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Kontrollera valideringsresultat f\u00F6r att korrigering ska forts\u00E4tta.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Licensnumret f\u00F6r den h\u00E4r kontakten \u00E4r inte aktivt.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' \u00E4r ett obligatoriskt f\u00E4lt.  Ange ett v\u00E4rde f\u00F6r f\u00E4ltet.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "Din post f\u00F6r f\u00E4ltet '%1' \u00E4r f\u00F6r l\u00E5ng f\u00F6r att passa in i en UTF-8-kodad f\u00F6retagsmilj\u00F6databas. F\u00F6rs\u00F6k igen med en kortare post.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Du m\u00E5ste v\u00E4lja Kontakt eller Konto om du vill skapa samtalet, men inte b\u00E5da.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Du f\u00E5r inte ge bort prover. Kontakta gruppen f\u00F6r varuprovsefterlevnad.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Valideringsregelkontrollen utf\u00F6rdes";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Valideringsregeln ignorerades eftersom den inte g\u00E4ller f\u00F6r nuvarande samtal";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Varuprov %2, partinr %1 har g\u00E5tt ut. Ta bort denna artikel och v\u00E4lj ett varuprov med giltigt partinr";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' kr\u00E4vs f\u00F6r varuprov '%2'";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "V\u00E4rdet \u00E4r f\u00F6r l\u00E5ngt f\u00F6r f\u00E4lt '%1' (maximal storlek %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "Den specialiserade metoden '%1' st\u00F6ds inte i aff\u00E4rskomponenten.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Den h\u00E4r \u00E5tg\u00E4rden \u00E4r inte tillg\u00E4nglig f\u00F6r det skrivskyddade f\u00E4ltet '%1'.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Ogiltig \u00E5tg\u00E4rd (m\u00E5ste utf\u00F6ras i uppdateringsl\u00E4ge).\n\nForts\u00E4tt eller be systemadministrat\u00F6ren att kontrollera applikationskonfigurationen om problemet kvarst\u00E5r.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Ogiltig \u00E5tg\u00E4rd n\u00E4r den inte k\u00F6rs.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "Kan inte uppdatera denna post i detta f\u00F6nster eller applet.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "En transaktion p\u00E5g\u00E5r redan(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "F\u00E4ltet %1 \u00E4r inte aktiverat i aff\u00E4rskomponenten %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Det nuvarande l\u00F6senordet som du angav \u00E4r felaktigt. Skriv det igen.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Du kan inte \u00E4ndra posten p\u00E5 denna sida. Detta beror antagligen p\u00E5 att du anv\u00E4nde knapparna Bak\u00E5t och Fram\u00E5t i webbl\u00E4saren f\u00F6r att komma till sidan. Anv\u00E4nd knapparna Redigera/Ny i applikationen om du vill \u00E4ndra poster.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "V\u00E4rde '%1' f\u00F6r f\u00E4lt '%2' m\u00E5ste vara '%3'.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Feltext: Ogiltigt service\u00E4rende. Du m\u00E5ste ange ett giltigt service\u00E4rende om du vill generera en order.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Kan inte kontrollera servicev\u00E4skan eftersom ingen anst\u00E4lld hittas.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Ogiltigt startdatum f\u00F6r faktura.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Ogiltig fakturaplan.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Ogiltig tidpunkt f\u00F6r faktura.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Hittar inte lager i servicebil f\u00F6r aktivitetens \u00E4gare.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "Metod %1 kr\u00E4ver ett v\u00E4rde p\u00E5 argument %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Det finns redan en post med v\u00E4rden som \u00E4r identiska med posten som du har skapat.\n\nOm du vill ange en ny post m\u00E5ste du se till att f\u00E4ltv\u00E4rdena \u00E4r unika.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Ett fel uppstod vid f\u00F6rs\u00F6ket att spara/\u00E5terst\u00E4lla en databastransaktion(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Ta bort varuprovsposten f\u00F6r produkten %1. Du f\u00E5r inte ge bort eller skicka beg\u00E4ran om produkten %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "G\u00E5 offline";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "G\u00E5 online";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Forts\u00E4tt arbeta offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Ladda upp och g\u00E5 online";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Synkronisera och forts\u00E4tt vara offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Ladda endast upp och forts\u00E4tt vara offline";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Logg";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Aff\u00E4rsobjektfilter har \u00E4ndrats. En fullst\u00E4ndig nedladdning utf\u00F6rs.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Aff\u00E4rskomponentfilter har \u00E4ndrats. En fullst\u00E4ndig nedladdning utf\u00F6rs.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Svar f\u00F6r presentationsdetaljer m\u00E5ste anges f\u00F6r att samtalet ska skickas. Ange ett l\u00E4mpligt v\u00E4rde.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "L\u00E4gg till kontakt(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Ange antingen ett efternamn f\u00F6r kontakt eller ett efternamn f\u00F6r prospekt. Du f\u00E5r inte l\u00E5ta b\u00E5da f\u00E4lten vara tomma.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "F\u00F6rbereder f\u00F6r offlineanv\u00E4ndning";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 av %2 filer har laddats ned";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Synkroniserar data";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Laddar ned applikationskonfiguration";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Laddar ned data";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Sparar applikationskonfiguration";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Sparar data";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 av %2 objekt har laddats";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Validerar dataintegritet";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Laddar upp data";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "F\u00F6rbereder offlinedata";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "V\u00E4rdet som har angetts i f\u00E4ltet %2 i aff\u00E4rskomponenten %3 matchar inte n\u00E5got v\u00E4rde i den bundna urvalslistan %1(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "Den specialiserade metoden '%1' st\u00F6ds inte offline.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
