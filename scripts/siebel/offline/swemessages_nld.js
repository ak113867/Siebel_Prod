// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Synchroniseren mislukt. Controleer de netwerkverbinding.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Downloaden offline-pakket mislukt. Controleer de internetverbinding, maak de cache leeg en probeer het opnieuw.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Synchroniseer de records die offline zijn gemaakt met de server voordat u naar de online-modus gaat.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Maak verbinding met internet om online te gaan.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Databases worden niet ondersteund in deze browser.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Voer een waarde in voor %1. Dit is een verplicht veld.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Ophalen offline-pakket van server mislukt. Controleer de configuratie-instellingen voor offline-repository.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Ophalen metagegevens van server mislukt. Controleer of de juiste metagegevens zijn geconfigureerd op de server.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Deze bewerking wordt momenteel niet ondersteund in offline-modus.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Fout bij lezen van de streepjescode. Geen gegevens vastgelegd.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Synchroniseren mislukt. Controleer of de server beschikbaar is en probeer het opnieuw.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synchronisatie voltooid. Neem contact op met de beheerder om de logbestanden te controleren.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Inlogsessie verlopen. Sluit de sessie af, start de browser opnieuw op en log opnieuw in om te synchroniseren.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Het Siebel-repositorybestand is gewijzigd op de server nadat de laatste synchronisatie is uitgevoerd. Er wordt een volledige download uitgevoerd.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "De gebruikersautorisaties zijn gewijzigd. Er wordt een volledige download uitgevoerd.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "De huidige gegevens zijn verouderd. Er wordt een volledige download uitgevoerd.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Ongeldige reactie van server ontvangen voor aanvraag: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Downloaden cache van toepassing mislukt.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "U bent niet gemachtigd om deze synchronisatie uit te voeren.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "De remote node is gewijzigd. Er wordt een volledige download uitgevoerd.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "De gebruikerspositie is gewijzigd. Er wordt een volledige download uitgevoerd.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Onvoldoende geheugen. Modus bij verbroken verbinding wordt niet ondersteund.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Voor indiening moeten de details van ten minste \u00E9\u00E9n product worden opgegeven.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Kan geen handtekening vastleggen als de datum van de oproep na vandaag valt.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "U mag geen handtekening vastleggen voor een oproep waarvan u geen eigenaar bent.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Prioriteitswaarden voor productgegevens moeten uniek zijn en in oplopende volgorde staan. Controleer de prioriteitswaarden.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 is een verplicht veld. Geef een passende waarde op.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Indienen bezoek aan %1 niet mogelijk. Referentienummer monster is verplicht als monsters worden afgeleverd.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Indienen bezoek bij %1 niet mogelijk. Voor het indienen van dit bezoek is een geschreven of elektronische handtekening vereist.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Deze monstertransactie kan niet worden ingediend op basis van een afgestemde periode. Wijzig de transactiedatum zodanig dat deze in een niet-afgestemde of actieve periode valt.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Voor dit type relatie kan geen handtekening worden vastgelegd.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Wijzig de waarde van het aantal. Slechts %2 van %1 monsters toegestaan per gesprek.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Wijzig de waarde voor Hoeveelheid. Monster maken voor %1 niet mogelijk, aangezien het de beschikbare hoeveelheid overschrijdt - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Monster maken voor beroepskracht niet toegestaan. Verwijder monsters voordat u verder gaat.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 is een verplicht veld.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Het licentienummer voor deze relatie is vervallen.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "Het DEA-nummer voor dit adres is ongeldig. Voer een geldig nummer in.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 van het adres van de relatie is een verplicht veld.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "Het DEA-nummer voor het adres van deze relatie is verlopen. Werk het DEA-nummer voor het geselecteerde adres bij. ";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Selecteer een ander partijnummer. Het partijnummer: '%1' geselecteerd voor monster: '%2' nadert vervaldatum.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Voor het vastleggen van de handtekening zijn de velden Achternaam, Voornaam, Titel en Adres van de relatie vereist.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "U moet ten minste \u00E9\u00E9n monster afleveren of aanvragen om een handtekening vast te leggen.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Controleer validatieresultaten om door te gaan met correctieve actie.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Het licentienummer voor deze relatie is niet actief.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "%1 is een verplicht veld. Voer een waarde in voor het veld.\n(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "De waarde die u in veld '%1' hebt opgegeven, is te lang voor in een met UTF-8 gecodeerde Enterprise-database. Geef een kortere waarde op.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Selecteer een relatie of een account om het gesprek te maken maar niet beide.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "U heeft geen toestemming voor het nemen van een monster. Neem contact op met de toelatingsgroep voor monsters.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Controle van validatieregel is geslaagd";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "De validatieregel is genegeerd, omdat deze niet van toepassing is op het huidige gesprek";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Monster %2 partijnummer %1 is vervallen. Verwijder dit item en selecteer een monster met een geldig partijnummer";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' is vereist voor monster '%2'";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Waarde te lang voor veld %1 (maximumomvang %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "De gespecialiseerde methode '%1' wordt niet ondersteund voor dit bedrijfsonderdeel.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Deze bewerking is niet beschikbaar voor alleen-lezen veld %1.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Ongeldige bewerking indien updatemodus niet actief is.\n\nGa verder of vraag de systeembeheerder de applicatieconfiguratie te controleren als het probleem zich blijft voordoen.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Ongeldige bewerking indien niet uitgevoerd.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "In dit scherm of deze applet kunt u geen records bijwerken.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Er wordt al een transactie uitgevoerd.(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Veld %1 is niet geactiveerd in bedrijfsonderdeel %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Het ingevoerde wachtwoord is ongeldig. Probeer het opnieuw.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "De record kan niet worden gewijzigd op deze pagina. Waarschijnlijk is dit omdat u de knoppen Vorige en Volgende in de browser hebt gebruikt om op deze pagina te komen. Gebruik de knoppen Bewerken/Nieuw in de toepassing als u records wilt wijzigen.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "Waarde '%1' voor veld '%2' moet '%3' zijn.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Tekst fout: ongeldige serviceaanvraag. Er is een geldige serviceaanvraag nodig om een order te genereren.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Basisvoorraad kan niet worden gecontroleerd omdat er geen werknemer is gevonden.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Ongeldige startdatum van factuur.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Ongeldig schema van factuur.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Ongeldige timing van factuur.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Basisvoorraadlocatie niet gevonden voor de activiteiteigenaar.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "Waarde voor argument %2 vereist voor methode %1.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Er bestaat al een record die dezelfde waarden bevat als de record die u hebt gemaakt.\n\nZorg ervoor dat de veldwaarden uniek zijn als u een nieuwe record wilt opgeven.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Er is een fout opgetreden bij het uitvoeren/terugdraaien van een databasetransactie.(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Verwijder het monsterregelartikel voor product %1. U mag geen monsters nemen of aanvragen indienen voor product %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Offline gaan";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "Online gaan";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Offline verder werken";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Uploaden en online gaan";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Sync. en offline blijven";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Uploaden en offline blijven";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Vastleggen";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "BusObj-filters zijn gewijzigd. Er wordt een volledige download uitgevoerd.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "BusComp-filters zijn gewijzigd. Er wordt een volledige download uitgevoerd.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Reactie op de presentatiedetails is vereist om een gesprek in te dienen. Geef een geldige waarde op.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Voeg relatie toe.(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Geef een Achternaam relatie of een Achternaam prospect op. Een van beide velden moet worden ingevuld.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Bezig met voorbereiden voor offline gebruik";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1 van %2 bestanden gedownload";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Gegevens worden gesynchroniseerd.";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Applicatieconfiguratie wordt gedownload.";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Gegevens worden gedownload.";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Applicatieconfiguratie wordt opgeslagen.";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Gegevens worden opgeslagen.";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1 van %2 objecten geladen";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Gegevensintegriteit wordt gevalideerd.";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Gegevens worden geladen.";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Offline gegevens worden voorbereid.";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "De waarde die is ingevoerd in veld '%2' van bedrijfsonderdeel '%3' komt niet overeen met een waarde in de afgebakende keuzelijst '%1'.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "De gespecialiseerde methode '%1' wordt niet ondersteund in offlinemodus.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
