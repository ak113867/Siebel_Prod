// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Synkronointi ei onnistu. Tarkista verkkoyhteys.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Offline-paketin lataus ep\u00E4onnistui. Tarkista Internet-yhteys, tyhjenn\u00E4 v\u00E4limuisti ja yrit\u00E4 uudelleen.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Synkronoi offline-tilassa luodut tietueet ennen online-tilaan siirtymist\u00E4.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Muodosta Internet-yhteys, kun haluat siirty\u00E4 online-tilaan.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Tietokantoja ei tueta t\u00E4ss\u00E4 selaimessa.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Sy\u00F6t\u00E4 arvo kohteelle %1. T\u00E4m\u00E4 on pakollinen.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Offline-paketin haku palvelimelta ep\u00E4onnistui. Tarkista offline-tietovaraston kokoonpano.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Metatietojen haku palvelimelta ep\u00E4onnistui. Varmista, ett\u00E4 palvelimelle on m\u00E4\u00E4ritetty oikeat metatiedot.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "T\u00E4t\u00E4 toimintoa ei tueta t\u00E4ll\u00E4 hetkell\u00E4 offline-tilassa.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Virhe luettaessa viivakoodia. Tietoja ei saatu.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Synkronointi ei onnistu. Varmista, ett\u00E4 palvelin on k\u00E4ytett\u00E4viss\u00E4, ja yrit\u00E4 uudelleen.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synkronointi onnistui. Ota yhteys j\u00E4rjestelm\u00E4nvalvojaan ja tarkista lokit.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Kirjautumisistunto vanhentui. Sulje selain, k\u00E4ynnist\u00E4 se uudelleen ja kirjaudu uudelleen synkronointia varten.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Palvelimen Siebel-tietovarastotiedostoa on muutettu edellisen synkronoinnin j\u00E4lkeen. Suoritetaan t\u00E4ysi lataus.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "K\u00E4ytt\u00E4j\u00E4n vastuualueitasi on muutettu. Suoritetaan t\u00E4ysi lataus.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Nykyiset tiedot ovat vanhentuneita. Suoritetaan t\u00E4ysi lataus.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Pyynn\u00F6lle %1 vastaanotettiin virheellinen palvelimen vastaus.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Sovelluksen v\u00E4limuistin lataus ep\u00E4onnistui.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "Sinulla ei ole t\u00E4m\u00E4n synkronoinnin suoritusoikeutta.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "Et\u00E4solmua on muutettu. Suoritetaan t\u00E4ysi lataus.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Asemaasi on muutettu. Suoritetaan t\u00E4ysi lataus.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Muisti ei riit\u00E4. Yhteyden katkaisun tilaa ei tueta.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "V\u00E4hint\u00E4\u00E4n yksi tuote on eritelt\u00E4v\u00E4 ennen l\u00E4hetyst\u00E4.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Allekirjoituksen poiminta ei onnistu, jos puhelun p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4 on my\u00F6hempi kuin kuluva p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Et voi poimia allekirjoitusta puhelusta, jota et omista.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Eriteltyjen tuotteiden prioriteettiarvojen on oltava yksil\u00F6llisi\u00E4 ja per\u00E4kk\u00E4isess\u00E4 j\u00E4rjestyksess\u00E4. Tarkista tuote-erittelyn prioriteettiarvot varmistaaksesi, ett\u00E4 ne ovat t\u00E4m\u00E4n vaatimuksen mukaisia.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 on pakollinen kentt\u00E4. Sy\u00F6t\u00E4 sopiva arvo.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "K\u00E4ynnin l\u00E4hetys kohteeseen %1 ei onnistu. N\u00E4ytteen viitenumero on pakollinen toimitettaessa n\u00E4ytteit\u00E4.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "T\u00E4m\u00E4n puhelun l\u00E4hetys kohteeseen %1 ei onnistu. Paperilla oleva tai s\u00E4hk\u00F6inen allekirjoitus on pakollinen t\u00E4m\u00E4n puhelun l\u00E4hett\u00E4miseksi.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "T\u00E4t\u00E4 n\u00E4ytetapahtumaa ei voi l\u00E4hett\u00E4\u00E4 t\u00E4sm\u00E4ytetyn kauden vastaisesti. Muuta tapahtuman p\u00E4iv\u00E4m\u00E4\u00E4r\u00E4\u00E4 niin, ett\u00E4 se sijoittuu t\u00E4sm\u00E4ytt\u00E4m\u00E4tt\u00F6m\u00E4\u00E4n tai aktiiviseen kauteen.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "T\u00E4m\u00E4n tyyppisen yhteyshenkil\u00F6n allekirjoituksen poiminta ei onnistu.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Muuta m\u00E4\u00E4r\u00E4n arvoa. N\u00E4ytteenoton enimm\u00E4ism\u00E4\u00E4r\u00E4 kokonaism\u00E4\u00E4r\u00E4st\u00E4 %1 on %2 per puhelu.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Muuta m\u00E4\u00E4r\u00E4n arvoa. Et voi ottaa n\u00E4ytett\u00E4 k\u00E4ytt\u00E4en m\u00E4\u00E4r\u00E4\u00E4 %1, koska se ylitt\u00E4\u00E4 k\u00E4ytett\u00E4viss\u00E4 olevan m\u00E4\u00E4r\u00E4n - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Ammattilaisesta ei voi ottaa n\u00E4ytett\u00E4. Poista n\u00E4ytteet ennen puhelua.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 on pakollinen kentt\u00E4.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "T\u00E4m\u00E4n yhteyshenkil\u00F6n lisenssinumero on vanhentunut.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "T\u00E4m\u00E4n osoitteen SV-numero ei kelpaa. Sy\u00F6t\u00E4 oikea numero.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 t\u00E4m\u00E4n yhteyshenkil\u00F6n osoitteessa on pakollinen kentt\u00E4.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "T\u00E4m\u00E4n yhteyshenkil\u00F6n osoitteen SV-numero on vanhentunut. P\u00E4ivit\u00E4 valitun osoitteen SV-numero.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Valitse toinen er\u00E4numero. Er\u00E4 '%1' valittiin n\u00E4ytett\u00E4 varten: '%2' vanhenee kohta.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Yhteyshenkil\u00F6n sukunimi-, etunimi-, teht\u00E4v\u00E4nimike- ja osoitekent\u00E4t ovat pakollisia allekirjoituksen poimimiseksi.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Ainakin yksi n\u00E4yte on pudotettava tai pyydett\u00E4v\u00E4 allekirjoituksen poimimiseksi.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Tarkista tarkistustulokset korjaustoimen m\u00E4\u00E4ritt\u00E4miseksi ja jatka.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "T\u00E4m\u00E4n yhteyshenkil\u00F6n lisenssinumero ei ole aktiivinen.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' on pakollinen kentt\u00E4. Sy\u00F6t\u00E4 kentt\u00E4\u00E4n arvo.(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "Kirjoitit kentt\u00E4\u00E4n '%1' liian pitk\u00E4n sy\u00F6tteen, jotta se mahtuisi UTF-8-koodattuun yritystietokantaan. Kirjoita lyhyempi sy\u00F6te ja yrit\u00E4 uudelleen.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Puhelun luomista varten on valittava joko yhteyshenkil\u00F6 tai asiakas, mutta ei molempia.(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "Sinulla ei ole n\u00E4ytteenotto-oikeuksia. Ota yhteytt\u00E4 n\u00E4ytteiden vaatimustennoudattamisryhm\u00E4\u00E4n.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Tarkistuss\u00E4\u00E4nn\u00F6n tarkistus onnistui";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Tarkistuss\u00E4\u00E4nt\u00F6 ohitettiin, koska sit\u00E4 ei voi k\u00E4ytt\u00E4\u00E4 nykyisess\u00E4 puhelussa";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Er\u00E4n %1 n\u00E4yte %2 on vanhentunut. Poista t\u00E4m\u00E4 nimike ja valitse n\u00E4yte, jonka er\u00E4numero on sallittu";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "'%1' vaaditaan n\u00E4ytteelle '%2'";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Kent\u00E4n '%1' arvo liian pitk\u00E4 (enimm\u00E4iskoko %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "M\u00E4\u00E4ritetty\u00E4 metodia '%1' ei tueta t\u00E4ss\u00E4 liiketoimintakomponentissa.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "T\u00E4m\u00E4 toiminto ei ole k\u00E4ytett\u00E4viss\u00E4 vain luku -kent\u00E4ss\u00E4 '%1'.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Virheellinen toiminto muussa kuin p\u00E4ivitystilassa.\n\nYrit\u00E4 uudelleen tai pyyd\u00E4 j\u00E4rjestelm\u00E4nvalvojaa tarkistamaan sovelluksen kokoonpano, jos ongelma ei ratkea.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Virheellinen toiminto, kun sit\u00E4 ei suoriteta.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "Et voi p\u00E4ivitt\u00E4\u00E4 t\u00E4t\u00E4 tietuetta nyt. Tarkista lomakkeen, liiketoimintakomponentin ja linkin Ei p\u00E4ivityst\u00E4 -ominaisuudet.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Tapahtuma on jo k\u00E4ynniss\u00E4(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Kentt\u00E4\u00E4 %1 ei ole aktivoitu liiketoimintakomponentissa %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Sy\u00F6tt\u00E4m\u00E4si salasana on virheellinen. Yrit\u00E4 uudelleen.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Tietuetta ei voi muokata t\u00E4ll\u00E4 sivulla. T\u00E4m\u00E4 johtuu todenn\u00E4k\u00F6isesti siit\u00E4, ett\u00E4 olet siirtynyt t\u00E4lle sivulle selaimen Edellinen- ja Seuraava-painikkeilla. K\u00E4yt\u00E4 tietueiden muokkaamiseen sovelluksen Muokkaa- ja Uusi-painikkeita.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "Kent\u00E4n %2 arvon %1 on oltava %3.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Virheteksti: Virheellinen palvelupyynt\u00F6. Tilauksen luomiseen tarvitaan sallittu palvelupyynt\u00F6.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Autossa sijaitsevan varaston tarkistaminen ei onnistu, sill\u00E4 ty\u00F6ntekij\u00E4\u00E4 ei l\u00F6ydy.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "Laskun alkamisp\u00E4iv\u00E4m\u00E4\u00E4r\u00E4 ei kelpaa.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "Laskutusaikataulu ei kelpaa.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "Laskun ajoitus ei kelpaa.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Aktiviteetin omistajan autossa sijaitsevaa varastosijaintia ei l\u00F6ydy.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "Menetelm\u00E4 %1 tarvitsee arvon argumentille %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "J\u00E4rjestelm\u00E4ss\u00E4 on jo tietue, joka sis\u00E4lt\u00E4\u00E4 samat arvot kuin luomasi tietue.\n\nJos haluat sy\u00F6tt\u00E4\u00E4 uuden tietueen, varmista kenttien arvojen yksil\u00F6llisyys.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Virhe yritett\u00E4ess\u00E4 vahvistaa/peruuttaa tietokantatapahtuma(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Poista tuotteen %1 n\u00E4yterivinimike. Et voi ottaa n\u00E4ytett\u00E4 tai l\u00E4hett\u00E4\u00E4 pyynt\u00F6\u00E4 tuotteesta %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "Siirry offline-tilaan";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "Siirry online-tilaan";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Jatka ty\u00F6skentely\u00E4 offline-tilassa";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "Lataa ja siirry online-tilaan";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Synkronoi ja pysy offline-tilassa";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Lataa vain ja pysy offline-tilassa";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Loki";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "BusObj-suodattimia on muutettu. Suoritetaan t\u00E4ysi lataus.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "BusComp-suodattimia on muutettu. Suoritetaan t\u00E4ysi lataus.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Soitto edellytt\u00E4\u00E4, ett\u00E4 esityksen tietoihin on vastattu. Sy\u00F6t\u00E4 sopiva arvo.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Lis\u00E4\u00E4 yhteyshenkil\u00F6(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Lis\u00E4\u00E4 joko Yhteyshenkil\u00F6n sukunimi tai Mahdollisen asiakkaan sukunimi. Molemmat kent\u00E4t eiv\u00E4t voi olla tyhji\u00E4.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Valmistellaan offline-k\u00E4ytt\u00F6\u00E4 varten";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "%1/%2 tiedostosta ladattu";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Tietoja synkronoidaan";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Sovelluksen kokoonpanoa ladataan";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Tietoja ladataan";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Sovelluksen kokoonpanoa tallennetaan";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Tietoja tallennetaan";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "%1/%2 kohteesta ladattu";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Tietojen eheytt\u00E4 tarkistetaan";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "Tietoja ladataan";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Offline-tietoja valmistellaan";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "Kentt\u00E4\u00E4n %2 sy\u00F6tetty arvo liiketoimintakomponentissa %3 ei vastaa mit\u00E4\u00E4n rajatun valintaluettelon %1 arvoa.(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "M\u00E4\u00E4ritetty\u00E4 metodia %1 ei tueta offline-tilassa.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
