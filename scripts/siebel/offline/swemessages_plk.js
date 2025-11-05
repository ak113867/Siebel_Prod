// JavaScript File for Facility UIJ
// Automatically produced by siebelrc

var _SWEmsgAryOffline = new Array();
var _SWEbMsgInitOffline = false;

function _SWEgetGlobalMsgAryOffline()
{
   if (! _SWEbMsgInitOffline)
   {
      _SWEbMsgInitOffline = true;
      _SWEmsgAryOffline["IDS_DOUI_ERR_NETWORK_CONN"] = "Nie mo\u017Cna dokona\u0107 synchronizacji. Prosz\u0119 sprawdzi\u0107 stan po\u0142\u0105czenia sieciowego.(SBL-UIJ-00100)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG"] = "Pobieranie pakietu offline nie powiod\u0142o si\u0119. Prosz\u0119 sprawdzi\u0107 stan po\u0142\u0105czenia internetowego, opr\u00F3\u017Cni\u0107 bufor i spr\u00F3bowa\u0107 ponownie.(SBL-UIJ-00101)";
      _SWEmsgAryOffline["IDS_DOUI_UPSYNC_REC"] = "Przed przej\u015Bciem do trybu online prosz\u0119 dokona\u0107 synchronizacji rekord\u00F3w utworzonych w trybie offline z serwerem.(SBL-UIJ-00102)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INTERN_CONN"] = "Aby przej\u015B\u0107 do trybu online, prosz\u0119 po\u0142\u0105czy\u0107 si\u0119 z internetem.(SBL-UIJ-00103)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DB_NO_SUPPORT"] = "Bazy danych nie s\u0105 obs\u0142ugiwane w tej przegl\u0105darce.(SBL-UIJ-00104)";
      _SWEmsgAryOffline["IDS_DOUI_FLD_MANDTY"] = "Prosz\u0119 wprowadzi\u0107 wymagan\u0105 warto\u015B\u0107 dla %1.(SBL-UIJ-00105)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OFFLINE_PKG_SRVR"] = "Pobieranie pakietu offline z serwera nie powiod\u0142o si\u0119. Prosz\u0119 zweryfikowa\u0107 konfiguracj\u0119 zbioru danych offline.(SBL-UIJ-00106)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_METADATA_SRVR"] = "Pobieranie metadanych z serwera nie powiod\u0142o si\u0119. Prosz\u0119 sprawdzi\u0107, czy odpowiednie metadane s\u0105 skonfigurowane na serwerze.(SBL-UIJ-00107)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_OPRN_NOT_SUPPT"] = "Ta operacja nie jest obecnie obs\u0142ugiwana w trybie offline.(SBL-UIJ-00108)";
      _SWEmsgAryOffline["IDS_DOUI_NO_REC_UPD"] = "Wyst\u0105pi\u0142 b\u0142\u0105d podczas odczytu kodu kreskowego. Dane nie zosta\u0142y zapisane.(SBL-UIJ-00109)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SYNC"] = "Nie mo\u017Cna dokona\u0107 synchronizacji. Prosz\u0119 upewni\u0107 si\u0119, \u017Ce serwer jest dost\u0119pny i spr\u00F3bowa\u0107 ponownie.(SBL-UIJ-00110)";
      _SWEmsgAryOffline["IDS_DOUI_SYNC_DNE"] = "Synchronizacja powiod\u0142a si\u0119. Prosz\u0119 skontaktowa\u0107 si\u0119 z administratorem, aby zweryfikowa\u0107 dzienniki.(SBL-UIJ-00111)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SESSN_EXPIRED"] = "Sesja logowania wygas\u0142a. W celu synchronizacji prosz\u0119 zamkn\u0105\u0107 i ponownie otworzy\u0107 przegl\u0105dark\u0119 i zalogowa\u0107 si\u0119 ponownie.(SBL-UIJ-00112)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_SRF_EXPIRED"] = "Plik zbioru danych Siebel na serwerze zosta\u0142 zmieniony od czasu ostatniej synchronizacji. Zostanie wykonane pe\u0142ne pobieranie.(SBL-UIJ-00113)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_RESP_CHNG"] = "Autoryzacje u\u017Cytkownika uleg\u0142y zmianie. Zostanie wykonane pe\u0142ne pobieranie.(SBL-UIJ-00114)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_DATA_OUTDTD"] = "Bie\u017C\u0105ce dane s\u0105 nieaktualne. Zostanie wykonane pe\u0142ne pobieranie.(SBL-UIJ-00115)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INVALID_RESPONSE"] = "Otrzymano nieprawid\u0142ow\u0105 odpowied\u017A serwera na zlecenie: %1.(SBL-UIJ-00116)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_APPL_CACHE_DNWLD"] = "Pobieranie bufora aplikacji nie powiod\u0142o si\u0119.(SBL-UIJ-00117)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UNAUTH_USER"] = "U\u017Cytkownik nie posiada upowa\u017Cnienia do dokonania tej synchronizacji.(SBL-UIJ-00118)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_NODECHANGED_BKUP_DATA"] = "W\u0119ze\u0142 zdalny uleg\u0142 zmianie. Zostanie wykonane pe\u0142ne pobieranie.(SBL-UIJ-00119)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_UPOSCHANGED_BKUP_DATA"] = "Stanowisko u\u017Cytkownika uleg\u0142o zmianie. Zostanie wykonane pe\u0142ne pobieranie.(SBL-UIJ-00120)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_INSUFFICIENT_MEMORY"] = "Niewystarczaj\u0105ca ilo\u015B\u0107 pami\u0119ci. Tryb roz\u0142\u0105czony nie b\u0119dzie obs\u0142ugiwany.(SBL-UIJ-00121)";
      _SWEmsgAryOffline["SSAPhmaErrDetailProd"] = "Przed przes\u0142aniem nale\u017Cy okre\u015Bli\u0107 szczeg\u00F3\u0142y dotycz\u0105ce co najmniej jednego produktu.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignAfterToday"] = "Nie mo\u017Cna pobra\u0107 podpisu dla rozmowy, je\u015Bli jej data przypada na dzie\u0144 w przysz\u0142o\u015Bci.";
      _SWEmsgAryOffline["SSAPhmaErrNoSignUnlessOwn"] = "Nie mo\u017Cna pobra\u0107 podpisu dla rozmowy, kt\u00F3ra nie nale\u017Cy do u\u017Cytkownika.";
      _SWEmsgAryOffline["IDS_LS_TARGET_PRIORITY_VALIDATION_FAILED"] = "Warto\u015Bci priorytet\u00F3w dla wyszczeg\u00F3lnionych produkt\u00F3w musz\u0105 by\u0107 unikatowe i ustawione kolejno. Prosz\u0119 sprawdzi\u0107 szczeg\u00F3\u0142y dotycz\u0105ce priorytet\u00F3w warto\u015Bci produkt\u00F3w i upewni\u0107 si\u0119, \u017Ce s\u0105 zgodne z tym wymaganiem.";
      _SWEmsgAryOffline["SSAFReqFieldNotExist"] = "%1 jest polem wymaganym.  Nale\u017Cy wprowadzi\u0107 odpowiedni\u0105 warto\u015B\u0107.(SBL-UIJ-00126)";
      _SWEmsgAryOffline["SSAPhrmaErrRefNumIfSamp"] = "Nie mo\u017Cna przes\u0142a\u0107 wizyty do %1. Je\u015Bli pr\u00F3bki s\u0105 przekazane, wymagany jest numer adnotacji pr\u00F3bki.";
      _SWEmsgAryOffline["SSAPhmaErrCallNeedsSign"] = "Nie mo\u017Cna przes\u0142a\u0107 tej rozmowy do %1. Do jej przes\u0142ania wymagany jest podpis w formie elektronicznej lub papierowej.";
      _SWEmsgAryOffline["SSAPharmaSampleTxnsOnReconciledInventory"] = "Tej transakcji pr\u00F3bek nie mo\u017Cna przes\u0142a\u0107 dla uzgodnionego okresu. Prosz\u0119 zmieni\u0107 dat\u0119 transakcji tak, aby przypada\u0142a na nieuzgodniony lub aktywny okres.";
      _SWEmsgAryOffline["SSAPhrmaErrNotValidProfTypeForSRE"] = "Nie mo\u017Cna pobra\u0107 podpisu dla tego typu osoby kontaktowej.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerCallExceeded"] = "Nale\u017Cy zmieni\u0107 ilo\u015B\u0107. Dopuszczalne pr\u00F3bkowanie to %2 z %1 na rozmow\u0119.";
      _SWEmsgAryOffline["SSAPhmaErrMaxQtyPerAllocPeriodExceeded"] = "Nale\u017Cy zmieni\u0107 ilo\u015B\u0107. Nie mo\u017Cna pr\u00F3bkowa\u0107 ilo\u015B\u0107i %1, poniewa\u017C przekracza ona dost\u0119pn\u0105 ilo\u015B\u0107 - %2.";
      _SWEmsgAryOffline["SSAPhrmaErrOKToSampleFlgNotSet"] = "Lekarz/pracownik s\u0142u\u017Cby zdrowia nie mo\u017Ce by\u0107 poddawany pr\u00F3bkowaniu. Nale\u017Cy usun\u0105\u0107 pr\u00F3bki przed przes\u0142aniem rozmowy.";
      _SWEmsgAryOffline["SSAPhrmaErrLicFldsNotFilled"] = "%1 jest polem wymaganym.(SBL-UIJ-00134)";
      _SWEmsgAryOffline["SSAPhrmaErrLicNumExpDtExpired"] = "Numer licencji dla tej osoby kontaktowej wygas\u0142.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumNotValid"] = "Numer DEA dla tego adresu jest niepoprawny. Prosz\u0119 wprowadzi\u0107 poprawn\u0105 warto\u015B\u0107.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumFldsNotFilled"] = "%1 jest polem wymaganym w tym adresie osoby kontaktowej.";
      _SWEmsgAryOffline["SSAPhrmaErrDEANumExpDtExpired"] = "Numer DEA dla tego adresu osoby kontaktowej wygas\u0142. Nale\u017Cy zaktualizowa\u0107 numer DEA dla wybranego adresu.";
      _SWEmsgAryOffline["SSAPhmaValdnMsgLotCutOff"] = "Nale\u017Cy wybra\u0107 inny numer partii. Numer partii: '%1' wybrany dla pr\u00F3bki: '%2' jest bliski wyga\u015Bni\u0119cia.";
      _SWEmsgAryOffline["SSAPhrmaErrProfProfileNotFilled"] = "Aby pobra\u0107 podpis, wymagane s\u0105 nast\u0119puj\u0105ce pola dotycz\u0105ce osoby kontaktowej: Nazwisko, Imi\u0119, Tytu\u0142 oraz Adres.";
      _SWEmsgAryOffline["SSAPhmaErrSampDropSign"] = "Aby pobra\u0107 podpis, nale\u017Cy przekaza\u0107 co najmniej jedn\u0105 pr\u00F3bk\u0119 lub jej za\u017C\u0105da\u0107.";
      _SWEmsgAryOffline["SSAPhmaCallValidationFailed"] = "Nale\u017Cy sprawdzi\u0107 wyniki zatwierdzania czynno\u015Bci koryguj\u0105cej, aby kontynuowa\u0107.(SBL-UIJ-00142)";
      _SWEmsgAryOffline["SSAPhrmaErrLicStatusInactive"] = "Numer licencji dla tej osoby kontaktowej jest nieaktywny.";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_REQD"] = "'%1' jest polem wymaganym.  Prosz\u0119 wprowadzi\u0107 warto\u015B\u0107 tego pola.(SBL-UIJ-00144)";
      _SWEmsgAryOffline["IDS_PHA_ERR_SIGN_TOO_BIG"] = "Wpis w polu '%1' jest zbyt d\u0142ugi, aby mo\u017Cna by\u0142o go zmie\u015Bci\u0107 w bazie danych przedsi\u0119biorstwa zakodowanej w standardzie UTF-8.  Prosz\u0119 spr\u00F3bowa\u0107 podobnie, u\u017Cywaj\u0105c kr\u00F3tszego wpisu.(SBL-UIJ-00145)";
      _SWEmsgAryOffline["IDS_LSMOBILE_CL_ACCOUNT_CONTACT_REQUIRED"] = "Nale\u017Cy wybra\u0107 osob\u0119 kontaktow\u0105 lub podmiot, aby utworzy\u0107 rozmow\u0119 (ale nie obydwie te warto\u015Bci jednocze\u015Bnie).(SBL-UIJ-00146)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgInValidEmpToSample"] = "U\u017Cytkownik nie ma uprawnie\u0144 do korzystania z pr\u00F3bek. Nale\u017Cy skontaktowa\u0107 si\u0119 z grup\u0105 ds. zgodno\u015Bci pr\u00F3bek.";
      _SWEmsgAryOffline["SSAPhmaValidationRulePassed"] = "Sprawdzanie regu\u0142y zatwierdzania zako\u0144czone pomy\u015Blnie.";
      _SWEmsgAryOffline["SSAPhmaValidationRuleIgnored"] = "Regu\u0142a zatwierdzania zosta\u0142a zignorowana, poniewa\u017C nie ma zastosowania do bie\u017C\u0105cej rozmowy";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EXPIRED_LOT"] = "Wygas\u0142a pr\u00F3bka %2, nr partii %1. Nale\u017Cy usun\u0105\u0107 ten element i wybra\u0107 pr\u00F3bk\u0119 z prawid\u0142owym numerem partii.";
      _SWEmsgAryOffline["IDS_LS_PHARMA_LOT_NUMBER_REQ"] = "Numer %1 jest wymagany dla pr\u00F3bki %2.";
      _SWEmsgAryOffline["SSAOMErrDataTooLong"] = "Warto\u015B\u0107 dla pola '%1' jest zbyt d\u0142uga (maksymalny rozmiar to %2).(SBL-UIJ-00152)";
      _SWEmsgAryOffline["SSAOMErrUnknownBCMethod"] = "Specjalna metoda '%1' nie jest obs\u0142ugiwana w tym sk\u0142adniku biznesowym.(SBL-UIJ-00153)";
      _SWEmsgAryOffline["SSASqlErrFieldReadOnly"] = "Ta operacja jest niedost\u0119pna dla pola '%1' tylko do odczytu.(SBL-UIJ-00154)";
      _SWEmsgAryOffline["SSASqlErrUpdMode"] = "Nieprawid\u0142owa operacja poza trybem aktualizacji. Prosz\u0119 kontynuowa\u0107 lub poprosi\u0107 administratora system\u00F3w o sprawdzenie konfiguracji aplikacji, je\u015Bli problem b\u0119dzie wyst\u0119powa\u0142 nadal.(SBL-UIJ-00155)";
      _SWEmsgAryOffline["SSASqlErrNotExecuted"] = "Operacja jest nieprawid\u0142owa, je\u015Bli nie zosta\u0142a wykonana.(SBL-UIJ-00156)";
      _SWEmsgAryOffline["SSAOMErrNoUpdate"] = "W tym momencie nie mo\u017Cna uaktualni\u0107 tego rekordu. Prosz\u0119 zaznaczy\u0107 w\u0142a\u015Bciwo\u015Bci 'Brak aktualizacji' w aplecie, sk\u0142adniku biznesowym i \u0142\u0105czu.(SBL-UIJ-00157)";
      _SWEmsgAryOffline["SSASqlErrTrxInProgress"] = "Transakcja jest ju\u017C w toku(SBL-UIJ-00158)";
      _SWEmsgAryOffline["SSAOMErrFieldInActive"] = "Pole %1 nie jest uaktywnione w sk\u0142adniku biznesowym %2.(SBL-UIJ-00159)";
      _SWEmsgAryOffline["IDS_SWE_INVALID_OLD_PASSWORD"] = "Aktualne has\u0142o wprowadzone przez u\u017Cytkownika jest nieprawid\u0142owe. Prosz\u0119 ponownie wprowadzi\u0107 has\u0142o.(SBL-UIJ-00160)";
      _SWEmsgAryOffline["IDS_SWE_NO_COMMIT_PENDING"] = "Nie mo\u017Cna zmodyfikowa\u0107 rekordu na tej stronie. Prawdopodobnie w celu dotarcia do tej strony u\u017Cyto przycisku 'Wstecz' lub 'W prz\u00F3d' przegl\u0105darki. Aby zmodyfikowa\u0107 rekordy, nale\u017Cy u\u017Cy\u0107 przycisk\u00F3w 'Edycja/Nowy' znajduj\u0105cych si\u0119 w tej aplikacji.(SBL-UIJ-00161)";
      _SWEmsgAryOffline["SSASqlErrValidation"] = "Warto\u015B\u0107 %1 pola %2 musi by\u0107 %3.(SBL-UIJ-00162)";
      _SWEmsgAryOffline["IDS_ERR_FS_MISSING_SR"] = "Tekst b\u0142\u0119du: B\u0142\u0119dne zlecenie obs\u0142ugi. Do wygenerowania zam\u00F3wienia niezb\u0119dne jest poprawne zlecenie obs\u0142ugi.(SBL-UIJ-00163)";
      _SWEmsgAryOffline["IDS_FS_CHECKTRUNK_NO_EMPLOYEE"] = "Nie mo\u017Cna zrealizowa\u0107 g\u0142\u00F3wnej cz\u0119\u015Bci czeku, poniewa\u017C nie znaleziono pracownika.(SBL-UIJ-00164)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_START_DATE"] = "B\u0142\u0119dna data pocz\u0105tkowa faktury.(SBL-UIJ-00165)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_SCHEDULE"] = "B\u0142\u0119dny harmonogram faktur.(SBL-UIJ-00166)";
      _SWEmsgAryOffline["IDS_IVC_ERR_INVOICE_DAY"] = "B\u0142\u0119dny harmonogram faktur.(SBL-UIJ-00167)";
      _SWEmsgAryOffline["IDS_FS_ERR_NO_TRUNK_INVLOC"] = "Nie mo\u017Cna znale\u017A\u0107 lokalizacji g\u0142\u00F3wnego magazynu dla w\u0142a\u015Bciciela dzia\u0142ania.(SBL-UIJ-00168)";
      _SWEmsgAryOffline["IDS_FS_ERR_MTHD_MISSING_ARG"] = "Metoda %1 wymaga podania warto\u015Bci argumentu %2.(SBL-UIJ-00169)";
      _SWEmsgAryOffline["SSASqlErrDupConflict"] = "Rekord zawieraj\u0105cy takie same warto\u015Bci, jak nowo utworzony rekord, ju\u017C istnieje.\n\nJe\u015Bli nowy rekord ma by\u0107 wprowadzony, warto\u015Bci p\u00F3l powinny by\u0107 unikatowe.(SBL-UIJ-00170)";
      _SWEmsgAryOffline["SSASqlErrEndTrx"] = "Podczas pr\u00F3by potwierdzenia/wycofania transakcji bazy danych wyst\u0105pi\u0142 b\u0142\u0105d.(SBL-UIJ-00171)";
      _SWEmsgAryOffline["SSAPhmaValdnMsgStopSampling"] = "Nale\u017Cy usun\u0105\u0107 pozycj\u0119 linii pr\u00F3bki dla produktu %1. U\u017Cytkownik nie ma uprawnie\u0144 do pr\u00F3bek i do przesy\u0142ania zlece\u0144 dotycz\u0105cych produktu %1.(SBL-UIJ-00172)";
      _SWEmsgAryOffline["IDS_CLIENT_GO_OFFLINE"] = "W\u0142\u0105czanie trybu offline";
      _SWEmsgAryOffline["IDS_CLIENT_GO_ONLINE"] = "W\u0142\u0105czanie trybu offline";
      _SWEmsgAryOffline["IDS_CLIENT_CONTINUE_WORK_OFFLINE"] = "Kontynuowanie pracy w trybie offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_GO_ONLINE"] = "\u0141adowanie i w\u0142\u0105czanie trybu online";
      _SWEmsgAryOffline["IDS_CLIENT_SYNC_STAY_OFFLINE"] = "Synchronizacja i pozostawanie w trybie offline";
      _SWEmsgAryOffline["IDS_CLIENT_UPLOAD_ONLY_STAY_OFFLINE"] = "Tylko \u0142adowanie i pozostawanie w trybie offline";
      _SWEmsgAryOffline["IDS_CLIENT_LOG"] = "Dziennik";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BO_FILTER_CHNG"] = "Filtry obiekt\u00F3w biznesowych uleg\u0142y zmianie. Zostanie wykonane pe\u0142ne pobieranie.(SBL-UIJ-00180)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_BC_FILTER_CHNG"] = "Filtry sk\u0142adnik\u00F3w biznesowych uleg\u0142y zmianie. Zostanie wykonane pe\u0142ne pobieranie.(SBL-UIJ-00181)";
      _SWEmsgAryOffline["IDS_LS_PHARMA_EDT_RSP_REQD"] = "Odpowied\u017A dotycz\u0105ca szczeg\u00F3\u0142\u00F3w prezentacji jest wymagana w celu przes\u0142ania rozmowy. Prosz\u0119 wprowadzi\u0107 odpowiedni\u0105 warto\u015B\u0107.(SBL-UIJ-00182)";
      _SWEmsgAryOffline["IDS_DOUI_ERR_CONTACT_REQD"] = "Prosz\u0119 doda\u0107 osob\u0119 kontaktow\u0105(SBL-UIJ-00183)";
      _SWEmsgAryOffline["IDS_SALES_CONTACT_PROSPECT_REQD"] = "Prosz\u0119 poda\u0107 nazwisko osoby kontaktowej lub nazwisko potencjalnego klienta. Obydwa pola nie mog\u0105 by\u0107 puste.(SBL-UIJ-00184)";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_TITLE"] = "Przygotowywanie do u\u017Cycia w trybie offline";
      _SWEmsgAryOffline["IDS_PROGRESS_APPCACHE_FILES"] = "Pobrano %1 z %2 plik\u00F3w";
      _SWEmsgAryOffline["IDS_PROGRESS_SYNCDATA_TITLE"] = "Synchronizowanie danych";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_METADATA"] = "Pobieranie konfiguracji aplikacji";
      _SWEmsgAryOffline["IDS_PROGRESS_DOWNLOAD_DATA"] = "Pobieranie danych";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_METADATA"] = "Zapisywanie konfiguracji aplikacji";
      _SWEmsgAryOffline["IDS_PROGRESS_SAVE_DATA"] = "Zapisywanie danych";
      _SWEmsgAryOffline["IDS_PROGRESS_LOAD_DB"] = "Za\u0142adowano %1 z %2 obiekt\u00F3w";
      _SWEmsgAryOffline["IDS_PROGRESS_GET_TXN_STATUS"] = "Zatwierdzanie integralno\u015Bci danych";
      _SWEmsgAryOffline["IDS_PROGRESS_UPLOAD_DATA"] = "\u0141adowanie danych";
      _SWEmsgAryOffline["IDS_PROGRESS_RELOAD_DB_TITLE"] = "Przygotowywanie danych w trybie offline";
      _SWEmsgAryOffline["SSAOMErrBoundedPick"] = "Warto\u015B\u0107 wprowadzona w polu '%2' sk\u0142adnika buscomp '%3' nie jest zgodna z \u017Cadn\u0105 warto\u015Bci\u0105 powi\u0105zanej listy wyboru '%1'(SBL-UIJ-00196)";
      _SWEmsgAryOffline["IDS_DOUI_SHADOW_API_ERROR"] = "Specjalna metoda '%1' nie jest obs\u0142ugiwana w trybie offline.";
   }
   return _SWEmsgAryOffline;
}
function _SWEgetMessageOffline(key)
{
   ary = _SWEgetGlobalMsgAryOffline();
   return ary[key];
}
