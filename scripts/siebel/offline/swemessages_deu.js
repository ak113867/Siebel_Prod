// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Synchronisierung kann nicht durchgef\u00FChrt werden. Pr\u00FCfen Sie Ihre Netzwerkverbindung.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Offlinepaket kann nicht heruntergeladen werden. Pr\u00FCfen Sie Ihre Internetverbindung, leeren Sie den Cache, und versuchen Sie es erneut.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Synchronisieren Sie auf dem Server offline erstellte Datens\u00E4tze, bevor Sie zum Onlinemodus wechseln.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Stellen Sie eine Internetverbindung her, um online zu gehen.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Datenbanken werden in diesem Browser nicht unterst\u00FCtzt.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Sie m\u00FCssen einen Wert f\u00FCr %1 eingeben.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Offlinepaket kann nicht von Server abgerufen werden. Pr\u00FCfen Sie die Offlinekonfiguration des Repositorys.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Metadaten k\u00F6nnen nicht von Server abgerufen werden. Pr\u00FCfen Sie, ob die entsprechenden Metadaten auf dem Server konfiguriert sind.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Dieser Vorgang wird derzeit nicht im Offlinemodus unterst\u00FCtzt.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Fehler beim Lesen des Barcodes. Die Daten wurden nicht erfasst.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Synchronisierung kann nicht durchgef\u00FChrt werden. Pr\u00FCfen Sie die Serververf\u00FCgbarkeit, und versuchen Sie es erneut.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synchronisierung erfolgreich. Wenden Sie sich zum Pr\u00FCfen der Logs an den Administrator.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Anmeldesession abgelaufen. Schlie\u00DFen Sie den Browser, starten Sie ihn neu, und melden Sie sich zum Synchronisieren erneut an.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Die Siebel-Repository-Datei wurde seit der letzten Synchronisierung auf dem Server ge\u00E4ndert. Es wird ein vollst\u00E4ndiger Download durchgef\u00FChrt.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Ihre Benutzerverantwortlichkeiten haben sich ge\u00E4ndert. Es wird ein vollst\u00E4ndiger Download durchgef\u00FChrt.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Die aktuellen Daten sind veraltet. Es wird ein vollst\u00E4ndiger Download durchgef\u00FChrt.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Ung\u00FCltige Serverantwort f\u00FCr Anforderung erhalten: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Der Anwendungscachedownload war nicht erfolgreich.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Sie sind nicht autorisiert, diese Synchronisierung durchzuf\u00FChren.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Der Remoteknoten hat sich ge\u00E4ndert. Es wird ein vollst\u00E4ndiger Download durchgef\u00FChrt.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Ihre Benutzerposition sich ge\u00E4ndert. Es wird ein vollst\u00E4ndiger Download durchgef\u00FChrt.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Unzureichender Speicher. Getrennter Modus wird nicht unterst\u00FCtzt.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Vor der \u00DCbermittlung muss mindestens ein Produkt festgelegt werden.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Es ist nicht m\u00F6glich, eine Signatur zu erfassen, wenn das Besuschsdatum sp\u00E4ter als heute ist.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Es ist nicht m\u00F6glich, die Signatur von Anrufen zu erfassen, deren Besitzer Sie nicht sind.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Priorit\u00E4tswerte f\u00FCr Produktbesprechungen m\u00FCssen eindeutig und sequenziell sein. Pr\u00FCfen Sie die Produktpriorit\u00E4ten, um sicherzustellen, dass sie diese Anforderungen erf\u00FCllen.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 ist ein erforderliches Feld. Geben Sie einen entsprechenden Wert ein.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Besuch bei %1 kann nicht weitergeleitet werden. Musterverweisnummer ist erforderlich, wenn Muster abgegeben werden.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Dieser Besuch bei %1 kann nicht weitergeleitet werden. F\u00FCr die Weiterleitung ist eine Unterschrift auf Papier oder eine elektronische Signatur erforderlich.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Diese Mustertransaktion kann nicht in einen bereits abgestimmten Zeitraum weitergeleitet werden. \u00C4ndern Sie das Transaktionsdatum, sodass es in einen noch nicht abgestimmten oder in einen aktiven Zeitraum f\u00E4llt.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "F\u00FCr diesen Kontakttyp kann keine Signatur erfasst werden.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "\u00C4ndern Sie den Mengenwert. Pro Besuch ist eine Musterabgabe nur f\u00FCr %2 von %1 zul\u00E4ssig.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "\u00C4ndern Sie den Mengenwert. Sie k\u00F6nnen nicht %1 Muster abgeben, da dies die verf\u00FCgbare Menge \u00FCberschreitet - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "F\u00FCr eine Person ist keine Musterabgabe m\u00F6glich. Entfernen Sie die Muster, bevor Sie den Besuch weiterleiten.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 ist ein obligatorisches Feld.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Die Lizenznummer dieser Person ist abgelaufen.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "Die DEA-Nummer in dieser Adresse ist ung\u00FCltig. Geben Sie eine g\u00FCltige Nummer ein.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 in der Adresse dieses Kontakts muss angegeben werden.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "Die DEA-Nummer f\u00FCr die Adresse dieser Person ist abgelaufen. Aktualisieren Sie die DEA-Nummer f\u00FCr die ausgew\u00E4hlte Adresse.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "W\u00E4hlen Sie eine andere Chargennummer aus. Die f\u00FCr Muster '%2'  ausgew\u00E4hlte Chargennummer '%1' l\u00E4uft in K\u00FCrze ab.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "F\u00FCr die Erfassung einer Signatur sind der Vor- und Nachname sowie der Titel und die Adresse der Person erforderlich.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Mindestens ein Muster muss abgegeben oder angefordert werden, um eine Signatur erfassen zu k\u00F6nnen.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "\u00DCberpr\u00FCfen Sie zum Fortfahren die Validierungsergebnisse f\u00FCr die Korrekturma\u00DFnahme.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Die Lizenznummer f\u00FCr diese Person ist nicht aktiv.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' ist ein obligatorisches Feld.  Geben Sie einen Wert f\u00FCr das Feld ein.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "Ihr Eintrag im Feld '%1' ist zu lang f\u00FCr eine UTF-8-verschl\u00FCsselte Enterprise-Datenbank.  Versuchen Sie es bitte noch einmal mit einem k\u00FCrzeren Eintrag.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Sie m\u00FCssen entweder eine Person oder eine Firma w\u00E4hlen, um den Besuch zu erstellen. Es ist nicht beides m\u00F6glich.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Musterabgabe nicht zul\u00E4ssig. Kontaktieren Sie die zust\u00E4ndige Compliance-Gruppe.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Die Pr\u00FCfung der Validierungsregel war erfolgreich";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Die Validierungsregel wurde ignoriert, da sie f\u00FCr den aktuellen Besuch nicht anwendbar ist";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Muster %2 Chargennummer %1 ist abgelaufen. Entfernen Sie die Position, und w\u00E4hlen Sie ein Muster mit einer g\u00FCltigen Chargennummer aus";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' ist f\u00FCr das Beispiel '%2' erforderlich";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Wert ist zu lang f\u00FCr Feld '%1' (maximale Gr\u00F6\u00DFe %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "Die spezialisierte Methode '%1' wird in dieser Business Component nicht unterst\u00FCtzt.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Diese Operation ist f\u00FCr das schreibgesch\u00FCtzte Feld '%1' nicht verf\u00FCgbar.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Ung\u00FCltige Operation au\u00DFerhalb des Aktualisierungsmodus.\n\nFahren Sie fort, oder bitten Sie Ihren Systemadministrator, Ihre Anwendungskonfiguration zu \u00FCberpr\u00FCfen, falls das Problem weiterhin besteht.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Ung\u00FCltige Operation, wenn die Ausf\u00FChrung nicht erfolgt ist.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "In diesem Fenster oder Applet kann dieser Datensatz nicht aktualisiert werden.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Es wird bereits eine Transaktion ausgef\u00FChrt(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Feld %1 ist nicht in Business Component %2 aktiviert.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Das von Ihnen eingegebene aktuelle Kennwort ist nicht korrekt. Geben Sie es erneut ein.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Sie k\u00F6nnen den Datensatz auf dieser Seite nicht \u00E4ndern. Das liegt m\u00F6glicherweise daran, dass Sie die Schaltfl\u00E4chen Vorw\u00E4rts und Zur\u00FCck des Browsers verwendet haben, um auf diese Seite zu gelangen. Verwenden Sie bitte zur \u00C4nderung von Datens\u00E4tzen die Schaltfl\u00E4chen Bearbeiten/Neu in der Anwendung.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "Der Wert '%1' f\u00FCr Feld '%2' muss '%3' sein.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Fehlertext: Ung\u00FCltige Serviceanfrage. Zum Generieren eines Auftrags ist eine g\u00FCltige Serviceanfrage erforderlich.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Fahrzeugbestandspr\u00FCfung kann nicht ausgef\u00FChrt werden, da kein Mitarbeiter gefunden wurde.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Ung\u00FCltiges Rechnungsstartdatum.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Ung\u00FCltiger Rechnungsplan.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Ung\u00FCltiges Rechnungs-Timing.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Fahrzeugbestand f\u00FCr Besitzer der Aktivit\u00E4t nicht gefunden.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "F\u00FCr Methode %1 ist ein Wert f\u00FCr Argument %2 erforderlich.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Es ist bereits ein Datensatz vorhanden, der dieselben Werte enth\u00E4lt wie der von Ihnen erstellte Datensatz.\n\nWenn Sie einen neuen Datensatz eingeben m\u00F6chten, stellen Sie sicher, dass die Feldwerte eindeutig sind.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Fehler beim Speichern/R\u00FCckg\u00E4ngig machen einer Datenbanktransaktion(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Entfernen Sie die Musterposition f\u00FCr Produkt %1. Sie sind zur Musterabgabe oder zur Anforderung von Produkt %1 nicht berechtigt.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Offline gehen";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "Online gehen";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Weiter offline arbeiten";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Hochladen und online gehen";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Synchronisieren und offline bleiben";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Nur hochladen und offline bleiben";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Log";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Gesch\u00E4ftsobjektfilter haben sich ge\u00E4ndert. Es wird ein vollst\u00E4ndiger Download durchgef\u00FChrt.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Gesch\u00E4ftskomponentenfilter haben sich ge\u00E4ndert. Es wird ein vollst\u00E4ndiger Download durchgef\u00FChrt.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Antwort auf Pr\u00E4sentationsdetails ist erforderlich, um den Besuch weiterzuleiten. Geben Sie einen entsprechenden Wert ein.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "F\u00FCgen Sie eine Person hinzu(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Geben Sie entweder den Nachnamen einer Person oder den Nachnamen eines Interessenten an. Beide Felder d\u00FCrfen nicht leer sein.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Wird f\u00FCr Offlineverwendung vorbereitet";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 von %2 Dateien heruntergeladen";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Daten werden synchronisiert";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Anwendungskonfiguration wird heruntergeladen";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Daten werden heruntergeladen";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Anwendungskonfiguration wird gespeichert";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Daten werden gespeichert";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 von %2 Objekten geladen";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Datenintegrit\u00E4t wird validiert";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Daten werden hochgeladen";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Offlinedaten werden vorbereitet";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "Der im Feld '%2' von Buscomp '%3' eingegebene Wert stimmt mit keinem Wert in der beschr\u00E4nkten Auswahlliste '%1' \u00FCberein(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "Die spezialisierte Methode '%1' wird im Offlinemodus nicht unterst\u00FCtzt.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
